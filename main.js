// Genel değişkenler
let timer; // setInterval için zamanlayıcı
let timeLeft = 15 * 60; // Kalan süre (saniye cinsinden): 15 dakika = 15 * 60 saniye
let isRunning = false; // Zamanlayıcının çalışıp çalışmadığını kontrol eder

// HTML elementlerini seç
const timerDisplay = document.getElementById('timer');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');

// Zamanlayıcı ekranını güncelle
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60); // Dakikaları hesapla
    const seconds = timeLeft % 60; // Saniyeleri hesapla
    // Ekranı güncelle, sayıları iki haneli olacak şekilde formatla
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Başlat/Duraklat düğmesi işlevi
function startPauseTimer() {
    if (isRunning) {
        // Eğer çalışıyorsa, duraklat
        clearInterval(timer);
        startPauseButton.textContent = 'Devam Et';
    } else {
        // Eğer duraklatılmışsa, başlat
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--; // Her saniye kalan süreyi azalt
                updateDisplay(); // Ekranı güncelle
            } else {
                // Süre dolduğunda
                clearInterval(timer);
                alert('Pomodoro tamamlandı!');
                resetTimer(); // Zamanlayıcıyı sıfırla
            }
        }, 1000); // Her 1000 ms (1 saniye) de bir çalıştır
        startPauseButton.textContent = 'Duraklat';
    }
    isRunning = !isRunning; // Çalışma durumunu tersine çevir
}

// Zamanlayıcıyı sıfırla
function resetTimer() {
    clearInterval(timer); // Mevcut zamanlayıcıyı durdur
    timeLeft = 15 * 60; // Süreyi 15 dakikaya ayarla
    isRunning = false; // Çalışma durumunu false yap
    startPauseButton.textContent = 'Başlat'; // Düğme metnini güncelle
    updateDisplay(); // Ekranı güncelle
}

// Düğmelere olay dinleyicileri ekle
startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);

// Sayfa yüklendiğinde ekranı güncelle
updateDisplay();