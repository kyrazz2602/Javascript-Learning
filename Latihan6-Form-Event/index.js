// index.js

document.addEventListener("DOMContentLoaded", function () {
  /* --- 1. INISIALISASI VARIABEL (CACHING DOM) ---
     Kita simpan elemen HTML ke dalam variabel konstan.
     Tujuannya agar kode lebih rapi dan performa lebih cepat.
  */
  const inputNama = document.getElementById("inputNama");
  const sisaKarakterElem = document.getElementById("sisaKarakter");
  const notifikasiElem = document.getElementById("notifikasiSisaKarakter");

  const inputCaptcha = document.getElementById("inputCaptcha");
  const submitButton = document.getElementById("submitButton");
  const form = document.getElementById("formDataDiri");

  const inputCopy = document.getElementById("inputCopy");
  const inputPaste = document.getElementById("inputPaste");

  /* --- 2. LOGIKA JUMLAH KARAKTER (INPUT EVENT) --- */

  // Set nilai awal sisa karakter sesuai maxlength HTML
  const maxChars = inputNama.maxLength;
  sisaKarakterElem.innerText = maxChars;

  // Event 'input': Terjadi setiap kali user mengetik karakter
  inputNama.addEventListener("input", function () {
    const jumlahDiketik = inputNama.value.length;
    const sisa = maxChars - jumlahDiketik;

    // Update angka di layar
    sisaKarakterElem.innerText = sisa;

    // Logika Warna & Peringatan
    if (sisa === 0) {
      sisaKarakterElem.innerText = "Habis!";
      notifikasiElem.style.color = "var(--danger)"; // Merah
    } else if (sisa <= 5) {
      notifikasiElem.style.color = "var(--danger)"; // Merah (Peringatan)
    } else {
      notifikasiElem.style.color = "var(--text-secondary)"; // Warna normal
    }
  });

  // Event 'focus': Saat user klik kolom input -> Tampilkan sisa karakter
  inputNama.addEventListener("focus", function () {
    notifikasiElem.style.visibility = "visible";
  });

  // Event 'blur': Saat user klik di luar kolom input -> Sembunyikan
  inputNama.addEventListener("blur", function () {
    notifikasiElem.style.visibility = "hidden";
  });

  /* --- 3. LOGIKA CAPTCHA (VALIDASI) --- */

  // Event 'input' pada captcha: Cek secara real-time
  // (Saya ganti dari 'change' ke 'input' agar tombol langsung aktif tanpa perlu tekan Enter dulu)
  inputCaptcha.addEventListener("input", function () {
    const textCaptcha = inputCaptcha.value;

    if (textCaptcha === "PRNU") {
      submitButton.removeAttribute("disabled"); // Aktifkan tombol
    } else {
      submitButton.setAttribute("disabled", ""); // Matikan tombol
    }
  });

  /* --- 4. LOGIKA SUBMIT FORM --- */
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah halaman refresh (reload)

    const textCaptcha = inputCaptcha.value;

    if (textCaptcha === "PRNU") {
      alert("🎉 Selamat! Captcha Anda Benar. Data berhasil dikirim.");
      // Di sini bisa ditambahkan logika kirim data ke server
    } else {
      alert("❌ Captcha Anda Salah. Silakan coba lagi.");
      submitButton.setAttribute("disabled", "");
    }
  });

  /* --- 5. LOGIKA COPY & PASTE --- */

  inputCopy.addEventListener("copy", function () {
    // Kita gunakan alert kecil/console agar tidak mengganggu UX, tapi sesuai request pakai alert
    alert("Anda telah men-copy tulisan ini!");
  });

  inputPaste.addEventListener("paste", function () {
    alert("Anda telah men-paste tulisan ini!");
  });
});
