### React- Tenzies game

## Overview
This is a Tenzies game page. The game is started with 10 dice with random faces. User should click on the dice having same face. 
The game ends when all dice having same faces are clicked. Once the game is ended, confetti is showered.
The number of rolls, time taken, and best time taken are updated accordingly.

## Tree view
Displayed using ReacTree

![Tree](https://github.com/user-attachments/assets/8c4499fd-eaa2-4178-8983-a8d66dce10d6)

## Components and its usages
- App: It holds the logic of game start and end. This notes down the number of rolls, time taken, and the best time taken. The best time taken is stored in local storage.
- Die: This displays the values on each die with dots, instead of numbers.

## Concepts used
- During render:
    - During first time render, 10 random dice are displayed on the page.
    - Each time the roll button is clicked, the dice which were not held are rolled.
    - If all dice are held and they are of same value, confetti is showered. This is achieved using "react-confetti".
- Hooks:
    - useState: Each die is identified as an object holding value, isHeld- to color the die, and nanoid.
    - useEffect:
        - Dependency array: []
            - When the game is started, the best time taken so far is fetched from the local storage and displayed.
         
        - Dependency array: [tenzies], a flag to indicate if the game is started or ended.
            - When the game is started, the timer is started using "setInterval" function.
            - When the game is ended, the timer is cleared using "clearInterval" function.

        - Dependecy array: [newDice], an array of dice.
            - Whenever a die is clicked, the application checks for the game status.
            - If the game is ended then tenzies is set.
         
  - Logic to display the die with dots:
      - Each die is considered like a 3 x 3 grid.
      - Using the properties of grid-row-start, grid-column-start, grid-column-end the die is displayed with dots.

## Live Demo
(https://scrimba-krishna-v-react-game-tenzies.netlify.app/)
