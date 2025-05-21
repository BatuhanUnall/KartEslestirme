//medium.js ve hard.js dosyalarında sadece kartların adedi, resimlerin olduğu klasörler ve eşleşme sayılarında farklılık vardır. O yüzden yorum satırları sadece bu dosyadadır.
document.addEventListener('DOMContentLoaded', () => { //HTML içeriği yüklendiğinde çalışacak kodlar
    //Element seçim işlemleri
    const gameBoard = document.getElementById('gameBoard');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const sure = document.getElementById("sure")
    const bestTimeDiv = document.getElementById("high-score")
    const bestTimeTxt = document.getElementById("easy-best-time")
    const saveBtn = document.getElementById("save-btn")
    const cardValues = [1, 2, 3, 4]; //Kartların adedi kadar ve images klasörü altındaki resimlerin isimleri olan dizi
    const cards = [...cardValues, ...cardValues]; //cardValues dizisinden iki tane oluşturan kod
    let firstCard = null; //Eşi olan kartlardan birincisi
    let secondCard = null; //Eşi olan kartlardan ikincisi
    let lockBoard = false; //Oyun alanınında işlem yapılıp yapılamayacağını kontrol eden değişken
    let matchCount = 0; //Eşleşme sayısını tutan değişken
    let timer; //Oyun içinde geçen süreyi gösteren sayaç
    let startTime; //Oyunun ne kadar sürdüğünü hesaplamak için başlama zamanını tutan değişken
    let endTime; //Oyunun ne kadar sürdüğünü hesaplamak için bitme zamanını tutan değişken
    cards.sort(() => 0.5 - Math.random()); //cards dizisindeki elemanların indexini karıştırır



    cards.forEach(value => {// cards dizisindeki her elemanı value'ya eşitler
        const card = document.createElement('div'); //div oluşturup card isimli değişkene atama yapar.
        card.classList.add('card');//card isimli değişkene styles.css isimli css dosyamızdaki stil tanımlamasını yapar.
        card.dataset.value = value; //Kartların eşlenip eşlenmediğini öğrenmek için öğelere dataset özelliği ekliyoruz.

        const frontFace = document.createElement('div'); //Kartın ön yüzü için div oluşturma işlemi
        frontFace.classList.add('front'); //Kartın ön yüzüne css sınıfı ekleme
        

        const backFace = document.createElement('div'); //Kartın arka yüzü için div oluşturma
        backFace.classList.add('back'); //Kartın arka yüzüne css sınıfı ekleme 
        backFace.style.backgroundImage = `url('4images/${value}.jpg')`; //Kartların arka yüzünü 4images klasöründeki resimlerden yapma

        card.appendChild(frontFace); //card divinin içine frontFace divini atma
        card.appendChild(backFace); //card divinin içine backFace divini atma
        gameBoard.appendChild(card); //gameBoard divine card divini atma

        card.addEventListener('click', flipCard); //card için click eventine flipCard fonksiyonunu ekleme
    });


    function startTimer() {//Sayacı başlatma fonksiyonu
        startTime = Date.now(); //Şimdiki zamanı milisaniye cinsinden startTime değişkenine aktarma
        timer = setInterval(updateTimer, 1000);//Her bir saniyede updateTimer metodunu çalıştırarak ekrandaki zaman sayacını günceller
    }


    function updateTimer() {//Süre sayacını güncelleme fonksiyonu
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); //Şimdiki zamanda startTime'ı çıkararak 1000'e böler ve geçen süreyi saniye cinsinden verir. 
        const minutes = Math.floor(elapsedTime / 60); //Geçen süreyi varsa dakikaya çevirir
        const seconds = elapsedTime % 60; //Geçen sürenin 60 ile bölümünden kalanı yani saniyeyi verir
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;//Geçen zamanı dakika ve saniye cinsinden ekranda yazdırır
    }

    function stopTimer() { //Sayacı durdurma fonksiyonu
        endTime = Date.now(); //Oyunun bitiş zamanını kaydediyor.
        clearInterval(timer); //Süre sayacını durdurur
    }

    function flipCard() { //Kartları döndürecek fonksiyon
        if (lockBoard) return; //Tahta kilitliyse fonksiyonu sonlandırır.
        if (this === firstCard) return; //Aynı karta iki kez tıklanırsa fonksiyonu sonlandırır.

        this.classList.add('flipped');//Tıklanan karta flipped classı eklenir

        if (!firstCard) {//Eğer hiç bir karta tıklanmamışsa çalışır
            firstCard = this; //firstCard değişkenine tıklanan kartı atar ve fonksiyon sonlanır.
            return;
        }

        secondCard = this; //Yukarıdakilerin hiçbiri gerçekleşmediyse tıklanan kartı secondCard değişkenine atar.
        checkForMatch(); //Eşleşme sayısını kontrol eden fonksiyonu çağırır.
    }

    function checkForMatch() {//Eşleşme sayısını kontrol eden fonksiyon.
        if (firstCard.dataset.value === secondCard.dataset.value) {//Birinci ve ikinci kartın dataSet özelliği aynıysa yani eşleşme olduysa çalışır.
            disableCards();//Eşlenen kartları etkisiz(tıklanamaz) hale getiren fonksiyon
            matchCount += 1;//Eşleşme sayısı 1 arttırılır
            scoreElement.textContent = `Eşleşmeler: ${matchCount}`;//Eşleşme sayısını gösteren öğenin içeriği güncellenir
            if (matchCount === 4) {//Eşleşme sayısı 4 olduğunda yani oyun bittiğinde çalışır.
                stopTimer();//Süre sayacını durduracak fonksiyon çağrılır.
                const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);//Geçen süre saniye cinsinde hesaplanıyor.
                const totalMinutes = Math.floor(totalTimeInSeconds / 60);//Geçen sürede varsa dakikaya çevirme işlemi yapılıyor.
                const totalSeconds = totalTimeInSeconds % 60;//Geçen süreyi dakikadan ayırıp saniye kısmını alıyor.
                if (totalMinutes == 0) {//Eğer oyun 1 dakikadan az sürede bittiyse çalışacak fonksiyon.
                    sure.innerHTML = 'Oyun bitti! Toplam süre: ' + totalSeconds + ' saniye.'//Oyunun ne kadar sürede bittiğin gösteren öğenin içeriğini değiştirir.
                    sure.style.display = "block";//Oyun bitince süreyi gösteren öğeyi görünür hale getirir.
                    if ((localStorage.getItem("easyBestTime") == null) || (totalSeconds < Number(localStorage.getItem("easyBestTime")))) {//Eğer henüz en iyi süre kaydı yoksa veya yeni en iyi süre yapıldıysa çalışır.
                        bestTimeDiv.style.display = "block";//En iyi süreyi yapanın ismini yazmamızı sağlayacak öğeyi görünür hale getirir.
                        bestTimeTxt.addEventListener("change", function () {//İsim yazmamız gereken öğeye change eventi ekler. Eğer bir şey yazılmazsa en iyi süre kaydedilmez.
                            saveBtn.addEventListener("click", function () {//Kaydetme butonuna tıklama eventi ekler.
                                localStorage.setItem("easyBestTime", totalSeconds)//En iyi süreyi saniye cinsinden easyBestTime'a kaydeder.localStorage sayesinde bu bilgi tarayıcıda kaydolur.
                                localStorage.setItem("easyBestTimeName", bestTimeTxt.value)//Textbox'a girilen ismi easyBestTimeName'e kaydeder.
                            })
                        })
                    }
                }
            }
            else {//Oyun bir dakikadan fazla sürede bittyse çalışır
                sure.innerHTML = 'Oyun bitti! Toplam süre:' + totalMinutes + 'dakika ' + totalSeconds + ' saniye.'//Oyunun ne kadar sürede bittiğin gösteren öğenin içeriğini değiştirir.Farklı olarak süreyi dakika ve saniye cinsinden gösterir.
                sure.style.display = "block";//Oyun bitince süreyi gösteren öğeyi görünür hale getirir.
                let totalTime = (totalMinutes * 60) + totalSeconds//Bitirme süresini saniyeye çevirir.
                if ((localStorage.getItem("easyBestTime") == null) || (totalSeconds < Number(localStorage.getItem("easyBestTime")))) {//Eğer henüz en iyi süre kaydı yoksa veya yeni en iyi süre yapıldıysa çalışır.
                    bestTimeDiv.style.display = "block";//En iyi süreyi yapanın ismini yazmamızı sağlayacak öğeyi görünür hale getirir.
                    bestTimeTxt.addEventListener("change", function () {//İsim yazmamız gereken öğeye change eventi ekler. Eğer bir şey yazılmazsa en iyi süre kaydedilmez.
                        saveBtn.addEventListener("click", function () {//Kaydetme butonuna tıklama eventi ekler.
                            localStorage.setItem("easyBestTime", totalTime)//En iyi süreyi saniye cinsinden easyBestTime'a kaydeder.localStorage sayesinde bu bilgi tarayıcıda kaydolur.
                            localStorage.setItem("easyBestTimeName", bestTimeTxt.value)//Textbox'a girilen ismi easyBestTimeName'e kaydeder.
                        })
                    })
                }
            }
        }
        else {//Eşleşme gerçekleşmediğinde çalışır
            unflipCards();//Kartların yüzünü geri döndüren fonksiyonu çağırır.
        }
    }

    function disableCards() {
        firstCard.classList.add('matched');//Kartların eşleştiğine dair class ekler.
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard);//Eşlenen kartlara tıklandığında flip animasyonunu kaldırır.
        secondCard.removeEventListener('click', flipCard);
        resetBoard();//Oyun alanını resetleyen fonksiyonu çalıştırır.
    }

    function unflipCards() {//Kartlar eşlenmediğinde tekrar dönmelerini sağlayan fonksiyon.
        lockBoard = true;//Kartlar dönerken oyun alanını kilitler.Yani başka karta tıklanamaz.
        setTimeout(() => {//Kartlardan flipped classını kaldırır. Bunu yarım saniyede yapar.
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();//Oyun alanını resetleyen fonksiyon çalıştırır.
        }, 500);
    }

    function resetBoard() {//Oyun alanını resetleyen fonksiyon.
        firstCard = null;//firstCard değişkeninin değerini null yapar.
        secondCard = null;//secondCard değişkeninin değerini null yapar.
        lockBoard = false;//Oyun alanının kilidini açar. Kartlar tıklanabilir hale gelir.
    }

    startTimer();//Sayıcı başlatma fonksiyonunu çağırır.
});
