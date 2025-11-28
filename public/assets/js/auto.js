function updateFavicon(href) {
  if (!href) return;
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = href;
}

function toggleGlass(enabled) {
  if (enabled) {
    document.documentElement.style.setProperty("--glassmorphismBG", "rgba(0,0,0,1)");
  } else {
    document.documentElement.style.removeProperty("--glassmorphismBG");
  }
}

function applyStoredValues() {
  const savedTitle = localStorage.getItem("pageTitle");
  if (savedTitle) document.title = savedTitle;

  updateFavicon(localStorage.getItem("pageFavicon"));

  const backgroundURL = localStorage.getItem("backgroundURL");
  if (backgroundURL) {
    document.documentElement.style.setProperty("--backgroundURL", `url(${backgroundURL})`);
  }

  toggleGlass(localStorage.getItem("glassToggleStore") === "false");
}

function loadAntiClose() {
  let xyz = localStorage.getItem("checkAntiClose")
  if (xyz == "true") {
    window.addEventListener("beforeunload", function (event) {
      event.preventDefault();
      event.returnValue = "This maessage prevents teachers from closing the tab";
    });
    localStorage.setItem("checkAntiClose", "true");
  } else {
    localStorage.setItem("checkAntiClose", "false");
  }
}

window.addEventListener("storage", (event) => {
  switch (event.key) {
    case "pageTitle":
      if (event.newValue) document.title = event.newValue;
      break;
    case "pageFavicon":
      updateFavicon(event.newValue);
      break;
    case "backgroundURL":
      document.documentElement.style.setProperty("--backgroundURL", `url(${event.newValue})`);
      break;
    case "glassToggleStore":
      toggleGlass(event.newValue === "false");
      break;
    case "checkAntiClose":
        loadAntiClose();
  }
});

document.addEventListener("DOMContentLoaded", applyStoredValues);



