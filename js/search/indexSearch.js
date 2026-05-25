import { searchIndex }
from "./searchData.js";

import { filterSearch }
from "./searchEngine.js";

import { renderResults }
from "./searchRender.js";



export function initSearch(){

  const searchBtn =
  document.getElementById(
  "searchBtn"
  );

  const searchOverlay =
  document.getElementById(
  "searchOverlay"
  );

  const closeSearch =
  document.getElementById(
  "closeSearch"
  );

  const searchInput =
  document.getElementById(
  "searchInput"
  );

  const searchResults =
  document.getElementById(
  "searchResults"
  );

  const app =
  document.getElementById(
  "app"
  );



  if(

    !searchBtn ||
    !searchOverlay ||
    !closeSearch ||
    !searchInput ||
    !searchResults

  ){

    console.warn(
      "Search tidak lengkap"
    );

    return;

  }



  // =========================
  // OPEN
  // =========================

  searchBtn.addEventListener(
  "click",
  ()=>{

    searchOverlay
    .classList
    .add("active");

    searchInput.focus();

  });



  // =========================
  // CLOSE
  // =========================

  function closeSearchOverlay(){

    searchOverlay
    .classList
    .remove("active");

    searchInput.value = "";

    searchResults.innerHTML = "";

  }

  closeSearch.addEventListener(
  "click",
  closeSearchOverlay
  );



  // =========================
  // ESC
  // =========================

  document.addEventListener(
  "keydown",
  (e)=>{

    if(
      e.key === "Escape"
    ){

      closeSearchOverlay();

    }

  });



  // =========================
  // INPUT
  // =========================

  searchInput.addEventListener(
  "input",
  (e)=>{

    const query =

    (
      e.target.value || ""
    )

    .trim()
    .toLowerCase();



    if(!query){

      searchResults.innerHTML = "";

      return;

    }



    const filtered =

    filterSearch(
      searchIndex,
      query
    );



    renderResults(

      searchResults,
      filtered,
      query

    );

  });



  // =========================
  // CLICK RESULT
  // =========================

  searchResults.addEventListener(
  "click",
  (e)=>{

    const item =
    e.target.closest(
    ".search-item"
    );

    if(!item) return;



    const id =
    item.dataset.id;

    const source =
    item.dataset.source;

    const currentBab =
    app?.dataset?.bab;



    if(
      source !== currentBab
    ){

      window.location.href =

      `../pages/${source}.html#bait-${id}`;

      return;

    }



    const target =

    document.getElementById(
    `bait-${id}`
    );



    if(target){

      target.scrollIntoView({

        behavior:
        "smooth",

        block:
        "center"

      });

      target.classList.add(
      "highlight"
      );



      setTimeout(()=>{

        target.classList.remove(
        "highlight"
        );

      },1200);

    }



    closeSearchOverlay();

  });

}