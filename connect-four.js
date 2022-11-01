var playerRed = 'R';
var playerYellow = 'Y';
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

//Modal elems
let modal = document.getElementById('myModal');
let closeBtn = document.getElementsByClassName("close")[0];
let submitBtn = document.getElementById('submit-answer')
let questionNum = 1;



const upgrades = [
  "Tier 1: Passive",
  "Tier 1: Active",
  "Tier 2: Passive",
  "Tier 2: Active",
  "Tier 3: Passive",
  "Tier 3: Active",
];
const upgrades_type = [
  "P",
  "A",
  "P",
  "A",
  "P",
  "A",
];

const upgrades_val = [
  0.1,
  0.1,
  0.5,
  0.5,
  1,
  1,
];

const pointLevels = [10, 20, 30, 40, 50, 60]

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

  board[r][c] = currPlayer; //update JS board
  let tile = document.getElementById(r.toString() + '-' + c.toString());
  if (currPlayer == playerRed) {
    tile.classList.add('red-piece');
    currPlayer = playerYellow;
  } else {
    tile.classList.add('yellow-piece');
    currPlayer = playerRed;
  }

  r -= 1; //update the row height for that column
  currColumns[c] = r; //update the array

  checkWinner();
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
  if (board[r][c] == playerRed) {
    winner.innerText = 'Red Wins';
  } else {
    winner.innerText = 'Yellow Wins';
  }
  gameOver = true;
}

function closeModal(){

  let label0 = document.getElementById("lAnswer0")
  let label1 = document.getElementById("lAnswer1")
  let label2 = document.getElementById("lAnswer2") 
  let label3 = document.getElementById("lAnswer3") 

  label0.style.color = "black";
  label1.style.color = "black";
  label2.style.color = "black";
  label3.style.color = "black";

  modal.style.display = 'none';
  
  document.forms['QAndA']['answer0'].checked = false;
  document.forms['QAndA']['answer1'].checked = false;
  document.forms['QAndA']['answer2'].checked = false;
  document.forms['QAndA']['answer3'].checked = false;

  let labels = document.getElementsByClassName("answerLabel");

  iFrame = 0;
  
};

function displayModal(){
  let index = getIDNum(tierButton);
  let questionText = document.getElementById('question-text');
  let option0 = document.getElementById('lAnswer0');
  let option1 = document.getElementById('lAnswer1');
  let option2 = document.getElementById('lAnswer2');
  let option3 = document.getElementById('lAnswer3');
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

  modal.style.display = 'block';
};

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

              let type = upgrades_type[questionNum];
              let val = upgrades_val[questionNum];
              
              
              if(selected == correct){
                  selectedElem.style.color = "#03a519";
                  selectedElem.innerText += " \u2705";
                  if(type=="P"){
                      passiveIncome += val;
                      
                  }if(type=="A"){
                      activeIncome += val;
                  
                  }
              }else{
                  correctElem.style.color = "#03a519";
                  correctElem.innerText += " \u2705";
                  selectedElem.style.color = "#940c07";
                  selectedElem.innerText += " \u274c";
              }
              iFrame = 1;
              setTimeout(() => {closeModal();}, 2500);

          }
      }
  }

  // closeModal();
};