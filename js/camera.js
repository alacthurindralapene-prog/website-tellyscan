/* ===================== CAMERA (simulated scan) ===================== */
function simulateCameraScan() {
  const btn = document.getElementById("btnCamera");
  btn.textContent = "⏳";
  showToast("Mengaktifkan kamera, arahkan ke barcode...", "info");
  setTimeout(() => {
    const randomCode = BARCODE_LIST[Math.floor(Math.random() * BARCODE_LIST.length)];
    inpBarcode.value = randomCode;
    lookupBarcode(randomCode);
    btn.textContent = "📷";
  }, 1100);
}
