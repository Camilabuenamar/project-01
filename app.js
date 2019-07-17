const audio = document.createElement('audio')
audio.src='Girls-Beyonce.mp3'
audio.loop = true
audio.autoplay = true

document.addEventListener('DOMContentLoaded', () => {

  const squares = document.querySelectorAll('.grid div')
  const rightCars = document.querySelectorAll('.right-cars')
  const leftCars = document.querySelectorAll('.left-cars')
  const rightBuses = document.querySelectorAll('.right-buses')
  const leftBuses = document.querySelectorAll('.left-buses')
  const timeLeft = document.querySelector('#time')
  const popUp = document.querySelector('.popUp')

  let typeOfJob = 0

  let currentIndex = 76
  const width = 9
  timeLeft.textContent = 120
  squares[currentIndex].classList.add('woman')
  squares[currentIndex].setAttribute('data-type', typeOfJob)
  document.addEventListener('keyup', moveWoman)

  function moveWoman(e) {
    squares[currentIndex].classList.remove('woman')
    squares[currentIndex].removeAttribute('data-type')
    stopGame()
    switch(e.keyCode) {
      case 37:
        if(currentIndex % width !== 0) currentIndex -= 1
        break
      case 38:
        if(currentIndex - width >= 0) currentIndex -= width
        break
      case 39:
        if(currentIndex % width < width - 1) currentIndex += 1
        break
      case 40:
        if (currentIndex + width < width * width) currentIndex += width
        break
    }
    squares[currentIndex].classList.add('woman')
    squares[currentIndex].setAttribute('data-type', typeOfJob)
    if (squares[currentIndex].classList.contains('woman') && squares[currentIndex].classList.contains('workPlace') && +squares[currentIndex].getAttribute('data-workPlace') === typeOfJob) {
      currentIndex = 76
      typeOfJob++
      squares[currentIndex].classList.add('woman')
      squares[currentIndex].setAttribute('data-type', typeOfJob)
    }
    if (squares[1].classList.contains('woman') && squares[3].classList.contains('woman') && squares[5].classList.contains('woman') && squares[7].classList.contains('woman')) {
      popUp.innerHTML = 'You won! Want to try again? <span id="button"> ...Play again</span>'
      popUp.style.display = 'flex'
      popUp.addEventListener('click', () => {
        popUp.style.display = 'none'
        typeOfJob = 0
        timeLeft.textContent = 120
        currentTime = timeLeft.textContent
        timer = setInterval(countdown, 1000)
        squares[1].classList.remove('woman')
        squares[3].classList.remove('woman')
        squares[5].classList.remove('woman')
        squares[7].classList.remove('woman')
      })
      stopGame()
    }
  }

  function moveRightBuses(rightBus) {
    stopGame()
    switch (true) {
      case rightBus.classList.contains('bm-one'):
        rightBus.classList.remove('safecross')
        rightBus.classList.remove('bm-one')
        rightBus.classList.add('bm-five')
        break
      case rightBus.classList.contains('bm-two'):
        rightBus.classList.remove('bm-two')
        rightBus.classList.add('bm-one')
        break
      case rightBus.classList.contains('bm-three'):
        rightBus.classList.remove('bm-three')
        rightBus.classList.add('bm-two')
        break
      case rightBus.classList.contains('bm-four'):
        rightBus.classList.add('safecross')
        rightBus.classList.remove('bm-four')
        rightBus.classList.add('bm-three')
        break
      case rightBus.classList.contains('bm-five'):
        rightBus.classList.remove('bm-five')
        rightBus.classList.add('bm-four')
        break
    }
  }

  function moveLeftBuses(leftBus) {
    stopGame()
    switch (true) {
      case leftBus.classList.contains('bm-one'):
        leftBus.classList.remove('bm-one')
        leftBus.classList.add('bm-two')
        break
      case leftBus.classList.contains('bm-two'):
        leftBus.classList.remove('bm-two')
        leftBus.classList.add('bm-three')
        break
      case leftBus.classList.contains('bm-three'):
        leftBus.classList.remove('safecross')
        leftBus.classList.remove('bm-three')
        leftBus.classList.add('bm-four')
        break
      case leftBus.classList.contains('bm-four'):
        leftBus.classList.remove('bm-four')
        leftBus.classList.add('bm-five')
        break
      case leftBus.classList.contains('bm-five'):
        leftBus.classList.add('safecross')
        leftBus.classList.remove('bm-five')
        leftBus.classList.add('bm-one')
        break
    }

  }

  function moveCarsInTime() {
    rightCars.forEach(rightCar => moverightCars(rightCar))
    leftCars.forEach(leftCar => moveleftCars(leftCar))
  }

  function moverightCars(rightCar) {
    stopGame()
    switch (true) {
      case rightCar.classList.contains('cm-one'):
        rightCar.classList.remove('safecross')
        rightCar.classList.remove('cm-one')
        rightCar.classList.add('cm-three')
        break
      case rightCar.classList.contains('cm-two'):
        rightCar.classList.remove('cm-two')
        rightCar.classList.add('cm-one')
        break
      case rightCar.classList.contains('cm-three'):
        rightCar.classList.add('safecross')
        rightCar.classList.remove('cm-three')
        rightCar.classList.add('cm-two')
        break
    }
  }

  function moveleftCars(leftCar) {
    stopGame()
    switch (true) {
      case leftCar.classList.contains('cm-one'):
        leftCar.classList.add('safecross')
        leftCar.classList.remove('cm-one')
        leftCar.classList.add('cm-two')
        break
      case leftCar.classList.contains('cm-two'):
        leftCar.classList.remove('cm-two')
        leftCar.classList.add('cm-three')
        break
      case leftCar.classList.contains('cm-three'):
        leftCar.classList.remove('safecross')
        leftCar.classList.remove('cm-three')
        leftCar.classList.add('cm-one')
        break
    }
  }

  function moveBusesInTime() {
    leftBuses.forEach(leftBus => moveLeftBuses(leftBus))
    rightBuses.forEach(rightBus => moveRightBuses(rightBus))
    if (currentIndex >= 27 && currentIndex < 35) {
      squares[currentIndex].classList.remove('woman')
      squares[currentIndex].removeAttribute('data-type')
      currentIndex = currentIndex +1
      squares[currentIndex].classList.add('woman')
      squares[currentIndex].setAttribute('data-type', typeOfJob)
    }
    if (currentIndex > 18 && currentIndex <= 26) {
      squares[currentIndex].classList.remove('woman')
      squares[currentIndex].removeAttribute('data-type')
      currentIndex = currentIndex -1
      squares[currentIndex].classList.add('woman')
      squares[currentIndex].setAttribute('data-type', typeOfJob)
    }
  }


  function stopGame(){
    if (squares[currentIndex].classList.contains('woman') && !squares[currentIndex].classList.contains('safecross') || currentTime === 0) {
      // clearInterval(timer)
      popUp.innerHTML = 'You lost. Do you want to try again? <span id="button"> ...Play again</span>'
      popUp.style.display = 'flex'
      squares[currentIndex].classList.remove('woman')
      squares[currentIndex].removeAttribute('data-type')
      squares[1].classList.remove('woman')
      squares[3].classList.remove('woman')
      squares[5].classList.remove('woman')
      squares[7].classList.remove('woman')
      currentIndex = 76
      squares[currentIndex].classList.add('woman')
      squares[currentIndex].setAttribute('data-type', 0)
      popUp.addEventListener('click', () => {
        popUp.style.display = 'none'
        typeOfJob = 0
        timeLeft.textContent = 120
        currentTime = timeLeft.textContent
        // timer = setInterval(countdown, 1000)
      })
    }
  }
  // --- Intervals
  const carsTimerId = setInterval(moveCarsInTime, 550)

  const busesTimerId = setInterval(moveBusesInTime, 550)

  // --- Time remaining

  let currentTime = timeLeft.textContent

  function countdown() {
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime === 0) {
      stopGame()
      // clearInterval(timer)
    }
  }

  let timer = setInterval(countdown, 1000)
})
