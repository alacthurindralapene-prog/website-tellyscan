/* ===================== LOG STATE & RENDER ===================== */
let logData = [];

function renderLog() {
  const tbody = document.getElementById("logTableBody");
  const cardList = document.getElementById("cardList");
  const hasData = logData.length > 0;

  document.getElementById("logCountPill").textContent = `${logData.length} entri`;
  document.getElementById("tabLogCount").textContent = logData.length
    ? `(${logData.length})`
    : "";
  document.getElementById("emptyStateDesktop").style.display = hasData ? "none" : "block";
  document.getElementById("emptyStateMobile").style.display = hasData ? "none" : "block";

  tbody.innerHTML = logData
    .map(
      (e, i) => `
    <tr class="${i === 0 ? "row-new" : ""}">
      <td class="mono">${e.tanggal}</td>
      <td class="mono">${e.jamInput}</td>
      <td>${e.supervisor}</td>
      <td class="mono">${e.idManpower}</td>
      <td>${e.namaManpower}</td>
      <td><span class="badge badge-komoditas">${e.jenisProduk}</span></td>
      <td><span class="badge badge-size">${e.size}</span></td>
      <td class="num-pcs">${e.hasilKerjaPcs}</td>
    </tr>
  `,
    )
    .join("");

  cardList.innerHTML = logData
    .map(
      (e) => `
    <div class="log-card">
      <div class="log-card-top">
        <span class="log-card-name">${e.namaManpower}</span>
        <span class="log-card-time">${e.jamInput}</span>
      </div>
      <div class="log-card-mid">
        <span class="log-card-id">ID ${e.idManpower}</span>
        <span class="badge badge-komoditas">${e.jenisProduk}</span>
        <span class="badge badge-size">${e.size}</span>
      </div>
      <div class="log-card-bottom">
        <span class="log-card-spv">SPV: ${e.supervisor}</span>
        <span class="log-card-pcs">${e.hasilKerjaPcs} pcs</span>
      </div>
    </div>
  `,
    )
    .join("");

  document.getElementById("jsonContent").textContent = JSON.stringify(
    logData.map((e) => ({
      tanggal: e.tanggal,
      jamInput: e.jamInput,
      namaSupervisor: e.supervisor,
      idManpower: e.idManpower,
      namaManpower: e.namaManpower,
      jenisProduk: e.jenisProduk,
      size: e.size,
      hasilKerjaPcs: e.hasilKerjaPcs,
    })),
    null,
    2,
  );
}

function toggleJson() {
  const box = document.getElementById("jsonBox");
  const icon = document.getElementById("jsonToggleIcon");
  box.classList.toggle("open");
  icon.textContent = box.classList.contains("open") ? "▴" : "▾";
}
