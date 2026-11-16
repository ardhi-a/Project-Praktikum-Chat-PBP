// =================================
// 1. MENGAMBIL ELEMEN HTML
// =================================

const daftarKontak = document.getElementById("contactList");
// Mengambil semua kontak dari daftar
function ambilDaftarKontak() {
    return daftarKontak.querySelectorAll(".contact-item");
}

const headerChat = document.getElementById("chatHeader");
const daftarPesan = document.getElementById("messageContainer");
let kontakAktif = null;
const formulirPesan = document.getElementById("messageForm");
const inputPesan = document.getElementById("messageInput");
const inputPencarian = document.getElementById("searchContact");

// Elemen Tambah Kontak
const tombolTambahKontak = document.getElementById("addContactButton");
const modalKontak = document.getElementById("contactModal");
const formulirKontak = document.getElementById("contactForm");
const tombolBatalKontak = document.getElementById("cancelContact");
const inputNamaKontak = document.getElementById("contactName");
const inputNomorKontak = document.getElementById("contactPhone");
// Mengambil data kontak yang tersimpan
let dataKontak = JSON.parse(
    localStorage.getItem("chatlyKontak")
) || [];
// Mengambil data kontak yang sudah dihapus
let kontakDihapus = JSON.parse(
    localStorage.getItem("chatlyKontakDihapus")
) || [];

// =================================
// 2. DATA CONTOH PERCAKAPAN
// =================================

const dataPercakapan = {
    "Arsha": [
        {
            pengirim: "them",
            pesan: "Hai, apa kabar?",
            waktu: "10:25"
        },
        {
            pengirim: "me",
            pesan: "Baik! Kamu gimana?",
            waktu: "10:27"
        },
        {
            pengirim: "them",
            pesan: "Aku juga baik nih.",
            waktu: "10:30"
        }
    ],

    "Najwa": [
        {
            pengirim: "them",
            pesan: "Jangan lupa tugasnya ya!",
            waktu: "09:40"
        },
        {
            pengirim: "me",
            pesan: "Siap, sudah aku kerjakan.",
            waktu: "09:45"
        }
    ],

    "Tika": [
        {
            pengirim: "them",
            pesan: "Bisa minta file tugas kemarin?",
            waktu: "Kemarin"
        },
        {
            pengirim: "me",
            pesan: "Bisa, nanti aku kirim.",
            waktu: "Kemarin"
        },
        {
            pengirim: "them",
            pesan: "Oke, Terima kasih.",
            waktu: "Kemarin"
        }
    ],

    "Sela": [
        {
            pengirim: "them",
            pesan: "Sampai ketemu besok!",
            waktu: "Kemarin"
        }
    ]
};

// Mengambil riwayat percakapan dari localStorage
const dataTersimpan = localStorage.getItem("chatlyPercakapan");

if (dataTersimpan) {
    Object.assign(dataPercakapan, JSON.parse(dataTersimpan));
}

function updatePreviewKontak(nama) {
    const kontakTerpilih = Array.from(ambilDaftarKontak()).find(item =>
        item.querySelector("h3").textContent.trim() === nama
    );

    if (!kontakTerpilih) return;

    const pesan = dataPercakapan[nama] || [];
    const previewPesan = kontakTerpilih.querySelector(".contact-info p");

    previewPesan.textContent = pesan.length > 0
        ? pesan[pesan.length - 1].pesan
        : "Belum ada pesan";
}

// Membuat elemen kontak baru

function buatKontak(nama, nomor) {
    const kontakBaru = document.createElement("div");
    kontakBaru.classList.add("contact-item");

    const inisial = nama.charAt(0).toUpperCase();

    kontakBaru.innerHTML = `
        <div class="contact-avatar avatar-blue">
            ${inisial}
        </div>

        <div class="contact-info">
            <div class="contact-top">
                <h3>${nama}</h3>
                <span class="contact-time">Baru</span>
            </div>

            <p>Belum ada pesan</p>
            <small>${nomor}</small>
        </div>

        <button class="edit-contact" type="button">
            Edit
        </button>

        <button class="delete-contact" type="button">
            Hapus
        </button>
    `;

    daftarKontak.appendChild(kontakBaru);

    return kontakBaru;
}


