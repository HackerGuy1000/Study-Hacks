var playerRed = 'R';
var playerYellow = 'Y';
var currPlayer = playerRed;
var currColor = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

let globalR;
let globalC;

let modal = document.getElementById('myModal');

let answerStatus = null;

let iFrame = 0

const questions = [
  "What is 1+1", 
  "What color is the sky?",
  "What does the Heisenberg Uncertainty Principle say?",
  "What element does Neil Bohr use to demonstrate quantum theory?",
  "Why does a Java programmer need glasses?",
  "Why is a Poseidon an amazing programmer?"

];
const correctAnswers = [
  '2',
  'Blue',
  'It is impossible to know two properties of a system simultaneously',
  'Hydrogen',
  "They can't C#",
  "Mainly because he Ctrl-C"
];

const choices = [
  ['1','2','3','4'],
  ['Red','Green','Yellow','Blue'],
  ['Idk','Wdym','It is impossible to know two properties of a system simultaneously','That the sky is blue.'],
  ['Fire', 'Earth','Hydrogen','Water'],
  ["They can't C#", "They couldn't objective C", "They couldn't C++", "He was stabbed in the eye"],
  ["Because he got the computer wet", "No Wi-Fi underwater", "Mainly because he Ctrl-C", "He dropped a trident on his computer"]

];


window.onload = function () {
  setGame();
};

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // JS
      row.push(' ');
      // HTML
      let tile = document.createElement('div');
      tile.id = r.toString() + '-' + c.toString();
      tile.classList.add('tile');
      tile.addEventListener('click', setPiece);
      document.getElementById('board').append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }

  //get coords of that tile clicked
  let coords = this.id.split('-');
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  // figure out which row the current column should be on
  r = currColumns[c];

  if (r < 0) {
    // board[r][c] != ' '
    return;
  }

  globalR = r;
  globalC = c;
  
  displayModal();

}

