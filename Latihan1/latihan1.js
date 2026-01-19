/* =========================================
   BAGIAN 1: VARIABEL (VARIABLES)
   ========================================= */

// 1. var (Cara Lama)
// - Scope: Global/Function. Rawan bug, hindari penggunaan di kode modern.
var saya = "Arizal";
console.log("Var:", saya);

// 2. let (Cara Modern - Bisa Diubah)
// - Scope: Block. Gunakan jika nilai variabel akan berubah nantinya.
let namaPanggilan = "Ariza";
let umur = 22;
let isMahasiswa = true;

console.log("Let (Nama):", namaPanggilan);
console.log("Let (Umur):", umur);

// 3. const (Cara Modern - Tetap)
// - Scope: Block. Gunakan untuk nilai yang tidak boleh berubah (konstan).
const phi = 3.14;
console.log("Const (Phi):", phi);

/* =========================================
   BAGIAN 2: TIPE DATA (DATA TYPES)
   ========================================= */

const namaLengkap = "Arizal Anshori"; // String
const usia = 22; // Number
const statusAktif = true; // Boolean
const nilai = null; // Null (Kosong sengaja)
const alamat = undefined; // Undefined (Belum ada nilai)

console.log("\n--- Cek Tipe Data ---");
console.log("Tipe data namaLengkap:", typeof namaLengkap);
console.log("Tipe data nilai:", typeof nilai); // Bug lama JS: null terbaca object

/* =========================================
   BAGIAN 3: MANIPULASI STRING
   ========================================= */

console.log("\n--- Manipulasi String ---");
console.log("Panjang karakter:", namaLengkap.length);
console.log("Huruf Besar:", namaLengkap.toUpperCase());
console.log("Huruf Kecil:", namaLengkap.toLowerCase());
console.log("Posisi huruf 'z':", namaLengkap.indexOf("z")); // Index dimulai dari 0
console.log("Replace:", namaLengkap.replace("Arizal", "Budi"));
console.log("Substring (0-5):", namaLengkap.substring(0, 5)); // Mengambil karakter 0 s.d 4
console.log("Split per huruf:", namaLengkap.split("")); // Jadi Array huruf

/* =========================================
   BAGIAN 4: PENGGABUNGAN STRING
   ========================================= */

console.log("\n--- Penggabungan String ---");
// Template Literals (Recommended) - Menggunakan backticks `
console.log(`Cara Baru: Nama saya ${namaLengkap} dan umur saya ${usia}`);

/* =========================================
   BAGIAN 5: ARRAYS (Daftar Data)
   ========================================= */

console.log("\n--- Arrays ---");
// Cara 1: Menggunakan Constructor (Jarang dipakai)
const numbers = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Cara 2: Menggunakan kurung siku [] (Sering dipakai)
const fruits = ["apple", "banana", "orange"];

// Mengakses dan mengubah isi array
fruits[3] = "mango"; // Menambah/Mengisi index ke-3
fruits.push("grape"); // Menambah ke urutan PALING BELAKANG
fruits.unshift("strawberry"); // Menambah ke urutan PALING DEPAN
fruits.pop(); // Menghapus data PALING BELAKANG (grape hilang)

console.log("Posisi banana:", fruits.indexOf("banana"));
console.log("Array numbers:", numbers);
console.log("Array fruits:", fruits);

/* =========================================
   BAGIAN 6: OBJECT (Data Kompleks)
   ========================================= */

console.log("\n--- Object ---");
// Object menyimpan data dalam pasangan Key: Value
const person = {
  firstName: "Arizal",
  lastName: "Anshori",
  age: 22,
  hobbies: ["music", "movies", "coding", "sports"], // Array di dalam Object
  isMahasiswa: true,
  address: {
    // Object di dalam Object (Nested)
    street: "Jl. Mawar No. 1",
    city: "Bandung",
    zipCode: "40111",
  },
};

// Mengakses data object (Dot Notation)
console.log(person.firstName, person.lastName);
console.log("Hobi ke-3:", person.hobbies[2]); // Mengakses array dalam object
console.log("Kota:", person.address.city); // Mengakses nested object

// Destructuring (Membongkar Object ke variabel terpisah)
// Ini fitur modern ES6 yang sangat berguna
const {
  firstName,
  lastName,
  address: { city },
} = person;
console.log("Destructuring City:", city);

/* =========================================
   BAGIAN 7: ARRAY OF OBJECTS (JSON Structure)
   ========================================= */

console.log("\n--- Array of Objects ---");
// Struktur data yang sering dipakai saat mengambil data dari Database/API
const todo = [
  {
    id: 1,
    text: "Learn HTML",
    isDone: true,
  },
  {
    id: 2,
    text: "Learn CSS",
    isDone: true,
  },
  {
    id: 3,
    text: "Learn JS",
    isDone: false,
  },
];

// Mengakses data spesifik
console.log("Tugas ke-2:", todo[1].text);

// Mengubah Array Object menjadi format JSON (String)
// Berguna saat mengirim data ke server
const todoJSON = JSON.stringify(todo);
console.log("JSON Format:", todoJSON);

/* =========================================
   BAGIAN 8: FOR LOOP (Perulangan)
   ========================================= */

console.log("\n--- For Loop ---");
// 1. Loop Biasa
// (Inisialisasi; Kondisi; Penambahan/Increment)
for (let i = 0; i < 5; i++) {
  console.log(`Loop Biasa ke: ${i}`);
}

