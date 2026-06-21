/* ===================== LOGIN / PIN GATE ===================== */
let pinBuffer = "";

function renderPinDots(state) {
  const dots = document.querySelectorAll(".pin-dot");
  dots.forEach((d, i) => {
    d.classList.remove("filled", "error");
    if (state === "error") {
      d.classList.add("error");
    } else if (i < pinBuffer.length) {
      d.classList.add("filled");
    }
  });
}

function pinPress(digit) {
  if (pinBuffer.length >= 4) return;
  pinBuffer += digit;
  renderPinDots();
  if (pinBuffer.length === 4) {
    setTimeout(checkPin, 180);
  }
}

function pinBackspace() {
  pinBuffer = pinBuffer.slice(0, -1);
  renderPinDots();
}

function pinClear() {
  pinBuffer = "";
  renderPinDots();
}

function checkPin() {
  if (pinBuffer === CORRECT_PIN) {
    doLogin();
  } else {
    renderPinDots("error");
    document.getElementById("loginCard").classList.add("shake");
    setTimeout(() => {
      document.getElementById("loginCard").classList.remove("shake");
      pinBuffer = "";
      renderPinDots();
    }, 420);
  }
}

function doLogin() {
  document.getElementById("screenLogin").style.transition = "opacity .35s";
  document.getElementById("screenLogin").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("screenLogin").style.display = "none";
    document.getElementById("screenApp").style.display = "block";
    initApp();
  }, 350);
}

function logout() {
  document.getElementById("screenApp").style.display = "none";
  document.getElementById("screenLogin").style.display = "flex";
  document.getElementById("screenLogin").style.opacity = "1";
  pinBuffer = "";
  renderPinDots();
}

document.addEventListener("keydown", (e) => {
  if (document.getElementById("screenLogin").style.display !== "none") {
    if (/^[0-9]$/.test(e.key)) pinPress(e.key);
    if (e.key === "Backspace") pinBackspace();
  }
});

renderPinDots();
