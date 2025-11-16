const currentSiteUrl = window.location.href + "?redirect=true";
function launchBlob() {
  const htmlContent = `
    <html>
      <head>
        <title>Galaxy</title>
        <style>
          body,
          html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #000;
          }
          iframe {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe src="${currentSiteUrl}"></iframe>
      </body>
    </html>
	`;

  const blob = new Blob([htmlContent], {
    type: "text/html",
  });

  const blobUrl = URL.createObjectURL(blob);

  let newWindow = window.open(blobUrl);
  if (newWindow) {
    newWindow.onload = () => {
      newWindow.document.title = "Galaxy";
    };
  }
}

function aboutBlank() {
  var y = window.open("about:blank#", "_blank");
  y.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
            <title>Classroom</title>
        </head>
        <body>
          <iframe src="${currentSiteUrl}"></iframe>
        </body>
        <style>
    body,iframe {
    background: #000;

    height: 100vh;
    width: 100vw;
    overflow: hidden;
    border: 0px;
    margin: 0px;
    }
    </style>
      </html>
    `);
  y.document.close();
}
const blobChecked = document.getElementById("autoBlob");
const aboutChecked = document.getElementById("autoAbout");

blobChecked.checked = localStorage.getItem("autoBlob") === "true";
aboutChecked.checked = localStorage.getItem("autoAbout") === "true";

function auto() {
  localStorage.setItem("autoBlob", blobChecked.checked);
  localStorage.setItem("autoAbout", aboutChecked.checked);

  if (blobChecked.checked) {
    launchBlob();
  }

  if (aboutChecked.checked) {
    aboutBlank();
  }

  if (aboutChecked.checked) {
    location.replace(
      "https://lightingshovestature.com/pwy8jeq59?key=00e97abb2b6ada2db15543761f62ca2d"
    );
  }
}

auto();
function updateTitleAndFavicon(titleName, faviconURL) {
  localStorage.setItem("pageTitle", titleName);
  localStorage.setItem("pageFavicon", faviconURL);
  document.title = titleName;
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = faviconURL;
}

function loadTitleAndFavicon() {
  const savedTitle = localStorage.getItem("pageTitle");
  const savedFavicon = localStorage.getItem("pageFavicon");
  if (savedTitle || savedFavicon) {
    if (savedTitle) document.title = savedTitle;
    if (savedFavicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = savedFavicon;
    }
  }
}

function updateName() {
  const nameInput = document.getElementById("nameInput");

  nameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      localStorage.setItem("name", nameInput.value);
      console.log("Name saved:", nameInput.value);
    }
  });
}

updateName();
function setBackground(bg) {
  localStorage.setItem("backgroundURL", bg);
  let backgroundURL = localStorage.getItem("backgroundURL");
  document.documentElement.style.setProperty(
    "--backgroundURL",
    `url(${backgroundURL})`
  );
}
function setProxyType(x){
  localStorage.setItem("proxyType", x);
}
function setSearchEngine(z) {
  localStorage.setItem("searchEngine", z);
}
const intervalId = setInterval(() => {
  loadTitleAndFavicon();
  document.documentElement.style.setProperty(
    "--backgroundURL",
    `url(${backgroundURL})`
  );
}, 1000);

setTimeout(() => clearInterval(intervalId), 10000);
