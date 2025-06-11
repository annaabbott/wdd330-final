import { Navigation } from "./navigation.js";

function displayPurchases() {
  const purchases = document.querySelector("#cart");
  Object.keys(localStorage).forEach((key) => {
    const purchasedItemP = document.createElement("p");
    purchasedItemP.innerText = `${localStorage.getItem(key)}`;
    purchases.appendChild(purchasedItemP);
  });
}

async function renderPurchasesPage() {
  document.addEventListener("DOMContentLoaded", () => {
    const nav = new Navigation();
    nav.setUpListeners();
  });

  displayPurchases();
}

renderPurchasesPage();
