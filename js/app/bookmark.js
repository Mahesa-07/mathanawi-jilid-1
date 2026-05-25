/* ========================================================
   FILE : bookmark.js
   DESKRIPSI :
   Bookmark + Note + Sidebar + Audio
   Matsnawi Digital
======================================================== */


/* ========================================================
   STORAGE KEYS
======================================================== */

const BOOKMARK_KEY = "bookmark";
const NOTE_KEY = "notes";


/* ========================================================
   STORAGE HELPERS
======================================================== */

function getBookmarks(){

  try{

    return JSON.parse(
      localStorage.getItem(BOOKMARK_KEY) || "[]"
    );

  }catch(error){

    console.error(
      "Gagal membaca bookmark:",
      error
    );

    return [];
  }
}


function saveBookmarks(data){

  localStorage.setItem(
    BOOKMARK_KEY,
    JSON.stringify(data)
  );
}


function getNotes(){

  try{

    return JSON.parse(
      localStorage.getItem(NOTE_KEY) || "{}"
    );

  }catch(error){

    console.error(
      "Gagal membaca notes:",
      error
    );

    return {};
  }
}


function saveNotes(data){

  localStorage.setItem(
    NOTE_KEY,
    JSON.stringify(data)
  );
}


/* ========================================================
   BOOKMARK SYSTEM
======================================================== */

export function toggleBookmark(id){

  const data = getBookmarks();

  const index = data.findIndex(
    item => item.id === id
  );


  // remove bookmark

  if(index > -1){

    data.splice(index,1);

    showToast("Bookmark dihapus");

  }

  // add bookmark

  else{

    data.unshift({

      id,

      halaman:
      location.pathname,

      label:
      formatLabel(id)

    });

    showToast("Bookmark disimpan");
  }


  saveBookmarks(data);

  updateBookmarkUI(id);

  dispatchBookmarkUpdate();
}


/**
 * cek bookmark
 */
export function isBookmarked(id){

  return getBookmarks().some(
    item => item.id === id
  );
}


/**
 * update tombol bookmark
 */
function updateBookmarkUI(id){

  const btn = document.querySelector(
    `[data-bookmark="${id}"]`
  );

  if(!btn) return;


  const active =
    isBookmarked(id);


  btn.classList.toggle(
    "active",
    active
  );


  btn.innerHTML = active
    ? "★ Marked"
    : "☆ Bookmark";
}


/* ========================================================
   NOTE SYSTEM
======================================================== */

/**
 * toggle note box
 */
export function toggleNote(id){

  const note =
    document.getElementById(
      `note-${id}`
    );

  if(!note) return;

  note.classList.toggle("show");
}


/**
 * simpan note
 */
export function saveNote(id){

  const box =
    document.getElementById(
      `note-${id}`
    );

  if(!box) return;


  const textarea =
    box.querySelector("textarea");

  if(!textarea) return;


  const notes =
    getNotes();


  notes[id] = {

    text:
    textarea.value.trim(),

    halaman:
    location.pathname

  };


  saveNotes(notes);

  box.classList.remove("show");

  showToast(
    "Catatan tersimpan ✔"
  );

  dispatchBookmarkUpdate();
}


/**
 * load note
 */
export function loadNote(id){

  const box =
    document.getElementById(
      `note-${id}`
    );

  if(!box) return;


  const textarea =
    box.querySelector("textarea");

  if(!textarea) return;


  const notes =
    getNotes();

  textarea.value =
    notes[id]?.text || "";
}


/* ========================================================
   CARD SYSTEM
======================================================== */

/**
 * toggle action card
 */
export function toggleCard(id){

  const card =
    document.getElementById(id);

  if(!card) return;

  card.classList.toggle("active");
}


/* ========================================================
   AUDIO PLAYER
======================================================== */

let currentAudio = null;


/**
 * play audio + auto next
 */
export async function playAudio(key){

  const audio =
    document.getElementById(
      `audio-${key}`
    );

  if(!audio) return;


  // stop previous audio

  if(
    currentAudio &&
    currentAudio !== audio
  ){

    currentAudio.pause();

    currentAudio.currentTime = 0;
  }


  // pause current audio

  if(!audio.paused){

    audio.pause();

    return;
  }


  try{

    await audio.play();

    currentAudio = audio;

  }catch(error){

    console.error(
      "Audio gagal diputar:",
      error
    );

    return;
  }


  // auto next

  audio.onended = () => {

    const currentNumber =
      parseInt(
        key.replace("bait-",""),
        10
      );

    if(isNaN(currentNumber)) return;


    const nextKey =
      `bait-${currentNumber + 1}`;


    const nextCard =
      document.getElementById(nextKey);

    const nextAudio =
      document.getElementById(
        `audio-${nextKey}`
      );


    if(!nextCard || !nextAudio){

      currentAudio = null;

      return;
    }


    nextCard.scrollIntoView({

      behavior:"smooth",

      block:"center"
    });


    setTimeout(() => {

      playAudio(nextKey);

    },600);

  };
}


