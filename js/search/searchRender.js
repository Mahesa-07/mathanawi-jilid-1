import { getSnippet }
from "./searchHelpers.js";



export function renderResults(

  container,
  data,
  query

){

  if(!data.length){

    container.innerHTML =

    `
    <div class="search-item">

      Tidak ditemukan

    </div>
    `;

    return;

  }



  container.innerHTML =

  data.map(item => `

    <div
      class="search-item"
      data-id="${item.no}"
      data-source="${item.source}"
    >

      <strong>

        Bait ${item.no}

      </strong>

      <small>

        ${getSnippet(
          item.text,
          query
        )}

      </small>

    </div>

  `).join("");

}