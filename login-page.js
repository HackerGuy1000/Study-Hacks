let buttonElement = document.querySelector("button");
let textElement = document.querySelector("p");

buttonElement.addEventListener("click",changeText,false);

function changeText(e){
    textElement.innerText = "Congress App Coming Soon"
}
