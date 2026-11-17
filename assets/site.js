// ================================================================
// APP STORE LINK: paste the real App Store URL here once the app is
// live, e.g. "https://apps.apple.com/app/idXXXXXXXXXX".
// While it is empty, every badge (class "js-store") says "Coming soon"
// and is not a link. Once it is set, the badges become real
// "Download on the App Store" links.
// ================================================================
const APP_STORE_URL = "";

if (APP_STORE_URL) {
  document.querySelectorAll(".js-store").forEach((badge) => {
    const link = document.createElement("a");
    link.className = "store";
    link.href = APP_STORE_URL;
    link.innerHTML = badge.innerHTML;
    link.querySelector("small").textContent = "Download on the";
    link.setAttribute("aria-label", "Download PretendThat on the App Store");
    badge.replaceWith(link);
  });
  document.querySelectorAll(".store-note").forEach((n) => n.remove());
}

// Slim step progress under the home hero: fills each step's bar as its section scrolls past.
(() => {
  const links = [...document.querySelectorAll(".step-progress a[data-step]")];
  if (!links.length) return;
  const secs = links.map((a) => document.getElementById(a.dataset.step));
  let queued = false;
  const update = () => {
    queued = false;
    const mid = window.innerHeight * 0.5;
    secs.forEach((sec, i) => {
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const f = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      links[i].style.setProperty("--fill", (f * 100).toFixed(1) + "%");
      links[i].classList.toggle("on", f > 0 && f < 1);
    });
  };
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();
