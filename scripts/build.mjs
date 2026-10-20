import { readFile, writeFile } from "node:fs/promises";
import { phone, maps, groups, licences, services, licenceFile, serviceFile, govCategories } from "../content/pages.mjs";

const esc = (text) => String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const icon = (name, cls = "icon") => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;
const vehicle = (name) => icon(name, ["car", "motorcycle", "truck"].includes(name) ? "vehicle-icon" : "icon");
const arrow = icon("arrow");
const library = await readFile("content/icons.svg", "utf8");
const home = await readFile("content/home.html", "utf8");
const imageLabels = {
  classroom: "Η αίθουσα θεωρητικής εκπαίδευσης της Σχολής Οδηγών Καραμπίνης",
  "school-exterior": "Η είσοδος της σχολής στη γωνία Εθνικής Αντιστάσεως και Φειδιππίδου",
  "school-front": "Η πρόσοψη και η επιγραφή της Σχολής Οδηγών Καραμπίνης",
  "training-engine": "Εκπαιδευτικό μοντέλο κινητήρα στον χώρο της σχολής",
  reception: "Ο χώρος υποδοχής και το γραφείο της σχολής",
  lounge: "Ο χώρος αναμονής της σχολής με τον πορτοκαλί καναπέ",
  "road-class": "Προβολή εκπαιδευτικού υλικού οδικής κυκλοφορίας στην αίθουσα",
  "road-signs": "Προβολή σημάτων οδικής κυκλοφορίας στην αίθουσα της σχολής"
};
function photo(name, eager = false, cls = "") {
  return `<img class="${cls}" src="assets/images/${name}-1200.webp" srcset="assets/images/${name}-720.webp 720w, assets/images/${name}-1200.webp 1200w" sizes="(max-width: 760px) 92vw, 50vw" width="1200" height="795" alt="${imageLabels[name]}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
}
const findLicence = (key) => licences.find((item) => item.key === key);
function link(file, label, current, cls = "") {
  return `<a href="${file}"${cls ? ` class="${cls}"` : ""}${file === current ? ' aria-current="page"' : ""}>${label}</a>`;
}
function header(current) {
  return `<header class="site-header"><div class="container header-inner">
    <a class="brand" href="index.html" aria-label="Σχολή Οδηγών Καραμπίνης — αρχική"><img src="assets/images/logo.png" width="400" height="104" alt="Καραμπίνης Κωνσταντίνος"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav"><span class="menu-label">Μενού</span><span class="menu-bars" aria-hidden="true"></span></button>
    <nav id="main-nav" class="main-nav" aria-label="Κύρια πλοήγηση">
      ${link("index.html", "Αρχική", current)}
      ${link("school.html", "Η σχολή", current)}
      <details class="nav-group"${current.startsWith("diploma") ? ' data-active="true"' : ""}>
        <summary>Διπλώματα <span class="chevron" aria-hidden="true"></span></summary>
        <div class="nav-panel"><div class="nav-panel-inner">
          <div class="nav-panel-heading">${link("diplomata.html", `Όλα τα διπλώματα ${arrow}`, current, "text-link")}<span>Επίλεξε τη διαδρομή σου.</span></div>
          <div class="mega-columns">${groups.map((group) => `<div><p class="nav-heading">${group.title}</p>${group.keys.map((key) => {
            const item = findLicence(key);
            return link(licenceFile(key), `<span class="nav-code">${item.key === "doctors" ? "+" : item.code}</span><span>${item.label}</span>`, current);
          }).join("")}</div>`).join("")}</div>
        </div></div>
      </details>
      <details class="nav-group"${current.startsWith("service") ? ' data-active="true"' : ""}>
        <summary>Υπηρεσίες <span class="chevron" aria-hidden="true"></span></summary>
        <div class="nav-panel"><div class="nav-panel-inner">
          <div class="nav-panel-heading">${link("services.html", `Όλες οι υπηρεσίες ${arrow}`, current, "text-link")}<span>Και μετά το πρώτο δίπλωμα.</span></div>
          <div class="service-menu">${services.map((item) => link(serviceFile(item.key), `<span class="nav-code">${item.code}</span><span>${item.label}</span>${arrow}`, current)).join("")}</div>
        </div></div>
      </details>
      ${link("test-driver.html", "Test Driver", current)}
      ${link("contact.html", "Επικοινωνία", current)}
      <a class="button button-small nav-call" href="${phone}" aria-label="Κάλεσε τη σχολή στο 210 666 6589">${icon("phone")}<span>Μίλησέ μας</span></a>
    </nav>
  </div></header>`;
}
function footer(current) {
  return `<footer class="site-footer"><div class="container">
    <div class="footer-main"><a class="brand footer-brand" href="index.html"><img src="assets/images/logo.png" width="400" height="104" alt="Καραμπίνης Κωνσταντίνος" loading="lazy"></a><p>Σχολή Οδηγών · Παλλήνη<br><span>Το επόμενο βήμα σου, στον δρόμο.</span></p><a href="#top" class="back-top">Στην αρχή <span aria-hidden="true">↑</span></a></div>
    <nav class="footer-links" aria-label="Σύνδεσμοι υποσέλιδου">${[["school.html","Η σχολή"],["diplomata.html","Διπλώματα"],["services.html","Υπηρεσίες"],["test-driver.html","Test Driver"],["contact.html","Επικοινωνία"]].map(([url,label])=>link(url,label,current)).join("")}</nav>
    <div class="footer-bottom"><p>Ανεπίσημη σχεδιαστική πρόταση · Δεν αποτελεί την επίσημη ιστοσελίδα της σχολής.</p></div>
  </div></footer><a class="mobile-call" href="${phone}">${icon("phone")}<span>Μίλησέ μας</span><strong>210 666 6589</strong></a>`;
}
function page(current, title, description, main) {
  return `<!doctype html>
<html lang="el"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow"><meta name="theme-color" content="#1558d6">
  <title>${esc(title)} · Καραμπίνης | Σχολή Οδηγών Παλλήνη</title>
  <meta name="description" content="${esc(description)}">
  <link rel="icon" href="assets/images/logo.png" type="image/png">
  <link rel="preload" href="assets/fonts/noto-sans-greek.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/fonts/fonts.css"><link rel="stylesheet" href="assets/styles.css"><link rel="stylesheet" href="assets/pages.css">
  <script src="assets/site.js" defer></script>
</head><body>
<a class="skip-link" href="#main">Μετάβαση στο περιεχόμενο</a>
${library}${header(current)}
<main id="main">${main}</main>
${footer(current)}
</body></html>\n`;
}
function breadcrumbs(label, parent) {
  return `<nav class="breadcrumbs" aria-label="Διαδρομή πλοήγησης"><a href="index.html">Αρχική</a><span aria-hidden="true">/</span>${parent ? `<a href="${parent[0]}">${parent[1]}</a><span aria-hidden="true">/</span>` : ""}<span aria-current="page">${label}</span></nav>`;
}
function innerHero({label, title, intro, photo: name = "classroom", code, icon: iconName, parent, action}) {
  return `<section class="inner-hero" id="top"><div class="container">
    ${breadcrumbs(label, parent)}
    <div class="inner-hero-grid"><div class="inner-copy">
      <p class="eyebrow"><span class="yellow-marker"></span>${code ? `ΚΑΤΗΓΟΡΙΑ ${code}` : label.toLocaleUpperCase("el")}</p>
      <h1>${title}</h1><p class="inner-intro">${intro}</p>
      <div class="hero-actions">${action || `<a class="button" href="${phone}">Μίλησέ μας ${arrow}</a><a class="text-link" href="#information">Δες τις πληροφορίες <span aria-hidden="true">↓</span></a>`}</div>
    </div><figure class="inner-visual">${photo(name,true)}${iconName ? `<div class="visual-label">${vehicle(iconName)}<div><span>${code || "ΚΑΡΑΜΠΙΝΗΣ"}</span><strong>${label}</strong></div></div>` : `<figcaption>Στον χώρο της σχολής μας, στην Παλλήνη.</figcaption>`}</figure></div>
  </div></section>`;
}
function contactStrip() {
  return `<section class="section cta-section"><div class="container"><div class="cta-band"><div><p class="eyebrow">ΤΟ ΕΠΟΜΕΝΟ ΒΗΜΑ</p><h2>Ας βρούμε τη δική σου διαδρομή.</h2><p>Μίλησέ μας ή πέρασε από τη σχολή στην Παλλήνη.</p></div><div class="cta-actions"><a class="button button-yellow" href="${phone}">${icon("phone")}210 666 6589</a><a class="text-link" href="contact.html">Πού θα μας βρεις ${arrow}</a></div></div></div></section>`;
}
function card(item, kind = "licence") {
  const url = kind === "licence" ? licenceFile(item.key) : serviceFile(item.key);
  return `<a class="route-card" href="${url}"><div class="route-card-top">${vehicle(item.icon)}<span class="category-tag">${item.code}</span></div><h3>${item.label}</h3><p>${item.summary}</p><span class="card-bottom">Δες περισσότερα <span class="round-arrow">${arrow}</span></span></a>`;
}
function licenceIndex() {
  return innerHero({
    label:"Διπλώματα οδήγησης", title:"Κάθε αφετηρία.<br><span>Η δική σου διαδρομή.</span>",
    intro:"Αυτοκίνητο, μοτοσυκλέτα ή επαγγελματική οδήγηση. Γνώρισε τις κατηγορίες και διάλεξε το επόμενο βήμα σου.", photo:"classroom",
    action:`<a class="button" href="#categories">Βρες την κατηγορία σου ${arrow}</a>`
  }) + `<div class="category-jumps"><nav class="container" aria-label="Ομάδες διπλωμάτων">${groups.map(g=>`<a href="#${g.id}">${g.title}</a>`).join("")}</nav></div>
  <div id="categories">${groups.map(g=>`<section id="${g.id}" class="section category-section"><div class="container"><div class="listing-heading"><div><p class="eyebrow">ΔΙΠΛΩΜΑΤΑ ΟΔΗΓΗΣΗΣ</p><h2>${g.title}</h2></div><p>${g.description}</p></div><div class="route-grid">${g.keys.map(key=>card(findLicence(key))).join("")}</div></div></section>`).join("")}</div>`+contactStrip();
}
function detail(item, kind) {
  const isLicence = kind === "licence";
  const isCategory = isLicence && !["doctors","pei"].includes(item.key);
  const parent = isLicence ? ["diplomata.html","Διπλώματα"] : ["services.html","Υπηρεσίες"];
  const entries = isLicence ? licences : services;
  const related = item.related.map(key=>entries.find(entry=>entry.key===key));
  const sources = isCategory ? `<a href="${govCategories}" target="_blank" rel="noopener noreferrer">Πληροφορίες κατηγοριών στο gov.gr <span aria-hidden="true">↗</span></a>` :
    item.key==="copy" ? `<a href="https://www.gov.gr/ipiresies/polites-kai-kathemerinoteta/metakineseis/antigrapho-adeias-odegeses-logo-klopes-apoleias" target="_blank" rel="noopener noreferrer">Αντίγραφο λόγω απώλειας / κλοπής στο gov.gr ↗</a><a href="https://www.gov.gr/ipiresies/polites-kai-kathemerinoteta/metakineseis/antigrapho-adeias-odegeses-logo-phthoras" target="_blank" rel="noopener noreferrer">Αντίγραφο λόγω φθοράς στο gov.gr ↗</a>` :
    ["replacement","renewal"].includes(item.key) ? `<a href="https://auto.gov.gr/" target="_blank" rel="noopener noreferrer">Επίσημες ψηφιακές υπηρεσίες οδήγησης ↗</a>` : "";
  return innerHero({...item, code:isCategory?item.code:undefined,parent}) + `
  <section class="section detail-section" id="information"><div class="container article-layout">
    <aside class="article-aside"><nav class="page-contents" aria-label="Σε αυτή τη σελίδα"><p class="eyebrow">ΣΕ ΑΥΤΗ ΤΗ ΣΕΛΙΔΑ</p>${item.blocks.map(([heading],i)=>`<a href="#part-${i+1}"><span>0${i+1}</span>${heading}</a>`).join("")}<a href="#preparation"><span>04</span>Πριν μιλήσουμε</a></nav>
      <div class="aside-contact"><p>Έχεις απορίες;</p><a href="${phone}">210 666 6589</a><span>Μια συζήτηση είναι η αρχή.</span></div>
    </aside>
    <div class="article-body">${item.blocks.map(([heading,text],i)=>`<section class="detail-block" id="part-${i+1}"><span class="block-index">0${i+1}</span><div><h2>${heading}</h2><p>${text}</p>${i===1&&isCategory?'<a class="text-link" href="test-driver.html">Γνώρισε το Test Driver '+arrow+'</a>':""}</div></section>`).join("")}
      <section class="preparation-box" id="preparation"><p class="eyebrow">ΜΙΑ ΚΑΛΗ ΑΦΕΤΗΡΙΑ</p><h2>Πριν μιλήσουμε, σκέψου…</h2><ul>${item.focus.map(text=>`<li>${icon("check")}<span>${text}</span></li>`).join("")}</ul><a class="text-link" href="${phone}">Συζήτησε τη δική σου περίπτωση ${arrow}</a></section>
      <div class="information-note"><p>Οι προϋποθέσεις, τα δικαιολογητικά και το κόστος εξαρτώνται από την περίπτωση. Επιβεβαίωσέ τα με τη σχολή ή την αρμόδια υπηρεσία πριν ξεκινήσεις.</p>${sources}</div>
    </div>
  </div></section>
  <section class="section related-section"><div class="container"><div class="section-heading"><p class="eyebrow">ΣΥΝΕΧΙΣΕ ΤΗΝ ΠΕΡΙΗΓΗΣΗ</p><h2>${isLicence?"Δες και αυτές τις διαδρομές.":"Μπορεί να σε ενδιαφέρουν."}</h2></div><div class="route-grid">${related.map(entry=>card(entry,kind)).join("")}</div></div></section>`+contactStrip();
}
function servicesIndex() {
  return innerHero({label:"Υπηρεσίες", title:"Και μετά<br><span>το πρώτο δίπλωμα.</span>", intro:"Ανανέωση, αντικατάσταση, αντίγραφο και ειδικές περιπτώσεις. Βρες τη διαδικασία που σε αφορά και ενημερώσου για τα επόμενα βήματα.",photo:"reception",action:`<a class="button" href="#information">Δες τις υπηρεσίες ${arrow}</a>`})+
    `<section class="section" id="information"><div class="container service-directory">${services.map(item=>`<a class="service-row" href="${serviceFile(item.key)}"><span class="service-number">${item.code}</span><div><h2>${item.label}</h2><p>${item.summary}</p></div><span class="round-arrow">${arrow}</span></a>`).join("")}</div></section>
    <section class="section journey"><div class="container"><p class="eyebrow">ΜΕ ΚΑΘΑΡΗ ΕΙΚΟΝΑ</p><h2>Πριν ξεκινήσεις μια διαδικασία.</h2><ol class="steps"><li><span class="step-number">01</span><h3>Πες μας τι χρειάζεσαι</h3><p>Ποια άδεια έχεις και ποια αλλαγή θέλεις να κάνεις;</p></li><li><span class="step-number">02</span><h3>Ζήτησε τη σωστή λίστα</h3><p>Ενημερώσου για τα ισχύοντα δικαιολογητικά και τα παράβολα.</p></li><li><span class="step-number">03</span><h3>Οργάνωσε τα βήματα</h3><p>Διευκρίνισε υποβολή, επιμέρους έξοδα και τρόπο παραλαβής.</p></li></ol></div></section>`+contactStrip();
}
function school() {
  return innerHero({label:"Η σχολή",title:"Η καλή οδήγηση<br><span>ξεκινά από τη γνώση.</span>",intro:"Γνώρισε τη Σχολή Οδηγών Καραμπίνης στην Παλλήνη. Έναν χώρο για να κάνεις ερωτήσεις, να κατανοήσεις τη θεωρία και να οργανώσεις το επόμενο βήμα σου.",photo:"classroom",action:`<a class="button" href="#gallery">Γνώρισε τον χώρο ${arrow}</a><a class="text-link" href="contact.html">Έλα να μας γνωρίσεις</a>`})+
    `<section class="section"><div class="container school-story"><div><p class="eyebrow">Η ΦΙΛΟΣΟΦΙΑ ΜΑΣ</p><h2>Η εκπαίδευση<br>έχει ουσία.</h2></div><div><p class="lead">Στόχος της σχολής είναι η διαμόρφωση ενός σωστά εκπαιδευμένου οδηγού.</p><p>Η κατανόηση των κανόνων και η εφαρμογή τους στον δρόμο είναι δύο μέρη της ίδιας διαδρομής. Η θεωρητική εκπαίδευση έχει τον δικό της χώρο, με υπολογιστές, προβολέα και εκπαιδευτικό υλικό.</p><p>Πέρασε από τη σχολή για να συζητήσεις την κατηγορία που σε ενδιαφέρει, τη διαδικασία και το πρόγραμμα εκπαίδευσης.</p><a class="text-link" href="diplomata.html">Δες τις κατηγορίες διπλωμάτων ${arrow}</a></div></div></section>
    <section class="section gallery-section" id="gallery"><div class="container"><div class="listing-heading"><div><p class="eyebrow">ΜΙΑ ΜΑΤΙΑ ΑΠΟ ΚΟΝΤΑ</p><h2>Ο χώρος της σχολής.</h2></div><p>Φωτογραφίες από την υποδοχή, την αίθουσα και το εκπαιδευτικό υλικό της σχολής.</p></div><div class="school-gallery">${[
      ["classroom","Ο χώρος της θεωρίας"],["school-exterior","Στην καρδιά της Παλλήνης"],["reception","Η πρώτη μας συνάντηση"],["training-engine","Η μηχανική, στην πράξη"],["lounge","Ο χώρος αναμονής"],["road-class","Η κυκλοφορία, στην αίθουσα"]
    ].map(([name,caption])=>`<figure>${photo(name)}<figcaption>${caption}</figcaption></figure>`).join("")}</div></div></section>
    <section class="section"><div class="container school-grid"><div class="school-visual">${photo("school-front",false,"engine-image")}</div><div class="school-copy"><p class="eyebrow">ΠΑΛΛΗΝΗ</p><h2>Η αρχή γίνεται<br>με μια συνάντηση.</h2><p class="lead">Εθνικής Αντιστάσεως 8 & Φειδιππίδου.</p><p>Επικοινώνησε για το ωράριο επίσκεψης και έλα να γνωρίσεις τον χώρο. Θα συζητήσεις τις επιλογές σου πριν αποφασίσεις.</p><a class="button" href="contact.html">Στοιχεία επικοινωνίας ${arrow}</a></div></div></section>`+contactStrip();
}
function testDriver() {
  return innerHero({label:"Test Driver",title:"Η θεωρία θέλει<br><span>και εξάσκηση.</span>",intro:"Κάνε μια επανάληψη στα σήματα και στις ερωτήσεις οδήγησης. Γνώρισε την εξωτερική πλατφόρμα Test Driver που προτείνει η σχολή.",photo:"classroom",action:`<a class="button" href="https://testdriver.gr/" target="_blank" rel="noopener noreferrer">Άνοιγμα Test Driver <span aria-hidden="true">↗</span></a><span class="external-note">Εξωτερική πλατφόρμα · νέα καρτέλα</span>`})+
    `<section class="section" id="information"><div class="container"><div class="section-heading"><p class="eyebrow">ΠΡΙΝ ΑΠΟ ΤΗΝ ΕΞΕΤΑΣΗ</p><h2>Από την επανάληψη<br>στην κατανόηση.</h2></div><div class="learning-grid"><article><span class="step-number">01</span><h3>Επίλεξε κατηγορία</h3><p>Στην πλατφόρμα, επίλεξε το είδος οχήματος που αντιστοιχεί στην προετοιμασία σου.</p></article><article><span class="step-number">02</span><h3>Δοκίμασε τις γνώσεις σου</h3><p>Χρησιμοποίησε τα διαθέσιμα τεστ για επανάληψη σε ερωτήσεις και σήματα.</p></article><article><span class="step-number">03</span><h3>Κράτησε τις απορίες σου</h3><p>Σημείωσε όσα σε δυσκολεύουν και συζήτησέ τα στο μάθημα θεωρίας.</p></article></div></div></section>
    <section class="section practice-section"><div class="container school-grid"><figure>${photo("road-signs")}<figcaption class="photo-caption">Εκπαιδευτική προβολή σημάτων στην αίθουσα της σχολής.</figcaption></figure><div class="school-copy"><p class="eyebrow">Η ΓΝΩΣΗ ΠΡΙΝ ΑΠΟ ΤΗΝ ΑΠΑΝΤΗΣΗ</p><h2>Μάθε το «γιατί»<br>πίσω από κάθε κανόνα.</h2><p class="lead">Ένα τεστ είναι αφορμή για καλύτερη κατανόηση.</p><p>Η εξάσκηση συμπληρώνει το μάθημα. Για την ισχύουσα εξεταστέα ύλη και τη διαδικασία των εξετάσεων, ενημερώσου από τη σχολή.</p><a class="text-link" href="https://testdriver.gr/" target="_blank" rel="noopener noreferrer">Μετάβαση στο testdriver.gr ↗</a><p class="resource-note">Η πλατφόρμα λειτουργεί ανεξάρτητα από αυτή την ιστοσελίδα. Το περιεχόμενο και οι όροι χρήσης της παρέχονται από τον διαχειριστή της.</p></div></div></section>`+contactStrip();
}
function contact() {
  return innerHero({label:"Επικοινωνία",title:"Η επόμενη διαδρομή<br><span>ξεκινά με μια συζήτηση.</span>",intro:"Μίλησέ μας για το δίπλωμα ή τη διαδικασία που σε ενδιαφέρει. Θα μας βρεις στην Παλλήνη, στη γωνία Εθνικής Αντιστάσεως και Φειδιππίδου.",photo:"school-exterior",action:`<a class="button" href="${phone}">${icon("phone")}210 666 6589</a><a class="text-link" href="${maps}" target="_blank" rel="noopener noreferrer">Οδηγίες πρόσβασης ↗</a>`})+
    `<section class="section" id="information"><div class="container contact-details-grid">
      <article class="contact-detail">${icon("phone")}<p class="eyebrow">ΤΗΛΕΦΩΝΟ</p><h2><a href="${phone}">210 666 6589</a></h2><p>Για κατηγορίες, πρόγραμμα μαθημάτων και πληροφορίες δικαιολογητικών.</p><a class="text-link" href="${phone}">Κάλεσε τη σχολή ${arrow}</a></article>
      <article class="contact-detail">${icon("pin")}<p class="eyebrow">ΔΙΕΥΘΥΝΣΗ</p><h2>Στην Παλλήνη.</h2><address>Εθνικής Αντιστάσεως 8 & Φειδιππίδου<br>Παλλήνη, 15351</address><a class="text-link" href="${maps}" target="_blank" rel="noopener noreferrer">Άνοιγμα στο Google Maps ↗</a></article>
      <article class="contact-detail">${icon("check")}<p class="eyebrow">ΠΡΙΝ ΤΗΝ ΕΠΙΣΚΕΨΗ</p><h2>Έλα να γνωριστούμε.</h2><p>Τηλεφώνησε για να επιβεβαιώσεις το ωράριο και να οργανώσεις την επίσκεψή σου.</p><a class="text-link" href="school.html">Γνώρισε τον χώρο ${arrow}</a></article>
    </div></section>
    <section class="section visit-section"><div class="container visit-grid"><figure>${photo("school-front")}<figcaption>Η πρόσοψη της σχολής στην Εθνικής Αντιστάσεως.</figcaption></figure><div><p class="eyebrow">ΠΡΟΕΤΟΙΜΑΣΕ ΤΗ ΣΥΖΗΤΗΣΗ ΜΑΣ</p><h2>Πες μας<br>από πού ξεκινάς.</h2><ul class="visit-checklist"><li>${icon("check")}Το δίπλωμα ή την υπηρεσία που σε ενδιαφέρει.</li><li>${icon("check")}Την κατηγορία άδειας που ήδη έχεις, αν υπάρχει.</li><li>${icon("check")}Τη διαθεσιμότητά σου και τις απορίες σου.</li></ul><a class="button" href="${maps}" target="_blank" rel="noopener noreferrer">Βρες τη διαδρομή σου ↗</a></div></div></section>`;
}
const pages = [
  ["index.html","Το επόμενο βήμα σου, στον δρόμο","Σχολή Οδηγών Καραμπίνης στην Παλλήνη. Αυτοκίνητο, μοτοσυκλέτα, επαγγελματικά διπλώματα και υπηρεσίες αδειών οδήγησης.",home],
  ["school.html","Η σχολή","Γνώρισε τη φιλοσοφία, την αίθουσα και τον χώρο της Σχολής Οδηγών Καραμπίνης στην Παλλήνη.",school()],
  ["diplomata.html","Διπλώματα οδήγησης","Βρες την κατηγορία σου: αυτοκίνητο, μοτοσυκλέτα, φορτηγό, λεωφορείο, επεκτάσεις και ΠΕΙ.",licenceIndex()],
  ["services.html","Υπηρεσίες διπλωμάτων","Ανανέωση, αντικατάσταση, αντίγραφο άδειας, οδήγηση για άτομα με αναπηρία και ειδική άδεια ταξί.",servicesIndex()],
  ["test-driver.html","Test Driver","Εξάσκηση στη θεωρία οδήγησης και στα σήματα μέσω της εξωτερικής πλατφόρμας Test Driver.",testDriver()],
  ["contact.html","Επικοινωνία","Σχολή Οδηγών Καραμπίνης · Εθνικής Αντιστάσεως 8 & Φειδιππίδου, Παλλήνη · 210 666 6589.",contact()],
  ...licences.map(item=>[licenceFile(item.key),item.label,item.intro,detail(item,"licence")]),
  ...services.map(item=>[serviceFile(item.key),item.label,item.intro,detail(item,"service")])
];
for (const [file,title,description,main] of pages) {
  await writeFile(`site/${file}`,page(file,title,description,main),"utf8");
}
console.log(`Generated ${pages.length} Greek pages with shared navigation and footer.`);
