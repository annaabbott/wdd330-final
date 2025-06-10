import { Navigation } from "./navigation.js";

async function getData(url) {
  //   const url = "https://api.open5e.com/v2/armor/?format=json";
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
async function renderArmory() {
  document.addEventListener("DOMContentLoaded", () => {
    const nav = new Navigation();
    nav.setUpListeners();
  });

  const armorURL = "https://api.open5e.com/v2/armor/?format=json";
  const armorData = await getData(armorURL);
  armorData.results.forEach((armorElement) => {
    createArmorCard(armorElement);
  });

  const weaponsURL = "https://api.open5e.com/v2/weapons/?format=json";
  const weaponsData = await getData(weaponsURL);
  weaponsData.results.forEach((weaponElement) => {
    createWeponCard(weaponElement);
  });
}

function createArmorCard(armorData) {
  const armorDiv = document.querySelector("#armorContainer");
  const armorCard = document.createElement("div");
  armorDiv.appendChild(armorCard);
  const armorName = document.createElement("h2");
  armorName.innerText = armorData.name;
  armorCard.appendChild(armorName);
  const armorCategory = document.createElement("p");
  armorCategory.innerText = `Type: ${armorData.category}`;
  armorCard.appendChild(armorCategory);
  const armorClass = document.createElement("p");
  armorClass.innerText = `Armor Class (AC): ${armorData.ac_display}`;
  armorCard.appendChild(armorClass);
}

function createWeponCard(weaponsData) {
  const weaponDiv = document.querySelector("#weaponContainer");
  const weaponCard = document.createElement("div");
  weaponDiv.appendChild(weaponCard);
  const weaponName = document.createElement("h2");
  weaponName.innerText = weaponsData.name;
  weaponCard.appendChild(weaponName);
  const weaponDesc = document.createElement("p");
  weaponDesc.innerText = `Damage: ${weaponsData.damage_dice}`;
  weaponCard.appendChild(weaponDesc);
  const weaponProperties = document.createElement("p");
  weaponProperties.innerText = `Properties: ${weaponsData.properties.join(
    ", "
  )}`;
  weaponCard.appendChild(weaponProperties);
  const weaponReach = document.createElement("p");
  weaponReach.innerText = `Range: ${weaponsData.range}; Reach: ${weaponsData.reach}`;
  weaponCard.appendChild(weaponReach);
}

renderArmory();
