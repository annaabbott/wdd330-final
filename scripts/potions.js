import { Navigation } from "./navigation.js";

const PREVIEW_LENGTH = 100;

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
  const magicURL = "https://api.open5e.com/v1/magicitems/?type=Wondrous%20Item";
  const magicData = await getData(magicURL);

  magicData.results.forEach((magicItemElement) => {
    createMagicCard(magicItemElement);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const nav = new Navigation();
    nav.setUpListeners();
  });
}

function truncateDescription(magicData) {
  return magicData.desc;
  // const fullDescription = magicData.desc;
  // if (fullDescription.length > PREVIEW_LENGTH) {
  //   let truncated = fullDescription.slice(0, PREVIEW_LENGTH) + "...";
  //   return truncated;
  // } else {
  //   return fullDescription;
  // }
}

function createMagicCard(magicData) {
  const description = truncateDescription(magicData);
  const magicDiv = document.querySelector("#magicItemContainer");
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
  magicItemDesc.innerText = `Item Description: ${description}`;
  magicCard.appendChild(magicItemDesc);
  const buyMagicBtn = document.createElement("button");
  buyMagicBtn.innerText = `Buy Item`;
  buyMagicBtn.classList = "button";
  magicCard.appendChild(buyMagicBtn);
  const viewCart = document.createElement("div");
  magicCard.appendChild(viewCart);
  const cartAnchor = document.createElement("a");
  cartAnchor.innerText = `View Cart`;
  cartAnchor.classList = "anchorBtn";
  viewCart.appendChild(cartAnchor);
  cartAnchor.setAttribute("href", "../cart.html");

  buyMagicBtn.addEventListener("click", () => {
    localStorage.setItem(magicData.name, magicData.name);
  });
}

renderMagicMart();
