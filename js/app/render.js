// Import fungsi bookmark
import { isBookmarked } from "./bookmark.js";


// ======================================================
// RENDER BAB
// ======================================================

export function renderBab(data) {

  return `

    <!-- ======================================
         JUDUL BAB
    ======================================= -->
    <section class="bab-header">

      <h2>
        ${data.title}
      </h2>

      <h4>
        <small>
          ${data.intro}
        </small>
      </h4>

    </section>


    <!-- ======================================
         DAFTAR BAIT
    ======================================= -->
    ${data.bait.map(item => {

      // Key unik tiap bait
      const key = `bait-${item.no}`;

      // Status bookmark
      const bookmarked =
        isBookmarked(key);


      return `

        <!-- ==================================
             CARD BAIT
        =================================== -->
        <article
  class="
    card
    ${bookmarked ? "bookmarked" : ""}
  "

  id="${key}"

  onclick="
    toggleCard('${key}')
  "
>


          <!-- ==============================
               NOMOR BAIT
          =============================== -->
          <div class="card-title">

            Bait ${item.no}

          </div>


          <!-- ==============================
               TEKS BAIT
          =============================== -->
          <div class="card-text">

            ${item.text}

          </div>


<!-- ==============================
     AKSI BAIT
============================== -->

<div class="card-actions">

  <!-- Bookmark -->
  <button

    class="
      btn-bookmark
      ${bookmarked ? "active" : ""}
    "

    data-bookmark="${key}"

    onclick="
    event.stopPropagation();
    toggleBookmark('${key}')
    "
  >

    ${bookmarked
      ? "★ Bookmarked"
      : "☆ Bookmark"}

  </button>


  <!-- Note -->
  <button

    class="btn-note"

    onclick="
    event.stopPropagation();
    toggleNote('${key}')
    "
  >

    📝 Catatan

  </button>


  <!-- Audio -->
  ${item.audio ? `

    <button

      class="btn-audio"

      onclick="
      event.stopPropagation();
      playAudio('${key}')
      "
    >

      ▶ Putar

    </button>

  ` : ""}

</div>


<!-- ==============================
     BOX CATATAN
============================== -->

<div
  class="note-box"
  id="note-${key}"
>

  <textarea
    placeholder="
    Tulis renunganmu...
    "
  ></textarea>

  <button

    onclick="
    event.stopPropagation();
    saveNote('${key}')
    "
  >

    Simpan

  </button>

</div>

<!-- ==============================
     AUDIO ELEMENT
============================== -->

${item.audio ? `

<audio
  id="audio-${key}"
  src="${item.audio}"
></audio>

` : ""}

        </article>

      `;

    }).join("")}

  `;

}