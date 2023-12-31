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
const toggleButton = document.getElementById("toggleButton");
const body = document.body;
const currentMode = localStorage.getItem("mode");

// Checks local storage for time of day
if (currentMode === "nighttime") {
  body.classList.add("nighttime");
  toggleButton.classList.add("daytime");
  toggleButton.classList.remove("nighttime");
} else {
  localStorage.setItem("mode", "daytime");
  body.classList.remove("nighttime");
  toggleButton.classList.add("nighttime");
  toggleButton.classList.remove("daytime");
}

// On click of time of day button, switch between day or night
toggleButton.addEventListener("click", () => {
  body.classList.toggle("nighttime");

  if (currentMode === "nighttime") {
    localStorage.setItem("mode", "daytime");
  } else {
    localStorage.setItem("mode", "nighttime");
  }

  if (toggleButton.classList.contains("nighttime")) {
    toggleButton.classList.add("daytime");
    toggleButton.classList.remove("nighttime");
  } else {
    toggleButton.classList.add("nighttime");
    toggleButton.classList.remove("daytime");
  }
});

// Random Value Function for Animations
function applyRandomValueToElements(selector, className) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.style.setProperty("--random-value", Math.random());
  });
}

// Assets in main hero background
applyRandomValueToElements("#trees-left .cls-4");
applyRandomValueToElements("#trees-right .cls-4");
applyRandomValueToElements("#trees-3 .cls-7");
applyRandomValueToElements("#stars .cls-11");

// Update hero background view box
const mediaQuery = window.matchMedia("(max-width: 768px)");
const svgElement = document.getElementById("mountains-bg");

function updateViewBox() {
  if (mediaQuery.matches) {
    svgElement.setAttribute("viewBox", "700 0 992 850");
  } else {
    svgElement.setAttribute("viewBox", "0 0 1920 850");
  }
}

mediaQuery.addEventListener("change", updateViewBox);
updateViewBox();

// Parallax hero background effect
const scrollEl = document.documentElement;
const root = document.documentElement;

let scrollPos;

// update css property on scroll
function animation() {
  // check the scroll position has changed
  if (scrollPos !== scrollEl.scrollTop) {
    // reset the seen scroll position
    scrollPos = scrollEl.scrollTop;
    // update css property --scrollPos with scroll position in pixels
    root.style.setProperty("--scrollPos", scrollPos + "px");
  }

  // call animation again on next animation frame
  window.requestAnimationFrame(animation);
}

// start animation on next animation frame
window.requestAnimationFrame(animation);
