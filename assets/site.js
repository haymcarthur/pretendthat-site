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

// Play section: "Next card" brings the next scene card to the front of the stack.
document.querySelectorAll("[data-stack]").forEach((stack) => {
  const cards = [...stack.querySelectorAll(".scene-card")];
  const btn = stack.parentElement.querySelector("[data-stack-next]");
  if (!btn || cards.length < 2) return;
  btn.addEventListener("click", () => {
    cards.forEach((c) => {
      const p = Number(c.dataset.pos);
      c.dataset.pos = String((p - 1 + cards.length) % cards.length);
    });
  });
});
