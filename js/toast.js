/* ===================== TOAST ===================== */
function showToast(message, type = "info") {
  const stack = document.getElementById("toastStack");
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  const icon = type === "error" ? "⚠️" : type === "success" ? "✓" : "ℹ️";
  el.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .3s, transform .3s";
    el.style.opacity = "0";
    el.style.transform = "translateY(-6px)";
    setTimeout(() => el.remove(), 300);
  }, 2800);
}
