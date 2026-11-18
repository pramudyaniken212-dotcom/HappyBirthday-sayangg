// === AREA EDIT DATA PACAR ===
// (PIN gembok ada di main.py, bagian "AREA EDIT PIN GEMBOK")
const CONFIG = {
  herName: "Sayang",                 // nama panggilan pacar
  myName:  "Aku",                    // nama pengirim
  hint:    "Petunjuk: tanggal & bulan pertama kali kita jadian (DDMM).",
  greeting:"Selamat ulang tahun, cintaku",
  subtitle:"Hari ini semesta merayakanmu",
  intro:   "Aku menyiapkan tempat wajah-wajah yang aku sayang. Siap membukanya?",
  photos: [                          // 15 foto + caption
    {src:"assets/zuraa (2).jpeg",  caption:"Dia cintaku ♥"},
    {src:"assets/zuraa (3).jpeg",  caption:"Senyummu favoritku"},
    {src:"assets/zuraa (4).jpeg",  caption:"Pacar aku"},
    {src:"assets/zuraa (5).jpeg",  caption:"Kamu"},
    {src:"assets/zuraa (9).jpeg",  caption:"Sayang aku"},
    {src:"assets/zuraa (6).jpeg",  caption:"My mine"},
    {src:"assets/zuraa (10).jpeg",  caption:"My bini aku"},
    {src:"assets/zuraa (12).jpeg",  caption:"Rawrrr"},
    {src:"assets/zuraa (13).jpeg",  caption:"Cantikk amayyy"},
    {src:"assets/zuraa (15).jpeg", caption:"Emangg bowlehh"},
    {src:"assets/zuraa (18).jpeg", caption:"Imut kiyut"},
    {src:"assets/zuraa (21).jpeg", caption:"Lucu banget pacal acuu"},
    {src:"assets/zuraa.jpeg", caption:"Mwahh"},
    {src:"assets/zuraa (11).jpeg", caption:"Semoga selalu menjadi tempat aku kembali"},
    {src:"assets/zuraa (7).jpeg", caption:"I love you"}
    
  ],
  letterTitle: "Untuk kamu, yang paling kusayang",
  letter: `Selamat ulang tahun, sayang. Terima kasih sudah mau menerima aku dengan segala kekurangan aku. Semoga sayang menjadi pribadi yang semakin kuat.

Sayangg, hal-hal biasa jadi istimewa. Jangan pernah merasa sendiri ya sayang, ada aku dan teman-teman kamu yang terus selalu ada buat kamu dan semoga keinginan aku juga bisa bener-bener memelukmu suatu saat nanti.

Di umur barumu, semoga semua doamu terkabul, langkahmu selalu dimudahkan, dan bahagia selalu menemukanmu. Aku akan terus ada di sampingmu.

Aku sayang kamu, hari ini dan seterusnya.`,

// MINI GAMES
gameQuestions: [
  {
    question: "Kapan pertama kali kita jadian?",
    options: ["14 Oktober", "10 Oktober", "14 November"],
    answer: 0,
    success: "Yay! Kamu masih ingat tanggal spesial kita ♥"
  },
  {
    question: "Apa kegiatan yang paling kita suka lakukan bersama?",
    options: ["Jalan-jalan", "Makan bersama", "Semua benar ♥"],
    answer: 2,
    success: "Benar! Semoga kita bisa melakukannya terus."
  }
],

surprises: [
  {
    title: "Surprise pertama ♥",
    message: "Semoga hari-harimu selalu dipenuhi kebahagiaan."
  },
  {
    title: "Surprise kedua ♥",
    message: "Aku berharap bisa membuat lebih banyak kenangan bersamamu."
  },
  {
    title: "Surprise ketiga ♥",
    message: "Hadiah terbaikku adalah bisa terus menemanimu."
  }
],

// BUCKET LIST
bucketList: [
  "Bisa beneran ketemu suatu saat nanti",
  "Jalan-jalan berdua",
  "Nonton bioskop berdua",
  "Mencoba makanan baru",
  "Mengunjungi kota impian",
  "Foto bersama di photobooth",
  "Merayakan ulang tahun bersama lagi"
],

  // Pop-up foto: true = tampilkan caption di bawah foto, false = hanya foto
  showPopupCaption: false,

  // PENUTUP (di akhir Slide 5)
  finalPhoto: "assets/zuraa (8).jpeg",           // foto pacar
  finalTitle: "Aku sayang kamu ♥",
  finalText:  "Terima kasih sudah hadir yang berawal dari ketidak sengajaan ini. Selamat ulang tahun, cintaku."
};
// === AKHIR AREA EDIT ===