function checkWinner() {
  // horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != ' ') {
        if (
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // anti diagonal
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        if (
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // diagonal
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        if (
          board[r][c] == board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] == board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

function setWinner(r, c) {
  let winner = document.getElementById('winner');

  let playerText = document.getElementById("currPlayer")
  if (board[r][c] == playerRed) {
    winner.innerText = 'Red Wins';
    winner.style.color = "red"
  } else {
    winner.innerText = 'Yellow Wins';
    winner.style.color = "yellow"
  }

  playerText.innerText = "";

  gameOver = true;
}

function closeModal(){
  let modal = document.getElementById('myModal');

  let label0 = document.getElementById("lAnswer0")
  let label1 = document.getElementById("lAnswer1")
  let label2 = document.getElementById("lAnswer2") 
  let label3 = document.getElementById("lAnswer3") 
  let errorText = document.getElementById("error-text")

  label0.style.color = "black";
  label1.style.color = "black";
  label2.style.color = "black";
  label3.style.color = "black";

  if(answerStatus == null){
    errorText.innerText = "You need to submit an answer first";
    errorText.style.color = "red"
    return;
  } 

  modal.style.display = 'none';
  
  document.forms['QAndA']['answer0'].checked = false;
  document.forms['QAndA']['answer1'].checked = false;
  document.forms['QAndA']['answer2'].checked = false;
  document.forms['QAndA']['answer3'].checked = false;

  let labels = document.getElementsByClassName("answerLabel");

  iFrame = 0;


   if(answerStatus == false){
      if (currPlayer == playerRed) {
        currColor = playerYellow;
      } if (currPlayer == playerYellow) {
        currColor = playerRed  
      }

      console.log("Color: "+ currColor);
      console.log("Player: "+ currPlayer);
  }else if(answerStatus == true){
      console.log("Color: "+ currColor);
      console.log("Player: "+ currPlayer);
    }

  updateBoard(globalR,globalC);
  
  
  checkWinner();

  displayPlayer();

};

function displayPlayer(){
  let playerText = document.getElementById("currPlayer")
  if (currPlayer == playerRed) {
    playerText.innerText = "Player Red";
    playerText.style.color = "Red"
    
  } 
  if (currPlayer == playerYellow) {
    playerText.innerText = "Player Yellow";
    playerText.style.color = "Yellow"

  }
  
}

function displayModal(){
  answerStatus = null;
  //Modal elems
  let modal = document.getElementById('myModal');
  let closeBtn = document.getElementsByClassName("close")[0];
  let submitBtn = document.getElementById('submit-answer')
  let index = Math.floor(Math.random() * 5); // generates random number 
  let questionText = document.getElementById('question-text');
  let option0 = document.getElementById('lAnswer0');
  let option1 = document.getElementById('lAnswer1');
  let option2 = document.getElementById('lAnswer2');
  let option3 = document.getElementById('lAnswer3');

  let errorText = document.getElementById("error-text")


  questionText.innerText = questions[index];
  questionNum = index;

  

  option0.innerText = choices[index][0];
  option1.innerText = choices[index][1];
  option2.innerText = choices[index][2];
  option3.innerText = choices[index][3];

  option0.setAttribute('value',choices[index][0]);
  option1.setAttribute('value',choices[index][1]);
  option2.setAttribute('value',choices[index][2]);
  option3.setAttribute('value',choices[index][3]);

  errorText.innerText = "";

  modal.style.display = 'block';

  //Modal close button function
  closeBtn.addEventListener('click', closeModal);

  //Answer submit button function
  submitBtn.addEventListener('click', submitAnswer);
};

function getIDNum(elem) {
  let elemID = elem.id;
  let lastLetter = elemID.charAt(elemID.length -1);
  return parseInt(lastLetter);
}

function submitAnswer(){
  if (iFrame == 0){
      let answers = document.getElementsByClassName("input-field");
      for (var answer of answers){
          if (answer.checked){
              let index = getIDNum(answer);
              let selectedElem = document.getElementById("lAnswer" + index);
              let selected = selectedElem.innerHTML;
              let correct = correctAnswers[questionNum];
              
              labels = document.getElementsByClassName("answerLabel");

              for (let i = 0; i < 4; i++){
                  if(labels[i].innerText == correct){
                      correctElem = labels[i];
                  }
              };

              
              
              if(selected == correct){
                  selectedElem.style.color = "#03a519";
                  selectedElem.innerText += " \u2705";
                  answerStatus = true;
              }else{
                  correctElem.style.color = "#03a519";
                  correctElem.innerText += " \u2705";
                  selectedElem.style.color = "#940c07";
                  selectedElem.innerText += " \u274c";
                  answerStatus = false;
              }
              iFrame = 1;
              // setTimeout(() => {closeModal();}, 2500);

          }
      }
  }

};

function updateBoard(r,c){
  board[r][c] = currColor; //update JS board
  let tile = document.getElementById(r.toString() + '-' + c.toString());
  if (currColor == playerRed && currPlayer == playerRed) {
    tile.classList.add('red-piece');
    currPlayer = playerYellow;
    currColor = playerYellow
    console.log("Set to yellow if color is red and player is red")

  } else if (currColor == playerRed && currPlayer == playerYellow) {
    tile.classList.add('red-piece');
    currPlayer = playerRed;
    currColor = playerRed
    console.log("Set to red if color is red and player is yellow")


  } else if (currColor == playerYellow && currPlayer == playerYellow) {
    tile.classList.add('yellow-piece');
    currPlayer = playerRed;
    currColor = playerRed
    console.log("Set to red if color is yellow and player is yellow")

  } else if(currColor == playerYellow && currPlayer == playerRed) {
    tile.classList.add('yellow-piece');
    currPlayer = playerYellow;
    currColor = playerYellow
    console.log("Set to yellow if color is yellow and player is red")
  }

  console.log(answerStatus);




  r -= 1; //update the row height for that column
  currColumns[c] = r; //update the array

};
