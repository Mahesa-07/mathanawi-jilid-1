// =========================
// MENU
// =========================

export function initMenu(){

  const menuBtn =
    document.getElementById("menuBtn");

  const closeBtn =
    document.getElementById("closeBtn");

  const sidebar =
    document.getElementById("sidebar");

  const overlay =
    document.getElementById("overlay");

  if(
    !menuBtn ||
    !closeBtn ||
    !sidebar ||
    !overlay
  ) return;

  // =========================
  // OPEN
  // =========================

  function openSidebar(){

    sidebar.classList.add("active");

    overlay.classList.add("active");
  }

  // =========================
  // CLOSE
  // =========================

  function closeSidebar(){

    sidebar.classList.remove("active");

    overlay.classList.remove("active");
  }

  // =========================
  // BUTTON EVENTS
  // =========================

  menuBtn.addEventListener(
    "click",
    openSidebar
  );

  closeBtn.addEventListener(
    "click",
    closeSidebar
  );

  // =========================
  // CLICK OUTSIDE
  // =========================

  overlay.addEventListener(
    "click",
    closeSidebar
  );

}