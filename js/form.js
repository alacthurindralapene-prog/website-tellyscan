/* ===================== FORM STATE ===================== */
let selectedKomoditas = null;
let selectedSize = null;
let logCounter = 0;

function pad(n) {
  return n.toString().padStart(2, "0");
}

/* ===== Komoditas / Size segmented ===== */
function selectKomoditas(val) {
  selectedKomoditas = val;
  document.querySelectorAll("#segKomoditas .seg-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.val === val);
  });
  renderStepper();
}

function selectSize(val) {
  selectedSize = val;
  document.querySelectorAll("#segSize .seg-btn").forEach((b) => {
    b.classList.toggle("size-active", b.dataset.val === val);
  });
  renderStepper();
}

/* ===== Reset (Bersihkan Form) ===== */
function clearScanArea() {
  currentManpower = null;
  inpBarcode.value = "";
  document.getElementById("inpJumlah").value = "";
  selectedSize = null;
  document
    .querySelectorAll("#segSize .seg-btn")
    .forEach((b) => b.classList.remove("size-active"));
  const card = document.getElementById("scanCard");
  card.classList.remove("found", "shake");
  document.getElementById("scanCardEmpty").style.display = "block";
  document.getElementById("scanCardEmpty").textContent =
    "Belum ada karyawan di-scan.";
  document.getElementById("scanCardFilled").style.display = "none";
  renderStepper();
  inpBarcode.focus();
}

function resetForm() {
  clearScanArea();
  showToast("Area scan, size & jumlah dibersihkan. Tanggal & SPV tetap.", "info");
}

/* ===== Submit ===== */
async function submitEntry() {
  const tanggal = document.getElementById("inpTanggal").value;
  const spv = document.getElementById("selSpv").value;

  if (!tanggal) {
    showToast("Tanggal Produksi wajib diisi.", "error");
    return;
  }
  if (!spv) {
    showToast("Pilih Nama Supervisor terlebih dahulu.", "error");
    document.getElementById("selSpv").focus();
    return;
  }
  if (!selectedKomoditas) {
    showToast("Pilih Komoditas / Jenis Produk.", "error");
    return;
  }
  if (!currentManpower) {
    showToast("Scan barcode manpower terlebih dahulu.", "error");
    inpBarcode.focus();
    return;
  }
  if (!selectedSize) {
    showToast("Pilih Size / Ukuran produk.", "error");
    return;
  }
  const jumlah = parseInt(document.getElementById("inpJumlah").value, 10);
  if (!jumlah || jumlah < 1) {
    showToast("Jumlah Hasil Kerja minimal 1 pcs.", "error");
    document.getElementById("inpJumlah").focus();
    return;
  }

  const now = new Date();
  logCounter++;
  const entry = {
    id: logCounter,
    tanggal: tanggal,
    jamInput: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    supervisor: spv,
    idManpower: currentManpower.id,
    namaManpower: currentManpower.nama,
    jenisProduk: selectedKomoditas,
    size: selectedSize,
    hasilKerjaPcs: jumlah,
  };

  logData.unshift(entry);
  renderLog();
  runSyncAnimation(entry);
  clearScanArea();
}
