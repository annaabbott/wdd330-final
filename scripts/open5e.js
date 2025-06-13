export default class Open5eApi {
  async getMagicItemsStock() {
    const results = [];
    let url = "https://api.open5e.com/v1/magicitems/?type=Wondrous%20Item";
    try {
      while (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        debugger;
        results.push(...json.data.results);
        url = json.data.next;
      }
    } catch (error) {
      console.error(error.message);
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
}
