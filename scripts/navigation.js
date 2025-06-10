export class Navigation {
  constructor() {
    this.navOpenBtn = document.querySelector("#NavOpenBtn");
    this.navHamburgerBtn = document.querySelector("#NavHamburgerBtn");
    this.sideNav = document.querySelector("#sideNav");
  }
  setUpListeners() {
    this.navOpenBtn.addEventListener("click", () => {
      this.navHamburgerBtn.classList.toggle("hide");
      this.sideNav.classList.toggle("open");
      this.navOpenBtn.classList.toggle("open");
    });

    this.navHamburgerBtn.addEventListener("click", () => {
      this.navHamburgerBtn.classList.toggle("hide");
      this.sideNav.classList.toggle("open");
      this.navOpenBtn.classList.toggle("open");
    });
  }
}
