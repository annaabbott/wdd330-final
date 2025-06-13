import { Navigation } from "./navigation.js";
import Open5eApi from "./open5e.js";
import { selectRandomItems } from "./utils.js";

class WeaponsController {
  constructor(api, nav) {
    this.api = api;
    this.nav = nav;
    this.stock = [];
  }

  async initializeStock() {
    const items = await this.api.getWeaponsStock();
    this.stock = selectRandomItems(items, 10);
  }

  clearStock() {
    const stockDiv = document.querySelector("#stockContainer");
    stockDiv.innerText = "";
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
    const viewCart = document.createElement("div");
    weaponCard.appendChild(viewCart);
    const cartAnchor = document.createElement("a");
    cartAnchor.innerText = `View Cart`;
    cartAnchor.classList = "anchorBtn";
    viewCart.appendChild(cartAnchor);
    cartAnchor.setAttribute("href", "../cart.html");

    buyWeaponBtn.addEventListener("click", () => {
      localStorage.setItem(weaponsData.name, weaponsData.name);
    });
  }

  async render() {
    this.nav.setUpListeners();
    await this.initializeStock();

    this.clearStock();
    this.stock.forEach((weaponsData) => {
      this.createWeaponCard(weaponsData);
    });
  }
}

const controller = new WeaponsController(new Open5eApi(), new Navigation());
controller.render();
