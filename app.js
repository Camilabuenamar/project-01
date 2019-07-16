document.addEventListener('DOMContentLoaded', () => {

  const squares = document.querySelectorAll('.grid div')
  const rightHedgehogs = document.querySelectorAll('.right-hedgehogs')
  const leftHedgehogs = document.querySelectorAll('.left-hedgehogs')
  const rightWoods = document.querySelectorAll('.right-woods')
  const leftWoods = document.querySelectorAll('.left-woods')
  const timeLeft = document.querySelector('#time')

  let typeOfGirl = 0

  let currentIndex = 76
  const width = 9
  timeLeft.textContent = 120
  squares[currentIndex].classList.add('scout')
  squares[currentIndex].setAttribute('data-type', typeOfGirl)
  document.addEventListener('keyup', moveScout)

  function moveScout(e) {
    squares[currentIndex].classList.remove('scout')
    squares[currentIndex].removeAttribute('data-type')
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
    squares[currentIndex].classList.add('scout')
    squares[currentIndex].setAttribute('data-type', typeOfGirl)
    stopGame()
    if (squares[currentIndex].classList.contains('scout') && squares[currentIndex].classList.contains('tents') && +squares[currentIndex].getAttribute('data-tent') === typeOfGirl) {
      currentIndex = 76
      typeOfGirl++
      squares[currentIndex].classList.add('scout')
      squares[currentIndex].setAttribute('data-type', typeOfGirl)
    }
    if (squares[1].classList.contains('scout') && squares[3].classList.contains('scout') && squares[5].classList.contains('scout') && squares[7].classList.contains('scout')) {
      alert('You won! Want to try again?')
    }
  }

  function moveRightWoods(rightWood) {
    stopGame()
    switch (true) {
      case rightWood.classList.contains('wm-one'):
        rightWood.classList.remove('safecross')
        rightWood.classList.remove('wm-one')
        rightWood.classList.add('wm-five')
        break
      case rightWood.classList.contains('wm-two'):
        rightWood.classList.remove('wm-two')
        rightWood.classList.add('wm-one')
        break
      case rightWood.classList.contains('wm-three'):
        rightWood.classList.remove('wm-three')
        rightWood.classList.add('wm-two')
        break
      case rightWood.classList.contains('wm-four'):
        rightWood.classList.add('safecross')
        rightWood.classList.remove('wm-four')
        rightWood.classList.add('wm-three')
        break
      case rightWood.classList.contains('wm-five'):
        rightWood.classList.remove('wm-five')
        rightWood.classList.add('wm-four')
        break
    }
  }

  function moveLeftWoods(leftWood) {
    stopGame()
    switch (true) {
      case leftWood.classList.contains('wm-one'):
        leftWood.classList.remove('wm-one')
        leftWood.classList.add('wm-two')
        break
      case leftWood.classList.contains('wm-two'):
        leftWood.classList.remove('wm-two')
        leftWood.classList.add('wm-three')
        break
      case leftWood.classList.contains('wm-three'):
        leftWood.classList.remove('safecross')
        leftWood.classList.remove('wm-three')
        leftWood.classList.add('wm-four')
        break
      case leftWood.classList.contains('wm-four'):
        leftWood.classList.remove('wm-four')
        leftWood.classList.add('wm-five')
        break
      case leftWood.classList.contains('wm-five'):
        leftWood.classList.add('safecross')
        leftWood.classList.remove('wm-five')
        leftWood.classList.add('wm-one')
        break
    }

  }

  function moveHedgehogsInTime() {
    rightHedgehogs.forEach(rightHedgehog => moverightHedgehogs(rightHedgehog))
    leftHedgehogs.forEach(leftHedgehog => moveleftHedgehogs(leftHedgehog))
  }

  function moverightHedgehogs(rightHedgehog) {
    stopGame()
    switch (true) {
      case rightHedgehog.classList.contains('fm-one'):
        rightHedgehog.classList.remove('safecross')
        rightHedgehog.classList.remove('fm-one')
        rightHedgehog.classList.add('fm-three')
        break
      case rightHedgehog.classList.contains('fm-two'):
        rightHedgehog.classList.remove('fm-two')
        rightHedgehog.classList.add('fm-one')
        break
      case rightHedgehog.classList.contains('fm-three'):
        rightHedgehog.classList.add('safecross')
        rightHedgehog.classList.remove('fm-three')
        rightHedgehog.classList.add('fm-two')
        break
    }
  }

  function moveleftHedgehogs(leftHedgehog) {
    stopGame()
    switch (true) {
      case leftHedgehog.classList.contains('fm-one'):
        leftHedgehog.classList.add('safecross')
        leftHedgehog.classList.remove('fm-one')
        leftHedgehog.classList.add('fm-two')
        break
      case leftHedgehog.classList.contains('fm-two'):
        leftHedgehog.classList.remove('fm-two')
        leftHedgehog.classList.add('fm-three')
        break
      case leftHedgehog.classList.contains('fm-three'):
        leftHedgehog.classList.remove('safecross')
        leftHedgehog.classList.remove('fm-three')
        leftHedgehog.classList.add('fm-one')
        break
    }
  }

  function moveWoodsInTime() {
    leftWoods.forEach(leftWood => moveLeftWoods(leftWood))
    rightWoods.forEach(rightWood => moveRightWoods(rightWood))
    if (currentIndex >= 27 && currentIndex < 35) {
      squares[currentIndex].classList.remove('scout')
      squares[currentIndex].removeAttribute('data-type')
      currentIndex = currentIndex +1
      squares[currentIndex].classList.add('scout')
      squares[currentIndex].setAttribute('data-type', typeOfGirl)
    }
    if (currentIndex > 18 && currentIndex <= 26) {
      squares[currentIndex].classList.remove('scout')
      squares[currentIndex].removeAttribute('data-type')
      currentIndex = currentIndex -1
      squares[currentIndex].classList.add('scout')
      squares[currentIndex].setAttribute('data-type', typeOfGirl)
    }
  }


  function stopGame(){
    if (squares[currentIndex].classList.contains('scout') && !squares[currentIndex].classList.contains('safecross')) {
      clearInterval(timer)
      alert('you lost, try again!')
      squares[currentIndex].classList.remove('scout')
      squares[currentIndex].removeAttribute('data-type')
      squares[currentIndex].removeAttribute('data-type')
      squares[1].classList.remove('scout')
      squares[3].classList.remove('scout')
      squares[5].classList.remove('scout')
      squares[7].classList.remove('scout')
      currentIndex = 76
      squares[currentIndex].classList.add('scout')
      squares[currentIndex].setAttribute('data-type', typeOfGirl)
      timeLeft.textContent = 120
      currentTime = timeLeft.textContent
      timer = setInterval(countdown, 1000)
    }
  }

  // --- Intervals
  const hedgehogTimerId = setInterval(moveHedgehogsInTime, 750)

  const woodsTimerId = setInterval(moveWoodsInTime, 750)


  // --- Time remaining

  let currentTime = timeLeft.textContent

  function countdown() {
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime === 0) {
      clearInterval(timer)
      stopGame()
    }
  }

  let timer = setInterval(countdown, 1000)
})
