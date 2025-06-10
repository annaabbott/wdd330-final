import { Navigation } from "./navigation.js";

async function renderPurchases() {
  document.addEventListener("DOMContentLoaded", () => {
    const nav = new Navigation();
    nav.setUpListeners();
  });
}

renderPurchases();
