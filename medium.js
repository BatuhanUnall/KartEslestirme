document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const sure = document.getElementById("sure")
    const bestTimeDiv = document.getElementById("high-score")
    const bestTimeTxt = document.getElementById("medium-best-time")
    const saveBtn = document.getElementById("save-btn")
    const cardValues = [1, 2, 3, 4, 5, 6, 7, 8];
    const cards = [...cardValues, ...cardValues];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchCount = 0;
    let timer;
    let startTime;
    let endTime;

    
    cards.sort(() => 0.5 - Math.random());

    
    cards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front');
        

        const backFace = document.createElement('div');
        backFace.classList.add('back');
        backFace.style.backgroundImage = `url('8images/${value}.jpg')`;

        card.appendChild(frontFace);
        card.appendChild(backFace);
        gameBoard.appendChild(card);

        card.addEventListener('click', flipCard);
    });

   
    function startTimer() {
        startTime = Date.now();
        timer = setInterval(updateTimer, 1000);
    }

    
    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function stopTimer() {
        endTime = Date.now();
        clearInterval(timer);
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            disableCards();
            matchCount += 1;
            scoreElement.textContent = `Eşleşmeler: ${matchCount}`;
            if (matchCount === 8) {
                stopTimer();
                const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
                const totalMinutes = Math.floor(totalTimeInSeconds / 60);
                const totalSeconds = totalTimeInSeconds % 60;
                if (totalMinutes == 0) {
                    sure.innerHTML = 'Oyun bitti! Toplam süre: ' + totalSeconds + ' saniye.'
                    sure.style.display = "block";
                    if((localStorage.getItem("mediumBestTime") == null) || (totalSeconds < Number(localStorage.getItem("mediumBestTime")))) {
                        bestTimeDiv.style.display = "block";
                        bestTimeTxt.addEventListener("change", function () {
                            localStorage.setItem("mediumBestTime", totalSeconds)
                            saveBtn.addEventListener("click", function () {
                                localStorage.setItem("mediumBestTimeName", bestTimeTxt.value)
                            })
                        })
                    }
                }
                else {
                    sure.innerHTML = 'Oyun bitti! Toplam süre:' + totalMinutes + 'dakika ' + totalSeconds + ' saniye.'
                    sure.style.display = "block";
                    let totalTime = (totalMinutes * 60) + totalSeconds
                    if((localStorage.getItem("mediumBestTime") == null) || (totalSeconds < Number(localStorage.getItem("mediumBestTime")))) {
                        bestTimeDiv.style.display = "block";
                        bestTimeTxt.addEventListener("change", function () {
                            localStorage.setItem("mediumBestTime", totalTime)
                            saveBtn.addEventListener("click", function () {
                                localStorage.setItem("mediumBestTimeName", bestTimeTxt.value)
                            })
                        })
                    }
                }
            }
        }
        else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 500);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    
    startTimer();
});
