//Sub-menu height fix
$(document).ready(function () {
  // Check window width
  if ($(window).width() > 1200) {
    // Get all elements with class .sub-menu
    let subMenus = $(".sub-menu");

    // Loop through each .sub-menu element and check its height
    subMenus.each(function () {
      // get height of the element
      let height = $(this).height();
      if (height > 500) {
        // if height is greater than 500px
        $(this).css("max-height", "500px");
        $(this).css("overflow-y", "scroll");
        $(this).css("overflow-x", "hidden");
      }
    });
  }
});
// Mobile Menu
if (document.querySelector(".mobile-menu")) {
  const menu = document.querySelector(".mobile-menu");
  const menuToggleButton = document.querySelector(".mobile-menu-toggle");
  const body = document.querySelector("body");
  const overlay = document.querySelector(".mob-overlay");

  menuToggleButton.addEventListener("click", function () {
    menu.classList.toggle("open");
    overlay.classList.toggle("open");
    menuToggleButton.classList.toggle("close");
    body.classList.toggle("scroll");
  });
}
// Home Page Banner
const banner = document.getElementById("banner");
const toggleButton = document.getElementById("toggleButton");
const menuToggleButton = document.querySelector(".mobile-menu-toggle");
const mainLogo = document.querySelector(".main-logo");
const heroBGDesktop = document.querySelector(".hero-background.desktop");
const heroBGMobile = document.querySelector(".hero-background.mobile");

toggleButton.addEventListener("click", () => {
  banner.classList.toggle("nighttime");
  menuToggleButton.classList.toggle("dark");
  mainLogo.classList.toggle("dark");
  if (toggleButton.innerText === "Nighttime") {
    toggleButton.innerText = "Daytime";
    heroBGDesktop.src = "images/mountains-night.svg";
    heroBGMobile.src = "images/mountains-night-mobile.svg";
  } else {
    toggleButton.innerText = "Nighttime";
    heroBGDesktop.src = "images/mountains-day.svg";
    heroBGMobile.src = "images/mountains-day-mobile.svg";
  }
});
