/* =========================================
   BAGIAN 1: DOM SELECTION
   ========================================= */
const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

/* =========================================
   BAGIAN 2: EVENT LISTENERS
   ========================================= */
myForm.addEventListener("submit", onSubmit);
document.addEventListener("DOMContentLoaded", loadUsersFromStorage);

// EVENT BARU: Mendeteksi klik pada area Daftar User (untuk tombol delete)
userList.addEventListener("click", removeUser);

/* =========================================
   BAGIAN 3: FUNGSI UTAMA (Logika Submit)
   ========================================= */
function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || emailInput.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "Mohon isi semua kolom!";
    setTimeout(() => msg.remove(), 3000);
  } else {
    console.log('Success');
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
    };

    saveToLocalStorage(newUser);
    addUserToUI(newUser);

    nameInput.value = "";
    emailInput.value = "";
  }
}

/* =========================================
   BAGIAN 4: FUNGSI MENAMPILKAN DATA (UI)
   ========================================= */
function addUserToUI(user) {
  const li = document.createElement("li");

  // Masukkan teks Nama : Email
  li.appendChild(document.createTextNode(`${user.name} : ${user.email}`));

  // --- BARU: Membuat Tombol Delete ---
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn"; // Pakai style CSS yg baru kita buat
  deleteBtn.appendChild(document.createTextNode("X"));

  // Masukkan tombol ke dalam li
  li.appendChild(deleteBtn);

  // Masukkan li ke ul
  userList.appendChild(li);
}

/* =========================================
   BAGIAN 5: FUNGSI HAPUS DATA (UI & STORAGE)
   ========================================= */
function removeUser(e) {
  // Kita cek: Apakah yang diklik itu elemen yang punya class 'delete-btn'?
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      // 1. Ambil elemen <li> (induk dari tombol)
      const li = e.target.parentElement;

      // 2. Hapus dari Layar (UI)
      userList.removeChild(li);

      // 3. Hapus dari Local Storage
      // Kita kirim elemen 'li' ini ke fungsi penghapus storage
      removeUserFromStorage(li);
    }
  }
}

/* =========================================
   BAGIAN 6: LOCAL STORAGE MANAGEMENT
   ========================================= */

function saveToLocalStorage(user) {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

function loadUsersFromStorage() {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  users.forEach(function (user) {
    addUserToUI(user);
  });
}

// --- BARU: Fungsi Hapus Spesifik dari Storage ---
function removeUserFromStorage(liItem) {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }

  // Masalah: Text di li adalah "Nama : EmailX" (huruf X dari tombol ikut terbaca)
  // Solusi: Kita ambil text-nya saja, lalu buang huruf terakhir (tombol X)

  // Ambil isi text dari li, contoh: "Arizal : ari@gmail.com"
  // (firstChild adalah text node sebelum tombol button)
  const liText = liItem.firstChild.textContent;

  // Pecah text berdasarkan tanda " : "
  // "Arizal : ari@gmail.com" -> Menjadi Array ["Arizal", "ari@gmail.com"]
  const splitText = liText.split(" : ");
  const emailToDelete = splitText[1]; // Kita pakai Email sebagai patokan unik

  // Looping dan Filter
  // Kita cari posisi user yang emailnya sama dengan yang mau dihapus
  users.forEach(function (user, index) {
    if (user.email === emailToDelete) {
      // Splice artinya memotong array
      // (Mulai dari index ke berapa, hapus berapa item)
      users.splice(index, 1);
    }
  });

  // Simpan array yang sudah terpotong kembali ke gudang
  localStorage.setItem("users", JSON.stringify(users));
}
