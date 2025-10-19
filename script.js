document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start")
    const stopButton = document.getElementById("stop")
    const boxes = document.querySelectorAll(".hole")
    const board = document.querySelector(".board")
    const scoreDisplay = document.querySelector(".score")

    const bgMusic = new Audio('music copy.mp3')
    const BitSound = new Audio('whack.mp3')
    const gameOverSound = new Audio('gameOver.mp3')
    const bombSound = new Audio('bomb.mp3')

    let score = 0
    let gameInterval

    function randomAppear() {
        boxes.forEach(box => {
            box.innerHTML = ''
        })

        const randomChoice = Math.floor(Math.random() * boxes.length)
        const chosenBox = boxes[randomChoice]

        const isBomb = Math.random() < 0.25
        const img = document.createElement('img')
        img.src = isBomb ? 'bomb.png' : 'mole.jpg'
        img.classList.add('character')

        img.addEventListener("click", () => {
            if (isBomb) {
                bombSound.play()
                score = Math.max(0, score - 1)
                alert("💣 You Clicked On a Bomb!")

            } else {
                score++
                BitSound.currentTime = 0
                BitSound.play()
            }
            scoreDisplay.innerHTML = `Score: ${score}`
        })

        chosenBox.appendChild(img)
    }

    startButton.addEventListener("click", function () {
        if (!gameInterval) {
            board.style.display = "grid"
            gameInterval = setInterval(randomAppear, 800)
            bgMusic.play()
            bgMusic.loop = true
        }
    })

    stopButton.addEventListener("click", function () {
        board.style.display = "none"
        clearInterval(gameInterval)
        gameInterval = null
        scoreDisplay.innerHTML = `Score: ${score}`
        gameOverSound.currentTime = 0
        gameOverSound.play()
        bgMusic.pause()
    })
})
