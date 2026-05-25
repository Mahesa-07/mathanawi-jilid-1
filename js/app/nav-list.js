// =========================================
// Fungsi untuk menampilkan daftar navigasi bab
// =========================================
export function renderNav(data) {

  // Cari elemen tempat daftar navigasi akan dimasukkan
  // Contoh HTML:
  // <ul id="tab-bab"></ul>
  const nav = document.getElementById("tab-bab");


  // Jika elemen tidak ditemukan
  // hentikan fungsi
  if (!nav) return;


  // =========================================
  // ISI HTML NAVIGASI
  // =========================================

  // data.map(...)
  // digunakan untuk mengubah array menjadi HTML

  nav.innerHTML = data.map((item, index) => `

    <!-- Item daftar -->
    <li class="nav-item">

      <!-- Link menuju halaman/bab -->
      <a href="${item.link}" onclick="closeSidebar?.()">

        <!-- Nomor otomatis + judul -->
        📖  ${index}. ${item.title}

      </a>

    </li>

  `).join("");

}