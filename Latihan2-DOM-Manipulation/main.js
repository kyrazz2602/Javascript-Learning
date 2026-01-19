/* =========================================
   BAGIAN 1: MEMANIPULASI ATRIBUT
   ========================================= */

// Mengambil elemen gambar
const gambar = document.getElementById("gambar");

// Mengubah atribut width dan height
// Browser otomatis mengkonversi angka 300 menjadi string "300px" (attribute value)
gambar.setAttribute("width", 300);
gambar.setAttribute("height", 215);

/* =========================================
   BAGIAN 2: MEMILIH ELEMENT & TRAVERSING
   ========================================= */

// Mengambil semua elemen yang punya class .button
const buttons = document.querySelectorAll(".button");

// Mengambil tombol ke-4 (index 3)
const playButtonContainer = buttons[3];

// Mengambil anak pertama dari div tersebut (yaitu tag <button>)
const playButtonElement = playButtonContainer.children[0];

// Menambahkan atribut disabled agar tombol tidak bisa diklik
playButtonElement.setAttribute("disabled", true);

/* =========================================
   BAGIAN 3: MEMANIPULASI KONTEN
   ========================================= */

const dicoding = document.getElementById("dicodingLink");
const google = document.getElementById("googleLink");

// innerText: Mengubah teks biasa (aman dari injeksi kode)
// (Baris ini akan tertimpa oleh innerHTML di bawahnya)
dicoding.innerText = "Belajar Programming di Dicoding";
google.innerText = "Mencari sesuatu di Google";

// innerHTML: Mengubah konten termasuk menerjemahkan tag HTML (seperti <i>, <b>)
dicoding.innerHTML = "<i>Belajar Programming di Dicoding</i>";
google.innerHTML = "<b>Mencari Sesuatu di Google</b>";

/* =========================================
   BAGIAN 4: MEMANIPULASI STYLE
   ========================================= */

// Looping untuk mengubah gaya semua tombol sekaligus
for (const buttonContainer of buttons) {
  const btn = buttonContainer.children[0];

  // Ingat: style property di JS menggunakan camelCase (borderRadius, bukan border-radius)
  btn.style.color = "red";
  btn.style.borderRadius = "6px";
}

// Mengubah warna link satu per satu
dicoding.style.color = "blue";
google.style.color = "green";

/* =========================================
   BAGIAN 5: MENAMBAHKAN ELEMEN (appendChild)
   ========================================= */
// appendChild menambahkan elemen di urutan PALING TERAKHIR dari induknya.

// 1. Kita buat dulu elemen baru di memori (belum tampil di layar)
const newElement = document.createElement("li");

// 2. Kita isi teksnya
newElement.innerText = "Selamat Menikmati! (Hasil appendChild)";

// 3. Kita panggil elemen induknya (Parent) tempat kita mau menempel
const daftar = document.getElementById("daftar");

// 4. Tempelkan! (Akan muncul di paling bawah list)
daftar.appendChild(newElement);

/* =========================================
   BAGIAN 6: MENYISIPKAN ELEMEN (insertBefore)
   ========================================= */
// insertBefore menyisipkan elemen SEBELUM elemen tertentu.

// 1. Buat elemen baru
const elementAwal = document.createElement("li");
elementAwal.innerText = "Hidupkan Kompor (Hasil insertBefore)";

// 2. Tentukan elemen referensi (Patokan)
// Kita ingin menyisipkan SEBELUM elemen dengan id="awal"
const itemAwal = document.getElementById("awal");

// 3. Eksekusi
// parent.insertBefore(elemenBaru, elemenPatokan);
daftar.insertBefore(elementAwal, itemAwal);

/* =========================================
   BAGIAN 7: MENGHAPUS ELEMEN (removeChild)
   ========================================= */
// removeChild menghapus anak elemen dari induknya.

// 1. Pilih elemen yang mau dihapus
const akhir = document.getElementById("akhir");

// 2. Panggil parent-nya, lalu suruh hapus child-nya
// parent.removeChild(elementAnak);
daftar.removeChild(akhir);
