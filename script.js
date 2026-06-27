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

// Anket butonu — link eklenmeden tıklanırsa uyarı ver
document.getElementById('anketBtn').addEventListener('click', (e) => {
  const href = e.currentTarget.getAttribute('href');
  if (href === '#') {
    e.preventDefault();
    alert('Anket linki henüz eklenmemiştir. Google Form oluşturulduktan sonra buraya eklenecektir.');
  }
});