// 2. Loop Array Biasa
for (let i = 0; i < todo.length; i++) {
  console.log(`Todo List [${i}]: ${todo[i].text}`);
}

// 3. For...Of Loop (Lebih Ringkas untuk Array)
// Membaca: "Untuk setiap (item) dari (todo)"
console.log("--- For..Of Loop ---");
for (let item of todo) {
  console.log(`ID Tugas: ${item.id}`);
}

/* =========================================
   BAGIAN 9: WHILE LOOP
   ========================================= */

console.log("\n--- While Loop ---");
// Hati-hati, pastikan kondisi bisa berhenti (false), jika tidak akan "Infinite Loop"
let i = 0;
while (i < 5) {
  console.log(`While Loop ke: ${i}`);
  i++; // Jangan lupa increment
}

/* =========================================
   BAGIAN 10: forEach, map, filter
   ========================================= */

console.log("\n--- forEach, map, filter ---");
todo.forEach(function(todos){
  console.log(todos.text);
})

const todoText = todo.map(function(todos){
    return todos.text
})
console.log(todoText);

const todoDone = todo.filter(function(todos){
    return todos.isDone === true
}).map(function(todos){
    return todos.text
})
console.log(todoDone);

/* =========================================
   BAGIAN 11: CONSOLE METHODS
   ========================================= */

console.log("\n--- Jenis-Jenis Console ---");
console.log("Ini log biasa");
console.error("Ini error (merah)");
console.warn("Ini peringatan (kuning)");
console.info("Ini info");
console.debug("Ini debug");

/* =========================================
   BAGIAN 12: CONDITIONALS (Logika)
   ========================================= */
console.log("\n--- IF ELSE & Switch ---");

const x = 16;

// 1. If - Else If - Else
if (x === 15) {
  console.log("x sama dengan 15");
} else if (x > 15) {
  console.log("x lebih dari 15");
} else {
  console.log("x kurang dari 15");
}

// 2. Ternary Operator (Shorthand If/Else)
// Format: kondisi ? "jika benar" : "jika salah"
const color = x > 15 ? 'red' : 'blue';
console.log("Warna terpilih:", color);

// 3. Switch Statement
// Cocok jika mengecek satu variabel dengan banyak kemungkinan nilai
switch (color) {
  case 'red':
    console.log('Logika Switch: Color is red');
    break;
  case 'blue':
    console.log('Logika Switch: Color is blue');
    break;
  default:
    console.log('Logika Switch: Color unknown');
}


/* =========================================
   BAGIAN 13: FUNCTIONS (Fungsi)
   ========================================= */
console.log("\n--- Functions ---");

// 1. Function Declaration (Cara Biasa)
function addNums(num1, num2) {
  console.log("Function Biasa:", num1 + num2);
}
addNums(5, 10);

// 2. Arrow Function (ES6 Modern)
// Perhatikan: Kita ganti nama variabelnya jadi 'addNumsArrow' supaya tidak bentrok
const addNumsArrow = (num1, num2) => {
  console.log("Arrow Function:", num1 + num2);
};
addNumsArrow(5, 10);

// 3. Arrow Function dengan RETURN
// Fungsi ini mengembalikan nilai, bukan langsung print ke console.
const addNumsReturn = (num1, num2) => {
  return num1 + num2;
};

// Kita harus console.log hasilnya, atau simpan ke variabel
const hasil = addNumsReturn(5, 15);
console.log("Arrow Function Return:", hasil);

// 4. Arrow Function One-Liner (Sangat Ringkas)
// Jika hanya 1 baris return, kurung kurawal {} dan kata 'return' bisa dihapus
const addNumsSimple = (a, b) => a + b;
console.log("One-Liner:", addNumsSimple(10, 10));


/* =========================================
   BAGIAN 14: OOP (Object Oriented Programming)
   ========================================= */
console.log("\n--- OOP (Constructor & Class) ---");

// ------------------------------------------
// 1. CARA LAMA (Constructor Function - ES5)
// ------------------------------------------
function PersonOld(firstName, lastName, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  
  // Cara kurang efisien (Method dibuat ulang setiap bikin objek)
  this.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// PROTOTYPE (Cara Efisien di ES5)
// Method disimpan di 'gudang pusat' (Prototype), bukan di setiap objek
PersonOld.prototype.getEmailInfo = function() {
    return `Email: ${this.email}`;
}

// ------------------------------------------
// 2. CARA BARU (Class - ES6) -> REKOMENDASI
// ------------------------------------------
// Ini sebenarnya "Syntactic Sugar" (pemanis) dari cara lama agar lebih rapi
class PersonNew {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  // Method (Otomatis masuk ke Prototype)
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// ------------------------------------------
// INSTANTIATE (Membuat Objek Nyata dari Cetakan)
// ------------------------------------------

// Menggunakan Cara Lama
const person1 = new PersonOld('Budi', 'Santoso', 'budi@gmail.com');

// Menggunakan Cara Baru (Class)
const person2 = new PersonNew('Arizal', 'Anshori', 'arizal@gmail.com');

console.log("Objek 1 (Old):", person1);
console.log("Objek 2 (Class):", person2);

// Memanggil Method
console.log("Nama Lengkap (Class):", person2.getFullName());
console.log("Email Info (Prototype Old):", person1.getEmailInfo());