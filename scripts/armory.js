import { Navigation } from "./navigation.js";
import Open5eApi from "./open5e.js";
import { selectRandomItems } from "./utils.js";
import Shopkeeper from "./shopkeeper.mjs";

class ArmoryController {
  constructor(api, nav, shopkeeper) {
    this.api = api;
    this.nav = nav;
    this.shopkeeperApi = shopkeeper;

    this.stock = [];
    this.shopkeeper = null;
  }

  async initializeStock() {
    const items = await this.api.getArmoryStock();
    this.stock = selectRandomItems(items, 5);
    this.shopkeeper = await this.shopkeeperApi.shopkeeperData();
  }

  clearStock() {
    const stockDiv = document.querySelector("#stockContainer");
    stockDiv.innerText = "";
  }

  createShopkeeperInfo() {
    const shopkeeperContainer = document.querySelector("#shopkeepContainer");
    shopkeeperContainer.classList = "merchantInfo";
    const shopkeeperImg = document.createElement("img");
    shopkeeperImg.src = `${this.shopkeeper.picture.medium}`;
    shopkeeperImg.width = 100;
    shopkeeperImg.height = 100;
    shopkeeperContainer.appendChild(shopkeeperImg);
    const shopkeeperInfo = document.createElement("div");
    shopkeeperInfo.id = "shopkeeperInfo";
    shopkeeperContainer.appendChild(shopkeeperInfo);
    const shopkeeperName = document.createElement("h3");
    shopkeeperName.innerText = `${this.shopkeeper.name.first} ${this.shopkeeper.name.last}`;
    shopkeeperInfo.appendChild(shopkeeperName);
    const shopkeeperGender = document.createElement("p");
    shopkeeperGender.innerText = `${this.shopkeeper.gender}`;
    shopkeeperInfo.appendChild(shopkeeperGender);
    const shopAddress = document.createElement("p");
    shopAddress.innerText = `Shop Address: ${this.shopkeeper.location.street.number} ${this.shopkeeper.location.street.name}`;
    shopkeeperInfo.appendChild(shopAddress);
  }

  createArmorCard(armorData) {
    const armorDiv = document.querySelector("#stockContainer");
    const armorCard = document.createElement("div");
    armorCard.classList = "card";
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
    const buyArmorBtn = document.createElement("button");
    buyArmorBtn.innerText = `Buy Item`;
    buyArmorBtn.classList = "button";
    armorCard.appendChild(buyArmorBtn);
    const viewCart = document.createElement("div");
    armorCard.appendChild(viewCart);
    const cartAnchor = document.createElement("a");
    cartAnchor.classList = "anchorBtn";
    cartAnchor.innerText = `View Cart`;
    viewCart.appendChild(cartAnchor);
    cartAnchor.setAttribute("href", "../cart.html");

    buyArmorBtn.addEventListener("click", () => {
      localStorage.setItem(armorData.name, armorData.name);
    });
  }

  async render() {
    this.nav.setUpListeners();
    await this.initializeStock();
    this.createShopkeeperInfo();

    this.clearStock();
    this.stock.forEach((armorElement) => {
      this.createArmorCard(armorElement);
    });
  }
}

const controller = new ArmoryController(
  new Open5eApi(),
  new Navigation(),
  new Shopkeeper()
);
controller.render();

// async function getData(url) {
//   //   const url = "https://api.open5e.com/v2/armor/?format=json";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const json = await response.json();
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// async function renderArmory() {
//   const armorURL = "https://api.open5e.com/v2/armor/?format=json";
//   const armorData = await getData(armorURL);
//   armorData.results.forEach((armorElement) => {
//     createArmorCard(armorElement);
//   });

//   const weaponsURL = "https://api.open5e.com/v2/weapons/?format=json";
//   const weaponsData = await getData(weaponsURL);
//   weaponsData.results.forEach((weaponElement) => {
//     createWeaponCard(weaponElement);
//   });

//   document.addEventListener("DOMContentLoaded", () => {
//     const nav = new Navigation();
//     nav.setUpListeners();

//   });
// }

// function createWeaponCard(weaponsData) {
//   const weaponDiv = document.querySelector("#weaponContainer");
//   const weaponCard = document.createElement("div");
//   weaponCard.classList = "card";
//   weaponDiv.appendChild(weaponCard);
//   const weaponName = document.createElement("h2");
//   weaponName.innerText = weaponsData.name;
//   weaponCard.appendChild(weaponName);
//   const weaponDesc = document.createElement("p");
//   weaponDesc.innerText = `Damage: ${weaponsData.damage_dice}`;
//   weaponCard.appendChild(weaponDesc);
//   const weaponProperties = document.createElement("p");
//   weaponProperties.innerText = `Properties: ${weaponsData.properties.join(
//     ", "
//   )}`;
//   weaponCard.appendChild(weaponProperties);
//   const weaponReach = document.createElement("p");
//   weaponReach.innerText = `Range: ${weaponsData.range}; Reach: ${weaponsData.reach}`;
//   weaponCard.appendChild(weaponReach);
//   const buyWeaponBtn = document.createElement("button");
//   buyWeaponBtn.innerText = `Buy Item`;
//   buyWeaponBtn.classList = "button";
//   weaponCard.appendChild(buyWeaponBtn);
//   const viewCart = document.createElement("div");
//   weaponCard.appendChild(viewCart);
//   const cartAnchor = document.createElement("a");
//   cartAnchor.innerText = `View Cart`;
//   cartAnchor.classList = "anchorBtn";
//   viewCart.appendChild(cartAnchor);
//   cartAnchor.setAttribute("href", "../cart.html");

//   buyWeaponBtn.addEventListener("click", () => {
//     localStorage.setItem(weaponsData.name, weaponsData.name);
//   });
// }
