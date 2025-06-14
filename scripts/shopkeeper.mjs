export default class Shopkeeper {
  async shopkeeperData() {
    let results = null;
    let url = "https://randomuser.me/api/?inc=gender,name,location,picture";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      results = json.results[0];
      console.log("shopkeeper data: ", results);
    } catch (error) {
      console.error(error.message);
    }
    return results;
  }
}
