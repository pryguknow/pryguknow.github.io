'use strict';

const divReels = document.getElementById('reels');
const reelsNumberText = document.getElementById('reelsText');
const symbolsNumberText = document.getElementById('symbolsNumber');
const symbolsText = document.getElementById('symbol');
let winLinesText = document.getElementById('winLinesText')
const enterParametersButton = document.querySelector(`[class="enter"]`);
const baseDiv = document.querySelector('.base');



const div = document.createElement('div');
let btn = document.createElement('button');
const headCounter = document.createElement('div');
let amountReels = 0;
let amountSymbols = 0;
let amountWinLines = 0;
let allSymbols;
let winSymbol = []
const allWinLines = [];


enterParametersButton.addEventListener('click', (e) =>{
    e.preventDefault();
    if (reelsNumberText.value && symbolsNumberText.value && symbolsText.value && winLinesText.value) {
       amountReels = reelsNumberText.value;
       amountSymbols = symbolsNumberText.value;
       allSymbols = symbolsText.value;
       amountWinLines = winLinesText.value;


       divReels.remove();

       div.classList.add('winLines');
       div.style.display = "table"
       baseDiv.append(div);

       headCounter.classList.add('counter');
       headCounter.style.display = "table";
       headCounter.textContent = `You need to choose ${amountWinLines} wining lines.`;
       div.append(headCounter);

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
           btn.addEventListener('click', () => {
              btn.style.backgroundColor = 'red';
              const y = btn.y;
              const x = btn.x;
              winSymbol.push(x, y);
              console.log(winSymbol);
            })
       })


        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (winSymbol.length) {
                let varWinSymbol = [];
                winSymbol.forEach(item => {
                    varWinSymbol.push(item);
                })
                allWinLines.push(varWinSymbol);
                console.log(allWinLines);
                winSymbol = [];
                --amountWinLines;
                winLineButtons.forEach(btn => {
                    btn.style.backgroundColor = "yellow";
                })
                if (amountWinLines === 0){
                    div.remove();
                    btn.remove();
                }
            } else {
                    alert("You need to choose a wining line")
                }
        })

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





