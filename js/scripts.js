/**
 * Mobile Menu Toggle
 *
 * Toggles the mobile menu, overlay, and body scroll on click of the menu toggle button.
 * Ensures the menu and overlay open/close smoothly and prevents body scroll when the menu is open.
 *
 */
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

/**
 * Home Page Banner - Day/Night Mode Toggle
 *
 * Toggles between day and night modes based on the button click and saves the mode in local storage.
 * Automatically sets the initial mode based on the saved preference in local storage.
 *
 */
const toggleButton = document.getElementById("toggleButton");
const body = document.body;
let currentMode = localStorage.getItem("mode");

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
  currentMode = localStorage.getItem("mode");

  if (currentMode === "nighttime") {
    localStorage.setItem("mode", "daytime");
  } else {
    localStorage.setItem("mode", "nighttime");
  }

  toggleButton.classList.toggle("daytime");
  toggleButton.classList.toggle("nighttime");
});

/**
 * Function to apply random values to elements for animations
 *
 * Applies a random value to a CSS variable for each selected element.
 * This random value can be used to create dynamic animations in CSS.
 *
 */
function applyRandomValueToElements(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.style.setProperty("--random-value", Math.random());
  });
}

// Apply random values to specific elements
applyRandomValueToElements("#trees-left .cls-4");
applyRandomValueToElements("#trees-right .cls-4");
applyRandomValueToElements("#trees-3 .cls-7");
applyRandomValueToElements("#stars .cls-11");

/**
 * Update hero background viewBox based on screen width
 *
 * Updates the viewBox attribute of an SVG element to ensure it looks good on different screen widths.
 * Uses a media query to determine the appropriate viewBox values.
 *
 */
const mediaQuery = window.matchMedia("(max-width: 768px)");
const svgElement = document.getElementById("mountains-bg");

function updateViewBox() {
  if (mediaQuery.matches) {
    svgElement.setAttribute("viewBox", "700 0 992 850");
  } else {
    svgElement.setAttribute("viewBox", "0 0 1920 850");
  }
}

if (svgElement) {
  mediaQuery.addEventListener("change", updateViewBox);
  updateViewBox();
}

/**
 * Parallax hero background effect
 *
 * Creates a parallax scrolling effect by updating a CSS variable with the scroll position.
 * This variable can be used in CSS to create a parallax effect on the hero background.
 *
 */
const scrollEl = document.documentElement;
const root = document.documentElement;

let scrollPos;

// Update css property on scroll
function animation() {
  // Check the scroll position has changed
  if (scrollPos !== scrollEl.scrollTop) {
    // Reset the seen scroll position
    scrollPos = scrollEl.scrollTop;
    // Update css property --scrollPos with scroll position in pixels
    root.style.setProperty("--scrollPos", scrollPos + "px");
  }

  // Call animation again on next animation frame
  window.requestAnimationFrame(animation);
}

// Start animation on next animation frame
window.requestAnimationFrame(animation);

/**
 * Function to update the copyright year dynamically
 *
 * Updates the text content of the copyright element with the current year.
 * Ensures the displayed year is always up-to-date.
 *
 */
function updateCopyrightYear() {
  const year = new Date().getFullYear();
  const copyrightElement = document.getElementById("copyright");

  // Ensure the element exists before attempting to update its content
  if (copyrightElement) {
    copyrightElement.textContent = `© ${year} Nick Tesh - All Rights Reserved.`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCopyrightYear();
});

/**
 * Function to close the mobile menu and overlay
 *
 * Closes the mobile menu and overlay, and enables body scrolling.
 * Removes the appropriate classes from the relevant elements.
 *
 */
function closeMobileMenu() {
  document.querySelectorAll(".mobile-menu, .mob-overlay, .mobile-menu-toggle, body").forEach((el) => {
    el.classList.remove(el.matches(".mobile-menu, .mob-overlay") ? "open" : el.matches(".mobile-menu-toggle") ? "close" : "scroll");
  });
}

// Close Mobile Menu after clicking anchor link
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".mobile-menu ul li a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
});

/**
 * This script adds smooth scrolling behavior to anchor links on the portfolio page.
 * When an anchor link is clicked, the page will smoothly scroll to the corresponding section.
 *
 */
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href*="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").split("#")[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });

        // Update the URL hash without jumping to the section
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
});

/**
 * This script sets up a series of Highcharts polar column charts to display proficiency levels
 * across various categories including Front-End, Back-End, Tools & Platforms, and Design & Accessibility.
 *
 * - `retroColors`: An array of hex color codes used to style the chart series.
 * - `generateSeriesData`: A function to map proficiency data to the chart series, assigning colors from `retroColors`.
 * - `sharedChartOptions`: A common set of chart options to ensure consistency across all charts.
 * - `createChart`: A function to initialize a Highcharts chart with provided container, title, categories, and data.
 * - `chartData`: An array of objects containing the configuration data for each chart (container, title, categories, data).
 * - Initialization: Iterates over `chartData` to create each chart using the `createChart` function.
 *
 */
const retroColors = ["#ef6262", "#f3ac74", "#e3c78a", "#98c1d9", "#5e81ac", "#d08770", "#a3be8c", "#b48ead"];

// Function to generate series data with colors
const generateSeriesData = (data) => {
  return data.map((value, index) => ({
    y: value,
    color: retroColors[index % retroColors.length],
  }));
};

// Shared chart options
const sharedChartOptions = {
  chart: {
    polar: true,
    type: "column",
    backgroundColor: "transparent",
  },
  pane: {
    size: "85%",
  },
  yAxis: {
    min: 0,
    max: 10,
    tickInterval: 1,
    endOnTick: false,
    showLastLabel: true,
    labels: {
      enabled: false,
    },
    gridLineInterpolation: "polygon",
    title: {
      text: null,
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 600,
        },
        chartOptions: {
          pane: {
            size: "70%",
          },
          xAxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
    ],
  },
};

// Function to create chart
const createChart = (container, title, categories, data) => {
  Highcharts.chart(container, {
    ...sharedChartOptions,
    title: {
      text: title,
      style: {
        color: "#202020",
      },
    },
    xAxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "15px",
          fontWeight: "700",
          fontFamily: "Cabin, sans-serif",
          color: "#202020",
        },
      },
      tickmarkPlacement: "on",
      lineWidth: 0,
    },
    series: [
      {
        name: "Proficiency Level",
        data: generateSeriesData(data),
        pointPlacement: "on",
      },
    ],
  });
};

// Data for charts
const chartData = [
  {
    container: "frontendChart",
    title: "Front-End",
    categories: ["HTML/CSS", "SCSS", "JavaScript", "React", "jQuery", "Bootstrap", "Chart.js", "Highcharts"],
    data: [10, 10, 9, 7, 8, 10, 7, 7],
  },
  {
    container: "backendChart",
    title: "Back-End",
    categories: ["PHP", "Node.js", "MySQL", "MongoDB", "Puppeteer"],
    data: [9, 7, 8, 5, 8],
  },
  {
    container: "toolsChart",
    title: "Tools & Platforms",
    categories: ["Git", "GitHub", "AWS", "Docker"],
    data: [8, 9, 7, 5],
  },
  {
    container: "designChart",
    title: "Design & Accessibility",
    categories: ["Figma", "Adobe Suite", "ADA Standards", "WCAG 2.2", "SEO"],
    data: [10, 10, 9, 9, 8],
  },
];

// Create all charts
chartData.forEach(({ container, title, categories, data }) => {
  createChart(container, title, categories, data);
});
