async function getData() {
  const url = "https://api.open5e.com/v2/armor/?format=json";
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
  const armorData = await getData();
  armorData.results.forEach((armorElement) => {
    createArmorCard(armorElement);
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

renderArmory();
