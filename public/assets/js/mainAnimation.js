if (localStorage.getItem("onboarding") == null) {
  location.href = "onboarding/";
} else {
  
}
let UserName = localStorage.getItem("name");
let backgroundURL = localStorage.getItem("backgroundURL");
if (backgroundURL == null) {
  localStorage.setItem("backgroundURL", "assets/img/bg3.png");
} else {
}
backgroundURL = localStorage.getItem("backgroundURL");

document.documentElement.style.setProperty(
  "--backgroundURL",
  `url(${backgroundURL})`
);

