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
function applyStoredValues() {
  const savedTitle = localStorage.getItem("pageTitle");
  if (savedTitle) document.title = savedTitle;

  updateFavicon(localStorage.getItem("pageFavicon"));

  const backgroundURL = localStorage.getItem("backgroundURL");
  if (backgroundURL) {
    document.documentElement.style.setProperty(
      "--backgroundURL",
      `url(${backgroundURL})`
    );
  }
}

function loadAntiClose() {
  let xyz = localStorage.getItem("checkAntiClose");
  if (xyz == "true") {
    window.addEventListener("beforeunload", function (event) {
      event.preventDefault();
      event.returnValue =
        "This maessage prevents teachers from closing the tab";
    });
    localStorage.setItem("checkAntiClose", "true");
  } else {
    localStorage.setItem("checkAntiClose", "false");
  }
}
function updateName() {
  let x = localStorage.getItem("name");

  document.querySelector(".userName").textContent = x;
}



function updateGlassmorphismDarkness() {
let opacityValue = localStorage.getItem("glassDarknessStore") || "0.432";
  const newGlassmorphismBG = `rgba(14, 13, 13, ${opacityValue})`;
  document.documentElement.style.setProperty(
    "--glassmorphismBG",
    newGlassmorphismBG
  );
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
      document.documentElement.style.setProperty(
        "--backgroundURL",
        `url(${event.newValue})`
      );
      break;
    case "glassDarknessStore":
      updateGlassmorphismDarkness();
      break;
    case "checkAntiClose":
      loadAntiClose();
      break;
    case "name":
      updateName();
      break;
  }
});

document.addEventListener("DOMContentLoaded", applyStoredValues);
document.addEventListener("DOMContentLoaded", updateGlassmorphismDarkness);
