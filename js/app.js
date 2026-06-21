/* ===================== APP BOOTSTRAP ===================== */
let appInitDone = false;

function initApp() {
  if (appInitDone) return;
  appInitDone = true;
  const now = new Date();
  document.getElementById("inpTanggal").value =
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  renderStepper();
  renderLog();
  document.getElementById("inpBarcode").focus();
}

/* ===================== Mobile tab switching ===================== */
function switchTab(tab) {
  const formPanel = document.getElementById("panelForm");
  const logPanel = document.getElementById("panelLog");
  const btnForm = document.getElementById("tabBtnForm");
  const btnLog = document.getElementById("tabBtnLog");
  if (tab === "form") {
    formPanel.classList.add("active");
    logPanel.classList.remove("active");
    btnForm.classList.add("active");
    btnLog.classList.remove("active");
  } else {
    logPanel.classList.add("active");
    formPanel.classList.remove("active");
    btnLog.classList.add("active");
    btnForm.classList.remove("active");
  }
}