// Menyimpan riwayat percakapan
function simpanPercakapan() {
    localStorage.setItem(
        "chatlyPercakapan",
        JSON.stringify(dataPercakapan)
    );
}

// =================================
// 3. MENAMPILKAN RIWAYAT PESAN
// =================================
function tampilkanPesan(nama) {

    const pesan = dataPercakapan[nama] || [];

    daftarPesan.innerHTML = "";

    if (pesan.length === 0) {
        daftarPesan.textContent = "Belum ada pesan.";
        return;
    }

    pesan.forEach((item, index) => {

        const bubble = document.createElement("div");
        bubble.classList.add("message-bubble", item.pengirim);

        // Isi pesan
        const isiPesan = document.createElement("p");
        isiPesan.textContent = item.pesan;

        // Waktu pesan
        const waktuPesan = document.createElement("span");
        waktuPesan.textContent = item.waktu;

        bubble.appendChild(isiPesan);
        bubble.appendChild(waktuPesan);

        // Tombol hapus pesan milik sendiri
        if (item.pengirim === "me") {
            const tombolEdit = document.createElement("button");
            tombolEdit.type = "button";
            tombolEdit.textContent = "Edit";
            tombolEdit.classList.add("edit-message");
        
            tombolEdit.addEventListener("click", function() {
                const pesanBaru = prompt("Edit pesan:", item.pesan);
        
                if (pesanBaru !== null && pesanBaru.trim() !== "") {
                    dataPercakapan[nama][index].pesan = pesanBaru.trim();
                    simpanPercakapan();
                    updatePreviewKontak(nama);
                    tampilkanPesan(nama);
                }

            });
        
            bubble.appendChild(tombolEdit);
        
            const tombolHapus = document.createElement("button");
            tombolHapus.type = "button";
            tombolHapus.textContent = "Hapus";
            tombolHapus.classList.add("delete-message");
        
            tombolHapus.addEventListener("click", function() {
                const konfirmasi = confirm("Yakin ingin menghapus pesan ini?");
        
                if (konfirmasi) {
                    dataPercakapan[nama].splice(index, 1);
                    simpanPercakapan();
                    updatePreviewKontak(nama);
                    tampilkanPesan(nama);
                }
            });
        
            bubble.appendChild(tombolHapus);
        }

        daftarPesan.appendChild(bubble);

    });

}

// =================================
// 4. MEMILIH KONTAK
// =================================

function pilihKontak(kontak) {

    const nama = kontak.querySelector("h3").textContent;
    kontakAktif = nama;
    const avatar = kontak.querySelector(".contact-avatar");
    const inisial = avatar.textContent.trim();
    const warnaAvatar = avatar.className;

    ambilDaftarKontak().forEach(item => {
        item.classList.remove("active");
    });

    kontak.classList.add("active");

    headerChat.innerHTML = `
        <div class="selected-contact">

            <div class="${warnaAvatar}">
                ${inisial}
            </div>

            <div class="selected-info">
                <h3>${nama}</h3>
                <p>Chat tersedia</p>
            </div>

        </div>
    `;

    tampilkanPesan(nama);
}


// =================================
// 5. EVENT KLIK KONTAK
// =================================

ambilDaftarKontak().forEach(kontak => {

    kontak.addEventListener("click", function() {
        pilihKontak(kontak);
    });

});


// =================================
// 6. FUNGSI KIRIM PESAN
// =================================

