"use client";
import { useState, useEffect } from "react";
import Script from "next/script";

const PIXEL_ID = "1640258307311235";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
:root{--blue:#1a3a6b;--blue-light:#e8f0fe;--gold:#d4a03c;--gold-soft:#fdf6e3;--green:#16a34a;--green-soft:#dcfce7;--red:#dc2626;--dark:#111;--text:#3a3a3a;--muted:#888;--light:#f8f7f5;--white:#fff;--font:'Inter',sans-serif}
body{font-family:var(--font);color:var(--text);background:var(--white);-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}
a{text-decoration:none;color:inherit}
img{max-width:100%;display:block}
.c{max-width:680px;margin:0 auto;padding:0 24px}
.sec{padding:56px 24px}
.topbar{background:var(--red);color:#fff;text-align:center;padding:10px 16px;font-size:12px;font-weight:700;letter-spacing:0.02em;position:sticky;top:0;z-index:100}
.topbar span{animation:blink 1.5s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.5}}
.creative{max-width:500px;margin:0 auto 0;background:linear-gradient(135deg,#0f2647 0%,#1a3a6b 50%,#1e4d8f 100%);border-radius:20px;padding:36px 32px;color:#fff;text-align:center;box-shadow:0 16px 48px rgba(26,58,107,0.25)}
.creative__badge{display:inline-block;background:var(--gold);color:var(--blue);padding:5px 16px;border-radius:20px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px}
.creative h2{font-size:24px;font-weight:900;line-height:1.2;margin-bottom:6px;color:#fff}
.creative h2 em{color:var(--gold);font-style:normal}
.creative__sub{font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:20px}
.creative__list{text-align:left;display:flex;flex-direction:column;gap:8px;margin-bottom:24px;padding:0 12px}
.creative__list li{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600}
.creative__list li .ck{width:22px;height:22px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;color:var(--blue)}
.creative__cta{display:inline-block;padding:16px 40px;background:var(--gold);color:var(--blue);border-radius:50px;font-size:15px;font-weight:800;transition:all .3s;box-shadow:0 6px 24px rgba(212,160,60,0.3);cursor:pointer}
.creative__cta:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(212,160,60,0.4)}
.creative__price{margin-bottom:18px;display:flex;align-items:center;justify-content:center;gap:10px}
.creative__price-old{font-size:18px;color:rgba(255,255,255,0.4);text-decoration:line-through;font-weight:600}
.creative__price-now{font-size:38px;font-weight:900;color:var(--gold)}
.creative__price-label{font-size:10px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.05em;font-weight:600}
.creative__note{font-size:10px;color:rgba(255,255,255,0.3);margin-top:10px}
.reassure{max-width:500px;margin:20px auto 0;background:var(--white);border-radius:14px;padding:20px 22px;border-left:4px solid var(--gold);box-shadow:0 4px 16px rgba(0,0,0,0.06)}
.reassure__q{font-size:14px;font-weight:800;color:var(--dark);margin-bottom:6px}
.reassure p{font-size:13px;color:var(--text);line-height:1.65}
.reassure p strong{color:var(--dark)}
.trust-label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;text-align:center;margin-bottom:20px}
.trust-logos{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:24px 32px}
.trust-logo{opacity:0.7;transition:opacity .2s;text-align:center;line-height:1.2}
.trust-logo:hover{opacity:1}
.hero{position:relative;overflow:hidden}
.hero img{width:100%;height:400px;object-fit:cover}
.hero__overlay{position:absolute;inset:0;background:linear-gradient(transparent 20%,rgba(0,0,0,0.75));display:flex;flex-direction:column;justify-content:flex-end;padding:32px 28px;color:#fff}
.hero h1{font-size:clamp(24px,5.5vw,38px);font-weight:900;line-height:1.15;margin-bottom:8px}
.hero h1 em{color:var(--gold);font-style:normal}
.hero p{font-size:15px;color:rgba(255,255,255,0.7);max-width:500px}
h2{font-size:clamp(22px,4.5vw,30px);font-weight:800;color:var(--dark);line-height:1.25;margin-bottom:10px}
h2 em{color:var(--blue);font-style:normal}
.sub{font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:24px}
.problem__cards{display:flex;flex-direction:column;gap:8px}
.problem__card{padding:16px 18px;background:var(--light);border-radius:14px;border-left:3px solid var(--red);font-size:14px;line-height:1.6}
.problem__card strong{color:var(--dark)}
.solution__box{background:linear-gradient(135deg,var(--blue),#1e4d8f);border-radius:20px;padding:32px 28px;color:#fff;text-align:center}
.solution__box h3{font-size:20px;font-weight:800;margin-bottom:6px}
.solution__box p{font-size:14px;color:rgba(255,255,255,0.6);margin-bottom:20px}
.solution__steps{display:flex;flex-direction:column;gap:10px;text-align:left}
.solution__step{display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,0.06);border-radius:12px;padding:14px 16px}
.solution__num{width:32px;height:32px;border-radius:50%;background:var(--gold);color:var(--blue);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0}
.solution__step h4{font-size:14px;font-weight:700;margin-bottom:2px}
.solution__step p{font-size:12px;color:rgba(255,255,255,0.5)}
.benefits__grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:500px){.benefits__grid{grid-template-columns:1fr}}
.benefit{padding:20px;background:var(--light);border-radius:16px;text-align:center}
.benefit__icon{font-size:32px;margin-bottom:8px}
.benefit h4{font-size:14px;font-weight:700;color:var(--dark);margin-bottom:3px}
.benefit p{font-size:12px;color:var(--muted);line-height:1.5}
.job{background:var(--green-soft);border-radius:20px;padding:28px 24px;border:2px solid rgba(22,163,74,0.15)}
.job h3{font-size:18px;font-weight:800;color:var(--green);margin-bottom:14px;text-align:center}
.job__grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
@media(max-width:500px){.job__grid{grid-template-columns:1fr}}
.job__item{display:flex;align-items:center;gap:10px;padding:12px 14px;background:var(--white);border-radius:12px;font-size:13px;font-weight:600;color:var(--dark)}
.job__item span{font-size:20px;flex-shrink:0}
.price-box{text-align:center;background:var(--light);border-radius:20px;padding:32px 24px;border:2px solid var(--blue)}
.price-box .old{font-size:14px;color:var(--muted);text-decoration:line-through}
.price-box .current{font-size:48px;font-weight:900;color:var(--blue)}
.price-box .note{font-size:12px;color:var(--muted);margin-top:6px}
.pay__options{display:flex;flex-direction:column;gap:10px}
.pay__option{padding:18px 20px;background:var(--light);border-radius:14px;border:1px solid #eee}
.pay__option h4{font-size:14px;font-weight:700;color:var(--dark);margin-bottom:4px;display:flex;align-items:center;gap:8px}
.pay__option h4 span{font-size:20px}
.pay__option p{font-size:13px;color:var(--muted);line-height:1.6}
.testi__grid{display:flex;flex-direction:column;gap:10px}
.testi{padding:20px;background:var(--light);border-radius:14px}
.testi__stars{color:var(--gold);font-size:14px;letter-spacing:2px;margin-bottom:6px}
.testi__text{font-size:13px;color:var(--text);line-height:1.65;font-style:italic;margin-bottom:8px}
.testi__author{font-size:12px;font-weight:700;color:var(--dark)}
.testi__info{font-size:10px;color:var(--muted)}
.obj{border-bottom:1px solid #eee;padding:14px 0}
.obj__q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:14px;font-weight:600;color:var(--dark);gap:10px;background:none;border:none;width:100%;text-align:left;font-family:var(--font);padding:0}
.obj__q svg{width:14px;height:14px;stroke:var(--muted);stroke-width:2;fill:none;flex-shrink:0;transition:transform .3s}
.obj.open .obj__q svg{transform:rotate(180deg)}
.obj__a{max-height:0;overflow:hidden;transition:max-height .4s ease}
.obj.open .obj__a{max-height:400px}
.obj__a p{padding-top:10px;font-size:13px;color:var(--muted);line-height:1.7}
.urgency{background:var(--red);color:#fff;padding:20px;border-radius:16px;text-align:center}
.urgency__big{font-size:28px;font-weight:900;margin-bottom:4px}
.urgency p{font-size:13px;color:rgba(255,255,255,0.7)}
.cta-btn{display:block;text-align:center;padding:18px;background:var(--gold);color:var(--blue);border-radius:16px;font-size:16px;font-weight:800;transition:all .3s;box-shadow:0 6px 24px rgba(212,160,60,0.25);max-width:480px;margin:0 auto;position:relative;overflow:hidden;cursor:pointer;border:none;font-family:var(--font)}
.cta-btn::after{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%);animation:shine 4s infinite}
@keyframes shine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
.cta-btn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(212,160,60,0.35)}
.cta-sub{text-align:center;font-size:11px;color:var(--muted);margin-top:8px}
.guarantee{text-align:center;padding:28px;border:2px solid var(--gold);border-radius:16px;background:var(--gold-soft)}
.guarantee__icon{font-size:40px;margin-bottom:8px}
.guarantee h3{font-size:16px;font-weight:800;color:var(--dark);margin-bottom:6px}
.guarantee p{font-size:13px;color:var(--muted);line-height:1.6}
.counter{text-align:center;padding:20px;background:var(--dark);border-radius:16px;color:#fff}
.counter__spots{font-size:48px;font-weight:900;color:var(--gold)}
.counter p{font-size:13px;color:rgba(255,255,255,0.5)}
footer{padding:20px;text-align:center;font-size:10px;color:#ccc;background:var(--dark)}
footer a{color:rgba(255,255,255,0.3)}
.moduli__grid{display:flex;flex-direction:column;gap:12px}
.modulo{display:flex;align-items:center;gap:16px;padding:20px;background:var(--white);border-radius:16px;border:1.5px solid #e8e8e8;transition:all .3s}
.modulo:hover{border-color:var(--blue);box-shadow:0 4px 16px rgba(26,58,107,0.08)}
.modulo__icon{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0}
.modulo__icon--excel{background:#dcfce7;color:#16a34a}
.modulo__icon--calendar{background:#e8f0fe;color:#4285f4}
.modulo__icon--word{background:#e8f0fe;color:#1a3a6b}
.modulo__icon--ppt{background:#fef3c7;color:#d97706}
.modulo h4{font-size:15px;font-weight:700;color:var(--dark);margin-bottom:2px}
.modulo p{font-size:12px;color:var(--muted);line-height:1.5}
.modulo__durata{font-size:11px;font-weight:600;color:var(--blue);background:var(--blue-light);padding:3px 10px;border-radius:20px;white-space:nowrap}
.modulo__content{flex:1}
.cert-box{margin-top:24px;text-align:center;background:var(--gold-soft);border-radius:20px;padding:28px 24px;border:2px solid rgba(212,160,60,0.2)}
.cert-box img{max-width:400px;width:100%;margin:0 auto 16px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.1)}
.cert-box h3{font-size:18px;font-weight:800;color:var(--dark);margin-bottom:6px}
.cert-box p{font-size:13px;color:var(--muted);line-height:1.6}
.assunzione-box{margin-top:20px;background:linear-gradient(135deg,var(--green),#15803d);border-radius:20px;padding:28px 24px;color:#fff;text-align:center}
.assunzione-box .ass-icon{font-size:48px;margin-bottom:10px}
.assunzione-box h3{font-size:22px;font-weight:900;margin-bottom:6px}
.assunzione-box p{font-size:14px;color:rgba(255,255,255,0.7);line-height:1.6}
.whatsapp-float{position:fixed!important;bottom:24px!important;right:24px!important;width:60px!important;height:60px!important;background:#25d366!important;border-radius:50%!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 4px 16px rgba(37,211,102,0.4)!important;z-index:999999!important;transition:all .3s}
.whatsapp-float:hover{transform:scale(1.1)}
.whatsapp-float svg{width:32px;height:32px;fill:#fff!important}
.form-candidatura{max-width:520px;margin:0 auto}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.form-group{margin-bottom:14px}
.form-group label{display:block;font-size:12px;font-weight:600;color:var(--dark);margin-bottom:5px}
.form-group input,.form-group select{width:100%;padding:12px 14px;border:1.5px solid #e0e0e0;border-radius:10px;font-size:14px;font-family:var(--font);background:var(--white);transition:border-color .2s;-webkit-appearance:none;appearance:none}
.form-group input:focus,.form-group select:focus{outline:none;border-color:var(--blue)}
.form-group input::placeholder{color:#bbb}
.pay-choice{display:flex;flex-direction:column;gap:8px}
.pay-radio{cursor:pointer}
.pay-radio input{display:none}
.pay-radio__box{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1.5px solid #e0e0e0;border-radius:12px;transition:all .2s;background:var(--white)}
.pay-radio--checked .pay-radio__box{border-color:var(--blue);background:var(--blue-light);box-shadow:0 2px 8px rgba(26,58,107,0.08)}
.pay-radio__icon{font-size:24px;flex-shrink:0}
.pay-radio__box strong{font-size:14px;color:var(--dark);display:block}
.pay-radio__box small{font-size:11px;color:var(--muted);line-height:1.4}
@media(max-width:500px){.form-row{grid-template-columns:1fr}}
@media(max-width:600px){
  .sec{padding:36px 16px}.c{padding:0 16px}
  .trust-label{font-size:10px;margin-bottom:16px}.trust-logos{gap:16px 24px}
  .topbar{padding:8px 12px;font-size:11px}
  .creative{padding:24px 18px;border-radius:14px;margin:0 -4px}
  .creative__badge{font-size:9px;padding:4px 12px}.creative h2{font-size:20px}
  .creative__sub{font-size:12px;margin-bottom:16px}
  .creative__list{padding:0 4px;gap:6px;margin-bottom:18px}
  .creative__list li{font-size:12px;gap:8px}.creative__list li .ck{width:20px;height:20px;font-size:10px}
  .creative__price-old{font-size:16px}.creative__price-now{font-size:32px}
  .creative__cta{padding:14px 32px;font-size:14px;width:100%;text-align:center}
  .creative__note{font-size:9px}
  .hero img{height:240px}.hero__overlay{padding:20px 18px}.hero h1{font-size:22px}.hero p{font-size:13px}
  h2{font-size:22px}.sub{font-size:13px;margin-bottom:18px}
  .problem__cards{gap:6px}.problem__card{padding:14px 14px;font-size:13px;border-radius:12px}
  .solution__box{padding:22px 16px;border-radius:16px}.solution__box h3{font-size:18px}
  .solution__steps{gap:8px}.solution__step{padding:12px 14px;border-radius:10px;gap:12px}
  .solution__num{width:28px;height:28px;font-size:12px}.solution__step h4{font-size:13px}.solution__step p{font-size:11px}
  .job{padding:22px 16px;border-radius:16px}.job h3{font-size:16px;margin-bottom:10px}
  .job__grid{grid-template-columns:1fr;gap:6px}.job__item{font-size:12px;padding:10px 12px;border-radius:10px;gap:8px}.job__item span{font-size:18px}
  .benefits__grid{grid-template-columns:1fr;gap:8px}
  .benefit{padding:16px;border-radius:14px;text-align:left;display:flex;gap:14px;align-items:center}
  .benefit__icon{font-size:28px;margin-bottom:0;flex-shrink:0}.benefit h4{font-size:13px;margin-bottom:2px}.benefit p{font-size:11px}
  .price-box{padding:24px 18px;border-radius:16px}.price-box .old{font-size:13px}.price-box .current{font-size:40px}.price-box .note{font-size:11px}
  .pay__options{gap:8px}.pay__option{padding:16px;border-radius:12px}.pay__option h4{font-size:13px}.pay__option p{font-size:12px}
  .cta-btn{padding:16px;font-size:15px;border-radius:14px}.cta-sub{font-size:10px}
  .testi__grid{gap:8px}.testi{padding:16px;border-radius:12px}.testi__stars{font-size:13px}.testi__text{font-size:12px;margin-bottom:6px}.testi__author{font-size:11px}.testi__info{font-size:9px}
  .obj{padding:12px 0}.obj__q{font-size:13px}.obj__a p{font-size:12px;padding-top:8px}
  .urgency{padding:18px 16px;border-radius:14px}.urgency__big{font-size:24px}.urgency p{font-size:12px}
  .counter{padding:16px;border-radius:14px}.counter__spots{font-size:36px}.counter p{font-size:12px}
  .guarantee{padding:22px 18px;border-radius:14px}.guarantee__icon{font-size:34px}.guarantee h3{font-size:15px}.guarantee p{font-size:12px}
  .form-group input,.form-group select{padding:11px 12px;font-size:13px;border-radius:8px}
  .pay-radio__box{padding:12px 14px;border-radius:10px}.pay-radio__box strong{font-size:13px}.pay-radio__box small{font-size:10px}.pay-radio__icon{font-size:20px}
  footer{padding:16px;font-size:9px}
  .modulo{padding:16px;gap:12px}.modulo__icon{width:48px;height:48px;font-size:24px;border-radius:12px}.modulo h4{font-size:14px}.modulo p{font-size:11px}
  .cert-box{padding:20px 16px}.cert-box img{max-width:300px}.assunzione-box{padding:22px 18px}.assunzione-box h3{font-size:20px}
  .whatsapp-float{bottom:20px!important;right:16px!important;width:56px!important;height:56px!important}.whatsapp-float svg{width:28px;height:28px}
}
@media(max-width:600px){.obj__q{min-height:44px;padding:4px 0}.cta-btn{min-height:52px;display:flex;align-items:center;justify-content:center}.creative__cta{min-height:48px;display:flex;align-items:center;justify-content:center}}
@media(max-width:380px){.creative{padding:20px 14px}.creative h2{font-size:18px}.creative__list li{font-size:11px}.creative__cta{padding:12px 24px;font-size:13px}.hero img{height:200px}.hero h1{font-size:20px}h2{font-size:20px}.price-box .current{font-size:36px}.solution__box{padding:18px 14px}.job{padding:18px 12px}}
`;

const BASE = "https://aliceblue-dragonfly-326952.hostingersite.com";

const FAQS = [
  { q: "E' una cosa seria? Non e' una truffa?", a: "Assolutamente si. Siamo un ente di formazione che collabora direttamente con aziende italiane che hanno bisogno di segretarie formate. Le aziende non hanno tempo per formare internamente, quindi si affidano a noi. Il nostro interesse e' formarti bene perche la nostra reputazione dipende dalla qualita delle persone che inseriamo." },
  { q: "Perche devo pagare 89 euro per lavorare?", a: "Gli 89 euro coprono il costo della formazione — il corso, il materiale, il portale e il supporto. Non paghi per il lavoro, paghi per la formazione che ti rende qualificata. Pensala cosi: investi 89 euro e dal primo mese guadagni 1.500 euro. Si ripaga in meno di 2 giorni di lavoro." },
  { q: "Il corso e' difficile?", a: "No. E' pensato per chiunque, anche senza esperienza. I moduli sono chiari, semplici, passo dopo passo. Il test finale verifica che hai appreso le competenze base. Il 95% delle partecipanti lo supera al primo tentativo." },
  { q: "Quando inizio a lavorare?", a: "Dipende da quanto velocemente completi il corso. In media le nostre allieve completano la formazione in 1-2 settimane. Dopo aver superato il test, l'inserimento lavorativo avviene entro pochi giorni." },
  { q: "Posso pagare alla consegna?", a: "Si. Se non puoi fare il bonifico, ti inviamo il materiale cartaceo a casa tramite corriere. All'interno trovi le credenziali per accedere al corso online. Paghi al corriere alla consegna." },
  { q: "E se non supero il test?", a: "Puoi ripeterlo. Il test e' progettato per verificare le competenze base, non per bocciare. Ti diamo tutto il supporto necessario per superarlo con successo." },
];

const PROVINCE = [
  ["AG","Agrigento"],["AL","Alessandria"],["AN","Ancona"],["AO","Aosta"],["AR","Arezzo"],["AP","Ascoli Piceno"],["AT","Asti"],["AV","Avellino"],
  ["BA","Bari"],["BT","Barletta-Andria-Trani"],["BL","Belluno"],["BN","Benevento"],["BG","Bergamo"],["BI","Biella"],["BO","Bologna"],["BZ","Bolzano"],["BS","Brescia"],["BR","Brindisi"],
  ["CA","Cagliari"],["CL","Caltanissetta"],["CB","Campobasso"],["CE","Caserta"],["CT","Catania"],["CZ","Catanzaro"],["CH","Chieti"],["CO","Como"],["CS","Cosenza"],["CR","Cremona"],["KR","Crotone"],["CN","Cuneo"],
  ["EN","Enna"],
  ["FM","Fermo"],["FE","Ferrara"],["FI","Firenze"],["FG","Foggia"],["FC","Forli-Cesena"],["FR","Frosinone"],
  ["GE","Genova"],["GO","Gorizia"],["GR","Grosseto"],
  ["IM","Imperia"],["IS","Isernia"],
  ["SP","La Spezia"],["AQ","L'Aquila"],["LT","Latina"],["LE","Lecce"],["LC","Lecco"],["LI","Livorno"],["LO","Lodi"],["LU","Lucca"],
  ["MC","Macerata"],["MN","Mantova"],["MS","Massa-Carrara"],["MT","Matera"],["ME","Messina"],["MI","Milano"],["MO","Modena"],["MB","Monza e Brianza"],
  ["NA","Napoli"],["NO","Novara"],["NU","Nuoro"],
  ["OR","Oristano"],
  ["PD","Padova"],["PA","Palermo"],["PR","Parma"],["PV","Pavia"],["PG","Perugia"],["PU","Pesaro e Urbino"],["PE","Pescara"],["PC","Piacenza"],["PI","Pisa"],["PT","Pistoia"],["PN","Pordenone"],["PZ","Potenza"],["PO","Prato"],
  ["RG","Ragusa"],["RA","Ravenna"],["RC","Reggio Calabria"],["RE","Reggio Emilia"],["RI","Rieti"],["RN","Rimini"],["RM","Roma"],["RO","Rovigo"],
  ["SA","Salerno"],["SS","Sassari"],["SV","Savona"],["SI","Siena"],["SR","Siracusa"],["SO","Sondrio"],["SU","Sud Sardegna"],
  ["TA","Taranto"],["TE","Teramo"],["TR","Terni"],["TO","Torino"],["TP","Trapani"],["TN","Trento"],["TV","Treviso"],["TS","Trieste"],
  ["UD","Udine"],
  ["VA","Varese"],["VE","Venezia"],["VB","Verbano-Cusio-Ossola"],["VC","Vercelli"],["VR","Verona"],["VV","Vibo Valentia"],["VI","Vicenza"],["VT","Viterbo"],
];

export default function FunnelSegretarie({ projectId }: { projectId: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [payment, setPayment] = useState<"bonifico" | "contrassegno">("contrassegno");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spots, setSpots] = useState(7);

  useEffect(() => {
    const t = setInterval(() => {
      setSpots(n => n > 2 ? n - 1 : n);
    }, 45000);
    return () => clearInterval(t);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, project_id: projectId }),
      });
      // Facebook Pixel — Purchase event
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Purchase", { value: 89.00, currency: "EUR" });
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Meta Pixel */}
      <Script id="fb-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');
        fbq('track','PageView');
      `}</Script>
      <noscript><img height="1" width="1" style={{display:"none"}} src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} /></noscript>

      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <div className="page-wrap">

        {/* TOPBAR */}
        <div className="topbar"><span>Le candidature chiudono domani — Solo 10 posti disponibili</span></div>

        {/* CREATIVE CARD */}
        <section className="sec" style={{ background: "var(--light)", paddingBottom: "32px" }}>
          <div className="creative">
            <div className="creative__badge">Posti limitati</div>
            <h2>Corso Segretaria + <em>Inserimento Lavorativo</em></h2>
            <div className="creative__sub">Formati con noi, lavora da casa. Le aziende ti aspettano.</div>
            <ul className="creative__list">
              {["Smartworking da casa","4 ore al giorno, dal lunedi al venerdi","1.500€ al mese","Contratto a tempo indeterminato","13ª e 14ª mensilita","2 settimane ferie estive + 2 invernali","Corso online + test finale"].map(item => (
                <li key={item}><span className="ck">✓</span> {item}</li>
              ))}
            </ul>
            <div className="creative__price">
              <span className="creative__price-old">€297</span>
              <span className="creative__price-now">€89</span>
              <span className="creative__price-label">offerta limitata</span>
            </div>
            <a onClick={() => scrollTo("iscriviti")} className="creative__cta">Candidati ora — 10 posti rimasti</a>
            <div className="creative__note">Le aziende hanno gia fatto richiesta di personale</div>
          </div>
          <div className="reassure">
            <div className="reassure__q">Perche devo pagare 89€ per lavorare?</div>
            <p>Gli 89€ coprono il costo della formazione — il corso, il materiale, il portale e il supporto. <strong>Non paghi per il lavoro</strong>, paghi per la formazione che ti rende qualificata. Pensala cosi: investi 89€ e dal primo mese guadagni 1.500€. <strong>Si ripaga in meno di 2 giorni di lavoro.</strong></p>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="sec" style={{ background: "var(--white)", padding: "32px 24px" }}>
          <div className="c">
            <div className="trust-label">Siamo partner delle piu importanti agenzie per il lavoro</div>
            <div className="trust-logos">
              <div className="trust-logo" style={{ color: "#db0028", fontFamily: "'Georgia',serif", fontStyle: "italic", fontWeight: 700, fontSize: "22px" }}>Adecco</div>
              <div className="trust-logo" style={{ color: "#00a0df", fontWeight: 800, fontSize: "16px", letterSpacing: "-0.02em" }}><span style={{ color: "#ff6600" }}>▌</span><span style={{ color: "#999" }}>▌</span><span style={{ color: "#ccc" }}>▌</span> Manpower</div>
              <div className="trust-logo" style={{ fontWeight: 900, fontSize: "20px" }}><span style={{ color: "#003087" }}>Randstad</span></div>
              <div className="trust-logo" style={{ color: "#00875a", fontWeight: 900, fontSize: "24px", fontFamily: "'Georgia',serif" }}>Kelly</div>
              <div className="trust-logo" style={{ color: "#1a3a6b", fontWeight: 700, fontSize: "15px", letterSpacing: "0.05em" }}>EUROINTERIM<br /><span style={{ fontSize: "8px", color: "#888", fontWeight: 400, letterSpacing: "0.02em" }}>Agenzia per il Lavoro</span></div>
              <div className="trust-logo" style={{ color: "#0066cc", fontWeight: 700, fontSize: "17px" }}>jobtech</div>
              <div className="trust-logo" style={{ fontWeight: 900, fontSize: "18px" }}><span style={{ color: "#1a237e" }}>M</span><span style={{ color: "#ff9800" }}>A</span><span style={{ color: "#1a237e" }}>W</span><br /><span style={{ fontSize: "7px", color: "#888", fontWeight: 400 }}>awesome people, great results</span></div>
            </div>
          </div>
        </section>

        {/* MODULI */}
        <section className="sec" style={{ background: "var(--light)" }}>
          <div className="c">
            <h2>Cosa comprende il <em>corso</em></h2>
            <p className="sub">4 moduli semplici da 1 ora ciascuno. Tutto quello che ti serve per essere operativa dal primo giorno.</p>
            <div className="moduli__grid">
              {[
                { icon: "📊", cls: "modulo__icon--excel", title: "Modulo 1 — Excel", desc: "Impari a creare tabelle, formule base, grafici e a gestire dati. Lo strumento piu richiesto dalle aziende." },
                { icon: "📅", cls: "modulo__icon--calendar", title: "Modulo 2 — Google Calendar", desc: "Gestisci appuntamenti, riunioni e scadenze. Organizzazione perfetta per il lavoro in smartworking." },
                { icon: "📄", cls: "modulo__icon--word", title: "Modulo 3 — Word", desc: "Crea documenti professionali, lettere, report e verbali. La base di ogni segretaria." },
                { icon: "📚", cls: "modulo__icon--ppt", title: "Modulo 4 — PowerPoint", desc: "Prepara presentazioni efficaci per riunioni e meeting aziendali. Slide chiare e professionali." },
              ].map(m => (
                <div className="modulo" key={m.title}>
                  <div className={`modulo__icon ${m.cls}`}>{m.icon}</div>
                  <div className="modulo__content"><h4>{m.title}</h4><p>{m.desc}</p></div>
                  <span className="modulo__durata">1 ora</span>
                </div>
              ))}
            </div>
            <div className="cert-box">
              <img src={`${BASE}/img/certificato.jpg`} alt="Certificato di Completamento" />
              <h3>Certificato di Completamento</h3>
              <p>Al termine dei 4 moduli e dopo aver superato il test finale, riceverai il <strong>Certificato di Completamento</strong> che attesta le tue competenze. Questo certificato e' il tuo biglietto da visita per le aziende.</p>
            </div>
            <div className="assunzione-box">
              <div className="ass-icon">🎯</div>
              <h3>Il passaggio piu importante: ti assumiamo</h3>
              <p>Una volta ottenuto il certificato, non ti lasciamo sola. <strong>Ti mettiamo direttamente in contatto con le aziende</strong> che hanno gia fatto richiesta di personale. Il tuo nuovo lavoro da casa inizia qui.</p>
            </div>
          </div>
        </section>

        {/* HERO IMAGE */}
        <section className="hero">
          <img src={`${BASE}/img/hero.png`} alt="Lavora da casa come segretaria" />
          <div className="hero__overlay">
            <h1>Diventa segretaria e lavora <em>da casa</em> con contratto fisso</h1>
            <p>Ti formiamo, superi il test e ti inseriamo direttamente in azienda. Nessuna esperienza richiesta.</p>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="sec" style={{ background: "var(--white)" }}>
          <div className="c">
            <h2>Ti riconosci in <em>questa situazione?</em></h2>
            <p className="sub">Ogni giorno migliaia di persone cercano un lavoro stabile senza trovarlo.</p>
            <div className="problem__cards">
              <div className="problem__card"><strong>Invii decine di CV</strong> ma nessuno ti risponde. Sembra di parlare al muro.</div>
              <div className="problem__card"><strong>I lavori che trovi pagano poco</strong>, hanno orari impossibili e nessuna garanzia.</div>
              <div className="problem__card"><strong>Vorresti lavorare da casa</strong> ma non sai come iniziare e hai paura delle truffe online.</div>
              <div className="problem__card"><strong>Non hai un diploma specifico</strong> o esperienze precedenti, e pensi di non avere possibilita.</div>
              <div className="problem__card"><strong>Hai bisogno di stabilita</strong> — un contratto vero, uno stipendio fisso, la certezza del domani.</div>
            </div>
          </div>
        </section>

        {/* SOLUZIONE */}
        <section className="sec" style={{ background: "var(--light)" }}>
          <div className="c">
            <h2>Ecco la soluzione che stavi <em>cercando</em></h2>
            <p className="sub">Le aziende hanno bisogno di segretarie formate. Non hanno tempo per formarle internamente. Per questo si appoggiano a noi.</p>
            <div className="solution__box">
              <h3>Come funziona</h3>
              <p>3 semplici passi per iniziare a lavorare da casa</p>
              <div className="solution__steps">
                <div className="solution__step"><div className="solution__num">1</div><div><h4>Ti iscrivi al corso</h4><p>Paghi 89€, ricevi subito l'accesso al portale e inizi la formazione online.</p></div></div>
                <div className="solution__step"><div className="solution__num">2</div><div><h4>Completi il corso e superi il test</h4><p>Impari tutto quello che serve per lavorare come segretaria. Al termine, un test finale verifica le tue competenze.</p></div></div>
                <div className="solution__step"><div className="solution__num">3</div><div><h4>Ti inseriamo in azienda</h4><p>Dopo il test, ti mettiamo in contatto diretto con le aziende che hanno gia fatto richiesta di personale. Inizi a lavorare.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* JOB */}
        <section className="sec" style={{ background: "var(--white)" }}>
          <div className="c">
            <h2>Il lavoro che ti aspetta</h2>
            <p className="sub">Ecco cosa offrono le aziende che collaborano con noi.</p>
            <div className="job">
              <h3>Segretaria in Smartworking</h3>
              <div className="job__grid">
                {[["🏠","Lavoro da casa in smartworking"],["⏰","Solo 4 ore al giorno"],["💰","1.500€ al mese"],["📝","Contratto a tempo indeterminato"],["📅","Lunedi — Venerdi"],["🎁","13ª e 14ª mensilita"],["☀️","2 settimane ferie estive"],["❄️","2 settimane ferie invernali"]].map(([icon, text]) => (
                  <div className="job__item" key={text}><span>{icon}</span> {text}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className="sec" style={{ background: "var(--light)", padding: "48px 24px" }} id="iscriviti">
          <div className="c">
            <h2 style={{ textAlign: "center" }}>Invia la tua <em>candidatura</em></h2>
            <p className="sub" style={{ textAlign: "center" }}>Compila il modulo e ti contatteremo entro 24 ore.</p>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px", background: "var(--green-soft)", borderRadius: "20px", border: "2px solid rgba(22,163,74,0.2)" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--green)", marginBottom: "8px" }}>Candidatura ricevuta!</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px" }}>Ti contatteremo entro 24 ore. Tieni il telefono a portata di mano.</p>
              </div>
            ) : (
              <form className="form-candidatura" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group"><label>Nome *</label><input type="text" name="nome" required placeholder="Il tuo nome" /></div>
                  <div className="form-group"><label>Cognome *</label><input type="text" name="cognome" required placeholder="Il tuo cognome" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Telefono *</label><input type="tel" name="telefono" required placeholder="Es. 333 1234567" /></div>
                  <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="La tua email (opzionale)" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Citta *</label><input type="text" name="citta" required placeholder="La tua citta" /></div>
                  <div className="form-group">
                    <label>Provincia *</label>
                    <select name="provincia" required defaultValue="">
                      <option value="" disabled>Seleziona...</option>
                      {PROVINCE.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group"><label>Via e Numero Civico *</label><input type="text" name="indirizzo" required placeholder="Es. Via Roma 15" /></div>
                <div className="form-row">
                  <div className="form-group"><label>CAP *</label><input type="text" name="cap" required placeholder="Es. 00100" maxLength={5} /></div>
                  <div className="form-group"><label>Scala / Interno</label><input type="text" name="scala" placeholder="Es. Scala B, Int. 3" /></div>
                </div>
                <div className="form-group">
                  <label>Come preferisci pagare? *</label>
                  <div className="pay-choice">
                    <label className={`pay-radio ${payment === "bonifico" ? "pay-radio--checked" : ""}`} onClick={() => setPayment("bonifico")}>
                      <input type="radio" name="metodo_pagamento" value="bonifico" readOnly checked={payment === "bonifico"} />
                      <div className="pay-radio__box">
                        <span className="pay-radio__icon">🏦</span>
                        <div><strong>Bonifico Bancario</strong><small>Paghi subito e ricevi accesso immediato al corso via email</small></div>
                      </div>
                    </label>
                    <label className={`pay-radio ${payment === "contrassegno" ? "pay-radio--checked" : ""}`} onClick={() => setPayment("contrassegno")}>
                      <input type="radio" name="metodo_pagamento" value="contrassegno" readOnly checked={payment === "contrassegno"} />
                      <div className="pay-radio__box">
                        <span className="pay-radio__icon">📦</span>
                        <div><strong>Pagamento alla Consegna</strong><small>Ricevi il materiale a casa e paghi 89€ al corriere</small></div>
                      </div>
                    </label>
                  </div>
                </div>
                <button type="submit" className="cta-btn" style={{ width: "100%" }} disabled={loading}>
                  {loading ? "Invio in corso…" : "Invia Candidatura — Solo 10 posti"}
                </button>
                <div className="cta-sub">Candidature aperte fino a domani · Ti contattiamo entro 24h</div>
              </form>
            )}
          </div>
        </section>

        {/* BENEFICI */}
        <section className="sec" style={{ background: "var(--white)" }}>
          <div className="c">
            <h2>Perche scegliere <em>questo percorso</em></h2>
            <div className="benefits__grid">
              {[["🎓","Formazione completa","Impari tutto online, con i tuoi tempi, dal tuo divano."],["💼","Inserimento garantito","Dopo il test, le aziende sono gia pronte ad assumerti."],["🏠","Lavori da casa","Niente spostamenti, niente traffico. Solo tu e il tuo computer."],["💰","Stipendio fisso","1.500 euro al mese con contratto indeterminato e mensilita extra."],["⏰","Solo 4 ore","Lavori mezza giornata e ti godi il resto della vita."],["🔒","Zero rischi","89 euro di investimento per un lavoro stabile. Si ripaga dal primo stipendio."]].map(([icon, title, desc]) => (
                <div className="benefit" key={title as string}><div className="benefit__icon">{icon}</div><h4>{title}</h4><p>{desc}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* SMARTWORK IMAGE */}
        <section className="sec" style={{ background: "var(--light)", textAlign: "center", padding: "40px 24px" }}>
          <img src={`${BASE}/img/smartwork.png`} alt="Smartworking" style={{ maxWidth: "600px", width: "100%", margin: "0 auto", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }} />
          <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "16px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>Il tuo nuovo ufficio: casa tua. Niente sveglie alle 6, niente traffico, niente capi sul collo. Solo tu, il tuo computer e 4 ore di lavoro tranquillo.</p>
        </section>

        {/* PREZZO */}
        <section className="sec" style={{ background: "var(--white)" }} id="pagamento">
          <div className="c">
            <h2 style={{ textAlign: "center" }}>Quanto costa?</h2>
            <p className="sub" style={{ textAlign: "center" }}>Meno di una cena fuori. Per un lavoro che ti cambia la vita.</p>
            <div className="price-box">
              <div className="old">Valore reale: €297</div>
              <div className="current">€89</div>
              <div className="note">Pagamento unico · Accesso immediato · Inserimento lavorativo incluso</div>
            </div>
          </div>
        </section>

        {/* METODI PAGAMENTO */}
        <section className="sec" style={{ background: "var(--light)" }}>
          <div className="c">
            <h2>Come pagare</h2>
            <p className="sub">Due opzioni semplici e sicure. Scegli quella piu comoda per te.</p>
            <div className="pay__options">
              <div className="pay__option"><h4><span>🏦</span> Bonifico bancario</h4><p>Effettui il bonifico e ricevi <strong>immediatamente via email</strong> le credenziali per accedere al portale del corso. Inizi subito la formazione.</p></div>
              <div className="pay__option"><h4><span>📦</span> Pagamento alla consegna</h4><p>Pensato per chi non puo fare il bonifico. Un <strong>corriere consegnera a casa tua</strong> il materiale cartaceo del corso. All'interno troverai le <strong>credenziali per accedere al portale online</strong> e iniziare la formazione. Paghi comodamente al corriere alla consegna.</p></div>
            </div>
          </div>
        </section>

        {/* CTA 2 */}
        <section className="sec" style={{ background: "var(--white)", padding: "36px 24px" }}>
          <a onClick={() => scrollTo("iscriviti")} className="cta-btn">Iscriviti adesso — Posti quasi esauriti</a>
          <div className="cta-sub">89€ · Compila il modulo · Ti contattiamo entro 24h</div>
        </section>

        {/* TESTIMONIAL */}
        <section className="sec" style={{ background: "var(--light)" }}>
          <div className="c">
            <h2>Chi l'ha fatto prima di te</h2>
            <p className="sub">Centinaia di persone hanno gia cambiato vita con questo percorso.</p>
            <div className="testi__grid">
              <div className="testi"><div className="testi__stars">★★★★★</div><p className="testi__text">"Ero scettica, lo ammetto. 89 euro per un corso online? Ma dopo 2 settimane avevo gia il mio contratto. Ora lavoro da casa 4 ore al giorno e finalmente ho uno stipendio fisso. Non ci credo ancora."</p><div className="testi__author">Valentina M.</div><div className="testi__info">32 anni, Roma — assunta in 15 giorni</div></div>
              <div className="testi"><div className="testi__stars">★★★★★</div><p className="testi__text">"Dopo 2 anni di lavoretti precari, questo corso mi ha dato quello che cercavo: stabilita. Contratto indeterminato, 1.500 euro al mese, lavoro dal divano. I miei figli mi vedono a casa ogni pomeriggio."</p><div className="testi__author">Sara T.</div><div className="testi__info">41 anni, Milano — mamma di 2</div></div>
              <div className="testi"><div className="testi__stars">★★★★★</div><p className="testi__text">"Non avevo esperienza come segretaria. Il corso ti insegna tutto da zero. Dopo il test mi hanno chiamata il giorno dopo. Adesso lavoro per uno studio commercialista senza muovermi da casa."</p><div className="testi__author">Giulia R.</div><div className="testi__info">27 anni, Napoli — prima esperienza</div></div>
            </div>
            <div style={{ marginTop: "16px" }}><img src={`${BASE}/img/testimonial.png`} alt="Le nostre segretarie" style={{ borderRadius: "14px", maxWidth: "100%" }} /></div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec" style={{ background: "var(--white)" }}>
          <div className="c">
            <h2>Domande frequenti</h2>
            {FAQS.map((faq, i) => (
              <div key={i} className={`obj ${openFaq === i ? "open" : ""}`}>
                <button className="obj__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div className="obj__a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* URGENCY */}
        <section className="sec" style={{ background: "var(--light)" }}>
          <div className="c">
            <div className="urgency">
              <div className="urgency__big">Solo 10 posti</div>
              <p>Le aziende hanno gia fatto richiesta di 10 segretarie. Quando i posti finiscono, le candidature si chiudono. Non riapriamo finche non ci saranno nuove richieste.</p>
            </div>
            <div style={{ marginTop: "16px" }}>
              <div className="counter">
                <div className="counter__spots">{spots}</div>
                <p>posti ancora disponibili su 10</p>
              </div>
            </div>
          </div>
        </section>

        {/* GARANZIA */}
        <section className="sec" style={{ background: "var(--white)" }}>
          <div className="c">
            <div className="guarantee">
              <div className="guarantee__icon">💪</div>
              <h3>La nostra garanzia</h3>
              <p>Se completi il corso, superi il test e per qualsiasi motivo non ti inseriamo in azienda, <strong>ti rimborsiamo ogni centesimo</strong>. Il rischio e' zero. La promessa e' concreta: ti formiamo e ti facciamo lavorare.</p>
            </div>
          </div>
        </section>

        {/* CTA FINALE */}
        <section className="sec" style={{ background: "var(--dark)", padding: "56px 24px", textAlign: "center", color: "#fff" }}>
          <div className="c">
            <h2 style={{ color: "#fff", marginBottom: "8px" }}>Non aspettare che i posti finiscano.</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", marginBottom: "24px", maxWidth: "440px", marginLeft: "auto", marginRight: "auto" }}>89 euro oggi. 1.500 euro al mese da domani. Il lavoro stabile che hai sempre cercato e' a un click di distanza.</p>
            <a onClick={() => scrollTo("pagamento")} className="cta-btn" style={{ boxShadow: "0 8px 32px rgba(212,160,60,0.35)" }}>Candidati ora — Ultimi posti disponibili</a>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", marginTop: "20px" }}>
              {["Corso online completo","Inserimento lavorativo garantito","Contratto a tempo indeterminato","1.500€/mese da casa","Solo 89€ di investimento"].map(t => (
                <span key={t} style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>✓ {t}</span>
              ))}
            </div>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.15)", marginTop: "16px" }}>Le candidature chiudono domani. Le aziende non aspettano.</p>
          </div>
        </section>

        <footer>
          <a href="#">Privacy Policy</a> · <a href="#">Termini e Condizioni</a>
        </footer>
      </div>

      {/* WHATSAPP */}
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 999999, width: "60px", height: "60px" }}>
        <a href="https://wa.me/393343828321?text=Ciao%2C%20sono%20interessata%20al%20corso%20per%20segretaria.%20Vorrei%20maggiori%20informazioni!" target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "60px", height: "60px", background: "#25d366", borderRadius: "50%", textAlign: "center", lineHeight: "60px", boxShadow: "0 4px 16px rgba(37,211,102,0.4)" }}>
          <svg style={{ width: "32px", height: "32px", verticalAlign: "middle", fill: "#fff" }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.129 6.742 3.047 9.379L1.054 31.25l6.078-1.95a15.906 15.906 0 008.872 2.696C24.826 31.996 32 24.82 32 15.996 32 7.176 24.826 0 16.004 0zm9.342 22.618c-.393 1.107-1.947 2.026-3.188 2.295-.848.18-1.955.324-5.684-1.221-4.773-1.977-7.843-6.822-8.082-7.14-.228-.318-1.923-2.562-1.923-4.887 0-2.326 1.217-3.468 1.65-3.94.393-.43 1.045-.607 1.67-.607.203 0 .384.01.547.019.472.02.709.048 1.021.789.393.928 1.35 3.293 1.469 3.533.12.24.24.556.077.874-.152.328-.285.474-.525.746-.24.272-.468.48-.708.773-.218.26-.464.537-.194.97.27.422 1.199 1.977 2.574 3.203 1.768 1.578 3.257 2.068 3.72 2.296.354.175.776.142 1.057-.152.355-.374.793-.994 1.238-1.605.318-.435.717-.49 1.107-.33.393.153 2.495 1.177 2.924 1.391.43.214.714.322.82.498.104.178.104 1.025-.289 2.133z"></path></svg>
        </a>
      </div>
    </>
  );
}
