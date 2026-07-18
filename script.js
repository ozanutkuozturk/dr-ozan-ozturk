// YouTube müzik çalar
let muzikCaliyor = false;
const YT_SRC = 'https://www.youtube.com/embed/94-PAIMDhaQ?autoplay=1&controls=0&loop=1&playlist=94-PAIMDhaQ';

document.getElementById('muzikBtn').addEventListener('click', () => {
  const frame = document.getElementById('ytFrame');
  if (muzikCaliyor) {
    frame.src = '';
    document.getElementById('ikonPlay').style.display = 'block';
    document.getElementById('ikonPause').style.display = 'none';
  } else {
    frame.src = YT_SRC;
    document.getElementById('ikonPlay').style.display = 'none';
    document.getElementById('ikonPause').style.display = 'block';
  }
  muzikCaliyor = !muzikCaliyor;
});

// Mobil menü aç/kapat
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('acik');
});

// Menü linkine tıklanınca kapat
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('acik');
  });
});

// Video scroll scrub
// Video scroll scrub
const scrubVideo = document.getElementById('scrubVideo');
const videoBar = document.getElementById('videoBar');
const videoBolum = document.getElementById('video-bolum');
const videoSticky = videoBolum
  ? videoBolum.querySelector('.video-sticky')
  : null;

if (scrubVideo && videoBolum && videoSticky) {
  let animasyonKaresi;

  function videoyuGuncelle() {
    const bolumTop =
      videoBolum.getBoundingClientRect().top + window.scrollY;

    const stickyTop =
      parseFloat(window.getComputedStyle(videoSticky).top) || 0;

    const stickyYukseklik = videoSticky.offsetHeight;

    // Figürün merkezi ekranın merkezine geldiği an
    const baslangic = bolumTop - stickyTop;

    // Figür sticky konumdan ayrılmadan hemen önce
    const bitis =
      bolumTop +
      videoBolum.offsetHeight -
      stickyYukseklik -
      stickyTop;

    const kaydirmaMesafesi = Math.max(1, bitis - baslangic);
    const kaydirilan = window.scrollY - baslangic;

    const ilerleme = Math.max(
      0,
      Math.min(1, kaydirilan / kaydirmaMesafesi)
    );

    scrubVideo.currentTime = ilerleme * scrubVideo.duration;

    if (videoBar) {
      videoBar.style.width = `${ilerleme * 100}%`;
    }
  }

  function kaydirmayiIsle() {
    cancelAnimationFrame(animasyonKaresi);
    animasyonKaresi = requestAnimationFrame(videoyuGuncelle);
  }

  scrubVideo.addEventListener('loadedmetadata', () => {
    window.addEventListener('scroll', kaydirmayiIsle, {
      passive: true
    });

    window.addEventListener('resize', kaydirmayiIsle);

    videoyuGuncelle();
  });
}

// Scroll reveal animasyonu
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('gorunur');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.section-title, .hakkimda-photo, .hakkimda-text, ' +
  '.ozgecmis-blok, .ameliyat-kart, .yayin-grup, ' +
  '.anket-icerik, .iletisim-bilgi, .iletisim-saat, .kisisel-bilgiler'
).forEach((el, i) => {
  el.classList.add('gorunum-bekle');
  if (el.classList.contains('ameliyat-kart')) {
    el.style.transitionDelay = (Array.from(el.parentElement.children).indexOf(el) % 3 * 0.12) + 's';
  }
  scrollObserver.observe(el);
});

// Scroll'da navbar gölgesi
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Hasta mesaj formu
const yazBtn = document.getElementById('yazBtn');
const hastaForm = document.getElementById('hastaForm');
const formKapat = document.getElementById('formKapat');

if (yazBtn) {
  yazBtn.addEventListener('click', () => {
    hastaForm.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
}

if (formKapat) {
  formKapat.addEventListener('click', () => {
    hastaForm.style.display = 'none';
    document.body.style.overflow = '';
  });
}

hastaForm && hastaForm.addEventListener('click', (e) => {
  if (e.target === hastaForm) {
    hastaForm.style.display = 'none';
    document.body.style.overflow = '';
  }
});

