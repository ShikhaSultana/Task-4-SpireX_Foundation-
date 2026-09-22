/* ============================================
   StreamFlix — Pricing Card Section
   Monthly / Yearly billing toggle
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const switchEl   = document.getElementById("billingSwitch");
  const labelMonth = document.getElementById("labelMonthly");
  const labelYear  = document.getElementById("labelYearly");
  const amounts    = document.querySelectorAll(".plan__amount");
  const notes      = document.querySelectorAll(".plan__note");

  let yearly = false;

  /* ---------- Update all prices & notes ---------- */
  const render = () => {
    amounts.forEach((el) => {
      const value = yearly ? el.dataset.yearly : el.dataset.monthly;
      // brief fade for a smooth number swap
      el.style.opacity = "0";
      setTimeout(() => {
        el.textContent = value;
        el.style.opacity = "1";
      }, 120);
    });

    notes.forEach((el) => {
      el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
    });

    switchEl.classList.toggle("on", yearly);
    switchEl.setAttribute("aria-checked", String(yearly));
    labelMonth.classList.toggle("active", !yearly);
    labelYear.classList.toggle("active", yearly);
  };

  /* ---------- Toggle handlers ---------- */
  const toggle = () => {
    yearly = !yearly;
    render();
  };

  switchEl.addEventListener("click", toggle);
  labelMonth.addEventListener("click", () => { if (yearly) toggle(); });
  labelYear.addEventListener("click", () => { if (!yearly) toggle(); });

  // Keyboard support for the switch
  switchEl.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  });

  /* ---------- Card entrance animation ---------- */
  const cards = document.querySelectorAll(".plan");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(26px)";
      card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`;
      observer.observe(card);
    });
  }

  /* ---------- CTA click feedback ---------- */
  document.querySelectorAll(".plan__cta").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const original = btn.textContent;
      btn.textContent = "✓ Selected";
      setTimeout(() => (btn.textContent = original), 1400);
    });
  });
});
