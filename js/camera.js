/* ===================== CAMERA (simulated scan) ===================== */
// Variabel global untuk menyimpan status kamera
let html5QrCodeScanner = null;

async function startRealCameraScan() {
  const btn = document.getElementById("btnCamera");
  const cameraContainer = document.getElementById("camera-container");

  // Fitur Toggle: Jika kamera sedang menyala, klik tombol lagi untuk mematikan
  if (html5QrCodeScanner) {
    stopCameraScan();
    return;
  }

  // Efek Loading & Notifikasi bawaan kamu
  btn.textContent = "⏳";
  showToast("Mengaktifkan kamera, arahkan ke barcode...", "info");

  // Munculkan wadah kamera
  cameraContainer.style.display = "block";

  // Jalankan library scan pada wadah yang sudah dibuat
  html5QrCodeScanner = new Html5Qrcode("camera-container");

  const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 }, // Kotak pemandu scan di tengah layar
  };

  // Jika kamera BERHASIL membaca barcode
  const onScanSuccess = (decodedText, decodedResult) => {
    // Memasukkan hasil scan asli ke input field kamu
    inpBarcode.value = decodedText;

    // Menjalankan fungsi pencarian data barang milikmu
    lookupBarcode(decodedText);

    showToast("Barcode berhasil dideteksi!", "success");

    // Tutup kamera otomatis
    stopCameraScan();
  };

  // Jika gagal mendeteksi saat kamera standby (dibiarkan kosong)
  const onScanFailure = (error) => {};

  // Mulai buka kamera belakang (untuk HP) atau webcam (untuk Laptop)
  html5QrCodeScanner
    .start({ facingMode: "environment" }, config, onScanSuccess, onScanFailure)
    .then(() => {
      // Jika kamera berhasil terbuka, ubah ikon tombol menjadi tombol "Tutup/Cancel"
      btn.textContent = "❌";
    })
    .catch((err) => {
      // Jika izin kamera ditolak oleh pengguna
      showToast("Gagal mengakses kamera. Pastikan izin diberikan.", "error");
      btn.textContent = "📷";
      cameraContainer.style.display = "none";
      html5QrCodeScanner = null;
      console.error("Gagal membuka kamera:", err);
    });
}

// Fungsi untuk mematikan kamera secara bersih
function stopCameraScan() {
  const btn = document.getElementById("btnCamera");
  const cameraContainer = document.getElementById("camera-container");

  if (html5QrCodeScanner) {
    html5QrCodeScanner
      .stop()
      .then(() => {
        html5QrCodeScanner = null;
        btn.textContent = "📷"; // Kembalikan ikon tombol ke kamera
        cameraContainer.style.display = "none"; // Sembunyikan wadah video
      })
      .catch((err) => {
        console.error("Gagal menghentikan kamera:", err);
      });
  }
}
// ... (kode bagian atas tetap sama)

  // Jendela kamera muncul
  cameraContainer.style.display = "block";

  html5QrCodeScanner = new Html5Qrcode("camera-container");

  // --- PERBAIKAN DI BAGIAN CONFIG INI ---
  const config = {
    fps: 15, // Dinaikkan sedikit agar scanning barcode garis lebih sensitif
    qrbox: { width: 300, height: 150 }, // Kotak disesuaikan menjadi persegi panjang agar pas dengan bentuk barcode garis
    
    // Wajib daftarkan format CODE_39 agar library mengaktifkan sensor barcode garis
    formatsToSupport: [ 
      Html5QrcodeSupportedFormats.CODE_39,
      Html5QrcodeSupportedFormats.QR_CODE // Tetap dukung QR Code jika sewaktu-waktu butuh
    ]
  };
  // --------------------------------------

  const onScanSuccess = (decodedText, decodedResult) => {
    // Hasil scan barcode Code 39 biasanya otomatis mengikutsertakan tanda bintang (*) di hasilnya.
    // Kita bersihkan tanda bintangnya agar teksnya bersih saat masuk ke input field.
    const cleanText = decodedText.replace(/\*/g, ""); 

    inpBarcode.value = cleanText;
    lookupBarcode(cleanText);
    
    showToast("Barcode berhasil dideteksi!", "success");
    stopCameraScan();
  };

  // ... (sisa kode ke bawah seperti stopCameraScan() tetap sama seperti sebelumnya)
