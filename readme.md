# **SEI-Project-01: <span style="color:deeppink">Wonder Women** </span> :woman_astronaut: :woman_scientist: :construction_worker_woman: :woman_pilot:

## Overview:
Women Women is a game oriented to young girls to encourage them to aspire to careers where female representation is very low. The player has to avoid the cars and take the bus to bring each woman in the game (astronaut, scientist, engineer and pilot) to their respective workplace in less than two minutes.
This is my first project at General Assembly Software Engineer Immersive. It is an individual one week project where I could make my first proper game, including concepts such as arrays, functions and objects.

[Here you can play the game!](http://camilabuenamar.github.io/project-01)
![Game gif](https://media.giphy.com/media/dX34m8xkCLC0H2aL3u/giphy.gif)

## Brief:
- Game based in a grid
- Has timers to modify the squares.
- Used arrays to modify behaviour of certain squares.
- Used switch functions to activate and deactivate classes.
- Has event listeners for the movement.

## Technologies used:
- HTML5
- CSS3 with animation
- JavaScript
- Git
- GitHub
- Google Fonts

## Approach Taken:
- Planning: First I designed a plan dividing the process of the creation of the game in steps, afterwards I worked on each of the steps in paper.
  - Made a grid where the game was based.
  - Consider which would the be categories (divs) each square would have.
  - Made the road where the cars where crossing with some cars.
  - Made the road where the buses where crossing with some buses and cars.
  - Made the target workplaces.
  - Created the logic of the woman so she could move around the grid.
  - Created the logic of the cars and buses moving using a timer and Switch function.
  - Made the loosing and winning conditions.
  - Added a countdown timer
  - Made the game restart when the player loses or wins.
  - Made different characters and workplaces.
  - Made it visually better with CSS.
- Created the logic: Each div had a different behaviour, so it was important to understand it.
  - All the grid was the array where the woman could move. For her to move it was necessary to use the KeyCode of each arrow and determine how the index of the woman was going to be modify depending on the key pressed and the width of the grid. This was build with an event listener and a switch function
  ```javascript
  function moveWoman(e) {
    squares[currentIndex].classList.remove('woman')
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
    squares[currentIndex].classList.add('woman')
    squares[currentIndex].setAttribute('data-type', typeOfJob)
    stopGame()
    womanGetsToWorkplace()
    win()
  }
  ```
  - Each square where a car could pass (right or left) had 3 possible stages, two empty and one with the car. It was necessary that the cars could iterate between these stages in different moments of time, with an Interval and a switch function. Also each square in the array of the cars should have a different starting point.
  Here you can see how cars move to the left:
  ```javascript
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
  ```
  cm-number = the positions of the car movement in time
  - The behaviour of the buses was similar to the one of the cars. The difference is that the buses had 5 different possible stages and that the bus had different positions because it occupies 3 squares on the grid (front, center or back part of the bus). This was also made with a switch function.
  Here you can see how the movement of the buses going to the right was settled:
  ```javascript
  function moveRightBuses(rightBus) {
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
    stopGame()
  }
  ```
  bm-number = the positions of the bus movement in time
  -  To limit the movement of the woman along the grid so she could win or lose it was necessary to create a category called safecross where she could move. It includes the empty squares, the ones in the cars section that didnt had the cars showing at the same time and the squares with buses.
  - To win it was necessary that the woman arrived to the specific square that matched her data type. In that moment in an specific square called house, a new woman with a new data type appeared. When all the workplaces where occupied by them the player win.
  ```javascript
  function womanGetsToWorkplace() {
    if (squares[currentIndex].classList.contains('woman') && squares[currentIndex].classList.contains('workPlace') && +squares[currentIndex].getAttribute('data-workPlace') === typeOfJob) {
      currentIndex = 76
      typeOfJob++
      squares[currentIndex].classList.add('woman')
      squares[currentIndex].setAttribute('data-type', typeOfJob)
    }
  }

  function win() {
    if (squares[1].classList.contains('woman') && squares[3].classList.contains('woman') && squares[5].classList.contains('woman') && squares[7].classList.contains('woman')) {
      popUp.innerHTML = 'You won! Want to try again? <span id="button"> ...Play again</span>'
      popUp.style.display = 'flex'
      popUp.addEventListener('click', closePopUp)
    }
  }
  ```
  data-workPlace = is the code of each workPlace.
  data-type = is the code of each woman that matches the one of the workplace.
  squares[1], squares[3], squares[5] and squares[7] = are the squares in the grid with a workplace.
  - To make the woman move along in the direction of the buses with the same interval used to move the buses a condition was created, if a woman was in the range of the buses moving and in a safecross square the woman would increase or decrease the index in order to follow the same direction.
  ```javascript
  function womanInRightBus() {
    if (currentIndex > 18 && currentIndex <= 26) {
      squares[currentIndex].classList.remove('woman')
      squares[currentIndex].removeAttribute('data-type')
      currentIndex = currentIndex -1
      squares[currentIndex].classList.add('woman')
      squares[currentIndex].setAttribute('data-type', typeOfJob)
    }
  }
  ```
- Visual: to make the game look good it was necessary to create a custom background for the grid with the roads and spots where the workplaces will be placed. The different cars, workplaces, women and house where images with transparent background that occupied one square. The most difficult part was to make the bus different sections in a size and position that would match with the other sections.
- Extra effects: A pop up alert was created to ask the player if she wants to play again and then disappear again with a click event listener when she wins, loses or time finishes. At last some transition effects were added to the cars and buses to simulate movement. Also a background song and a countdown timer.

## Wins and blockers:
The game works well. I reinforced my skills and knowledges in a fun way that also allowed me deliver my message of increasing the number of women in areas where there are not well represented. Some blockers are the time to have a more complex game and the low designing skills.

## Future features:
The game could have randomly created buses and cars, more levels (with bigger grid and faster moving obstacles) and an autogenerated grid.