const $ = id => document.getElementById(id);
window.finalStart = 0; // dipakai main.py untuk animasi hati penutup
const bgm = $('bg-music'), music = $('music');

/* dipanggil oleh main.py saat Python siap */
window.onPythonReady = () => { $('loader').classList.add('done'); $('start').disabled = false; };
setTimeout(() => { $('loader').classList.add('done'); $('start').disabled = false; }, 20000); // cadangan

$('t1').textContent = CONFIG.greeting;
$('t1b').textContent = CONFIG.subtitle + ", " + CONFIG.herName;
$('t1c').textContent = CONFIG.intro;
$('hint').textContent = CONFIG.hint;
$('lt').textContent = CONFIG.letterTitle;
$('lsig').textContent = "Dengan cinta, " + CONFIG.myName + " ♥";

let currentSlide = 1;

function go(n) {
  if (n < 1 || n > 7) return;

  currentSlide = n;

  document.querySelectorAll('.slide').forEach(s => {
    s.classList.toggle('active', s.id === 's' + n);
  });

  if (n === 5) renderMiniGame();
  if (n === 6) renderBucketList();
  if (n === 7) startLetter();
}

/* musik */
function setMusicUI(){ music.classList.toggle('playing', !bgm.paused); music.textContent = bgm.paused ? '♪' : '❚❚'; }
music.onclick = () => { bgm.paused ? bgm.play().catch(()=>{}) : bgm.pause(); };
bgm.onplay = bgm.onpause = setMusicUI;
$('start').onclick = () => { bgm.play().catch(()=>{}); music.classList.add('on'); go(2); };

/* slide 2: validasi PIN oleh Python (window.pyCheckPin dari main.py) */
const lock = $('lock');
function tryUnlock(){
  if (!window.pyCheckPin){ $('msg').textContent = 'Python belum siap, tunggu sebentar ya.'; return; }
  if (window.pyCheckPin($('pin').value)){
    lock.classList.add('open'); $('msg').textContent = 'Gembok terbuka! ♥';
    $('unlock').disabled = true; $('pin').disabled = true;
    setTimeout(() => $('next2').classList.remove('hidden'), 900);
  } else {
    lock.classList.remove('shake'); void lock.offsetWidth; lock.classList.add('shake');
    $('msg').textContent = 'Belum tepat, coba lagi ya.';
  }
}
$('unlock').onclick = tryUnlock;
$('pin').onkeydown = e => { if (e.key === 'Enter') tryUnlock(); };
$('next2').onclick = () => go(3);

/* slide 3: kue & lilin */
let done = false;
for (let i = 0; i < 5; i++){
  const c = document.createElement('div'); c.className = 'candle'; c.innerHTML = '<i></i>';
  c.onclick = () => { c.classList.add('out'); check(); };
  $('candles').appendChild(c);
}
function check(){
  if (!done && !document.querySelector('.candle:not(.out)')){
    done = true; confetti(); setTimeout(() => $('next3').classList.remove('hidden'), 900);
  }
}
function blowAll(){ document.querySelectorAll('.candle').forEach((c,i) => setTimeout(() => c.classList.add('out'), i*150)); setTimeout(check, 900); }
$('mic').onclick = async () => {
  try{
    const st = await navigator.mediaDevices.getUserMedia({audio:true});
    const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser();
    ac.createMediaStreamSource(st).connect(an);
    const d = new Uint8Array(an.fftSize); let hits = 0;
    $('mic').textContent = '🎤 Ayo tiup sekarang…';
    (function tick(){
      an.getByteTimeDomainData(d); let m = 0; for (const v of d) m = Math.max(m, Math.abs(v - 128));
      hits = m > 70 ? hits + 1 : 0;
      if (hits > 4){ st.getTracks().forEach(t => t.stop()); ac.close(); $('mic').classList.add('hidden'); blowAll(); return; }
      requestAnimationFrame(tick);
    })();
  } catch(e){ $('mic').textContent = 'Mikrofon tidak tersedia, ketuk apinya saja'; }
};
$('next3').onclick = () => go(4);

