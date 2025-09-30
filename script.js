 // MOBILE NAV
const menuBtn = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
menuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");
const speed = 200; 

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCount();
  });
};

// Trigger counters when in view
const statsSection = document.querySelector("#statistics");
let statsPlayed = false;
window.addEventListener("scroll", () => {
  const sectionTop = statsSection.offsetTop - window.innerHeight + 100;
  if (!statsPlayed && window.scrollY > sectionTop) {
    animateCounters();
    statsPlayed = true;
  }
});


// HERO PARTICLES
const canvas = document.getElementById('hero-particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ['#e2ffd8', '#ffffff', '#004d4d']; // your palette

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function initParticles(num=100) {
  for (let i=0; i<num; i++){
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

// INIT
initParticles();
animateParticles();

// RESIZE CANVAS
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// ABOUT SECTION PARTICLES
const aboutCanvas = document.getElementById('about-particles');
const aboutCtx = aboutCanvas.getContext('2d');

aboutCanvas.width = window.innerWidth;
aboutCanvas.height = document.querySelector('.about-section').offsetHeight;

const aboutParticlesArray = [];
const aboutColors = ['#e2ffd8', '#ffffff', '#004d4d'];
const aboutMaxDistance = 100;

class AboutParticle {
  constructor() {
    this.x = Math.random() * aboutCanvas.width;
    this.y = Math.random() * aboutCanvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5; // slower movement
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = aboutColors[Math.floor(Math.random() * aboutColors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > aboutCanvas.width) this.x = 0;
    if (this.x < 0) this.x = aboutCanvas.width;
    if (this.y > aboutCanvas.height) this.y = 0;
    if (this.y < 0) this.y = aboutCanvas.height;
  }
  draw() {
    aboutCtx.fillStyle = this.color;
    aboutCtx.beginPath();
    aboutCtx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    aboutCtx.fill();
  }
}

function connectAboutParticles() {
  for (let a = 0; a < aboutParticlesArray.length; a++) {
    for (let b = a; b < aboutParticlesArray.length; b++) {
      const dx = aboutParticlesArray[a].x - aboutParticlesArray[b].x;
      const dy = aboutParticlesArray[a].y - aboutParticlesArray[b].y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      if (distance < aboutMaxDistance) {
        aboutCtx.strokeStyle = `rgba(226,255,216, ${1 - distance/aboutMaxDistance})`;
        aboutCtx.lineWidth = 0.8;
        aboutCtx.beginPath();
        aboutCtx.moveTo(aboutParticlesArray[a].x, aboutParticlesArray[a].y);
        aboutCtx.lineTo(aboutParticlesArray[b].x, aboutParticlesArray[b].y);
        aboutCtx.stroke();
      }
    }
  }
}

function initAboutParticles(num=60) {
  for (let i=0; i<num; i++){
    aboutParticlesArray.push(new AboutParticle());
  }
}

function animateAboutParticles() {
  aboutCtx.clearRect(0,0,aboutCanvas.width,aboutCanvas.height);
  aboutParticlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectAboutParticles();
  requestAnimationFrame(animateAboutParticles);
}

// INIT
initAboutParticles();
animateAboutParticles();

// RESIZE CANVAS
window.addEventListener('resize', () => {
  aboutCanvas.width = window.innerWidth;
  aboutCanvas.height = document.querySelector('.about-section').offsetHeight;
});



// PORTFOLIO SECTION PARTICLES
const portfolioCanvas = document.getElementById('portfolio-particles');
const portfolioCtx = portfolioCanvas.getContext('2d');

portfolioCanvas.width = window.innerWidth;
portfolioCanvas.height = document.querySelector('.portfolio-section').offsetHeight;

const portfolioParticlesArray = [];
const portfolioColors = ['#e2ffd8', '#ffffff', '#004d4d'];
const portfolioMaxDistance = 90;

class PortfolioParticle {
  constructor() {
    this.x = Math.random() * portfolioCanvas.width;
    this.y = Math.random() * portfolioCanvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.color = portfolioColors[Math.floor(Math.random() * portfolioColors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > portfolioCanvas.width) this.x = 0;
    if (this.x < 0) this.x = portfolioCanvas.width;
    if (this.y > portfolioCanvas.height) this.y = 0;
    if (this.y < 0) this.y = portfolioCanvas.height;
  }
  draw() {
    portfolioCtx.fillStyle = this.color;
    portfolioCtx.beginPath();
    portfolioCtx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    portfolioCtx.fill();
  }
}

function connectPortfolioParticles() {
  for (let a = 0; a < portfolioParticlesArray.length; a++) {
    for (let b = a; b < portfolioParticlesArray.length; b++) {
      const dx = portfolioParticlesArray[a].x - portfolioParticlesArray[b].x;
      const dy = portfolioParticlesArray[a].y - portfolioParticlesArray[b].y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      if (distance < portfolioMaxDistance) {
        portfolioCtx.strokeStyle = `rgba(226,255,216, ${1 - distance/portfolioMaxDistance})`;
        portfolioCtx.lineWidth = 0.8;
        portfolioCtx.beginPath();
        portfolioCtx.moveTo(portfolioParticlesArray[a].x, portfolioParticlesArray[a].y);
        portfolioCtx.lineTo(portfolioParticlesArray[b].x, portfolioParticlesArray[b].y);
        portfolioCtx.stroke();
      }
    }
  }
}

function initPortfolioParticles(num=50) {
  for (let i=0; i<num; i++){
    portfolioParticlesArray.push(new PortfolioParticle());
  }
}

function animatePortfolioParticles() {
  portfolioCtx.clearRect(0,0,portfolioCanvas.width,portfolioCanvas.height);
  portfolioParticlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectPortfolioParticles();
  requestAnimationFrame(animatePortfolioParticles);
}

// INIT
initPortfolioParticles();
animatePortfolioParticles();

// RESIZE CANVAS
window.addEventListener('resize', () => {
  portfolioCanvas.width = window.innerWidth;
  portfolioCanvas.height = document.querySelector('.portfolio-section').offsetHeight;
});


