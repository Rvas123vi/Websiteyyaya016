document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle-button');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const contactForm = document.getElementById('contact-form');
    const calcDisplay = document.getElementById('calc-display');

    // --- Loading Screen & Autoplay Music ---
    // Coba putar musik setelah interaksi pengguna atau otomatis jika diizinkan
    const playMusicPromise = backgroundMusic.play();
    if (playMusicPromise !== undefined) {
        playMusicPromise.then(_ => {
            // Autoplay dimulai
            musicToggleButton.textContent = '🔇'; // Emoji mute
        }).catch(error => {
            // Autoplay gagal, mungkin perlu interaksi pengguna
            console.log("Autoplay musik gagal:", error);
            musicToggleButton.textContent = '🔊'; // Emoji sound on
            // Tampilkan tombol play manual jika diperlukan
        });
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Waktu transisi opacity
        }, 1500); // Tampilkan loading screen selama 1.5 detik
    });


    // --- Background Music Toggle ---
    let isMusicPlaying = !backgroundMusic.paused; // Cek status awal
    musicToggleButton.textContent = isMusicPlaying ? '🔇' : '🔊';

    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggleButton.textContent = '🔇';
        } else {
            backgroundMusic.pause();
            musicToggleButton.textContent = '🔊';
        }
    });

    // --- Theme Toggle ---
    let currentTheme = 'terang'; // Atau 'gelap'
    let weatherEffect = 'clear'; // 'snow', 'rain', 'clear'
    let darkThemeEffect = 'stars'; // 'stars', 'shooting-stars-active'

    // Set ikon awal tombol tema
    const themeIcon = themeToggleButton.querySelector('i');
    if (body.classList.contains('gelap')) {
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Tampilkan ikon matahari jika gelap
        currentTheme = 'gelap';
        applyDarkThemeEffects();
    } else {
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Tampilkan ikon bulan jika terang
        currentTheme = 'terang';
        applyLightThemeEffects();
    }


    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('gelap');
        body.classList.toggle('terang');

        if (body.classList.contains('gelap')) {
            currentTheme = 'gelap';
            themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            clearLightThemeEffects();
            applyDarkThemeEffects();
        } else {
            currentTheme = 'terang';
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            clearDarkThemeEffects();
            applyLightThemeEffects();
        }
    });

    function clearLightThemeEffects() {
        body.classList.remove('snow-theme', 'rain-theme');
    }

    function clearDarkThemeEffects() {
        body.classList.remove('stars-theme');
        // Hapus shooting stars jika ada
        const existingStars = document.querySelectorAll('.shooting-star');
        existingStars.forEach(star => star.remove());
        darkThemeEffect = 'stars'; // reset
    }

    function applyLightThemeEffects() {
        // Ganti efek cuaca secara acak atau berdasarkan logika lain
        const effects = ['clear', 'snow', 'rain'];
        weatherEffect = effects[Math.floor(Math.random() * effects.length)];

        if (weatherEffect === 'snow') {
            body.classList.add('snow-theme');
        } else if (weatherEffect === 'rain') {
            body.classList.add('rain-theme');
        }
        // 'clear' tidak menambahkan kelas khusus
    }

    function applyDarkThemeEffects() {
        body.classList.add('stars-theme');
        // Tambahkan bintang jatuh secara periodik
        if (darkThemeEffect !== 'shooting-stars-active') { // Hindari duplikasi interval
            darkThemeEffect = 'shooting-stars-active';
            setInterval(createShootingStar, 5000); // Buat bintang jatuh setiap 5 detik
        }
    }

    function createShootingStar() {
        if (!body.classList.contains('gelap')) return; // Hanya di tema gelap

        const star = document.createElement('div');
        star.classList.add('shooting-star');
        star.style.top = `${Math.random() * 50}vh`; // Posisi Y acak di separuh atas layar
        star.style.left = `${Math.random() * 100}vw`; // Posisi X acak
        star.style.animationDuration = `${2 + Math.random() * 3}s`; // Durasi acak
        star.style.opacity = '1'; // Pastikan terlihat saat dibuat

        document.body.appendChild(star);

        // Hapus bintang setelah animasi selesai untuk menjaga performa
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    // Panggil fungsi efek awal berdasarkan tema saat load
    if (currentTheme === 'gelap') {
        applyDarkThemeEffects();
    } else {
        applyLightThemeEffects();
    }


    // --- Scroll to Top Button ---
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    // --- WhatsApp Button ---
    window.hubungiWhatsApp = function(namaProduk) {
        const nomorWhatsApp = "6281234567890"; // GANTI DENGAN NOMOR WA ANDA (gunakan format 62)
        const pesan = `Halo, saya tertarik dengan produk "${namaProduk}". Bisakah saya mendapatkan informasi lebih lanjut?`;
        const urlWhatsApp = `https://api.whatsapp.com/send?phone=${nomorWhatsApp}&text=${encodeURIComponent(pesan)}`;
        window.open(urlWhatsApp, '_blank');
    }

    // --- Contact Form (mailto) ---
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userEmail = document.getElementById('user-email').value;
        const userMessage = document.getElementById('user-message').value;
        const subject = "Pesan dari Website Jualan";
        const mailtoLink = `mailto:EMAIL_TUJUAN_ANDA@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Dari: ${userEmail}\n\nPesan:\n${userMessage}`)}`;
        // GANTI EMAIL_TUJUAN_ANDA@example.com dengan alamat email Anda

        window.location.href = mailtoLink;
        alert("Anda akan diarahkan ke aplikasi email Anda untuk mengirim pesan.");
        contactForm.reset();
    });

    // --- Kalkulator ---
    window.appendToDisplay = function(value) {
        calcDisplay.value += value;
    }

    window.clearDisplay = function() {
        calcDisplay.value = "";
    }

    window.calculateResult = function() {
        try {
            // Ganti 'x' dengan '*' agar eval berfungsi
            const expression = calcDisplay.value.replace(/x/g, '*');
            calcDisplay.value = eval(expression); // Hati-hati dengan eval(), untuk kalkulator sederhana ok.
        } catch (error) {
            calcDisplay.value = "Error";
        }
    }
});