/* ========================================================
   SIDEBAR BOOKMARK
======================================================== */

export function renderBookmark(){

  const el =
    document.getElementById(
      "tab-bookmark"
    );

  if(!el) return;


  const data =
    getBookmarks();


  // empty state

  if(!data.length){

    el.innerHTML = `

      <li class="empty">
        Belum ada bookmark
      </li>

    `;

    return;
  }


  // render

  el.innerHTML = data.map(item => `

    <li class="bookmark-item">

      <span
        onclick="
          goToBookmark(
            '${item.halaman}',
            '${item.id}'
          )
        "
      >

        ⭐ ${item.label}

      </span>

      <button
        class="remove-btn"
        onclick="
          removeBookmark(
            '${item.id}'
          )
        "
      >

        −

      </button>

    </li>

  `).join("");
}


/* ========================================================
   REMOVE BOOKMARK
======================================================== */

export function removeBookmark(id){

  const data =
    getBookmarks().filter(

      item =>
      item.id !== id

    );


  saveBookmarks(data);

  showToast(
    "Bookmark dihapus"
  );

  dispatchBookmarkUpdate();
}


/* ========================================================
   SIDEBAR NOTES
======================================================== */

export function renderNotes(){

  const el =
    document.getElementById(
      "tab-note"
    );

  if(!el) return;


  const notes =
    getNotes();


  const entries =
    Object.entries(notes)
    .reverse();


  // empty state

  if(!entries.length){

    el.innerHTML = `

      <li class="empty">
        Belum ada catatan
      </li>

    `;

    return;
  }


  // render

  el.innerHTML = entries.map(

    ([id,item]) => `

      <li class="note-item">

        <div
          onclick="
            goToBookmark(
              '${item.halaman}',
              '${id}'
            )
          "
        >

          <div class="note-title">

            📝 ${formatLabel(id)}

          </div>

          <div class="note-preview">

            ${
              item.text
              ? item.text.slice(0,60)
              : ""
            }

          </div>

        </div>

        <button
          class="remove-btn"
          onclick="
            removeNote('${id}')
          "
        >

          −

        </button>

      </li>

    `

  ).join("");
}


/* ========================================================
   REMOVE NOTE
======================================================== */

export function removeNote(id){

  const notes =
    getNotes();


  if(notes[id]){

    delete notes[id];

    saveNotes(notes);

    showToast(
      "Catatan dihapus"
    );

    dispatchBookmarkUpdate();
  }
}


/* ========================================================
   NAVIGATION
======================================================== */

window.goToBookmark = function(
  halaman,
  id
){

  location.href =
    `${halaman}#${id}`;
};


window.removeBookmark =
  removeBookmark;

window.removeNote =
  removeNote;


/* ========================================================
   LISTENER
======================================================== */

function dispatchBookmarkUpdate(){

  window.dispatchEvent(

    new Event(
      "bookmark-updated"
    )

  );
}


export function initBookmarkListener(){

  const refresh = () => {

    renderBookmark();

    renderNotes();
  };


  refresh();


  window.addEventListener(

    "bookmark-updated",

    refresh
  );
}


/* ========================================================
   HELPERS
======================================================== */

function formatLabel(id){

  return id.replace(
    "bait-",
    "Bait "
  );
}


/* ========================================================
   TOAST
======================================================== */

let toastTimeout;


/**
 * toast notification
 */
function showToast(message){

  let toast =
    document.getElementById(
      "toast"
    );


  // create

  if(!toast){

    toast =
      document.createElement("div");

    toast.id = "toast";


    toast.style.cssText = `

      position:fixed;

      left:50%;
      bottom:20px;

      transform:
      translateX(-50%);

      padding:10px 14px;

      border-radius:12px;

      background:
      rgba(0,0,0,.88);

      color:#fff;

      font-size:13px;

      z-index:9999;

      opacity:0;

      transition:
      opacity .25s ease,
      transform .25s ease;

      backdrop-filter:
      blur(12px);

      pointer-events:none;

    `;

    document.body.appendChild(
      toast
    );
  }


  clearTimeout(toastTimeout);


  // show

  toast.textContent = message;

  toast.style.opacity = "1";

  toast.style.transform =
    "translateX(-50%) translateY(0)";


  // hide

  toastTimeout =
    setTimeout(() => {

      toast.style.opacity = "0";

      toast.style.transform =
        "translateX(-50%) translateY(6px)";

    },1400);
}