// =========================================
// Fungsi untuk mengaktifkan sistem tab sidebar
// =========================================
export function initSidebarTabs() {

  // Ambil semua tombol tab
  // Contoh elemen:
  // <button class="tab-btn" data-tab="bookmark">
  const buttons = document.querySelectorAll(".tab-btn");

  // Ambil semua isi/content tab
  // Contoh:
  // <div class="tab-content" id="tab-bookmark">
  const contents = document.querySelectorAll(".tab-content");


  // Loop semua tombol tab
  // forEach = jalankan fungsi untuk setiap item
  buttons.forEach(btn => {

    // Tambahkan event click ke setiap tombol
    btn.addEventListener("click", () => {

      // =========================================
      // 1. RESET STATUS ACTIVE PADA SEMUA TOMBOL
      // =========================================

      // Hapus class "active" dari semua tombol
      buttons.forEach(b => b.classList.remove("active"));

      // Tambahkan class "active"
      // ke tombol yang sedang diklik
      btn.classList.add("active");


      // =========================================
      // 2. AMBIL TARGET TAB
      // =========================================

      // Ambil isi data-tab dari tombol
      // Misalnya:
      // data-tab="bookmark"
      // maka target = "bookmark"
      const target = btn.dataset.tab;


      // =========================================
      // 3. RESET SEMUA CONTENT TAB
      // =========================================

      // Hilangkan class active
      // dari semua isi tab
      contents.forEach(c => c.classList.remove("active"));


      // =========================================
      // 4. TAMPILKAN CONTENT YANG DIPILIH
      // =========================================

      // Cari elemen berdasarkan id
      // contoh:
      // "tab-" + "bookmark"
      // hasilnya:
      // "tab-bookmark"
      const el = document.getElementById("tab-" + target);


      // Jika elemen ditemukan
      if (el) {

        // Tambahkan class active
        // supaya content muncul
        el.classList.add("active");

      }

    });

  });

}