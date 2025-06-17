import { Navigation } from "./navigation.js";

function displayPurchases() {
  const purchases = document.querySelector("#cart");
  Object.keys(localStorage).forEach((key) => {
    const purchasedItemDiv = document.createElement("div");
    purchasedItemDiv.classList = "inventoryCard";
    purchases.appendChild(purchasedItemDiv);
    const purchasedItemP = document.createElement("h3");
    purchasedItemP.innerText = `${localStorage.getItem(key)}`;
    purchasedItemDiv.appendChild(purchasedItemP);
    const removeFromInventoryBtn = document.createElement("button");
    removeFromInventoryBtn.classList = "removeBtn";

    removeFromInventoryBtn.innerText = `X`;
    purchasedItemDiv.appendChild(removeFromInventoryBtn);

    removeFromInventoryBtn.addEventListener("click", () => {
      localStorage.removeItem(key);
      purchasedItemDiv.remove();
    });
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
