const { menuBtn } = require("./menuBtn");

// Fade-in on scroll
const aboutSection = document.querySelector(".about-section");

function revealOnScroll() {
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const triggerBottom = window.innerHeight * 0.85;

  if (sectionTop < triggerBottom) {
    aboutSection.classList.add("visible");
    window.removeEventListener("scroll", revealOnScroll); // run once
  }
}

window.addEventListener("scroll", revealOnScroll);



// Counter Animation Script
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 100; // smaller = faster
  
    const animateCounters = () => {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
  
          const increment = Math.ceil(target / speed);
  
          if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, 30);
          } else {
            // Add "+" or "%" depending on stat
            if (target === 150) {
              counter.innerText = target + "+";
            } else if (target === 98) {
              counter.innerText = target + "%";
            } else if (target === 50000000) {
              counter.innerText = "50M+";
            }
          }
        };
        updateCount();
      });
    };
  
    // Trigger when section is in view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect(); // run once
        }
      });
    }, { threshold: 0.5 });
  
    observer.observe(document.querySelector("#statistics"));
  });

  // Scroll Fade-in Animation
const faders = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};
exports.appearOptions = appearOptions;

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


faders.forEach(fader => appearOnScroll.observe(fader));
