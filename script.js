/* ============================================
   PAWAN HARDU — script.js  v3
   Ultra Premium Portfolio JavaScript
============================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────────────────
     1. PAGE LOADER
  ───────────────────────────────────────── */
  const loader = document.getElementById("pageLoader");
  window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 1800));


  /* ─────────────────────────────────────────
     2. CUSTOM CURSOR
  ───────────────────────────────────────── */
  const dot  = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  if (dot && ring) {
    document.addEventListener("mousemove", e => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top  = mouseY + "px";
    });
    (function animRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top  = ringY + "px";
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll("a, button, .project-card, .service-item, .tcard, .cmethod").forEach(el => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
    if ("ontouchstart" in window) {
      dot.style.display = ring.style.display = "none";
      document.body.style.cursor = "auto";
    }
  }


  /* ─────────────────────────────────────────
     3. STICKY HEADER
  ───────────────────────────────────────── */
  const header = document.getElementById("siteHeader");
  if (header) {
    window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 60), { passive: true });
  }


  /* ─────────────────────────────────────────
     4. MOBILE NAV
  ───────────────────────────────────────── */
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      burgerBtn.setAttribute("aria-expanded", open);
    });
    document.querySelectorAll(".mob-link").forEach(l =>
      l.addEventListener("click", () => mobileNav.classList.remove("open"))
    );
  }


  /* ─────────────────────────────────────────
     5. SCROLL REVEAL
  ───────────────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll("[data-reveal]").forEach(el => revealObs.observe(el));


  /* ─────────────────────────────────────────
     6. COUNTER ANIMATION
  ───────────────────────────────────────── */
  const counters = document.querySelectorAll(".counter");
  let countersStarted = false;
  function runCounters() {
    if (countersStarted) return;
    const sec = document.getElementById("statistics");
    if (!sec) return;
    if (sec.getBoundingClientRect().top < window.innerHeight * 0.85) {
      countersStarted = true;
      counters.forEach(c => {
        const target = +c.getAttribute("data-target");
        const suffix = c.getAttribute("data-suffix") || "";
        let cur = 0;
        const step = target / (1800 / 16);
        const tick = () => {
          cur += step;
          if (cur < target) { c.textContent = Math.ceil(cur) + suffix; requestAnimationFrame(tick); }
          else c.textContent = target + suffix;
        };
        tick();
      });
    }
  }
  window.addEventListener("scroll", runCounters, { passive: true });
  runCounters();


  /* ─────────────────────────────────────────
     7. HERO CANVAS — floating gold particles
  ───────────────────────────────────────── */
  (function() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, parts = [];
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize); resize();
    class P {
      constructor() { this.reset(true); }
      reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.r = Math.random() * 1.5 + 0.3;
        this.vx = (Math.random() - .5) * .3;
        this.vy = -(Math.random() * .4 + .15);
        this.a = Math.random() * .6 + .2;
        this.c = Math.random() > .7 ? "#bfa369" : "#f5f2ec";
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.a -= .0008;
        if (this.y < -10 || this.a <= 0) this.reset(false);
      }
      draw() {
        ctx.save(); ctx.globalAlpha = this.a; ctx.fillStyle = this.c;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
    }
    for (let i = 0; i < 120; i++) parts.push(new P());
    (function anim() { ctx.clearRect(0,0,W,H); parts.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(anim); })();
  })();


  /* ─────────────────────────────────────────
     8. PORTFOLIO CANVAS — connected nodes
  ───────────────────────────────────────── */
  (function() {
    const canvas = document.getElementById("portfolioCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, nodes = [];
    const MAX = 100;
    const resize = () => {
      const sec = document.getElementById("portfolio");
      W = canvas.width = window.innerWidth;
      H = canvas.height = sec ? sec.offsetHeight : 600;
    };
    window.addEventListener("resize", resize); resize();
    class N {
      constructor() {
        this.x = Math.random()*W; this.y = Math.random()*H;
        this.vx = (Math.random()-.5)*.3; this.vy = (Math.random()-.5)*.3;
        this.r = Math.random()*1.2+.4;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x<0||this.x>W) this.vx*=-1;
        if (this.y<0||this.y>H) this.vy*=-1;
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle="rgba(191,163,105,.5)"; ctx.fill();
      }
    }
    for (let i=0;i<50;i++) nodes.push(new N());
    (function anim() {
      ctx.clearRect(0,0,W,H);
      nodes.forEach(n => { n.update(); n.draw(); });
      for (let a=0;a<nodes.length;a++) for (let b=a+1;b<nodes.length;b++) {
        const dx=nodes[a].x-nodes[b].x, dy=nodes[a].y-nodes[b].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if (d<MAX) {
          ctx.beginPath(); ctx.moveTo(nodes[a].x,nodes[a].y); ctx.lineTo(nodes[b].x,nodes[b].y);
          ctx.strokeStyle=`rgba(191,163,105,${(1-d/MAX)*.18})`; ctx.lineWidth=.8; ctx.stroke();
        }
      }
      requestAnimationFrame(anim);
    })();
  })();


  /* ─────────────────────────────────────────
     9. MUTE TOGGLE
     Note: Drive iframes manage their own audio.
     This button visually informs users and opens
     Drive videos directly for full audio control.
  ───────────────────────────────────────── */
  const muteBtn   = document.getElementById("globalMuteBtn");
  const muteIcon  = document.getElementById("muteIcon");
  const muteLabel = document.getElementById("muteLabel");
  let soundOn = false;

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      soundOn = !soundOn;

      if (soundOn) {
        muteIcon.className  = "fa-solid fa-volume-high";
        muteLabel.textContent = "Sound On — Click to Mute";
        muteBtn.classList.add("sound-on");
        // Open the first Drive video in a new tab so user can hear audio
        // (Drive embedded iframes start muted due to browser autoplay policy)
        // Guidance tooltip
        showSoundTip();
      } else {
        muteIcon.className  = "fa-solid fa-volume-xmark";
        muteLabel.textContent = "Sound Off — Click to Unmute";
        muteBtn.classList.remove("sound-on");
      }
    });
  }

  function showSoundTip() {
    // Show a brief toast explaining user should click inside the video player
    let toast = document.getElementById("soundToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "soundToast";
      toast.style.cssText = `
        position:fixed; bottom:90px; right:2rem; z-index:9000;
        background:rgba(191,163,105,0.15); border:1px solid rgba(191,163,105,0.5);
        backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
        color:#f5f2ec; font-family:'DM Sans',sans-serif; font-size:.82rem;
        padding:.8rem 1.2rem; border-radius:12px;
        max-width:220px; line-height:1.5;
        animation: toastIn .3s ease forwards;
      `;
      const style = document.createElement("style");
      style.textContent = `@keyframes toastIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }`;
      document.head.appendChild(style);
      document.body.appendChild(toast);
    }
    toast.textContent = "🔊 Click inside any video to enable audio.";
    toast.style.display = "block";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.display = "none"; }, 4000);
  }


  /* ─────────────────────────────────────────
     10. TESTIMONIALS SLIDER
  ───────────────────────────────────────── */
  (function() {
    const viewport = document.getElementById("tViewport");
    const track    = document.getElementById("tTrack");
    const dotsEl   = document.getElementById("tDots");
    const prevBtn  = document.getElementById("tPrev");
    const nextBtn  = document.getElementById("tNext");
    if (!track || !viewport) return;

    const cards = Array.from(track.querySelectorAll(".tcard"));
    const total = cards.length;
    let current = 0;
    let autoTimer = null;

    // Build dots
    cards.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "tdot" + (i === 0 ? " active" : "");
      d.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(d);
    });

    function getOffset() {
      // Use actual rendered card width + gap
      const cardW = cards[0].getBoundingClientRect().width;
      const gap = 24; // 1.5rem
      return current * (cardW + gap);
    }

    function goTo(idx) {
      clearTimeout(autoTimer);
      current = ((idx % total) + total) % total;
      track.style.transform = `translateX(-${getOffset()}px)`;
      // Dots
      dotsEl.querySelectorAll(".tdot").forEach((d, i) => d.classList.toggle("active", i === current));
      // Active cards (highlight current + next if exists)
      cards.forEach((c, i) => {
        const isActive = i === current || i === current + 1;
        c.classList.toggle("active", isActive);
      });
      autoTimer = setTimeout(() => goTo(current + 1), 5000);
    }

    prevBtn && prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener("click", () => goTo(current + 1));

    // Swipe
    let tx = 0;
    viewport.addEventListener("touchstart", e => { tx = e.changedTouches[0].clientX; }, { passive: true });
    viewport.addEventListener("touchend",   e => {
      const diff = tx - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });

    window.addEventListener("resize", () => goTo(current));
    goTo(0);
  })();


  /* ─────────────────────────────────────────
     11. TESTIMONIALS CANVAS
  ───────────────────────────────────────── */
  (function() {
    const canvas = document.getElementById("testimonialsCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, sparks = [];
    const resize = () => {
      const sec = document.getElementById("testimonials");
      W = canvas.width = window.innerWidth;
      H = canvas.height = sec ? sec.offsetHeight : 600;
    };
    window.addEventListener("resize", resize); resize();
    class S {
      constructor() { this.reset(); }
      reset() {
        this.x=Math.random()*W; this.y=Math.random()*H;
        this.r=Math.random()*1.5+.3; this.a=Math.random()*.5+.1;
        this.va=(Math.random()-.5)*.004; this.vx=(Math.random()-.5)*.2; this.vy=(Math.random()-.5)*.2;
      }
      update() {
        this.x+=this.vx; this.y+=this.vy; this.a+=this.va;
        if(this.a<0||this.a>.7) this.va*=-1;
        if(this.x<0||this.x>W) this.vx*=-1;
        if(this.y<0||this.y>H) this.vy*=-1;
      }
      draw() {
        ctx.save(); ctx.globalAlpha=this.a; ctx.fillStyle="#bfa369";
        ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill(); ctx.restore();
      }
    }
    for (let i=0;i<60;i++) sparks.push(new S());
    (function anim() { ctx.clearRect(0,0,W,H); sparks.forEach(s=>{s.update();s.draw();}); requestAnimationFrame(anim); })();
  })();


  /* ─────────────────────────────────────────
     12. CONTACT FORM
  ───────────────────────────────────────── */
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const btn = form.querySelector(".submit-btn");
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>Sending…</span><i class="fa-solid fa-circle-notch fa-spin"></i>';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<span>Sent!</span><i class="fa-solid fa-check"></i>';
        btn.style.background = "#2a9d5c";
        if (successMsg) successMsg.classList.add("show");
        setTimeout(() => {
          form.reset(); btn.innerHTML = orig; btn.style.background = ""; btn.disabled = false;
          if (successMsg) successMsg.classList.remove("show");
        }, 4000);
      }, 1500);
    });
  }


  /* ─────────────────────────────────────────
     13. ACTIVE NAV
  ───────────────────────────────────────── */
  const navLinks = document.querySelectorAll(".desktop-nav a");
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const y = window.scrollY + 120;
    sections.forEach(sec => {
      if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${sec.id}`));
      }
    });
  }, { passive: true });


  /* ─────────────────────────────────────────
     14. PARALLAX HERO BG TEXT
  ───────────────────────────────────────── */
  const bgText = document.querySelector(".hero-bg-text");
  if (bgText) {
    window.addEventListener("scroll", () => {
      bgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * .15}px))`;
    }, { passive: true });
  }

}); // end DOMContentLoaded