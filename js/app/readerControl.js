// ==========================================
// readerControl.js
// TYPE MODULE
// ==========================================

export function initReaderControl(){

  // ----------------------------------------
  // ELEMENT
  // ----------------------------------------

  const body = document.body;

  const openSearchBtn =
  document.getElementById(
    'openSearch'
  );

  const fontMinusBtn =
  document.getElementById(
    'fontMinus'
  );

  const fontPlusBtn =
  document.getElementById(
    'fontPlus'
  );

  const toggleThemeBtn =
  document.getElementById(
    'toggleTheme'
  );

  const toggleSidebarBtn =
  document.getElementById(
    'toggleSidebar'
  );

  // ========================================
  // FONT SYSTEM
  // ========================================

  const FONT_KEY =
  'reader-font-size';

  let currentFontSize =
  parseInt(
    localStorage.getItem(FONT_KEY)
  ) || 16;

  function applyFontSize(){

    document.documentElement.style
    .setProperty(
      '--reader-font-size',
      `${currentFontSize}px`
    );

    localStorage.setItem(
      FONT_KEY,
      currentFontSize
    );
  }

  // FONT +

  fontPlusBtn?.addEventListener(
    'click',
    () => {

      if(currentFontSize >= 26)
        return;

      currentFontSize++;

      applyFontSize();
    }
  );

  // FONT -

  fontMinusBtn?.addEventListener(
    'click',
    () => {

      if(currentFontSize <= 12)
        return;

      currentFontSize--;

      applyFontSize();
    }
  );

  // ========================================
  // THEME
  // ========================================

  const THEME_KEY =
  'reader-theme';

  function applyTheme(theme){

    body.dataset.theme = theme;

    localStorage.setItem(
      THEME_KEY,
      theme
    );

    toggleThemeBtn.textContent =
      theme === 'dark'
      ? '☀'
      : '☾';
  }

  const savedTheme =
  localStorage.getItem(THEME_KEY)
  || 'dark';

  applyTheme(savedTheme);

  toggleThemeBtn?.addEventListener(
    'click',
    () => {

      const currentTheme =
      body.dataset.theme;

      const nextTheme =
      currentTheme === 'dark'
      ? 'light'
      : 'dark';

      applyTheme(nextTheme);
    }
  );

  // ========================================
  // SIDEBAR
  // ========================================

  toggleSidebarBtn?.addEventListener(
    'click',
    () => {

      body.classList.toggle(
        'sidebar-open'
      );
    }
  );

  // ========================================
  // SEARCH
  // ========================================

  openSearchBtn?.addEventListener(
    'click',
    () => {

      body.classList.toggle(
        'search-open'
      );

      const searchInput =
      document.querySelector(
        '#searchInput'
      );

      searchInput?.focus();
    }
  );

  // ========================================
  // INIT
  // ========================================

  applyFontSize();

}