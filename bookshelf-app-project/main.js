// --- 1. Inisialisasi Variabel & Kunci Storage ---
const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKSHELF_APPS";
let isEditing = false;
let editedBookId = null;

// --- 2. Fungsi Helper (Bantuan) ---

// Menghasilkan ID unik berdasarkan waktu
function generateId() {
  return +new Date();
}

// Membuat objek buku
function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year: Number(year), // Pastikan tahun bertipe Number sesuai kriteria
    isComplete,
  };
}

// Mencari buku berdasarkan ID
function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

// Mencari index buku berdasarkan ID
function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

// --- 3. Fungsi LocalStorage ---

// Cek apakah browser mendukung storage
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

// Simpan data ke LocalStorage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

// Muat data dari LocalStorage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

// --- 4. Fungsi DOM Manipulation (Tampilan) ---

// Membuat elemen HTML buku sesuai kriteria data-testid
function makeBookElement(bookObject) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = bookObject.title;
  textTitle.setAttribute("data-testid", "bookItemTitle");

  const textAuthor = document.createElement("p");
  textAuthor.innerText = `Penulis: ${bookObject.author}`;
  textAuthor.setAttribute("data-testid", "bookItemAuthor");

  const textYear = document.createElement("p");
  textYear.innerText = `Tahun: ${bookObject.year}`;
  textYear.setAttribute("data-testid", "bookItemYear");

  const container = document.createElement("div");
  container.setAttribute("data-bookid", bookObject.id); // Wajib ada
  container.setAttribute("data-testid", "bookItem"); // Wajib ada
  container.append(textTitle, textAuthor, textYear);

  const buttonContainer = document.createElement("div");

  // Tombol Selesai/Belum Selesai
  const isCompleteButton = document.createElement("button");
  isCompleteButton.setAttribute("data-testid", "bookItemIsCompleteButton");

  if (bookObject.isComplete) {
    isCompleteButton.innerText = "Belum selesai dibaca";
    isCompleteButton.addEventListener("click", function () {
      undoBookFromCompleted(bookObject.id);
    });
  } else {
    isCompleteButton.innerText = "Selesai dibaca";
    isCompleteButton.addEventListener("click", function () {
      addBookToCompleted(bookObject.id);
    });
  }

  // Tombol Hapus
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Hapus Buku";
  deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
  deleteButton.addEventListener("click", function () {
    removeBook(bookObject.id);
  });

  // Tombol Edit 
  const editButton = document.createElement("button");
  editButton.innerText = "Edit Buku";
  editButton.setAttribute("data-testid", "bookItemEditButton");
  editButton.addEventListener("click", function () {
    // Logika edit sederhana: isi form, hapus buku lama (bisa dikembangkan lagi)
    editBook(bookObject);
  });

  buttonContainer.append(isCompleteButton, deleteButton, editButton);
  container.append(buttonContainer);

  return container;
}

// Fungsi Menambah Buku
function addBook() {
  const textTitle = document.getElementById("bookFormTitle").value;
  const textAuthor = document.getElementById("bookFormAuthor").value;
  const textYear = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const generatedID = generateId();
  const bookObject = generateBookObject(
    generatedID,
    textTitle,
    textAuthor,
    textYear,
    isComplete
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Fungsi Memindahkan ke Rak Selesai
function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Fungsi Memindahkan ke Rak Belum Selesai
function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Fungsi Menghapus Buku
function removeBook(bookId) {
  // Tambahkan konfirmasi agar lebih aman (opsional UX)
  const isConfirm = confirm("Apakah Anda yakin ingin menghapus buku ini?");
  if (!isConfirm) return;

  const bookTargetIndex = findBookIndex(bookId);
  if (bookTargetIndex === -1) return;

  books.splice(bookTargetIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Fungsi Edit Buku
function editBook(bookObject) {
  // 1. Isi form dengan data buku
  document.getElementById("bookFormTitle").value = bookObject.title;
  document.getElementById("bookFormAuthor").value = bookObject.author;
  document.getElementById("bookFormYear").value = bookObject.year;
  document.getElementById("bookFormIsComplete").checked = bookObject.isComplete;

  // 2. Set mode edit menjadi TRUE
  isEditing = true;
  editedBookId = bookObject.id;

  // 3. Scroll ke atas agar user melihat form
  document.getElementById("bookForm").scrollIntoView({ behavior: "smooth" });

  // 4. Ubah teks tombol submit agar jelas
  const submitButton = document.getElementById("bookFormSubmit");
  submitButton.innerHTML = "Update Buku";
}

// Fungsi Utama Render (Menampilkan data ke layar)
document.addEventListener(RENDER_EVENT, function () {
  const incompleteBooksList = document.getElementById("incompleteBookList");
  const completeBooksList = document.getElementById("completeBookList");

  // Bersihkan HTML list sebelum di-isi ulang
  incompleteBooksList.innerHTML = "";
  completeBooksList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBookElement(bookItem);
    if (!bookItem.isComplete) {
      incompleteBooksList.append(bookElement);
    } else {
      completeBooksList.append(bookElement);
    }
  }
});

// --- 5. Event Listeners ---

document.addEventListener("DOMContentLoaded", function () {
  // 1. Submit Form Tambah Buku
  const submitForm = document.getElementById("bookForm");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (isEditing) {
      // LOGIKA UPDATE BUKU
      const textTitle = document.getElementById("bookFormTitle").value;
      const textAuthor = document.getElementById("bookFormAuthor").value;
      const textYear = document.getElementById("bookFormYear").value;
      const isComplete = document.getElementById("bookFormIsComplete").checked;

      // Cari index buku yang sedang diedit
      const bookIndex = findBookIndex(editedBookId);

      // Update data di dalam array
      if (bookIndex !== -1) {
        books[bookIndex] = {
          ...books[bookIndex], // Pertahankan ID lama
          title: textTitle,
          author: textAuthor,
          year: Number(textYear),
          isComplete: isComplete,
        };
      }

      // Reset mode edit kembali ke normal
      isEditing = false;
      editedBookId = null;
      document.getElementById("bookFormSubmit").innerHTML =
        "Masukkan Buku ke rak <span>Belum selesai dibaca</span>";

      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    } else {
      // LOGIKA TAMBAH BUKU (Seperti biasa)
      addBook();
    }

    // Reset form
    event.target.reset();
  });

  // 2. Submit Form Pencarian (Opsional 1)
  const searchInput = document.getElementById("searchBook");
  searchInput.addEventListener("input", function (event) {
    const searchTitle = event.target.value.toLowerCase();
    if (searchTitle === "") {
      document.dispatchEvent(new Event(RENDER_EVENT));
      return;
    }

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTitle)
    );

    const incompleteBooksList = document.getElementById("incompleteBookList");
    const completeBooksList = document.getElementById("completeBookList");

    incompleteBooksList.innerHTML = "";
    completeBooksList.innerHTML = "";

    for (const bookItem of filteredBooks) {
      const bookElement = makeBookElement(bookItem);
      if (!bookItem.isComplete) {
        incompleteBooksList.append(bookElement);
      } else {
        completeBooksList.append(bookElement);
      }
    }
  });

  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  // 3. Load Data saat halaman dimuat
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
