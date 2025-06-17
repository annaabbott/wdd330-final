import { Navigation } from "./navigation.js";
import Open5eApi from "./open5e.js";
import Shopkeeper from "./shopkeeper.mjs";
import { selectRandomItems } from "./utils.js";

class WeaponsController {
  constructor(api, nav, shopkeeper) {
    this.api = api;
    this.nav = nav;
    this.shopkeeperApi = shopkeeper;

    this.stock = [];
    this.shopkeeper = null;
  }

  async loadData() {
    const items = await this.api.getWeaponsStock();
    this.stock = selectRandomItems(items, 10);

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

  createWeaponCard(weaponsData) {
    const weaponDiv = document.querySelector("#stockContainer");
    const weaponCard = document.createElement("div");
    weaponCard.classList = "card";
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
    const buyWeaponBtn = document.createElement("button");
    buyWeaponBtn.innerText = `Buy Item`;
    buyWeaponBtn.classList = "button";
    weaponCard.appendChild(buyWeaponBtn);

    const userFeedback = document.createElement("div");
    userFeedback.classList.add("userFeedback");

    userFeedback.innerText = `${weaponsData.name} successfully purchased!`;
    weaponCard.appendChild(userFeedback);

    const viewCart = document.createElement("div");
    weaponCard.appendChild(viewCart);
    const cartAnchor = document.createElement("a");
    cartAnchor.innerText = `View Cart`;
    cartAnchor.classList = "anchorBtn";
    viewCart.appendChild(cartAnchor);
    cartAnchor.setAttribute("href", "../cart.html");

    buyWeaponBtn.addEventListener("click", () => {
      localStorage.setItem(weaponsData.name, weaponsData.name);
      userFeedback.classList.add("show");
      setTimeout(function () {
        userFeedback.classList.remove("show");
      }, 3000);
    });
  }

  async render() {
    this.nav.setUpListeners();
    await this.loadData();

    this.createShopkeeperInfo();
    this.clearStock();
    this.stock.forEach((weaponsData) => {
      this.createWeaponCard(weaponsData);
    });
  }
}

const controller = new WeaponsController(
  new Open5eApi(),
  new Navigation(),
  new Shopkeeper()
);
controller.render();
