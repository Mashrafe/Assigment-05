
const services = [
  { id:"nat-emergency", img:"images/emergency.png", nameBn:"জাতীয় জরুরি সেবা", nameEn:"National Emergency Service", number:"999", category:"সার্বজনীন" },
  { id:"police",        img:"images/police.png",    nameBn:"পুলিশ",            nameEn:"Police",                     number:"999", category:"পুলিশ" },
  { id:"fire",          img:"images/fire-service.png", nameBn:"ফায়ার সার্ভিস", nameEn:"Fire Service",               number:"999", category:"ফায়ার" },
  { id:"ambulance",     img:"images/ambulance.png", nameBn:"অ্যাম্বুলেন্স",    nameEn:"Ambulance",                  number:"1994-999999", category:"স্বাস্থ্য" },
  { id:"women",         img:"images/woman-children.png", nameBn:"নারী ও শিশু সহায়তা", nameEn:"Women & Child Helpline", number:"109",  category:"সহায়তা" },
  { id:"anti",          img:"images/Dudok.png",     nameBn:"দুদক",             nameEn:"Anti-Corruption",            number:"106",  category:"সরকারি" },
  { id:"electric",      img:"images/electricity.png", nameBn:"বিদ্যুৎ বিভ্রাট", nameEn:"Electricity Outage",         number:"16216", category:"বিদ্যুৎ" },
  { id:"brac",          img:"images/brac.png",      nameBn:"ব্র্যাক",           nameEn:"Brac",                       number:"16445", category:"এনজিও" },
  { id:"rail",          img:"images/Bangladesh-Railway.png", nameBn:"বাংলাদেশ রেলওয়ে", nameEn:"Bangladesh Railway", number:"163",   category:"পরিবহন" }
];

let likes = 0, coins = 100, copies = 0;

const grid         = document.getElementById("cardGrid");
const heartCountEl = document.getElementById("heartCount");
const coinCountEl  = document.getElementById("coinCount");
const copyCountEl  = document.getElementById("copyCount");
const historyList  = document.getElementById("historyList");
const clearBtn     = document.getElementById("clearHistory");


function renderCards(){
  grid.innerHTML = services.map(s => `
    <article class="card" data-id="${s.id}">
      <div class="card-head">
        <img class="icon-img" src="${s.img}" alt="${s.nameEn}">
        <button class="heart" title="Like"><i class="fa-regular fa-heart"></i></button>
      </div>

      <div class="card-body">
        <h3 class="name-bn">${s.nameBn}</h3>
        <p class="name-en">${s.nameEn}</p>
        <div class="number">${s.number}</div>
        <span class="badge">${s.category}</span>
      </div>

      <div class="card-actions">
        <button class="btn btn-copy"><i class="fa-regular fa-copy"></i> Copy</button>
        <button class="btn btn-call"><i class="fa-solid fa-phone"></i> Call</button>
      </div>
    </article>
  `).join("");
}
renderCards();

const nowTime = () =>
  new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true });

function addHistory(item){
  const li = document.createElement('li');
  li.className = 'history-item';
  li.innerHTML = `
    <div class="meta">
      <strong style="font-family: var(--bn-font)">${item.nameBn}</strong>
      <span>${item.number}</span>
    </div>
    <div class="when">${nowTime()}</div>
  `;
  historyList.prepend(li);
}

function syncPills(){
  heartCountEl.textContent = likes;
  coinCountEl.textContent  = coins;
  copyCountEl.textContent  = copies;
}
syncPills();


function ensureTopAlertLayer(){
  if(!document.querySelector('.top-alert-layer')){
    const layer = document.createElement('div');
    layer.className = 'top-alert-layer';
    layer.innerHTML = `
      <div class="top-alert" role="alertdialog" aria-live="polite" aria-modal="false">
        <div class="ta-title"></div>
        <div class="ta-row">
          <span class="ta-icon"></span>   <!-- no default emoji here -->
          <div class="ta-msg"></div>
        </div>
        <button class="ta-ok" type="button">OK</button>
      </div>
    `;
    document.body.appendChild(layer);
  }
}
ensureTopAlertLayer();


function showHostAlert(icon, html){
  const layer = document.querySelector('.top-alert-layer');
  const box   = layer.querySelector('.top-alert');
  const title = (location.host || 'this site') + ' says';

  layer.querySelector('.ta-title').textContent = title;

  const row    = layer.querySelector('.ta-row');
  const iconEl = layer.querySelector('.ta-icon');
  if (icon && String(icon).trim() !== '') {
    iconEl.textContent = icon;
    row.classList.remove('no-icon');
  } else {
    iconEl.textContent = '';
    row.classList.add('no-icon');   
  }

  const msgEl = layer.querySelector('.ta-msg');
  msgEl.classList.remove('one-line');   
  msgEl.innerHTML = html || '';

  box.classList.add('show');
  layer.querySelector('.ta-ok').onclick = () => box.classList.remove('show');
 
}

function showCallAlert(serviceName, number){

  showHostAlert('📞', `Calling ${serviceName} ${number}…`);
}

function showCopyAlert(label, number){

  showHostAlert('', `Copied ${label} ${number}`);
  document.querySelector('.top-alert .ta-msg')?.classList.add('one-line');
}

function showNoCoinAlert(){

  showHostAlert('❌', 'আপনার পর্যাপ্ত কয়েন নেই। কল করতে কমপক্ষে ২০ কয়েন লাগবে।');
  document.querySelector('.top-alert-layer .ta-msg')?.classList.add('one-line');
}

function syncHistoryHeight(){
  const cards = document.querySelector('.cards');
  const history = document.querySelector('.history');
  if (!cards || !history) return;
  const h = Math.round(cards.getBoundingClientRect().height);
  history.style.height = h + 'px';
}
window.addEventListener('load',  syncHistoryHeight);
window.addEventListener('resize', syncHistoryHeight);

grid.addEventListener('click', async (e) => {
  const card = e.target.closest('.card'); if(!card) return;
  const svc = services.find(s => s.id === card.dataset.id); if(!svc) return;

  if(e.target.closest('.heart')){
    likes++; syncPills(); return;
  }

if (e.target.closest('.btn-copy')) {
  try {
    await navigator.clipboard.writeText(svc.number);
    copies++; 
    syncPills();

    showHostAlert('', `নম্বর কপি হয়েছে: ${svc.number}`);
    document.querySelector('.top-alert .ta-msg')?.classList.add('one-line');
  } catch {
    showHostAlert('', 'ক্লিপবোর্ড অনুমতি নেই');
  }
  return;
}

  if(e.target.closest('.btn-call')){
    if(coins < 20){
      showNoCoinAlert();   
    }
    coins -= 20; syncPills();
    addHistory(svc); syncHistoryHeight();
    showCallAlert(svc.nameEn, svc.number);
  }
});

clearBtn.addEventListener('click', () => {
  historyList.innerHTML = '';
  syncHistoryHeight();
});
