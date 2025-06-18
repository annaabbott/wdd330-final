import { Navigation } from "./navigation.js";
import Open5eApi from "./open5e.js";
import { selectRandomItems } from "./utils.js";
import Shopkeeper from "./shopkeeper.mjs";

class MagicItemsController {
  constructor(api, nav, shopkeeper) {
    this.api = api;
    this.nav = nav;
    this.shopkeeperApi = shopkeeper;

    this.stock = [];
    this.shopkeeper = null;
  }

  async initializeStock() {
    const items = await this.api.getMagicItemsStock();
    this.stock = selectRandomItems(items, 20);
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

  createMagicCard(magicData) {
    const magicDiv = document.querySelector("#stockContainer");
    const magicCard = document.createElement("div");
    magicCard.className = "card";
    magicDiv.appendChild(magicCard);
    const magicItemName = document.createElement("h2");
    magicItemName.innerText = magicData.name;
    magicCard.appendChild(magicItemName);
    const magicItemRarity = document.createElement("p");
    magicItemRarity.innerText = `Type: ${magicData.rarity}`;
    magicCard.appendChild(magicItemRarity);
    const magicItemDesc = document.createElement("p");
    magicItemDesc.className = "description";
    magicItemDesc.innerText = `Item Description: ${magicData.desc}`;
    magicCard.appendChild(magicItemDesc);
    const buyMagicBtn = document.createElement("button");
    buyMagicBtn.innerText = `Buy Item`;
    buyMagicBtn.classList = "button";
    magicCard.appendChild(buyMagicBtn);

    const userFeedback = document.createElement("div");
    userFeedback.classList.add("userFeedback");

    userFeedback.innerText = `${magicData.name} successfully purchased!`;
    magicCard.appendChild(userFeedback);

    const viewCart = document.createElement("div");
    magicCard.appendChild(viewCart);
    const cartAnchor = document.createElement("a");
    cartAnchor.innerText = `View Cart`;
    cartAnchor.classList = "anchorBtn";
    viewCart.appendChild(cartAnchor);
    cartAnchor.setAttribute("href", "./cart.html");

    buyMagicBtn.addEventListener("click", () => {
      localStorage.setItem(magicData.name, magicData.name);
      userFeedback.classList.add("show");
      setTimeout(function () {
        userFeedback.classList.remove("show");
      }, 3000);
    });
  }

  async render() {
    this.nav.setUpListeners();
    await this.initializeStock();
    this.createShopkeeperInfo();

    this.clearStock();
    this.stock.forEach((magicData) => {
      this.createMagicCard(magicData);
    });
  }
}

const controller = new MagicItemsController(
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
