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

gsap.fromTo(
  ".navStagger",
  {
    y: 30,
    opacity: 0,
  },
  {
    duration: 0.4,
    y: 0,
    opacity: 1,
    stagger: 0.1,
  }
);
const windowEl = document.createElement("div");
const iframe = document.createElement("iframe");
let windowValue = "1";

function openWindow(windowSrc) {
  windowEl.className = "window";
  windowEl.style.position = "absolute";
  windowEl.style.left = "500px";
  windowEl.style.top = "100px";
  windowEl.style.boxSizing = "border-box";

  windowEl.innerHTML = `
    <div class="windowTop">
      <div class="windowMove"></div>
      <div class="windowControls">
        <div class="minimize windowcontrolicon" onclick="minimizeWindow">
          <img src="assets/img/icons/minimize-sign.png" class="windowIcons" id="minimize"/>
        </div>
        <div class="square windowcontrolicon" onclick="changeIcon()">
          <img src="assets/img/icons/stop.png" class="windowIcons" id="square" />
          <img src="assets/img/icons/layers.png" class="windowIcons" id="squares" />
        </div>
        <div class="closeIcon windowcontrolicon windowcontroliconred" onclick="closeWindow()">
          <img src="assets/img/icons/close.png" class="windowIcons" id="closeWindow"/>
        </div>
      </div>
    </div>
    <div class="resize-handle" style="
      position: absolute; width: 15px; height: 15px; right: 0; bottom: 0;
      cursor: se-resize; background: transparent;"></div>
  `;

  iframe.className = "windowFrame";
  iframe.src = windowSrc;
  iframe.style.width = "100%";
  iframe.style.border = "none";
  windowEl.appendChild(iframe);
  document.body.appendChild(windowEl);

  const controls = windowEl.querySelector(".windowMove");
  const resizeHandle = windowEl.querySelector(".resize-handle");

  let isDragging = false;
  let isResizing = false;
  let offset = { x: 0, y: 0 };

  controls.addEventListener("mousedown", (e) => {
    if (windowValue === "1") {
      isDragging = true;
      offset.x = e.clientX - windowEl.offsetLeft;
      offset.y = e.clientY - windowEl.offsetTop;
      iframe.style.pointerEvents = "none";
    } else {
      changeIcon();
      windowEl.style.animation = "minimize 0.5s ease forwards";
      windowEl.style.top = "0px";
      isDragging = true;
      offset.x = e.clientX - windowEl.offsetLeft;
      offset.y = e.clientY - windowEl.offsetTop;
      iframe.style.pointerEvents = "none";
    }
  });

  // --- resizing stuff
  resizeHandle.addEventListener("mousedown", (e) => {
    isResizing = true;
    offset.x = e.clientX;
    offset.y = e.clientY;
    iframe.style.pointerEvents = "none";
    e.stopPropagation();
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      const winW = windowEl.offsetWidth;
      const winH = windowEl.offsetHeight;
      const maxX = window.innerWidth - winW;
      const maxY = window.innerHeight - winH;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      windowEl.style.left = newX + "px";
      windowEl.style.top = newY + "px";
    }

    if (isResizing) {
      const newWidth = Math.max(200, e.clientX - windowEl.offsetLeft);
      const newHeight = Math.max(150, e.clientY - windowEl.offsetTop);
      windowEl.style.width = newWidth + "px";
      windowEl.style.height = newHeight + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    isResizing = false;
    iframe.style.pointerEvents = "auto";
  });
}

// NAV BAR FUNCTIONS
openWindow("p.html");
let square = document.getElementById("square");
let squares = document.getElementById("squares");
function changeIcon() {
  if (windowValue === "1") {
    square.style.display = "none";
    squares.style.display = "flex";
    windowValue = "0";
    console.log(windowValue);
    windowEl.style.left = "0px";
    windowEl.style.top = "0px";
    windowEl.style.animation = "maximize 0.5s ease forwards";
  } else {
    squares.style.display = "none";
    square.style.display = "flex";
    windowValue = "1";
    console.log(windowValue);
    windowEl.style.left = "500px";
    windowEl.style.top = "200px";
    windowEl.style.animation = "minimize 0.5s ease forwards";
  }
}
function closeWindow() {
  windowEl.style.animation = "closeWindow 0.2s ease forwards";
  windowEl.addEventListener("animationend", () =>{
  windowEl.remove()
  })
}
