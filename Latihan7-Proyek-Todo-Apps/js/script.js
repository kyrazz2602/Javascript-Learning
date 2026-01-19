document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  // PENTING: Memuat data dari storage saat halaman dibuka
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

const todos = [];
const RENDER_EVENT = "render-todo";
const SAVED_EVENT = "saved-todo";
const STORAGE_KEY = "TODO_APPS";

function generatedId() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
}

function findTodo(todoId) {
  // Peningkatan: Menggunakan method .find() bawaan array
  return todos.find((todo) => todo.id === todoId) || null;
}

function findTodoIndex(todoId) {
  // Peningkatan: Menggunakan method .findIndex() bawaan array
  return todos.findIndex((todo) => todo.id === todoId);
}

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const generatedID = generatedId();
  const todoObject = generateTodoObject(
    generatedID,
    textTodo,
    timestamp,
    false
  );
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData(); // Simpan setiap kali menambah data
}

function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData(); // Simpan perubahan status
  showToast("Selamat! Tugas selesai 🎉");
}

function removeTaskCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);
  if (todoTarget === -1) return;

  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData(); // Simpan perubahan penghapusan
  showToast("Tugas berhasil dihapus");
}

function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData(); // Simpan perubahan status
}

/* --- FUNGSI DOM MANIPULATION --- */

function makeTodo(todoObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.task;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);

  // Peningkatan: Menggunakan <li> karena parent-nya adalah <ul>
  const container = document.createElement("li");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");
    // Aksesibilitas: Menambahkan title agar muncul tooltip
    undoButton.setAttribute("title", "Kembalikan tugas");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.setAttribute("title", "Hapus tugas");

    trashButton.addEventListener("click", function () {
      // Tambahkan konfirmasi agar tidak terhapus tidak sengaja
      if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
        removeTaskCompleted(todoObject.id);
      }
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.setAttribute("title", "Selesaikan tugas");

    checkButton.addEventListener("click", function () {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";

  const completedTODOList = document.getElementById("completed-todos");
  completedTODOList.innerHTML = "";

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) {
      uncompletedTODOList.append(todoElement);
    } else {
      completedTODOList.append(todoElement);
    }
  }
});

/* --- FUNGSI STORAGE (LOCAL STORAGE) --- */

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

// Fungsi untuk menampilkan Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  
  // Set pesan teks
  toast.innerText = message;
  
  // Tambahkan class "show" untuk memicu animasi CSS
  toast.className = "show";

  // Hapus class "show" setelah 3 detik (sesuai durasi animasi fadeout di CSS)
  setTimeout(function() { 
    toast.className = toast.className.replace("show", ""); 
  }, 3000);
}


document.addEventListener(SAVED_EVENT, function () {
  showToast("Data berhasil disimpan ke LocalStorage.");
  // Kita juga bisa mereset form di sini agar bersih
  document.getElementById("form").reset();
});
