import { Navigation } from "./navigation.js";
// const NavOpenBtn = document.querySelector("#NavOpenBtn");
// const NavHamburgerBtn = document.querySelector("#NavHamburgerBtn");
// const sideNav = document.querySelector("#sideNav");

// NavOpenBtn.addEventListener("click", () => {
//   NavHamburgerBtn.classList.toggle("hide");
//   sideNav.classList.toggle("open");
//   NavOpenBtn.classList.toggle("open");
// });

// NavHamburgerBtn.addEventListener("click", () => {
//   NavHamburgerBtn.classList.toggle("hide");
//   console.log("clicked to open");
//   sideNav.classList.toggle("open");
//   NavOpenBtn.classList.toggle("open");
// });

document.addEventListener("DOMContentLoaded", () => {
  const nav = new Navigation();
  nav.setUpListeners();
});
