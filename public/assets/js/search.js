import {
  setTransport,
  setWisp,
  makeURL,
  proxySJ,
  proxyUV,
} from "../../lithium.mjs";
import("../../uv/uv.config.js");
let iframe;
let protocol = location.protocol === "https:" ? "wss://" : "ws://";
let host = location.host;

setWisp(`${protocol}${host}/wisp/`);
setTransport("epoxy");

document.addEventListener("keyup", async (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    let tabNumber = activeTabId.replace("tab", "");
    iframe = document.getElementById("frame" + tabNumber);
    if (
      //Checks for https in url
      input.value.trim().includes(".") &&
      !input.value.trim().startsWith("http://") &&
      !input.value.trim().startsWith("https://")
    ) {
      input.value = "https://" + input.value;
    }
    let loadingNotice = document.createElement("div");
    function loadingShow() {
      loadingNotice.className = "notice";
      loadingNotice.style.animation = "noticeShow 0.4s forwards";
      loadingNotice.textContent = "Loading...";
      document.body.appendChild(loadingNotice);
      console.log("Final URL:", input.value);
    }
    function loadingHide() {
      loadingNotice.textContent = "Done!";
      loadingNotice.style.animation = "noticeHide 0.4s ease 0.3s forwards";
    }

    loadingNotice.addEventListener("click", function () {
      loadingNotice.style.animation = "noticeHide 0.4s forwards";
    });
    let url;
    let proxyType = localStorage.getItem("proxyType"); //Checks for proxy
    if (proxyType === "SJ") {
      url = await proxySJ(makeURL(input.value));
      loadingShow();
      console.log("set to SJ");
    } else if (proxyType === "UV") {
      url = await proxyUV(makeURL(input.value));
      loadingShow();
      console.log("set to UV");
    } else {
      localStorage.setItem("proxyType", "SJ");
      proxyType = localStorage.getItem("proxyType");
      url = await proxySJ(makeURL(input.value));
      loadingShow();
      console.log("Not set");
    }
    iframe.src = url;
    if (proxyType === "SJ") {
      updateIframeTitle();

      input.value = getOriginalUrl(iframe.src);
    } else if (proxyType === "UV") {
      updateIframeTitle();

      input.value = __uv$config.decodeUrl(
        iframe.src.split(__uv$config.prefix)[1]
      );
    } else {
      updateIframeTitle();

      input.value = getOriginalUrl(iframe.src);
    }

    console.log("Loading URL in", iframe.id, ":", url);
    let currentTab = document.getElementById("tab" + tabNumber);
    let tabName = currentTab?.querySelector(".tabName");
    function updateIframeTitle() {
      iframe = document.getElementById(
        "frame" + activeTabId.replace("tab", "")
      );
      console.log("Updating title for iframe:", iframe.id);
      iframe.onload = () => {
        loadingHide();
        try {
          tabName.textContent =
            iframe.contentDocument?.title + " (" + proxyType + ")" ||
            "Untitled";
        } catch {
          tabName.textContent = "Cross-origin page";
        }
      };
    }
  }
});
