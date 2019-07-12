document.addEventListener('DOMContentLoaded', () => {

  const squares = document.querySelectorAll('.grid div')
  const rightFrogs = document.querySelectorAll('.right-frogs')
  const leftFrogs = document.querySelectorAll('.left-frogs')
  const rightWoods = document.querySelectorAll('.right-woods')
  const leftWoods = document.querySelectorAll('.left-woods')


  let currentIndex = 76
  const width = 9

  squares[currentIndex].classList.add('frog')

  document.addEventListener('keyup', moveFrog)

  function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')
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
    squares[currentIndex].classList.add('frog')
    if (squares[currentIndex].classList.contains('frog') && !squares[currentIndex].classList.contains('safecross')) {
      clearInterval(timerId)
      alert('You Lost')
      squares[currentIndex].classList.remove('frog')
      currentIndex = 76
      squares[currentIndex].classList.add('frog')
    }
    if (squares[currentIndex].classList.contains('frog') && squares[currentIndex].classList.contains('leaf')) {
      currentIndex = 76
      squares[currentIndex].classList.add('frog')
    }
  }

  function moveRightWoods(rightWood) {
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

  function moveRightFrogs(rightFrog) {
    switch (true) {
      case rightFrog.classList.contains('fm-one'):
        rightFrog.classList.remove('safecross')
        rightFrog.classList.remove('fm-one')
        rightFrog.classList.add('fm-three')
        break
      case rightFrog.classList.contains('fm-two'):
        rightFrog.classList.remove('fm-two')
        rightFrog.classList.add('fm-one')
        break
      case rightFrog.classList.contains('fm-three'):
        rightFrog.classList.add('safecross')
        rightFrog.classList.remove('fm-three')
        rightFrog.classList.add('fm-two')
        break
    }
  }

  function moveLeftFrogs(leftFrog) {
    switch (true) {
      case leftFrog.classList.contains('fm-one'):
        leftFrog.classList.add('safecross')
        leftFrog.classList.remove('fm-one')
        leftFrog.classList.add('fm-two')
        break
      case leftFrog.classList.contains('fm-two'):
        leftFrog.classList.remove('fm-two')
        leftFrog.classList.add('fm-three')
        break
      case leftFrog.classList.contains('fm-three'):
        leftFrog.classList.remove('safecross')
        leftFrog.classList.remove('fm-three')
        leftFrog.classList.add('fm-one')
        break
    }
  }

  // --- Interval
  const timerId = setInterval(() => {
    rightFrogs.forEach(rightFrog => moveRightFrogs(rightFrog))
    leftFrogs.forEach(leftFrog => moveLeftFrogs(leftFrog))
    leftWoods.forEach(leftWood => moveLeftWoods(leftWood))
    rightWoods.forEach(rightWood => moveRightWoods(rightWood))

  }, 1200)

  setTimeout(() => {
    clearInterval(timerId)
  }, 30000)

})
