export default class Shopkeeper {
  async shopkeeperData() {
    const results = [];
    let url = "https://randomuser.me/api/?inc=gender,name,location,picture";
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
