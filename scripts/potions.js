import { Navigation } from "./navigation.js";
import Open5eApi from "./open5e.js";
import Shopkeeper from "./shopkeeper.mjs";
import { selectRandomItems } from "./utils.js";

class PotionController {
  constructor(api, nav, shopkeeper) {
    this.api = api;
    this.nav = nav;
    this.shopkeeperApi = shopkeeper;

    this.stock = [];
    this.shopkeeper = null;
  }

  async initializeStock() {
    const items = await this.api.getPotionStock();
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

  createPotionCard(potionData) {
    const stockDiv = document.querySelector("#stockContainer");
    const potionCard = document.createElement("div");
    potionCard.className = "card";
    stockDiv.appendChild(potionCard);
    const potionName = document.createElement("h2");
    potionName.innerText = potionData.name;
    potionCard.appendChild(potionName);
    const potionRarity = document.createElement("p");
    potionRarity.innerText = `Type: ${potionData.rarity}`;
    potionCard.appendChild(potionRarity);
    const potionDesc = document.createElement("p");
    potionDesc.className = "description";
    potionDesc.innerText = `Item Description: ${potionData.desc}`;
    potionCard.appendChild(potionDesc);
    const buyPotionBtn = document.createElement("button");
    buyPotionBtn.innerText = `Buy Item`;
    buyPotionBtn.classList = "button";
    potionCard.appendChild(buyPotionBtn);

    const userFeedback = document.createElement("div");
    userFeedback.classList.add("userFeedback");

    userFeedback.innerText = `${potionData.name} successfully purchased!`;
    potionCard.appendChild(userFeedback);

    const viewCart = document.createElement("div");
    potionCard.appendChild(viewCart);
    const cartAnchor = document.createElement("a");
    cartAnchor.innerText = `View Cart`;
    cartAnchor.classList = "anchorBtn";
    viewCart.appendChild(cartAnchor);
    cartAnchor.setAttribute("href", "./cart.html");

    buyPotionBtn.addEventListener("click", () => {
      localStorage.setItem(potionData.name, potionData.name);
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
    this.stock.forEach((potionData) => {
      this.createPotionCard(potionData);
    });
  }
}

const controller = new PotionController(
  new Open5eApi(),
  new Navigation(),
  new Shopkeeper()
);
controller.render();

// async function getData(url) {
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
// async function renderMagicMart() {
//   const magicURL = "https://api.open5e.com/v1/magicitems/?type=potions";
//   const magicData = await getData(magicURL);
//   // console.log("magicData.results:", magicData.results);
//   const magicItems = magicData.results;
//   const filteredSubset = magicItems.filter((item) => magicItems < 0.1);
//   console.log("filteredSubset: ", filteredSubset);
//   magicData.results.forEach((magicItemElement) => {
//     createMagicCard(magicItemElement);
//   });

//   document.addEventListener("DOMContentLoaded", () => {
//     const nav = new Navigation();
//     nav.setUpListeners();
//   });
// }

// function truncateDescription(magicData) {
//   return magicData.desc;
// }

// function createMagicCard(magicData) {
//   const description = truncateDescription(magicData);
//   const magicDiv = document.querySelector("#magicItemContainer");
//   const magicCard = document.createElement("div");
//   magicCard.className = "card";
//   magicDiv.appendChild(magicCard);
//   const magicItemName = document.createElement("h2");
//   magicItemName.innerText = magicData.name;
//   magicCard.appendChild(magicItemName);
//   const magicItemRarity = document.createElement("p");
//   magicItemRarity.innerText = `Type: ${magicData.rarity}`;
//   magicCard.appendChild(magicItemRarity);
//   const magicItemDesc = document.createElement("p");
//   magicItemDesc.className = "description";
//   magicItemDesc.innerText = `Item Description: ${description}`;
//   magicCard.appendChild(magicItemDesc);
//   const buyMagicBtn = document.createElement("button");
//   buyMagicBtn.innerText = `Buy Item`;
//   buyMagicBtn.classList = "button";
//   magicCard.appendChild(buyMagicBtn);
//   const viewCart = document.createElement("div");
//   magicCard.appendChild(viewCart);
//   const cartAnchor = document.createElement("a");
//   cartAnchor.innerText = `View Cart`;
//   cartAnchor.classList = "anchorBtn";
//   viewCart.appendChild(cartAnchor);
//   cartAnchor.setAttribute("href", "../cart.html");

//   buyMagicBtn.addEventListener("click", () => {
//     localStorage.setItem(magicData.name, magicData.name);
//   });
// }

// renderMagicMart();
