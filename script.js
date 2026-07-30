/* =========================================================
   CONFIG — All personal content lives here.
   ========================================================= */
const CONFIG = {
  yourName: "Your Hisband",
  partnerNick: "Biwi",
  partnerName: "Sabiha",
  meetDate: "2024-01-23T00:00:00",
  photoFolder: "assets/img/",
  photoCount: 37,
  videoSrc: "assets/video/us.mp4",
  
  cover: {
    eyebrow: "Happy",
    title: "Girlfriend Day",
    sub: "I couldn't fit everything I feel into words...<br>so I built you a little corner of the internet instead.",
    name: "Biwi ❤️",
    hint: "Tap anywhere to begin"
  },
  
  meetSlide: {
    photo: "m01.jpg",
    date: "WHERE IT ALL STARTED",
    html: "One conversation with you...<br>and somehow every road I could've taken quietly started leading back to <strong>you.</strong>"
  },
  
  quote: {
    photo: "m03.jpg",
    date: "23RD JANUARY, 2024",
    html: "Some people spend years looking for home.<br>I found mine in <strong>you.</strong>"
  },
  
  homeSlide: {
    body: "People say home is a place.<br>I disagree.<br><br>Home slowly became wherever you are.<br>Every laugh. Every call. Every tiny moment.<br>You turned ordinary days into the kind I'll remember forever.",
    tag: "My favourite place has never been on a map. ❤️"
  },
  
  letter: [
    "Dear Biwi,",
    "I've rewritten this a dozen times, and somehow it still feels too small for everything I want to say. So maybe I'll stop trying to find perfect words and just tell you the truth.",
    "Since 23rd January 2024, you've become my favourite part of every single day. Not because life suddenly became perfect, but because you walked into it.",
    "It's the little things that stay with me.",
    "The way you call me 'OYE...' which, by the way, still isn't my name. 😒❤️",
    "The voice notes I replay for absolutely no reason except to hear your laugh one more time.",
    "The calls that are supposed to last for hours but somehow become ten minutes because... PM meeting. 😂",
    "And somehow, even those ten minutes are enough to make the rest of my day better.",
    "You have this incredible way of making ordinary days feel unforgettable. You're the first person I want to tell things to when something happens, and somehow you're always the last thought before I fall asleep. That feeling hasn't faded once. Not for a single day.",
    "So when Girlfriend Day came around, buying flowers or writing a message didn't feel like enough.",
    "I wanted to build you something.",
    "A tiny little corner of the internet that exists for one reason only... to remind you how deeply you are loved.",
    "Every animation. Every photo. Every line. Every little detail.",
    "It's all here because of you.",
    "Because you are, without question, my favourite notification, my safest place, my loudest laugh, my calm after the longest day... and my home.",
    "Happy Girlfriend Day, my Biwi.",
    "Thank you for choosing me.",
    "I promise I'll keep choosing you.",
    "Every single day.",
    "Just us. Forever."
  ],
  
  closing: {
    title: "Happy Girlfriend Day ❤️",
    sub: "No website could ever hold everything I feel for you.<br>But if I had to begin somewhere...<br>I'd begin here.<br><br>Thank you for making life so much more beautiful than I ever imagined.<br><br>I love you. Always."
  },
  
  gallerySlides: [
    { title: "Where forever quietly began" },
    { title: "Every laugh became a memory" },
    { title: "Ordinary moments, extraordinary us" },
    { title: "The little things became everything" },
    { title: "And this is only the beginning" }
  ]
};
/* ========================================================= */

// --- Utilities ---
const pad = n => String(n).padStart(2, '0');
const photoPath = name => CONFIG.photoFolder + name;
const photoByIndex = i => CONFIG.photoFolder + 'm' + pad(i) + '.jpg';
const isDesktop = window.matchMedia('(pointer: fine)').matches;

// --- State ---
let current = 0;
let counterInterval = null;
let typewriterTimeout = null;
let heartTapCount = 0;
let musicStarted = false;

// --- DOM Elements ---
const slidesEl = document.getElementById('slides');
const progressEl = document.getElementById('progress');
const fadeOverlay = document.getElementById('fade-overlay');
const secretOverlay = document.getElementById('secret-overlay');
const audio = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-toggle');

