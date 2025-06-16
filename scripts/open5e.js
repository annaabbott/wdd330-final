export default class Open5eApi {
  async getMagicItemsStock() {
    const results = [];
    const spinner = document.querySelector("#spinner");

    spinner.style.display = "block";

    let url = "https://api.open5e.com/v1/magicitems/?type=Wondrous+Item";
    try {
      while (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        results.push(...json.results);
        url = json.next;
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      spinner.style.display = "none";
    }
    return results;
  }

  async getArmoryStock() {
    const results = [];
    let url = "https://api.open5e.com/v2/armor/?format=json";
    try {
      while (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        results.push(...json.results);
        url = json.next;
      }
    } catch (error) {
      console.error(error.message);
    }
    return results;
  }

  async getWeaponsStock() {
    const results = [];
    let url = "https://api.open5e.com/v2/weapons/?format=json";
    try {
      while (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        results.push(...json.results);
        url = json.next;
      }
    } catch (error) {
      console.error(error.message);
    }
    return results;
  }

  async getPotionStock() {
    const results = [];
    let url = "https://api.open5e.com/v1/magicitems/?type=Potion";
    try {
      while (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        results.push(...json.results);
        url = json.next;
      }
    } catch (error) {
      console.error(error.message);
    }
    return results;
  }
}
