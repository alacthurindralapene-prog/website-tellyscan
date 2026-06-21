/* ===================== BARCODE SCAN ===================== */
let currentManpower = null;

const inpBarcode = document.getElementById("inpBarcode");

inpBarcode.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    lookupBarcode(inpBarcode.value.trim());
  }
});

async function lookupBarcode(code) {
  const card = document.getElementById("scanCard");
  if (!code) return;

  const entry = await Api.lookupManpower(code);

  if (entry) {
    currentManpower = { id: code, nama: entry.nama, unit: entry.unit };
    document.getElementById("scanCardEmpty").style.display = "none";
    document.getElementById("scanCardFilled").style.display = "block";
    document.getElementById("scanName").textContent = entry.nama;
    document.getElementById("scanMeta").textContent = `ID ${code} · ${entry.unit}`;
    card.classList.remove("shake");
    card.classList.add("found");
    document.getElementById("inpJumlah").focus();

    // Log the raw scan event to the backend (fire-and-forget)
    Api.postScanEvent({ barcode: code, waktu: new Date().toISOString() });
  } else {
    currentManpower = null;
    document.getElementById("scanCardEmpty").style.display = "block";
    document.getElementById("scanCardEmpty").textContent =
      "ID Barcode Tidak Terdaftar!";
    document.getElementById("scanCardFilled").style.display = "none";
    card.classList.remove("found");
    card.classList.add("shake");
    setTimeout(() => card.classList.remove("shake"), 420);
    showToast("ID Barcode Tidak Terdaftar!", "error");
  }
  renderStepper();
}
