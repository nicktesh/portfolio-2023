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

/**
 * Fetches project data and dynamically generates project cards and modals.
 *
 * This script waits for the DOM content to be fully loaded, then:
 * 1. Fetches project data from a `projects.json` file.
 * 2. Creates and appends project cards to the `projects-container`.
 * 3. Creates and appends corresponding modals to the `modal-container`.
 * 4. Adds event listeners for opening and closing the modals.
 * 5. Enables closing modals by clicking outside the modal content.
 *
 */
document.addEventListener("DOMContentLoaded", () => {
  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      const projectsContainer = document.getElementById("projects-container");
      const modalContainer = document.getElementById("modal-container");

      data.forEach((project) => {
        // Create project card
        const card = document.createElement("div");
        card.classList.add("col-lg-4");
        card.innerHTML = `
          <div class="card-wrapper">
            <div class="image-wrapper">
              <figure>
                <img src="${project.image}" alt="${project.title}" />
              </figure>
            </div>
            <div class="content-wrapper">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <button class="primary-btn" data-project-id="${project.id}">VIEW ${project.title.toUpperCase()} PROJECT</button>
              <div class="content-tags">
                ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
            </div>
          </div>
        `;
        projectsContainer.appendChild(card);

        // Create project modal
        const dialog = document.createElement("dialog");
        dialog.classList.add("dialog");
        dialog.setAttribute("id", `${project.id}-modal`);
        dialog.innerHTML = `
          <div class="dialog-content">
            <button class="close" data-project-id="${project.id}">&times;</button>
            <div class="scroll-indicator"></div>
            <h2>${project.title}</h2>
            <p>${project.overview}</p>
            ${project.roleText ? `<h3>My Role</h3><p>${project.roleText}</p><ul>${project.roles.map((role) => `<li>${role}</li>`).join("")}</ul>` : ""}
            <h3>Technologies Used</h3>
            <ul>${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}</ul>
            ${project.highlights.length ? `<h3>Project Highlights</h3><ul>${project.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>` : ""}
            ${
              project.screenshots.length
                ? `<h3>Screenshots from Live Site</h3>${project.screenshots
                    .map(
                      (screenshot) => `
              <div class="img-wrapper">
                <h4>${screenshot.title}</h4>
                <img data-src="${screenshot.src}" alt="${screenshot.title}" width="800"/>
              </div>`
                    )
                    .join("")}`
                : ""
            }
            ${project.link ? `<a href="${project.link}" class="primary-btn" target="_blank">VIEW PROJECT ON GITHUB</a>` : ""}
            ${project.liveSite ? `<p><strong>${project.liveSiteText}</strong></p><a href="${project.liveSite}" class="primary-btn" target="_blank">VIEW LIVE SITE</a>` : ""}
          </div>
        `;
        modalContainer.appendChild(dialog);
      });

      // Event listeners for opening modals
      document.querySelectorAll(".primary-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
          const projectId = event.currentTarget.getAttribute("data-project-id");
          const modal = document.getElementById(`${projectId}-modal`);
          modal.showModal();

          // Lazy load images in the modal
          modal.querySelectorAll("img[data-src]").forEach((img) => {
            img.setAttribute("src", img.getAttribute("data-src"));
            img.removeAttribute("data-src");
          });
        });
      });

      // Event listeners for closing modals
      document.querySelectorAll(".close").forEach((button) => {
        button.addEventListener("click", (event) => {
          const projectId = event.currentTarget.getAttribute("data-project-id");
          const modal = document.getElementById(`${projectId}-modal`);
          modal.close();
        });
      });

      // Close modal when clicking outside of the modal content
      document.addEventListener("click", (event) => {
        if (event.target.tagName === "DIALOG") {
          event.target.close();
        }
      });
    })
    .catch((error) => console.error("Error fetching project data:", error));
});