function confetti(){
  const cv = $('confetti'), x = cv.getContext('2d'); cv.width = innerWidth; cv.height = innerHeight;
  const cols = ['#ff1744','#ffd6e0','#d4a24c','#fff4e6','#ff8fab'];
  const ps = Array.from({length:160}, () => ({x:Math.random()*cv.width, y:-20-Math.random()*cv.height*.5, vx:Math.random()*2-1, vy:2+Math.random()*4, s:5+Math.random()*7, r:Math.random()*6, c:cols[Math.random()*5|0]}));
  let f = 0;
  (function t(){
    x.clearRect(0,0,cv.width,cv.height);
    ps.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.r+=.1; x.save(); x.translate(p.x,p.y); x.rotate(p.r); x.fillStyle=p.c; x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2); x.restore(); });
    if (++f < 260) requestAnimationFrame(t); else x.clearRect(0,0,cv.width,cv.height);
  })();
}

/* slide 4: galeri + modal */
const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#ffb3c6"/><text x="200" y="170" font-size="90" text-anchor="middle" fill="#fff">♥</text></svg>');
CONFIG.photos.forEach((p, i) => {
  const d = document.createElement('div'); d.className = 'pol'; d.style.setProperty('--r', ((i % 5) - 2) * 1.6 + 'deg');
  const im = new Image(); im.className = 'ph'; im.alt = p.caption; im.loading = 'lazy'; im.src = p.src;
  im.onerror = () => { im.onerror = null; im.src = PLACEHOLDER; p.bad = true; };
  const s = document.createElement('small'); s.textContent = p.caption;
  d.append(im, s);
  d.onclick = () => { $('mimg').src = p.bad ? PLACEHOLDER : p.src; $('mcap').textContent = p.caption; $('modal').classList.add('show'); };
  $('grid').appendChild(d);
});
$('mcap').style.display = CONFIG.showPopupCaption ? '' : 'none';
$('modal').onclick = e => { if (e.target.id !== 'mimg') $('modal').classList.remove('show'); };
$('next4').onclick = () => go(5);

/* slide 5: surat + hati melayang */
let started = false;
function startLetter(){
  if (started) return; started = true;
  setInterval(() => {
    const h = document.createElement('span'); h.textContent = ['♥','❤','💗'][Math.random()*3|0];
    h.style.left = Math.random()*100 + '%'; h.style.fontSize = 12 + Math.random()*26 + 'px';
    h.style.color = Math.random() > .5 ? '#ff1744' : '#ffd6e0'; h.style.animationDuration = 5 + Math.random()*5 + 's';
    $('floaters').appendChild(h); setTimeout(() => h.remove(), 10000);
  }, 350);
  const paras = CONFIG.letter.split(/\n\s*\n/); let pi = 0;
  (function nextP(){
    if (pi >= paras.length) { showFinal(); return; }
    const p = document.createElement('p'); p.className = 'cursor'; $('lbody').appendChild(p);
    const txt = paras[pi++].trim(); let i = 0;
    (function ty(){ p.textContent = txt.slice(0, ++i); if (i < txt.length) setTimeout(ty, 30); else { p.classList.remove('cursor'); setTimeout(nextP, 500); } })();
  })();
}

function showFinal(){
  $('finalPhoto').src = CONFIG.finalPhoto;
  $('finalPhoto').onerror = function(){ this.onerror = null; this.src = PLACEHOLDER; };
  $('finalTitle').textContent = CONFIG.finalTitle;
  $('finalText').textContent = CONFIG.finalText;
  $('final').classList.remove('hidden');
  window.finalStart = performance.now();
  setTimeout(() => $('final').scrollIntoView({behavior:'smooth', block:'center'}), 200);
}

