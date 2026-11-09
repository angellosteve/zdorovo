const API = "https://metacpa.ru/create";
const FLOW_ID = "55783";
const ORDER_PATH = "/api/order";
const PAGES_ORIGIN = "https://angellosteve.github.io";

function corsHeaders(origin) {
  return {"Access-Control-Allow-Origin": origin, "Vary": "Origin"};
}

function enabled(env) {
  return env.METACPA_LIVE === "true";
}

export async function handleOrder(request, env, send = fetch) {
  const origin = request.headers.get("Origin");
  const allowed = origin === PAGES_ORIGIN || origin === new URL(request.url).origin;
  const json = (status, ok = false) => Response.json({ok}, {
    status, headers: {"Cache-Control": "no-store", ...(allowed ? corsHeaders(origin) : {})}
  });
  if (!allowed) return json(403);
  if (request.method === "OPTIONS") {
    return new Response(null, {status: 204, headers: {
      ...corsHeaders(origin),
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type"
    }});
  }
  if (request.method !== "POST") return json(405);
  if (!enabled(env)) return json(503);
  if (request.headers.get("Content-Type")?.split(";")[0] !== "application/json") return json(415);
  const ip = request.headers.get("CF-Connecting-IP");
  if (!ip) return json(503);

  const raw = await request.text();
  if (raw.length > 2048) return json(413);
  let order;
  try {
    order = JSON.parse(raw);
  } catch {
    return json(400);
  }
  const name = typeof order?.name === "string" ? order.name.trim() : "";
  const phone = typeof order?.phone === "string" ? order.phone.replace(/\D/g, "") : "";
  if (!name || name.length > 100 || !/^[78]7\d{9}$/.test(phone) || order?.consent !== true) return json(400);

  const payload = new URLSearchParams({
    name,
    phone: "+7" + phone.slice(1),
    flow_id: FLOW_ID,
    ip
  });
  if (/^[1-9]\d*$/.test(env.METACPA_GEO_ID ?? "")) payload.set("geo", env.METACPA_GEO_ID);
  try {
    const upstream = await send(API, {
      method: "POST",
      headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"},
      body: payload,
      redirect: "error",
      signal: AbortSignal.timeout(8000)
    });
    if (!upstream.ok) return json(502);
    const result = await upstream.json();
    return result?.id && result?.status === "New" ? json(201, true) : json(502);
  } catch {
    return json(502);
  }
}

export default {
  async fetch(request, env) {
    const {pathname} = new URL(request.url);
    if (pathname === ORDER_PATH) return handleOrder(request, env);
    if (pathname === "/health" && request.method === "GET") {
      return Response.json({service: "kz-slim-orders", live: enabled(env)}, {
        headers: {"Cache-Control": "no-store"}
      });
    }
    if (!env.ASSETS) return new Response("Not found", {status: 404});
    const asset = await env.ASSETS.fetch(request);
    if (!enabled(env) || !asset.ok || !asset.headers.get("Content-Type")?.startsWith("text/html")) return asset;
    return new HTMLRewriter().on('meta[name="order-api"]', {
      element(meta) { meta.setAttribute("content", ORDER_PATH); }
    }).transform(asset);
  }
};
