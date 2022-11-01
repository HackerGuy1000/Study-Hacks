//Major game elem
let clickButton = document.getElementById("clickable-elem");
let pointsElem = document.getElementById('points');
let upgradesElem = document.getElementById("upgrades-list")

// Modal elems
let modal = document.getElementById('myModal');
let closeBtn = document.getElementsByClassName("close")[0];
let submitBtn = document.getElementById('submit-answer')
let questionNum = 1;


//Point button vars and funcs
let activeIncome = 1;
let passiveIncome = 0;
let points = 0;
let pointLevel = 0;

let iFrame = 0

setInterval(passiveIncrementation, 1000);


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

//Modal close button function
closeBtn.addEventListener('click', closeModal);

//Answer submit button function
submitBtn.addEventListener('click', submitAnswer);


// Function to grab ID from tiered button
function getIDNum(elem) {
    let elemID = elem.id;
    let lastLetter = elemID.charAt(elemID.length -1);
    return parseInt(lastLetter);
}

function update_points(){
    pointsElem.innerHTML = points;
    if (pointLevels.includes(points)){
        pointLevel += 1;
        //for (i=0;i < pointLevel; i++){
        let tierButton = document.createElement("button");
        tierButton.className = "myBtn";
        let idNum = pointLevel - 1;
        tierButton.id = 'button' + idNum.toString();
        tierButton.style.marginBottom = "10px";
        tierButton.innerHTML = upgrades[idNum];
        tierButton.addEventListener('click', function handleClick(event){
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
            

        });
        upgradesElem.appendChild(tierButton);
    } 
}
//Button to click for points
clickButton.addEventListener('click', function () {
    incrementPoints();
    update_points();
    

});

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

let numQuestion = 0;

function incrementPoints() {
    points = points + activeIncome;
    points = Math.ceil(points * 10) / 10;
}

function passiveIncrementation(){
    points += passiveIncome;
    points = Math.ceil(points * 10) / 10;
    pointsElem.innerHTML = points;
    update_points();
}

function doQuiz() {
    document.getElementsByClassName("question").innerText = questions[numQuestion];
}