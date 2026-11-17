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
