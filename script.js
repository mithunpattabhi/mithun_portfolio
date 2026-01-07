document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro");
  const introText = document.getElementById("introText");

  const nameText = "MITHUN PATTABHI";
  const regText = "23BCE8347";

  const wait = ms => new Promise(r => setTimeout(r, ms));

  async function typeText(text, speed) {
    introText.textContent = "";
    for (let c of text) {
      introText.textContent += c;
      await wait(speed);
    }
  }

  async function startIntro() {
    await typeText(nameText, 90);
    await wait(600);

    for (let i = 0; i < regText.length; i++) {
      introText.textContent = regText.slice(0, i + 1);
      await wait(120);
    }

    await wait(700);
    intro.style.opacity = "0";
    setTimeout(() => intro.remove(), 600);
  }

  startIntro();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-card");
      card.classList.toggle("expanded");
      btn.textContent = card.classList.contains("expanded")
        ? "Read less ↑"
        : "Read more ↓";
    });
  });

});
