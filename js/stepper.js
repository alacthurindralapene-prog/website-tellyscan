/* ===================== STEPPER (procedure) ===================== */
const STEPS = [
  { no: 1, label: "Login", check: () => true },
  {
    no: 2,
    label: "Tanggal Produksi",
    check: () => !!document.getElementById("inpTanggal").value,
  },
  {
    no: 3,
    label: "Pilih Supervisor",
    check: () => !!document.getElementById("selSpv").value,
  },
  { no: 4, label: "Pilih Komoditas", check: () => !!selectedKomoditas },
  { no: 5, label: "Scan Manpower", check: () => !!currentManpower },
  {
    no: 6,
    label: "Size & Jumlah",
    check: () =>
      !!selectedSize &&
      parseInt(document.getElementById("inpJumlah").value, 10) > 0,
  },
];

function renderStepper() {
  const wrap = document.getElementById("stepper");
  let activeFound = false;
  wrap.innerHTML = STEPS.map((s) => {
    const done = s.check();
    let cls = "step";
    if (done) {
      cls += " done";
    } else if (!activeFound) {
      cls += " active";
      activeFound = true;
    }
    return `<div class="${cls}"><span class="step-num">${done ? "✓" : s.no}</span>${s.label}</div>`;
  }).join("");
}

function onFieldChange() {
  renderStepper();
}

function onSpvChange() {
  const v = document.getElementById("selSpv").value;
  document.getElementById("topbarSpvName").textContent = v || "Belum dipilih";
  renderStepper();
}