// --- Build Slides ---
function buildSlides() {
  const slides = [];
  
  // 1. Cover
  slides.push({
    type: 'cover',
    render: () => `
      <div class="cover-eyebrow">${CONFIG.cover.eyebrow}</div>
      <div class="cover-title">${CONFIG.cover.title}</div>
      <div class="cover-sub">${CONFIG.cover.sub}</div>
      <div class="cover-name">${CONFIG.cover.name}</div>
      <div class="cover-hint">${CONFIG.cover.hint}</div>
    `
  });

  // 2. Meet
  slides.push({
    type: 'photo',
    render: () => `
      <div class="photo-bg ken-burns" style="background-image:url('${photoPath(CONFIG.meetSlide.photo)}')"></div>
      <div class="photo-content">
        <div class="photo-date">${CONFIG.meetSlide.date}</div>
        <div class="photo-headline">${CONFIG.meetSlide.html}</div>
      </div>
    `
  });

  // 3. Quote
  slides.push({
    type: 'quote',
    render: () => `
      <div class="photo-bg ken-burns" style="background-image:url('${photoPath(CONFIG.quote.photo)}')"></div>
      <div class="photo-content">
        <div class="photo-date">${CONFIG.quote.date}</div>
        <div class="photo-headline">${CONFIG.quote.html}</div>
      </div>
    `
  });

  // 4-8. Galleries
  const total = CONFIG.photoCount;
  const nGal = CONFIG.gallerySlides.length;
  const perGal = Math.ceil(total / nGal);
  for (let g = 0; g < nGal; g++) {
    const start = g * perGal + 1;
    const end = Math.min(start + perGal - 1, total);
    if (start > total) break;
    let imgs = '';
    for (let i = start; i <= end; i++) {
      imgs += `<img src="${photoByIndex(i)}" loading="lazy" alt="us" style="transition-delay: ${0.1 + (i - start) * 0.08}s">`;
    }
    slides.push({
      type: 'gallery',
      render: () => `<div class="gallery-title">${CONFIG.gallerySlides[g].title}</div><div class="gallery-grid">${imgs}</div>`
    });
  }

  // 9. Home (Replaces Joke)
  slides.push({
    type: 'home',
    render: () => `
      <div class="home-icon">🏠</div>
      <div class="home-title">Home is a person.</div>
      <div class="home-body">${CONFIG.homeSlide.body}</div>
      <div class="home-tag">${CONFIG.homeSlide.tag}</div>
    `
  });

  // 10. Counter + Video
  slides.push({
    type: 'counter',
    render: () => `
      <div class="counter-label">us, so far</div>
      <div class="counter-date" id="counter-date-label"></div>
      <div class="counter-numbers" id="counter-numbers"></div>
      <div class="video-wrap"><video src="${CONFIG.videoSrc}" playsinline controls></video></div>
    `,
    onEnter: () => startCounter()
  });

  // 11. Letter
  slides.push({
    type: 'letter',
    render: () => `
      <div class="letter-title">a note for you</div>
      <div class="letter-scroll">
        <div class="letter-content" id="letter-text"></div>
        <div class="letter-sign">${CONFIG.yourName}</div>
      </div>
    `,
    onEnter: () => startTypewriter()
  });

  // 12. Closing
  slides.push({
    type: 'closing',
    render: () => `
      <div class="closing-title">${CONFIG.closing.title}</div>
      <div class="closing-sub">${CONFIG.closing.sub}</div>
      <button class="closing-restart" id="restart-btn">Watch Our Story Again</button>
    `
  });

  return slides;
}

const SLIDES = buildSlides();

// --- Initialization ---
function init() {
  // Render slides
  SLIDES.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = `slide slide-${s.type}`;
    div.dataset.index = i;
    div.innerHTML = s.render();
    slidesEl.appendChild(div);
  });

  // Render progress hearts
  SLIDES.forEach((_, i) => {
    const h = document.createElement('div');
    h.className = 'prog-heart';
    h.innerHTML = `<svg viewBox="0 0 32 29"><path d="M16 28.5S1.5 19.6 1.5 9.9C1.5 4.9 5.4 1 10.3 1c2.9 0 5.5 1.5 7.2 3.8L16 7.3l1.5-2.5C19.2 2.5 21.8 1 24.7 1 29.6 1 33 4.9 33 9.9c0 9.7-14.5 18.6-14.5 18.6" transform="translate(-1)"/></svg>`;
    h.addEventListener('click', () => {
      heartTapCount++;
      if (heartTapCount >= 5) showSecret();
    });
    progressEl.appendChild(h);
  });

  goTo(0, true);
  setupNavigation();
  setupAmbient();
  if (isDesktop) setupCursorHearts();
}

