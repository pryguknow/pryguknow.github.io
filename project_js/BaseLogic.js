'use strict';

const divReels = document.getElementById('reels');
const reelsNumberText = document.getElementById('reelsText');
const symbolsNumberText = document.getElementById('symbolsNumber');
const symbolsText = document.getElementById('symbol');
const winLinesText = document.getElementById('winLinesText')
const enterParametersButton = document.querySelector(`[class="enter"]`);
const baseDiv = document.querySelector('.base');



const div = document.createElement('div');
const btn = document.createElement('button');
let amountReels = 0;
let amountSymbols = 0;
let amountWinLines = 0;
let allSymbols;
const winSymbol = []
const allWinLines = [];


enterParametersButton.addEventListener('click', (e) =>{
    e.preventDefault();
    if (reelsNumberText.value && symbolsNumberText.value && symbolsText.value && winLinesText.value) {
       amountReels = reelsNumberText.value;
       amountSymbols = symbolsNumberText.value;
       allSymbols = symbolsText.value;
       allSymbols = winLinesText.value;


       divReels.remove();

       div.classList.add('winLines');
       div.style.display = "table"
       baseDiv.append(div);

//create win lines tab
       for (let y = 0; y < amountSymbols; y++){
           createNewDiv(`symbol${y}`, div, "block", false);
           for (let x = 0; x < amountReels; x++){
               createNewDiv(`winLineButtons`, `.symbol${y}`, "table", true, x, y);
           }
       }
// Create submit button
       btn.style.display = "table";
       btn.classList.add('submit');
       btn.textContent = "Enter";
       baseDiv.append(btn);

       const winLineButtons = document.querySelectorAll('.winLineButtons');
       winLineButtons.forEach(btn => {
           btn.addEventListener('click', (e) => {
              btn.style.backgroundColor = 'red';
              const y = btn.y;
              const x = btn.x;
              winSymbol.push(x, y);
              console.log(winSymbol);
            })
       })
        btn.addEventListener('submit', (e) => {
            e.preventDefault();

            allWinLines.push(winSymbol);
        })

       //console.log(document.querySelector(".x3y1").y);
    } else {
        alert("Нou have an empty field!");
    }
})

function createNewDiv(divClassList, appendDiv, divDisplay, btn, x, y) {
    let div = document.createElement('div');
    div.classList.add(divClassList);
    div.style.display = divDisplay;
    div.style.height = "40px";
    if (btn){
        div.style.width = "40px";
        div.style.backgroundColor = "yellow";
        div.style.float = "left";
        div.style.border = "1px solid darkblue"
        div.x = x;
        div.y = y;
        document.querySelector(appendDiv).append(div);
    }else{
        appendDiv.append(div);
        div.style.width = `${amountReels * 42}px`;
        div.style.backgroundColor = "yellow";
    }
}





