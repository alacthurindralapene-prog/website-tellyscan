/* ===================== CONFIG ===================== */
// Base URL of the backend API (see backend/server.js)
const API_BASE_URL = "http://localhost:3000/api";

// Simulated login PIN (replace with real auth via backend/routes/authRoutes.js)
const CORRECT_PIN = "0000";

// Local fallback mock data — used only if the backend manpower lookup
// (GET /api/manpower/:id) is unreachable. In normal operation the
// barcode module calls the backend instead of reading this object.
const MANPOWER_DB = {
  12345: { nama: "Ahmad Subarjo", unit: "Lini A" },
  12346: { nama: "Hikma", unit: "Lini A" },
  100222: { nama: "njhee", unit: "Lini A" },
  12347: { nama: "della", unit: "Lini A" },
  67890: { nama: "Siti Aminah", unit: "Lini B" },
  55555: { nama: "Budi Santoso", unit: "Lini C" },
};
const BARCODE_LIST = Object.keys(MANPOWER_DB);
