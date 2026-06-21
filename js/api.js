/* ===================== API CLIENT ===================== */
// Thin wrapper around fetch() calls to the backend (see backend/server.js).
// Falls back to local mock data in config.js if the backend is unreachable,
// so the UI keeps working in pure front-end demo mode.
const Api = {
  async lookupManpower(code) {
    try {
      const res = await fetch(`${API_BASE_URL}/manpower/${encodeURIComponent(code)}`);
      if (res.ok) {
        return await res.json();
      }
      if (res.status === 404) return null;
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      console.warn("Backend tidak tersedia, memakai data lokal:", err.message);
      return MANPOWER_DB[code] || null;
    }
  },

  async postScanEvent(payload) {
    try {
      await fetch(`${API_BASE_URL}/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("Gagal mengirim event scan ke backend:", err.message);
    }
  },

  async submitProductionEntry(entry) {
    const res = await fetch(`${API_BASE_URL}/scan/entry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async fetchSupervisors() {
    try {
      const res = await fetch(`${API_BASE_URL}/supervisors`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn("Gagal memuat daftar supervisor dari backend:", err.message);
      return null;
    }
  },
};

/* ===================== SYNC ANIMATION (Google Sheets) ===================== */
function runSyncAnimation(entry) {
  const statusWrap = document.getElementById("syncStatus");
  const statusText = document.getElementById("syncStatusText");
  statusWrap.classList.remove("ok");
  statusText.textContent = "Mengirim ke Google Sheets...";

  Api.submitProductionEntry(entry)
    .catch((err) => console.warn("Sinkron backend gagal, animasi tetap lanjut:", err.message))
    .finally(() => {
      statusWrap.classList.add("ok");
      statusText.textContent = `Tersinkron · ${entry.namaManpower} · ${entry.hasilKerjaPcs} pcs (${entry.jamInput})`;
      showToast(
        `Data ${entry.namaManpower} tersimpan & tersinkron ke Google Sheet.`,
        "success",
      );
    });
}