/* ==================================
   SLIDE 5: MINI GAMES
================================== */

let gameIndex = 0;
let surpriseOpened = false;

function renderMiniGame(){
  const q = CONFIG.gameQuestions[gameIndex];

  $('gameOptions').innerHTML = '';
  $('gameFeedback').textContent = '';
  $('surpriseArea').innerHTML = '';
  $('next5').classList.add('hidden');

  // Jika semua pertanyaan sudah selesai
  if (gameIndex >= CONFIG.gameQuestions.length){
    showSurprises();
    return;
  }

  $('gameProgress').textContent =
    `Pertanyaan ${gameIndex + 1} dari ${CONFIG.gameQuestions.length}`;

  $('gameQuestion').textContent = q.question;

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'game-option';
    btn.textContent = option;

    btn.onclick = () => {
      if (index === q.answer){
        $('gameFeedback').textContent = q.success;
        $('gameFeedback').style.color = '#16834a';

        document.querySelectorAll('.game-option')
          .forEach(b => b.disabled = true);

        setTimeout(() => {
          gameIndex++;
          renderMiniGame();
        }, 1200);

      } else {
        $('gameFeedback').textContent =
          'Belum tepat, coba pilih lagi ya ♥';

        $('gameFeedback').style.color = '#d62855';
      }
    };

    $('gameOptions').appendChild(btn);
  });
}


/* PILIH AMPLOP KEJUTAN */

function showSurprises(){
  $('gameProgress').textContent = 'Bonus Surprise ♥';
  $('gameQuestion').textContent =
    'Pilih satu amplop kejutan untukmu!';

  $('gameOptions').innerHTML = '';
  $('gameFeedback').textContent = '';

  if (surpriseOpened) return;

  CONFIG.surprises.forEach((item, index) => {
    const btn = document.createElement('button');

    btn.className = 'surprise-option';
    btn.textContent = '💌';

    btn.onclick = () => {
      $('surpriseArea').innerHTML = '';

      const title = document.createElement('h3');
      title.textContent = item.title;

      const message = document.createElement('p');
      message.textContent = item.message;
      message.className = 'surprise-message';

      $('surpriseArea').append(title, message);

      surpriseOpened = true;
      $('gameFeedback').textContent =
        'Kamu berhasil menyelesaikan semua permainan! ♥';

      $('next5').classList.remove('hidden');

      document.querySelectorAll('.surprise-option')
        .forEach(b => b.disabled = true);
    };

    $('gameOptions').appendChild(btn);
  });
}

$('next5').onclick = () => go(6);


/* ==================================
   SLIDE 6: BUCKET LIST
================================== */

const bucketKey = 'ourBirthdayBucketList';

function renderBucketList(){

  let completed = [];

  try {
    completed = JSON.parse(
      localStorage.getItem(bucketKey) || '[]'
    );

    if (!Array.isArray(completed)) completed = [];
  } catch(e) {
    completed = [];
  }

  const container = $('bucketItems');
  container.innerHTML = '';

  CONFIG.bucketList.forEach((item, index) => {

    const label = document.createElement('label');
    label.className = 'bucket-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed.includes(index);

    const span = document.createElement('span');
    span.textContent = item;

    checkbox.onchange = () => {

      if (checkbox.checked){
        if (!completed.includes(index)){
          completed.push(index);
        }
      } else {
        completed = completed.filter(i => i !== index);
      }

      try {
        localStorage.setItem(
          bucketKey,
          JSON.stringify(completed)
        );
      } catch(e) {}

      updateBucketProgress();
    };

    label.append(checkbox, span);
    container.appendChild(label);
  });

  updateBucketProgress();

  function updateBucketProgress(){
    $('bucketProgress').textContent =
      `${completed.length} dari ${CONFIG.bucketList.length} impian tercapai ♥`;
  }
}

$('next6').onclick = () => go(7);