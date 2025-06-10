import { Navigation } from "./navigation.js";

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
async function renderMagicMart() {
  document.addEventListener("DOMContentLoaded", () => {
    const nav = new Navigation();
    nav.setUpListeners();
  });

  const magicURL = "https://api.open5e.com/v1/magicitems/?format=json";
  const magicData = await getData(magicURL);
  magicData.results.forEach((magicItemElement) => {
    createArmorCard(magicItemElement);
  });
}

function createArmorCard(magicData) {
  const magicDiv = document.querySelector("#magicItemContainer");
  const magicCard = document.createElement("div");
  magicDiv.appendChild(magicCard);
  const magicItemName = document.createElement("h2");
  magicItemName.innerText = magicData.name;
  magicCard.appendChild(magicItemName);
  const magicItemRarity = document.createElement("p");
  magicItemRarity.innerText = `Type: ${magicData.rarity}`;
  magicCard.appendChild(magicItemRarity);
  const magicItemDesc = document.createElement("p");
  magicItemDesc.innerText = `Armor Class (AC): ${magicData.desc}`;
  magicCard.appendChild(magicItemDesc);
}

renderMagicMart();
