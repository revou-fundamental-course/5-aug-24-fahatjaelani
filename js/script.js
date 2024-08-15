// Tunggu hingga seluruh dokumen HTML dimuat sebelum menjalankan kode di dalamnya
document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan referensi ke elemen-elemen DOM yang diperlukan
    const formulir = document.getElementById('bmi-form'); // Formulir BMI
    const bagianHasil = document.getElementById('hasil-section'); // Bagian untuk menampilkan hasil BMI
    const hasilJenisKelamin = document.getElementById('jenis-kelamin-hasil'); // Hasil jenis kelamin
    const hasilUsia = document.getElementById('hasil-usia'); // Hasil usia
    const hasilBMI = document.getElementById('hasil-bmi'); // Hasil BMI
    const hasilStatus = document.getElementById('hasil-status'); // Status kategori BMI
    const kategoriInfoBMI = document.getElementById('bmi-info-kategori'); // Kategori info BMI
    const infoBMI = document.getElementById('bmi-info'); // Deskripsi info BMI
    const bagianRisikoKesehatan = document.getElementById('risiko-kesehatan-section'); // Bagian risiko kesehatan
    const kategoriRisikoKesehatan = document.getElementById('kategori-risiko-kesehatan'); // Kategori risiko kesehatan
    const risikoPenyakitList = document.getElementById('risiko-penyakit-list'); // Daftar penyakit terkait risiko
    const alertBox = document.getElementById('alert-box'); // Kotak alert untuk pesan
    const closeBtns = document.querySelectorAll('.close-btn'); // Tombol-tombol penutup alert
    const ahliGiziForm = document.getElementById('ahli-gizi-form'); // Formulir pendaftaran ahli gizi
    const dokterForm = document.getElementById('dokter-form'); // Formulir pendaftaran dokter
    const kirimRegistrasiAhliGiziBtn = document.getElementById('kirim-registrasi-ahli-gizi'); // Tombol kirim registrasi ahli gizi
    const kirimRegistrasiDokterBtn = document.getElementById('kirim-registrasi-dokter'); // Tombol kirim registrasi dokter
    const gambarKosongHasil = document.getElementById('gambar-kosong-hasil'); // Gambar kosong untuk hasil
    const gambarKosongInfo = document.getElementById('gambar-kosong-info'); // Gambar kosong untuk info BMI
    const gambarKosongRisiko = document.getElementById('gambar-kosong-risiko'); // Gambar kosong untuk risiko kesehatan

    // Menampilkan pesan alert sementara kepada pengguna
    function showAlert(message, duration = 1000) {
        const alertMessage = document.getElementById('alert-message');
        if (alertMessage) {
            alertMessage.textContent = message; // Set pesan alert
            alertBox.style.display = 'block'; // Tampilkan kotak alert
            setTimeout(() => {
                alertBox.style.display = 'none'; // Sembunyikan kotak alert setelah durasi
            }, duration);
        }
    }

    // Validasi formulir dengan memeriksa input yang diperlukan
    function validateForm(form) {
        let valid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            const errorMessage = document.getElementById(`error-${input.name}`); // Ambil elemen error message
            const name = input.name;

            // Periksa jika input kosong
            if (!input.value.trim()) {
                valid = false;
                if (errorMessage) {
                    errorMessage.textContent = 'Kolom ini harus diisi'; // Tampilkan pesan error
                    errorMessage.style.display = 'block'; // Tampilkan pesan error
                }
                input.classList.add('input-error'); // Tambahkan kelas error
            } else {
                // Validasi spesifik berdasarkan nama input
                if (name.startsWith('email')) {
                    if (!validateEmail(input.value)) {
                        valid = false;
                        if (errorMessage) {
                            errorMessage.textContent = 'Harap masukkan alamat email yang valid'; // Tampilkan pesan error email
                            errorMessage.style.display = 'block'; // Tampilkan pesan error
                        }
                        input.classList.add('input-error'); // Tambahkan kelas error
                    } else {
                        if (errorMessage) {
                            errorMessage.textContent = ''; // Hapus pesan error
                            errorMessage.style.display = 'none'; // Sembunyikan pesan error
                        }
                        input.classList.remove('input-error'); // Hapus kelas error
                    }
                } else if (name.startsWith('telepon')) {
                    if (!validatePhoneNumber(input.value)) {
                        valid = false;
                        if (errorMessage) {
                            errorMessage.textContent = 'Harap masukkan nomor telepon yang valid'; // Tampilkan pesan error telepon
                            errorMessage.style.display = 'block'; // Tampilkan pesan error
                        }
                        input.classList.add('input-error'); // Tambahkan kelas error
                    } else {
                        if (errorMessage) {
                            errorMessage.textContent = ''; // Hapus pesan error
                            errorMessage.style.display = 'none'; // Sembunyikan pesan error
                        }
                        input.classList.remove('input-error'); // Hapus kelas error
                    }
                } else if (name.startsWith('pesan')) {
                    if (!validateMessage(input.value)) {
                        valid = false;
                        if (errorMessage) {
                            errorMessage.textContent = 'Pesan tidak boleh lebih dari 500 kata'; // Tampilkan pesan error pesan
                            errorMessage.style.display = 'block'; // Tampilkan pesan error
                        }
                        input.classList.add('input-error'); // Tambahkan kelas error
                    } else {
                        if (errorMessage) {
                            errorMessage.textContent = ''; // Hapus pesan error
                            errorMessage.style.display = 'none'; // Sembunyikan pesan error
                        }
                        input.classList.remove('input-error'); // Hapus kelas error
                    }
                } else {
                    if (errorMessage) {
                        errorMessage.textContent = ''; // Hapus pesan error
                        errorMessage.style.display = 'none'; // Sembunyikan pesan error
                    }
                    input.classList.remove('input-error'); // Hapus kelas error
                }
            }
        });

        return valid; // Kembalikan status validasi
    }

    // Validasi email menggunakan pola regex
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Validasi nomor telepon menggunakan pola regex
    function validatePhoneNumber(phoneNumber) {
        const phonePattern = /^[0-9]{10,13}$/;
        return phonePattern.test(phoneNumber);
    }

    // Validasi pesan untuk memastikan tidak lebih dari 500 kata
    function validateMessage(message) {
        const wordCount = message.split(/\s+/).filter(Boolean).length;
        return wordCount <= 500;
    }

    // Tambahkan event listener ke semua formulir untuk validasi sebelum submit
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(form)) {
                event.preventDefault(); // Cegah pengiriman formulir jika tidak valid
            }
        });
    });

    // Tangani pengiriman formulir dengan memvalidasi dan menampilkan alert
    function handleSubmit(form, successMessage, closeForm) {
        if (validateForm(form)) {
            showAlert(successMessage, 1000); // Tampilkan pesan sukses
            closeForm.style.display = 'none'; // Sembunyikan formulir setelah pengiriman
        }
    }

    // Tampilkan hasil BMI dan informasi terkait
    function showResults(bmi, kategoriBMI, jenisKelamin, usia) {
        hasilJenisKelamin.textContent = `Jenis Kelamin: ${jenisKelamin}`; // Tampilkan jenis kelamin
        hasilUsia.textContent = `Usia: ${usia} tahun`; // Tampilkan usia
        hasilBMI.textContent = `BMI: ${bmi.toFixed(2)}`; // Tampilkan nilai BMI dengan dua desimal
        hasilStatus.textContent = `Kategori BMI: ${kategoriBMI.status}`; // Tampilkan status kategori BMI

        bagianHasil.style.display = 'block'; // Tampilkan bagian hasil
        kategoriInfoBMI.textContent = kategoriBMI.info.kategori; // Tampilkan kategori info BMI
        infoBMI.textContent = kategoriBMI.info.deskripsi; // Tampilkan deskripsi info BMI

        kategoriRisikoKesehatan.textContent = kategoriBMI.risiko.kategori; // Tampilkan kategori risiko kesehatan
        risikoPenyakitList.innerHTML = kategoriBMI.risiko.penyakit.map(p => `<li>${p}</li>`).join(''); // Tampilkan daftar penyakit

        bagianRisikoKesehatan.style.display = 'block'; // Tampilkan bagian risiko kesehatan

        // Sembunyikan gambar kosong jika hasil ada
        gambarKosongHasil.style.display = 'none';
        gambarKosongInfo.style.display = 'none';
        gambarKosongRisiko.style.display = 'none';
    }

    // Mendapatkan kategori BMI berdasarkan nilai BMI
    function getKategoriBMI(bmi) {
        if (bmi < 18.5) {
            return {
                status: 'Kekurangan Berat Badan',
                info: {
                    kategori: 'Kekurangan Berat Badan',
                    deskripsi: 'Berat badan Anda kurang dari rentang ideal. Kekurangan berat badan bisa disebabkan oleh berbagai faktor, termasuk pola makan yang tidak memadai, masalah kesehatan, atau metabolisme yang tinggi. Kondisi ini dapat menyebabkan gangguan kesehatan seperti kekurangan energi, penurunan daya tahan tubuh, dan risiko osteoporosis. Penting untuk melakukan penilaian lebih lanjut dengan profesional medis atau ahli gizi untuk menentukan penyebab dan penanganan yang tepat.',
                },
                risiko: {
                    kategori: 'Risiko Kesehatan Tinggi',
                    penyakit: [
                        'Kekurangan Gizi: Kekurangan berat badan sering kali disertai dengan kekurangan nutrisi penting yang dapat mempengaruhi fungsi tubuh secara keseluruhan.',
                        'Osteoporosis: Kekurangan berat badan dapat meningkatkan risiko tulang menjadi rapuh dan mudah patah.',
                        'Gangguan Imunitas: Sistem kekebalan tubuh dapat melemah, meningkatkan risiko infeksi dan penyakit.'
                    ]
                }
            };
        } else if (bmi >= 18.5 && bmi < 25) {
            return {
                status: 'Normal',
                info: {
                    kategori: 'Normal',
                    deskripsi: 'Berat badan Anda berada dalam rentang ideal. Ini menunjukkan bahwa Anda memiliki keseimbangan yang baik antara asupan makanan dan aktivitas fisik. Mempertahankan berat badan normal dapat membantu Anda menjaga kesehatan secara keseluruhan dan mengurangi risiko penyakit kronis seperti diabetes, penyakit jantung, dan hipertensi. Teruskan gaya hidup sehat Anda untuk menjaga kondisi fisik dan mental yang optimal.',
                },
                risiko: {
                    kategori: 'Risiko Kesehatan Rendah',
                    penyakit: []
                }
            };
        } else if (bmi >= 25 && bmi < 30) {
            return {
                status: 'Kelebihan Berat Badan',
                info: {
                    kategori: 'Kelebihan Berat Badan',
                    deskripsi: 'Berat badan Anda melebihi rentang ideal, tetapi belum mencapai kategori obesitas. Kelebihan berat badan sering kali terkait dengan pola makan yang tidak sehat, kurangnya aktivitas fisik, atau faktor genetik. Kondisi ini dapat meningkatkan risiko beberapa masalah kesehatan, termasuk penyakit jantung, diabetes tipe 2, dan hipertensi. Menyusun rencana diet sehat dan rutinitas olahraga yang teratur dapat membantu dalam menurunkan berat badan dan memperbaiki kesehatan.',
                },
                risiko: {
                    kategori: 'Risiko Kesehatan Menengah',
                    penyakit: [
                        'Diabetes Tipe 2: Kelebihan berat badan dapat menyebabkan resistensi insulin dan meningkatkan risiko diabetes.',
                        'Hipertensi: Kelebihan berat badan dapat meningkatkan tekanan darah, memperburuk kesehatan jantung.'
                    ]
                }
            };
        } else {
            return {
                status: 'Obesitas',
                info: {
                    kategori: 'Obesitas',
                    deskripsi: 'Berat badan Anda berada jauh di atas rentang ideal. Obesitas sering kali disebabkan oleh kombinasi faktor seperti pola makan yang tinggi kalori, kurangnya aktivitas fisik, dan predisposisi genetik. Obesitas dapat meningkatkan risiko berbagai masalah kesehatan serius seperti penyakit jantung, stroke, diabetes tipe 2, dan sleep apnea. Mengadopsi perubahan gaya hidup yang signifikan, seperti diet seimbang dan program latihan, serta konsultasi dengan ahli kesehatan dapat membantu dalam manajemen dan penurunan berat badan.',
                },
                risiko: {
                    kategori: 'Risiko Kesehatan Tinggi',
                    penyakit: [
                        'Penyakit Jantung: Obesitas dapat menyebabkan penumpukan lemak di sekitar jantung dan meningkatkan risiko penyakit jantung.',
                        'Stroke: Kelebihan berat badan dapat meningkatkan risiko pembekuan darah dan stroke.',
                        'Sleep Apnea: Kelebihan berat badan dapat menyebabkan gangguan pernapasan saat tidur, yang dapat mempengaruhi kualitas tidur dan kesehatan secara keseluruhan.',
                        'Kanker: Obesitas juga dapat meningkatkan risiko beberapa jenis kanker, seperti kanker payudara dan kanker usus besar.'
                    ]
                }
            };
        }
    }
    
    // Event listener untuk pengiriman formulir BMI
    formulir.addEventListener('submit', function(event) {
        event.preventDefault(); // Cegah pengiriman formulir secara default

        // Ambil data dari formulir
        const jenisKelamin = document.querySelector('input[name="JenisKelamin"]:checked');
        const beratBadan = parseFloat(document.getElementById('berat-badan').value);
        const tinggiBadan = parseFloat(document.getElementById('tinggi').value) / 100;
        const usia = parseInt(document.getElementById('usia').value);

        // Validasi data input
        if (!jenisKelamin || isNaN(beratBadan) || isNaN(tinggiBadan) || isNaN(usia) || tinggiBadan <= 0 || beratBadan <= 0) {
            showAlert('Harap masukkan data yang valid.'); // Tampilkan pesan jika data tidak valid
            return;
        }

        // Hitung BMI dan ambil kategori BMI
        const jenisKelaminValue = jenisKelamin.value;
        const bmi = beratBadan / (tinggiBadan * tinggiBadan);
        const kategoriBMI = getKategoriBMI(bmi);

        // Tampilkan hasil BMI dan informasi terkait
        showResults(bmi, kategoriBMI, jenisKelaminValue, usia);
        showAlert('Hasil BMI berhasil dihitung!', 1000); // Tampilkan pesan sukses
    });

    // Event listener untuk tombol reset formulir BMI
    document.getElementById('reset-btn').addEventListener('click', function() {
        // Reset formulir BMI
        formulir.reset();
    
        // Sembunyikan bagian hasil dan risiko kesehatan
        bagianHasil.style.display = 'none';
        bagianRisikoKesehatan.style.display = 'none';
    
        // Tampilkan gambar kosong jika tidak ada hasil
        gambarKosongHasil.style.display = 'block';
        gambarKosongInfo.style.display = 'block';
        gambarKosongRisiko.style.display = 'block';
    
        // Sembunyikan formulir ahli gizi dan dokter
        ahliGiziForm.style.display = 'none';
        dokterForm.style.display = 'none';
    
        // Menampilkan elemen lain yang mungkin tersembunyi
        document.getElementById('show-ahli-gizi-form').style.display = 'block';
        document.getElementById('show-dokter-form').style.display = 'block';
    
        showAlert('Form telah direset!', 1000); // Tampilkan pesan reset
    });
    
    // Event listener untuk menampilkan formulir ahli gizi
    document.getElementById('show-ahli-gizi-form').addEventListener('click', function() {
        ahliGiziForm.style.display = 'block';
    });

    // Event listener untuk menampilkan formulir dokter
    document.getElementById('show-dokter-form').addEventListener('click', function() {
        dokterForm.style.display = 'block';
    });

    // Event listener untuk tombol penutup alert
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.style.display = 'none'; // Sembunyikan alert saat tombol close diklik
        });
    });

    // Event listener untuk tombol kirim registrasi ahli gizi
    kirimRegistrasiAhliGiziBtn?.addEventListener('click', function() {
        const form = document.getElementById('registrasi-ahli-gizi-form');
        handleSubmit(form, 'Registrasi ahli gizi telah dikirim.', ahliGiziForm);
    });

    // Event listener untuk tombol kirim registrasi dokter
    kirimRegistrasiDokterBtn?.addEventListener('click', function() {
        const form = document.getElementById('registrasi-dokter-form');
        handleSubmit(form, 'Registrasi dokter telah dikirim.', dokterForm);
    });

    // Event listener untuk tombol download PDF
    document.getElementById('download-btn')?.addEventListener('click', function() {
        const { jsPDF } = window.jspdf; // Mengakses jsPDF dari global scope
    
        // Ambil data dari elemen yang relevan
        const bmiText = document.getElementById('hasil-bmi')?.textContent?.split(': ')[1];
        const statusText = document.getElementById('hasil-status')?.textContent?.split(': ')[1];
        const kategori = document.getElementById('bmi-info-kategori')?.textContent;
        const deskripsi = document.getElementById('bmi-info')?.textContent;
        const risikoKategori = document.getElementById('kategori-risiko-kesehatan')?.textContent;
        const penyakitList = document.getElementById('risiko-penyakit-list')?.children;
        const jenisKelamin = document.getElementById('jenis-kelamin-hasil')?.textContent?.split(': ')[1];
        const usiaText = document.getElementById('hasil-usia')?.textContent?.split(': ')[1];
    
        // Validasi jika hasil BMI belum tersedia
        if (!bmiText || !statusText || !kategori || !deskripsi || !risikoKategori || !penyakitList.length || !jenisKelamin || !usiaText) {
            showAlert('Hasil kalkulasi BMI belum tersedia. Silakan lakukan kalkulasi terlebih dahulu.');
            return;
        }
    
        // Siapkan data untuk diunduh dalam format PDF
        const bmi = parseFloat(bmiText);
        const usia = parseInt(usiaText);
        const risks = Array.from(penyakitList).map(li => li.textContent).join(', ');
    
        const doc = new jsPDF(); // Membuat objek jsPDF baru
        doc.text(`Jenis Kelamin: ${jenisKelamin}`, 10, 10);
        doc.text(`Usia: ${usia}`, 10, 20);
        doc.text(`BMI: ${bmi}`, 10, 30);
        doc.text(`Status: ${statusText}`, 10, 40);
        doc.text(`Kategori BMI: ${kategori}`, 10, 50);
        doc.text(`Deskripsi: ${deskripsi}`, 10, 60);
        doc.text(`Kategori Risiko Kesehatan: ${risikoKategori}`, 10, 70);
        doc.text(`Penyakit Terkait: ${risks}`, 10, 80);
    
        doc.save('hasil-bmi.pdf'); // Unduh PDF
    });
    
    const waDokterUrl = "https://wa.me/+6282142788621?text=" + encodeURIComponent("Halo dokter, saya ingin konsultasi.");

    // URL WhatsApp untuk konsultasi ahli gizi
    const waGiziUrl = "https://wa.me/6282142788621?text=" + encodeURIComponent("Halo ahli gizi, saya ingin konsultasi.");

    // Menambahkan event listener ke tombol Konsultasi Dokter
    document.querySelector('.konsultasi-dokter-btn').addEventListener('click', function() {
        window.open(waDokterUrl, '_blank');
    });

    // Menambahkan event listener ke tombol Konsultasi Ahli Gizi
    document.querySelector('.konsultasi-btn').addEventListener('click', function() {
        window.open(waGiziUrl, '_blank');
    });
});

