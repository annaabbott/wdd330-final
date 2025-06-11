import { Navigation } from "./navigation.js";

export function getPurchases() {
  return JSON.parse(localStorage.getItem("purchases") || "[]");
}

// export function addToPurchases(item) {
//   const purchasedItems = getPurchases();
//   purchasedItems.push(item);
//   setPurchases(purchasedItems);
// }

// export function setPurchases(data) {
//   localStorage.setItem(data.name, JSON.stringify(data.name));
// }

async function renderPurchases() {
  document.addEventListener("DOMContentLoaded", () => {
    const nav = new Navigation();
    nav.setUpListeners();

    getPurchases();
  });
}

renderPurchases();
