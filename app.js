document.addEventListener('DOMContentLoaded', () => {

  const squares = document.querySelectorAll('.grid div')
  const rightFrogs = document.querySelectorAll('.right-frogs')
  const leftFrogs = document.querySelectorAll('.left-frogs')
  const rightWoods = document.querySelectorAll('.right-woods')
  const leftWoods = document.querySelectorAll('.left-woods')
  const leafs = document.querySelectorAll('.leafs')

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
        if(currentIndex + width < width * width) currentIndex += width
        break
    }

    squares[currentIndex].classList.add('frog')
  }

  // --- Interval
  const timerId = setInterval(() => {
    rightFrogs.classList.toggle('dissapear')
    leftFrogs.classList.toggle('dissapear')
  }, 3000)

  setTimeout(() => {
    clearInterval(timerId)
  }, 30000);

})
