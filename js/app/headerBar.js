// =========================
// HEADER AUTO HIDE (IMPROVED)
// =========================

export function initHeaderHide() {

  const header = document.querySelector(".app-header");
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener("scroll", () => {

    const current = window.scrollY;

    if (!ticking) {

      window.requestAnimationFrame(() => {

        // scroll down → hide
        if (current > lastScroll && current > 80) {
          header.classList.add("hide");
        }

        // scroll up → show
        else {
          header.classList.remove("hide");
        }

        lastScroll = current;
        ticking = false;

      });

      ticking = true;
    }

  }, { passive: true });
}


// =========================
// READING PROGRESS BAR (IMPROVED)
// =========================

export function initReadingProgress() {

  const progressBar = document.getElementById("readingProgress");
  if (!progressBar) return;

  let ticking = false;

  window.addEventListener("scroll", () => {

    if (!ticking) {

      window.requestAnimationFrame(() => {

        const scrollTop = window.scrollY;

        const docHeight =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const progress =
          docHeight > 0
            ? (scrollTop / docHeight) * 100
            : 0;

        progressBar.style.width = `${progress}%`;

        ticking = false;
      });

      ticking = true;
    }

  }, { passive: true });
}