formulirPesan.addEventListener("submit", function(event) {
    // Mencegah halaman melakukan reload
    event.preventDefault();

    // Mengambil isi pesan
    const isiPesan = inputPesan.value.trim();

    // Memastikan kontak sudah dipilih
    if (!kontakAktif) {
        alert("Silakan pilih kontak terlebih dahulu!");
        return;
    }

    // Memastikan pesan tidak kosong
    if (isiPesan === "") {
        return;
    }

    // Membuat data pesan baru
    const pesanBaru = {
        pengirim: "me",
        pesan: isiPesan,
        waktu: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        })
    };

    // Menambahkan pesan ke percakapan aktif
    if (!dataPercakapan[kontakAktif]) {
        dataPercakapan[kontakAktif] = [];
    }

    dataPercakapan[kontakAktif].push(pesanBaru);
    // Menyimpan percakapan terbaru
    simpanPercakapan();

    // Memperbarui preview pesan pada daftar kontak
    const kontakTerpilih = Array.from(ambilDaftarKontak()).find(item => {
        return item.querySelector("h3").textContent.trim() === kontakAktif;
    });

    if (kontakTerpilih) {

        // Mengubah preview pesan terakhir
        const previewPesan = kontakTerpilih.querySelector(".contact-info p");
        previewPesan.textContent = isiPesan;

        // Mengubah waktu pesan terakhir
        const waktuTerakhir = kontakTerpilih.querySelector(".contact-time");
        waktuTerakhir.textContent = pesanBaru.waktu;

    }


    // Menampilkan ulang percakapan
    tampilkanPesan(kontakAktif);

    // Mengosongkan input
    inputPesan.value = "";

    // Mengarahkan scroll ke pesan terbaru
    daftarPesan.scrollTop = daftarPesan.scrollHeight;

    // Mengembalikan fokus ke input
    inputPesan.focus();

});


// =================================
// 7. FUNGSI PENCARIAN KONTAK
// =================================

inputPencarian.addEventListener("input", function() {

    // Mengambil kata yang diketik pengguna
    const kataKunci = inputPencarian.value.toLowerCase();
    

    // Memeriksa setiap kontak
    ambilDaftarKontak().forEach(kontak => {

        // Mengambil nama kontak
        const nama = kontak.querySelector("h3").textContent.toLowerCase();

        // Memeriksa apakah nama cocok dengan pencarian
        if (nama.includes(kataKunci)) {

            kontak.style.display = "flex";

        } else {

            kontak.style.display = "none";

        }

    });

});

// Memuat kontak tambahan dari localStorage
dataKontak.forEach(item => {
    const kontakBaru = buatKontak(item.nama, item.nomor);

    kontakBaru.addEventListener("click", function() {
        pilihKontak(kontakBaru);
    });
});

// Menyembunyikan kontak yang sudah dihapus
ambilDaftarKontak().forEach(kontak => {
    const nama = kontak.querySelector("h3").textContent.trim();

    if (kontakDihapus.includes(nama)) {
        kontak.remove();
    }
});

// Memperbarui preview semua kontak saat halaman dibuka
ambilDaftarKontak().forEach(kontak => {
    const nama = kontak.querySelector("h3").textContent.trim();
    updatePreviewKontak(nama);
});

// Membuka modal tambah kontak
tombolTambahKontak.addEventListener("click", function() {
    modalKontak.style.display = "flex";
});

// Menutup modal melalui tombol Batal
tombolBatalKontak.addEventListener("click", function() {
    modalKontak.style.display = "none";
    formulirKontak.reset();
});

// Menyimpan kontak baru
formulirKontak.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = inputNamaKontak.value.trim();
    const nomor = inputNomorKontak.value.trim();
    if (/\d/.test(nama)) {
        alert("Nama kontak tidak boleh mengandung angka!");
        return;
    }
    if (!/^\+?[0-9]{10,15}$/.test(nomor)) {
        alert("Nomor telepon harus terdiri dari 10-15 angka!");
        return;
    }

    const nomorSudahAda = dataKontak.some(kontak => kontak.nomor === nomor);
    if (nomorSudahAda) {
        alert("Nomor telepon tersebut sudah terdaftar!");
        return;
    }

    if (nama === "" || nomor === "") {
        alert("Nama dan nomor telepon wajib diisi!");
        return;
    }

    const kontakBaru = buatKontak(nama, nomor);
    dataKontak.push({
        nama: nama,
        nomor: nomor
    });
    
    localStorage.setItem("chatlyKontak", JSON.stringify(dataKontak));

    kontakBaru.addEventListener("click", function() {
        pilihKontak(kontakBaru);
    });

    modalKontak.style.display = "none";
    formulirKontak.reset();

    alert("Kontak berhasil ditambahkan!");
});

