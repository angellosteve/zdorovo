const leaf = (x, y, angle = 0, color = "#477a4b") =>
  `<g transform="translate(${x} ${y}) rotate(${angle})"><path d="M0 0Q-22-18 0-35Q22-18 0 0Z" fill="${color}"/><path d="M0-30V0" stroke="#e3edb9" stroke-opacity=".65"/></g>`;

const round = (x, y, r, fill, extra = "") =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;

const seed = (x, y, angle, fill) =>
  `<g transform="translate(${x} ${y}) rotate(${angle})"><ellipse rx="9" ry="14" fill="${fill}"/><path d="M0-10q-4 11 0 20" fill="none" stroke="#4a4025" stroke-opacity=".54"/></g>`;

const citrus = (x, y, rind, pulp) => {
  const segment = '<path d="M0-3-7-15Q0-19 7-15Z"/>';
  return `<g transform="translate(${x} ${y})">${round(0, 0, 22, rind)}${round(0, 0, 18, "#fff2c8")}<g fill="${pulp}">${Array.from({length: 8}, (_, i) => `<g transform="rotate(${i * 45})">${segment}</g>`).join("")}</g></g>`;
};

const ingredients = {
  brand: [
    ["Caralluma Fimbriata Extract", "", "В естественной среде растение накапливает больше биоактивных соединений, в том числе прегнановых гликозидов, которые сохраняются при бережной экстракции.", "#ebefd7",
      '<path d="M31 87V57l-10-12V23m25 65V47l-5-14V13m19 75V57l12-11V27m-2 58 11-17V47" fill="none" stroke="#54834c" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 81V57L21 45V23m25 59V47l-5-14V13m19 68V57l12-11V27" fill="none" stroke="#abc578" stroke-width="2"/><path d="m42 15-7-6 8 1 5-6 1 8 7 4-8 2-4 7Z" fill="#a3395a"/>']
  ],
  thermo: [
    ["Citrus Aurantium Extract", "Валенсия, Испания.", "Регион известен своими цитрусовыми плантациями. Экстракт получают без потери природных компонентов — синефрина и гесперидина.", "#ffedcb",
      leaf(49, 40, 35) + round(38, 52, 22, "#ee942d") + citrus(64, 62, "#e58123", "#ffb649")],
    ["Grapefruit Seed Extract", "Валенсия, Испания.", "Из семян получают экстракт, богатый нарингином и биофлавоноидами.", "#ffe4dc",
      leaf(45, 38, 40) + citrus(44, 48, "#ee9768", "#e8767c") + seed(67, 68, 35, "#f7d48f") + seed(76, 78, 60, "#fff0b8")],
    ["Green Coffee Extract", "Минас-Жерайс, Бразилия.", "Высокогорные плантации славятся премиальной арабикой. Это не синтетический кофеин, а уникальный природный комплекс с мягким и длительным действием.", "#eaf1d7",
      leaf(51, 48, 38) + leaf(46, 45, -44, "#63975e") + seed(33, 59, -32, "#9eae66") + seed(57, 58, 25, "#c1c77f") + seed(66, 76, 46, "#839b56")],
    ["Griffonia Seed Extract", "Ашанти, Гана.", "Только здесь семена имеют повышенное содержание 5-гидрокситриптофана.", "#eee8d8",
      leaf(50, 54, 34) + '<path d="M19 65Q32 36 74 46Q75 75 19 65Z" fill="#82915a" stroke="#647341" stroke-width="2"/>' + seed(30, 68, -28, "#6b523c") + seed(49, 69, 28, "#9b7856") + seed(66, 63, 54, "#795d46")],
    ["Yohimbe Root Extract", "Центральная провинция, Камерун.", "Сырьё собирается вручную и малыми партиями. Благодаря этому сохраняется высокая концентрация природных алкалоидов.", "#f5e6d3",
      '<g transform="rotate(-21 48 48)" stroke-linecap="round"><path d="M48 19v57m-2-31-17 22m23-17 15 24M40 57 30 77m21-18 4 25" stroke="#875438" stroke-width="9"/><path d="M46 20v54m4-27 15 26m-25-17-10 20" stroke="#bb8758" stroke-width="2"/></g>' + leaf(42, 27, 32, "#637c41")],
    ["Green Tea Extract", "Ассам, Индия.", "Традиционная технология сбора и обработки обеспечивает высокое содержание катехинов.", "#e9f1db",
      leaf(48, 62, 1, "#588747") + leaf(48, 62, -48, "#75a660") + leaf(49, 62, 54, "#3d753f") + '<path d="M27 66h42l-5 14H32Z" fill="#a9c377"/><ellipse cx="48" cy="66" rx="21" ry="5" fill="#d3df9b"/>'],
    ["Black Tea Extract", "Дарджилинг, Индия.", "Листья перерабатываются в концентрированный экстракт, сохраняющий полифенолы.", "#f3e7d7",
      leaf(43, 58, -34, "#70543a") + leaf(53, 54, 46, "#89623d") + '<path d="M25 62h45l-6 16H31Z" fill="#b67148"/><ellipse cx="47" cy="62" rx="23" ry="6" fill="#794122"/><path d="M70 64q17-2 6 9h-9" fill="none" stroke="#b67148" stroke-width="3"/>'],
    ["Black Pepper Extract", "Керала, Индия.", "Производится методом CO₂-экстракции — это современная технология, которая позволяет сохранить чистый пиперин без примесей.", "#e5eadc",
      leaf(43, 46, -32) + leaf(55, 41, 50, "#709455") + '<path d="M54 33q-8 24 4 48" fill="none" stroke="#63774b" stroke-width="2"/>' + [[49,43],[57,48],[46,54],[56,57],[49,63],[60,66],[53,72],[61,77]].map(([x,y],i) => round(x,y,5,i%2 ? "#463934" : "#6c5a47")).join("")]
  ],
  biocell: [
    ["Hydrolyzed Collagen Tripeptides", "", "Основной структурный белок. Поддерживает состояние кожи, волос, ногтей при похудении.", "#f3e6fb",
      '<path d="M19 65c18-58 38 23 58-34M19 31c18 58 38-23 58 34" fill="none" stroke="#8650ad" stroke-width="5"/><path d="M24 42v12m12-12v12m12-6v1m12-7v12m12-12v12" stroke="#bc88d2" stroke-width="2"/>'],
    ["Hyaluronic Acid", "", "Создаёт водно-гелевую «подушку», поддерживая тургор кожи. Снижает ломкость волос и ногтей, повышая их прочность.", "#e4eefb",
      '<path d="M49 17C39 32 27 46 27 59a22 22 0 1 0 44 0c0-13-12-27-22-42Z" fill="#6594cf"/><path d="M37 56q-1 14 12 16" fill="none" stroke="#e0efff" stroke-width="4" stroke-linecap="round"/>' + round(69,29,6,"#adc9ef")],
    ["Chondroitin Sulfate", "", "Участвует в формировании коллагена и внеклеточного матрикса. Способствует увлажнению и упругости кожи.", "#fae5ed",
      '<path d="m23 52 15-20 23 7 12 19-19 16-23-4Z" fill="none" stroke="#b35a89" stroke-width="3"/>' + [[23,52],[38,32],[61,39],[73,58],[54,74],[31,70]].map(([x,y],i) => round(x,y,7,i%2 ? "#8d4773" : "#db8caa")).join("")]
  ]
};

for (const [group, entries] of Object.entries(ingredients)) {
  const container = document.getElementById(group);
  for (const [title, origin, description, color, art] of entries) {
    const article = document.createElement("article");
    article.className = "ingredient";
    article.innerHTML = `<svg viewBox="0 0 96 96" role="img" aria-label="Иллюстрация ${title}" style="background:${color}">${art}</svg><div><h4>${title}</h4>${origin ? `<p class="origin">${origin}</p>` : ""}<p>${description}</p></div>`;
    container.append(article);
  }
}
