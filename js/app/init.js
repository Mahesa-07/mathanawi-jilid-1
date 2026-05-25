/* ========================================================
   CORE
======================================================== */

import { initMenu }
from "./menu.js";

import { initTheme }
from "../theme.js";

import { initFloatingButton }
from "../floating.js";



/* ========================================================
   NAVIGATION
======================================================== */

import { renderNav }
from "./nav-list.js";

import { renderNav0 }
from "./nav0.js";

import { daftarBab }
from "../data/daftarBab.js";

import { daftarBab0 }
from "../data/daftarBab0.js";



/* ========================================================
   DATA
======================================================== */

import { babMap }
from "../data/databab.js";

import { initRender }
from "./renderApp.js";



/* ========================================================
   BOOKMARK SYSTEM
======================================================== */

import {

  toggleBookmark,
  removeBookmark,

  toggleNote,
  saveNote,
  removeNote,

  toggleCard,

  playAudio,

  initBookmarkListener

} from "./bookmark.js";



/* ========================================================
   FEATURES
======================================================== */

import { initSearch }
from "./search/indexSearch.js";

import { initClickSound }
from "./sound.js";

import {

  initHeaderHide,
  initReadingProgress

} from "./headerBar.js";



/* ========================================================
   APP INIT
======================================================== */

document.addEventListener(

  "DOMContentLoaded",

  () => {

    /* =========================
       CORE
    ========================= */

    initMenu();

    initTheme();

    initFloatingButton();


    /* =========================
       NAVIGATION
    ========================= */

    renderNav0(
      daftarBab0
    );

    renderNav(
      daftarBab
    );


    /* =========================
       DATA
    ========================= */

    initRender(
      babMap
    );


    /* =========================
       SIDEBAR
    ========================= */

    initBookmarkListener();


    /* =========================
       FEATURES
    ========================= */

    initSearch();

    initClickSound();

    initHeaderHide();

    initReadingProgress();


    /* =========================
       GLOBAL INLINE SUPPORT
    ========================= */

    // bookmark

    window.toggleBookmark =
      toggleBookmark;

    window.removeBookmark =
      removeBookmark;


    // note

    window.toggleNote =
      toggleNote;

    window.saveNote =
      saveNote;

    window.removeNote =
      removeNote;


    // card

    window.toggleCard =
      toggleCard;


    // audio

    window.playAudio =
      playAudio;

  }

);