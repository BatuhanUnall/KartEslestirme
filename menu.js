function startGame(difficulty) {//Zorluk seçimini alan fonksiyon.
    window.location.href = difficulty + ".html"; // Seçilen zorluğa göre ilgili html dosyasına yönlendirir.
}

function showBestTimes() {//En iyi süreleri gösteren fonksiyon
    window.location.href = "bestScores.html"//En iyi sürelerin olduğu html sayfasını açar.
}

function exitGame(choice) {//Uygulamadan çıkmak için fonksiyon.
    if (choice == "yes") {//Gelen parametre yes ise çalışır
        window.close();//Uygulama kapanır.
    }
    else {
        location.reload();//Farklı parametre gelirse menu.html sayfası yeniden yüklenir.
    }
}

function showDifficultyMenu() {//Zorluk seçeneklerinin açılması için fonksiyon
    const difficultyMenu = document.getElementById('difficultyMenu');//Zorluk seçeneklerinin olduğu div seçilir
    difficultyMenu.style.display = 'block';//Zorluk seçenekleri görünür hale gelir
}

function showExitMenu() {//Çıkış işlemi için emin misiniz sorusunu gösterir
    const exitMenu = document.getElementById('exit');//İlgili element seçimini yapar.
    exitMenu.style.display = 'block';//Evet ve Hayır butonları görünür hale gelir.
}
