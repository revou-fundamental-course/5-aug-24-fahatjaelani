document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('BmiForm');
    const HasilSection = document.getElementById('HasilSection');
    const JenisKelaminHasil = document.getElementById('JenisKelaminHasil');
    const HasilUsia = document.getElementById('HasilUsia');
    const HasilBmi = document.getElementById('HasilBmi');
    const HasilStatus = document.getElementById('HasilStatus');
    const BmiInfoKategori = document.getElementById('BmiInfoKategori');
    const BmiInfo = document.getElementById('BmiInfo');
    const RisikoKesehatanSection = document.getElementById('RisikoKesehatanSection');
    const KategoriRisikoKesehatan = document.getElementById('KategoriRisikoKesehatan');
    const RisikoPenyakitList = document.getElementById('RisikoPenyakitList');
    const downloadBtn = document.querySelector('.Download-btn');
    const konsultasiDokterBtn = document.querySelector('.Konsultasi-dokter-btn');
    const konsultasiAhliGiziBtn = document.querySelector('.Konsultasi-btn');
    const ResetButton = document.querySelector('.Reset-btn');
    
    const ahliGiziForm = document.getElementById('AhliGiziForm');
    const dokterForm = document.getElementById('DokterForm');
    
    const showAhliGiziForm = document.getElementById('showAhliGiziForm');
    const showDokterForm = document.getElementById('showDokterForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const JenisKelamin = document.querySelector('input[name="JenisKelamin"]:checked').value;
        const berat = parseFloat(document.getElementById('BeratBadan').value);
        const tinggi = parseFloat(document.getElementById('tinggi').value) / 100;
        const usia = parseInt(document.getElementById('usia').value);

        if (berat <= 0 || tinggi <= 0 || usia <= 0) {
            alert('Masukkan nilai berat, tinggi, dan usia yang valid.');
            return;
        }

        const bmi = (berat / (tinggi * tinggi)).toFixed(2);

        JenisKelaminHasil.textContent = `Jenis Kelamin: ${JenisKelamin}`;
        HasilUsia.textContent = `Usia: ${usia} tahun`;
        HasilBmi.textContent = `BMI: ${bmi}`;
        HasilStatus.textContent = `Status: ${gethasilstatus(bmi)}`;
        BmiInfoKategori.textContent = getBmiInfoKategoriText(bmi);
        BmiInfo.textContent = getBmiInfoText(bmi);
        KategoriRisikoKesehatan.textContent = getKategoriRisikoKesehatanText(bmi);

        updateRisikoKesehatan(bmi);

        HasilSection.style.display = 'block';
        RisikoKesehatanSection.style.display = (bmi >= 19) ? 'block' : 'none';
    });

    function gethasilstatus(bmi) {
        if (bmi < 19) {
            return 'Kurus';
        } else if (bmi >= 19 && bmi < 24.9) {
            return 'Ideal';
        } else if (bmi >= 25 && bmi < 29.9) {
            return 'Gemuk';
        } else {
            return 'Obesitas';
        }
    }

    function getBmiInfoKategoriText(bmi) {
        if (bmi >= 23 && bmi < 25) {
            return 'Hasil BMI diantara 23 dan 25';
        } else if (bmi < 19) {
            return 'Hasil BMI kurang dari 19 kurus';
        } else if (bmi >= 19 && bmi < 23) {
            return 'Anda berada dalam kategori ideal';
        } else if (bmi >= 25 && bmi < 30) {
            return 'Anda berada dalam kategori kelebihan berat badan (gemuk)';
        } else {
            return 'Anda berada dalam kategori obesitas';
        }
    }

    function getBmiInfoText(bmi) {
        if (bmi >= 23 && bmi < 25) {
            return 'Anda berada dalam kategori overweight atau berat badan berlebih. Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalor makanan yang dikonsumsi dan berolahraga. Disarankan untuk mengurangi konsumsi makanan tinggi kalori, seperti makanan cepat saji dan minuman manis. Fokuskan pada konsumsi buah-buahan, sayuran, protein tanpa lemak, dan biji-bijian. Pastikan juga untuk melakukan latihan kardio dan latihan kekuatan secara rutin.';
        } else if (bmi < 19) {
            return 'Anda berada dalam kategori kurus. Disarankan untuk meningkatkan asupan kalori dan menambah berat badan hingga batas normal. Konsumsi makanan kaya kalori dan nutrisi seperti alpukat, kacang-kacangan, dan minyak sehat. Pertimbangkan untuk makan lebih sering dengan porsi yang lebih besar dan termasuk protein tinggi untuk mendukung pertumbuhan otot. Jangan lupa untuk melakukan latihan beban untuk membantu penambahan massa otot.';
        } else if (bmi >= 19 && bmi < 23) {
            return 'Anda berada dalam kategori ideal. Pertahankan pola makan dan gaya hidup sehat Anda. Pastikan untuk tetap mengonsumsi diet seimbang yang mencakup berbagai macam makanan dari semua kelompok makanan. Perhatikan ukuran porsi dan hindari makanan olahan serta gula tambahan. Tetap aktif dengan rutinitas olahraga reguler untuk menjaga kebugaran dan kesehatan tubuh.';
        } else if (bmi >= 25 && bmi < 30) {
            return 'Anda berada dalam kategori kelebihan berat badan (gemuk). Disarankan untuk menurunkan berat badan hingga batas normal. Kurangi konsumsi makanan tinggi lemak dan gula, seperti makanan ringan dan minuman manis. Fokus pada makanan rendah kalori, seperti sayuran, buah-buahan, dan protein tanpa lemak. Lakukan olahraga secara teratur, termasuk latihan kardio dan latihan kekuatan untuk membantu penurunan berat badan.';
        } else {
            return 'Anda berada dalam kategori obesitas. Disarankan untuk berkonsultasi dengan ahli gizi atau dokter untuk penanganan lebih lanjut. Rencanakan diet dengan bantuan profesional, fokus pada pengurangan asupan kalori dengan meningkatkan konsumsi sayuran, buah-buahan, dan protein rendah lemak. Latihan fisik yang teratur dan terencana dengan baik juga sangat penting. Pastikan untuk mengikuti panduan medis untuk mencapai dan mempertahankan berat badan sehat.';
        }
    }

    function getKategoriRisikoKesehatanText(bmi) {
        if (bmi >= 23 && bmi < 25) {
            return 'Beberapa penyakit berasal dari overweight atau berat badan berlebih';
        } else if (bmi < 19) {
            return 'Beberapa penyakit berasal dari kurus';
        } else if (bmi >= 19 && bmi < 23) {
            return 'Beberapa penyakit berasal dari kategori ideal';
        } else if (bmi >= 25 && bmi < 30) {
            return 'Beberapa penyakit berasal dari gemuk';
        } else {
            return 'Beberapa penyakit berasal dari obesitas';
        }
    }

    function updateRisikoKesehatan(bmi) {
        let risks = [];
        if (bmi < 19) {
            risks = [
                'Kekurangan Gizi',
                'Anemia',
                'Masalah Kesehatan Tulang'
            ];
        } else if (bmi >= 19 && bmi < 25) {
            risks = [
                'Risiko Kesehatan Rendah'
            ];
        } else if (bmi >= 25 && bmi < 30) {
            risks = [
                'Diabetes',
                'Hipertensi',
                'Sakit Jantung',
                'Osteoarthritis'
            ];
        } else {
            risks = [
                'Diabetes',
                'Hipertensi',
                'Sakit Jantung',
                'Osteoarthritis',
                'Sleep Apnea',
                'Kanker'
            ];
        }

        RisikoPenyakitList.innerHTML = risks.map(risk => `<li>${risk}</li>`).join('');
    }

    function resetResults() {
        JenisKelaminHasil.textContent = '';
        HasilUsia.textContent = '';
        HasilBmi.textContent = '';
        HasilStatus.textContent = '';
        BmiInfoKategori.textContent = '';
        BmiInfo.textContent = '';
        KategoriRisikoKesehatan.textContent = '';
        RisikoPenyakitList.innerHTML = '';
    
        const GambarKosongHasil = document.getElementById('GambarKosongHasil');
        const GambarKosongInfo = document.getElementById('GambarKosongInfo');
        const GambarKosongRisiko = document.getElementById('GambarKosongRisiko');

        GambarKosongHasil.style.display = 'block';
        GambarKosongInfo.style.display = 'block';
        GambarKosongRisiko.style.display = 'block';
    
        HasilSection.style.display = 'none';
        RisikoKesehatanSection.style.display = 'none';
    }
    
    ResetButton.addEventListener('click', function(event) {
        event.preventDefault();
        resetResults();
    });

    downloadBtn.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const JenisKelamin = document.querySelector('input[name="JenisKelamin"]:checked').value;
        const berat = document.getElementById('BeratBadan').value;
        const tinggi = document.getElementById('tinggi').value;
        const usia = document.getElementById('usia').value;
        const bmi = HasilBmi.textContent.split(': ')[1];
        const status = HasilStatus.textContent.split(': ')[1];
        const infoKategori = BmiInfoKategori.textContent;
        const info = BmiInfo.textContent;

        doc.text(`Jenis Kelamin: ${JenisKelamin}`, 10, 10);
        doc.text(`Berat Badan: ${berat} kg`, 10, 20);
        doc.text(`Tinggi Badan: ${tinggi} cm`, 10, 30);
        doc.text(`Usia: ${usia} tahun`, 10, 40);
        doc.text(`BMI: ${bmi}`, 10, 50);
        doc.text(`Status: ${status}`, 10, 60);
        doc.text(`Kategori: ${infoKategori}`, 10, 70);
        doc.text(`Informasi: ${info}`, 10, 80);

        doc.save('hasil_bmi.pdf');
    });

    konsultasiDokterBtn.addEventListener('click', function() {
        const phoneNumber = '082142788621'; 
        const message = encodeURIComponent('Halo, saya ingin berkonsultasi dengan dokter.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });

    konsultasiAhliGiziBtn.addEventListener('click', function() {
        const phoneNumber = '082142788621';
        const message = encodeURIComponent('Halo, saya ingin berkonsultasi dengan ahli gizi.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Ambil elemen tombol dan formulir
        const showAhliGiziFormBtn = document.getElementById('showAhliGiziForm');
        const showDokterFormBtn = document.getElementById('showDokterForm');
        const ahliGiziForm = document.getElementById('AhliGiziForm');
        const dokterForm = document.getElementById('DokterForm');
    
        // Event listener untuk tombol Ahli Gizi
        showAhliGiziFormBtn.addEventListener('click', function() {
            ahliGiziForm.style.display = 'block';
            dokterForm.style.display = 'none';
        });
    
        // Event listener untuk tombol Dokter
        showDokterFormBtn.addEventListener('click', function() {
            dokterForm.style.display = 'block';
            ahliGiziForm.style.display = 'none';
        });
    
        // Event listener untuk formulir BMI
        const bmiForm = document.getElementById('BmiForm');
        bmiForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Logika perhitungan BMI dan menampilkan hasil
            const beratBadan = parseFloat(document.getElementById('BeratBadan').value);
            const tinggi = parseFloat(document.getElementById('tinggi').value) / 100; // konversi ke meter
            const bmi = beratBadan / (tinggi * tinggi);
    
            // Menampilkan hasil BMI
            document.getElementById('HasilBmi').textContent = bmi.toFixed(2);
            document.getElementById('HasilStatus').textContent = getBmiStatus(bmi);
    
            // Mengatur visibilitas elemen
            document.getElementById('HasilSection').style.display = 'block';
            document.querySelector('.Kalkulator').style.display = 'none';
        });
    
        function getBmiStatus(bmi) {
            if (bmi < 18.5) return 'Kekurangan berat badan';
            if (bmi >= 18.5 && bmi < 24.9) return 'Berat badan normal';
            if (bmi >= 25 && bmi < 29.9) return 'Kelebihan berat badan';
            return 'Obesitas';
        }
    
        // Event listener untuk tombol Reset
        document.querySelector('.Reset-btn').addEventListener('click', function() {
            bmiForm.reset();
            document.getElementById('HasilSection').style.display = 'none';
            document.querySelector('.Kalkulator').style.display = 'block';
        });
    });
    

    // Tampilkan formulir ahli gizi
    showAhliGiziForm.addEventListener('click', function() {
        ahliGiziForm.style.display = 'block';
        dokterForm.style.display = 'none';
    });

    // Tampilkan formulir dokter
    showDokterForm.addEventListener('click', function() {
        dokterForm.style.display = 'block';
        ahliGiziForm.style.display = 'none';
    });

    // Sembunyikan formulir secara default
    ahliGiziForm.style.display = 'none';
    dokterForm.style.display = 'none';
});
