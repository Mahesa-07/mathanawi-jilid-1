export function renderBookmark() {

  const el = document.getElementById("tab-bookmark");
  if (!el) return;

  const data = JSON.parse(localStorage.getItem("bookmark") || "[]");

  if (data.length === 0) {
    el.innerHTML = `<li class="empty">Belum ada bookmark</li>`;
    return;
  }

  el.innerHTML = data.map(id => `
    <li class="bookmark-item" onclick="scrollToBait('${id}')">
      ⭐ ${formatLabel(id)}
    </li>
  `).join("");
}


// helper biar lebih enak dibaca
function formatLabel(id) {
  // bait-1 -> Bait 1
  return id.replace("bait-", "Bait ");
}