daftarKontak.addEventListener("click", function(event) {
    // Memeriksa apakah tombol Edit diklik
    if (event.target.classList.contains("edit-contact")) {
        const kontak = event.target.closest(".contact-item");

        const namaLama = kontak.querySelector("h3").textContent.trim();
        const nomorLama = kontak.querySelector("small")?.textContent.trim() || "";

        const namaBaru = prompt("Masukkan nama kontak baru:", namaLama);

        if (namaBaru === null || namaBaru.trim() === "") {
            return;
        }

        const nomorBaru = prompt("Masukkan nomor telepon baru:", nomorLama);

        if (nomorBaru === null || nomorBaru.trim() === "") {
            return;
        }
        
    // Validasi nama baru
    if (/\d/.test(namaBaru.trim())) {
        alert("Nama kontak tidak boleh mengandung angka!");
        return;
    }

    // Validasi nomor telepon baru
    if (!/^\+?[0-9]{10,15}$/.test(nomorBaru.trim())) {
        alert("Nomor telepon harus terdiri dari 10-15 angka!");
        return;
    }

    // Memeriksa nomor duplikat
    const nomorDuplikat = dataKontak.some(item =>
        item.nomor === nomorBaru.trim() &&
        item.nomor !== nomorLama
    );

    if (nomorDuplikat) {
        alert("Nomor telepon tersebut sudah digunakan!");
        return;
    }

    // Memperbarui data kontak
    const kontakData = dataKontak.find(item => item.nomor === nomorLama);

    if (kontakData) {
        kontakData.nama = namaBaru.trim();
        kontakData.nomor = nomorBaru.trim();
    }

    // Memperbarui nama dan nomor pada tampilan
    kontak.querySelector("h3").textContent = namaBaru.trim();
    kontak.querySelector("small").textContent = nomorBaru.trim();

    // Memperbarui inisial avatar
    kontak.querySelector(".contact-avatar").textContent =
        namaBaru.trim().charAt(0).toUpperCase();

    // Memindahkan riwayat percakapan ke nama baru
    if (dataPercakapan[namaLama]) {
        dataPercakapan[namaBaru.trim()] = dataPercakapan[namaLama];
        delete dataPercakapan[namaLama];
    }

    // Menyimpan perubahan ke localStorage
    localStorage.setItem("chatlyKontak", JSON.stringify(dataKontak));
    simpanPercakapan();

    // Memperbarui chat jika kontak sedang aktif
    if (kontakAktif === namaLama) {
        kontakAktif = namaBaru.trim();
        pilihKontak(kontak);
    }

    updatePreviewKontak(namaBaru.trim());

    alert("Kontak berhasil diperbarui!");

    }

    if (event.target.classList.contains("delete-contact")) {
        const kontak = event.target.closest(".contact-item");
        const nama = kontak.querySelector("h3").textContent.trim();

        const elemenNomor = kontak.querySelector("small");

        const nomor = elemenNomor
            ? elemenNomor.textContent.trim()
            : null;

        const konfirmasi = confirm(
            `Apakah kamu yakin ingin menghapus kontak ${nama}?`
        );

        if (!konfirmasi) {
            return;
        }

        // Menghapus kontak dari daftar kontak tambahan
        if (nomor) {
            dataKontak = dataKontak.filter(item => item.nomor !== nomor);
        }

        // Menyimpan kontak yang dihapus agar tidak muncul lagi
        kontakDihapus.push(nama);

        localStorage.setItem(
            "chatlyKontak",
            JSON.stringify(dataKontak)
        );

        localStorage.setItem(
            "chatlyKontakDihapus",
            JSON.stringify(kontakDihapus)
        );

        // Menghapus riwayat percakapan kontak
        delete dataPercakapan[nama];

        // Memperbarui penyimpanan percakapan
        simpanPercakapan();

        // Mengosongkan tampilan chat jika kontak sedang aktif
        if (kontakAktif === nama) {
            kontakAktif = null;
            headerChat.innerHTML = "";
            daftarPesan.innerHTML = "";
        }

        kontak.remove();

        alert("Kontak berhasil dihapus!");
    }
});