// --- Navigation ---
function setupNavigation() {
  document.getElementById('prev-zone').addEventListener('click', () => nav(-1));
  document.getElementById('next-zone').addEventListener('click', () => nav(1));
  document.getElementById('arrow-prev').addEventListener('click', (e) => { e.stopPropagation(); nav(-1); });
  document.getElementById('arrow-next').addEventListener('click', (e) => { e.stopPropagation(); nav(1); });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nav(1);
    if (e.key === 'ArrowLeft') nav(-1);
  });

  // First tap for music & cover reveal
  const firstTapHandler = () => {
    if (!musicStarted) {
      startMusic();
      musicStarted = true;
      document.getElementById('next-zone').removeEventListener('click', firstTapHandler);
      document.getElementById('prev-zone').removeEventListener('click', firstTapHandler);
      
      // Reveal cover text
      setTimeout(() => {
        document.querySelector('.slide-cover').classList.add('revealed');
      }, 300);
    }
  };
  document.getElementById('next-zone').addEventListener('click', firstTapHandler);
  document.getElementById('prev-zone').addEventListener('click', firstTapHandler);

  // Swipe support
  let touchStartX = null;
  document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) nav(dx < 0 ? 1 : -1);
    touchStartX = null;
  }, { passive: true });
}

function nav(dir) {
  const next = current + dir;
  if (next < 0 || next >= SLIDES.length) return;
  goTo(next);
}

function goTo(i, isInit = false) {
  clearTimeout(typewriterTimeout);
  current = i;
  
  document.querySelectorAll('.slide').forEach((el, idx) => {
    el.classList.toggle('active', idx === i);
  });
  
  document.querySelectorAll('.prog-heart').forEach((el, idx) => {
    el.classList.toggle('done', idx < i);
    el.classList.toggle('current', idx === i);
  });

  const slide = SLIDES[i];
  if (slide && slide.onEnter) {
    // Small delay to let CSS transition start
    setTimeout(slide.onEnter, 400); 
  }

  // Restart button
  if (slide.type === 'closing') {
    const btn = document.getElementById('restart-btn');
    if (btn) btn.onclick = restartStory;
  }

  // Pause video when leaving counter
  document.querySelectorAll('.slide-counter video').forEach(v => {
    if (i !== SLIDES.findIndex(s => s.type === 'counter')) v.pause();
  });
}

// --- Music ---
function startMusic() {
  audio.volume = 0;
  audio.play().then(() => {
    musicBtn.classList.remove('hidden');
    // Fade in over 2.5 seconds
    let vol = 0;
    const fade = setInterval(() => {
      vol += 0.02;
      if (vol >= 0.6) { vol = 0.6; clearInterval(fade); }
      audio.volume = vol;
      if (vol > 0) musicBtn.classList.add('playing');
    }, 50);
  }).catch(() => {
    musicBtn.classList.add('hidden');
  });

  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play(); musicBtn.classList.add('playing');
    } else {
      audio.pause(); musicBtn.classList.remove('playing');
    }
  });

  // Pause on blur, resume on focus
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { audio.pause(); musicBtn.classList.remove('playing'); }
    else { audio.play(); musicBtn.classList.add('playing'); }
  });
}

// --- Counter (Odometer) ---
function startCounter() {
  if (counterInterval) clearInterval(counterInterval);
  const meet = new Date(CONFIG.meetDate);
  const dateLabel = document.getElementById('counter-date-label');
  if (dateLabel) dateLabel.textContent = 'together since ' + meet.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  
  const numsEl = document.getElementById('counter-numbers');
  let prevVals = { d: -1, h: -1, m: -1, s: -1 };

  function render() {
    const now = new Date();
    let diff = Math.max(0, now - meet) / 1000;
    const days = Math.floor(diff / 86400); diff -= days * 86400;
    const hours = Math.floor(diff / 3600); diff -= hours * 3600;
    const mins = Math.floor(diff / 60); diff -= mins * 60;
    const secs = Math.floor(diff);

    const vals = { d: days, h: hours, m: mins, s: secs };
    
    if (numsEl) {
      numsEl.innerHTML = `
        <div class="counter-unit"><div class="num ${prevVals.d !== vals.d ? 'rolling' : ''}">${vals.d}</div><div class="lbl">days</div></div>
        <div class="counter-unit"><div class="num ${prevVals.h !== vals.h ? 'rolling' : ''}">${pad(vals.h)}</div><div class="lbl">hrs</div></div>
        <div class="counter-unit"><div class="num ${prevVals.m !== vals.m ? 'rolling' : ''}">${pad(vals.m)}</div><div class="lbl">min</div></div>
        <div class="counter-unit"><div class="num ${prevVals.s !== vals.s ? 'rolling' : ''}">${pad(vals.s)}</div><div class="lbl">sec</div></div>
      `;
    }
    prevVals = vals;
  }
  render();
  counterInterval = setInterval(render, 1000);
}

// --- Typewriter ---
function startTypewriter() {
  const el = document.getElementById('letter-text');
  if (!el) return;
  el.innerHTML = '<span class="letter-cursor"></span>';
  
  const paragraphs = CONFIG.letter;
  let pIndex = 0;
  let wIndex = 0;
  
  function typeNext() {
    if (pIndex >= paragraphs.length) {
      el.querySelector('.letter-cursor').style.display = 'none';
      document.querySelector('.letter-sign').style.opacity = '1';
      return;
    }
    
    const words = paragraphs[pIndex].split(' ');
    const cursor = el.querySelector('.letter-cursor');
    
    if (wIndex === 0) {
      const p = document.createElement('p');
      p.innerHTML = words[0] + ' ';
      el.insertBefore(p, cursor);
      wIndex++;
    } else if (wIndex < words.length) {
      const p = el.children[pIndex];
      p.innerHTML += words[wIndex] + ' ';
      wIndex++;
    } else {
      pIndex++;
      wIndex = 0;
    }
    
    // Scroll to bottom
    el.parentElement.scrollTop = el.parentElement.scrollHeight;
    
    // Pacing: slightly longer pause for punctuation or new paragraphs
    const lastWord = words[wIndex - 1] || '';
    let delay = 40 + Math.random() * 40;
    if (lastWord.endsWith('.') || lastWord.endsWith(',') || lastWord.endsWith('❤️') || lastWord.endsWith('😂')) delay = 150;
    if (wIndex === 0 && pIndex > 0) delay = 300; // New paragraph pause
    
    typewriterTimeout = setTimeout(typeNext, delay);
  }
  
  setTimeout(typeNext, 600);
}

// --- Ambient Background ---
function setupAmbient() {
  const layer = document.getElementById('ambient-bg');
  const glyphs = ['♥', '✦', '❀'];
  
  function spawn() {
    const el = document.createElement('div');
    const isHeart = Math.random() > 0.7;
    el.className = `particle ${isHeart ? 'heart' : ''}`;
    if (isHeart) el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    
    el.style.left = (Math.random() * 90 + 5) + '%';
    el.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    if (!isHeart) {
      const size = 4 + Math.random() * 8;
      el.style.width = size + 'px'; el.style.height = size + 'px';
    }
    
    const dur = 12 + Math.random() * 10;
    el.style.animationDuration = dur + 's';
    layer.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 200);
  }
  setInterval(spawn, 2000);
  spawn();
}

// --- Cursor Hearts (Desktop) ---
function setupCursorHearts() {
  const layer = document.getElementById('cursor-hearts');
  let lastSpawn = 0;
  
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSpawn < 80) return; // Throttle
    lastSpawn = now;
    
    const el = document.createElement('div');
    el.className = 'cursor-heart';
    el.textContent = '♥';
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  });
}

// --- Easter Egg ---
function showSecret() {
  secretOverlay.classList.add('visible');
  setTimeout(() => {
    secretOverlay.classList.remove('visible');
  }, 6000);
}

// --- Restart ---
function restartStory() {
  fadeOverlay.classList.add('active');
  audio.volume = 0;
  audio.pause();
  musicBtn.classList.remove('playing');
  
  setTimeout(() => {
    goTo(0);
    document.querySelector('.slide-cover').classList.remove('revealed');
    setTimeout(() => {
      fadeOverlay.classList.remove('active');
      // Auto start music again
      startMusic();
    }, 800);
  }, 1200);
}

// --- Boot ---
init();