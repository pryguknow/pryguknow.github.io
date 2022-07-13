'use strict';

const divReels = document.getElementById('reels');
const reelsNumberText = document.getElementById('reelsText');
const symbolsNumberText = document.getElementById('symbolsNumber');
const symbolsText = document.getElementById('symbol');
const winLinesText = document.getElementById('winLinesText')
const enterParametersButton = document.querySelector(`[class="enter"]`);



const div = document.createElement('div');
const btn = document.createElement('btn');
let amountReels = 0;
let amountSymbols = 0;
let amountWinLines = 0;
let allSymbols;


enterParametersButton.addEventListener('click', (e) =>{
    e.preventDefault();
    if (reelsNumberText.value && symbolsNumberText.value && symbolsText.value && winLinesText.value) {
       amountReels = reelsNumberText.value;
       amountSymbols = symbolsNumberText.value;
       allSymbols = symbolsText.value;
       allSymbols = winLinesText.value;
       divReels.remove();
       console.log(amountReels, amountSymbols, allSymbols);
       div.classList.add('winLines');
       document.querySelector('.base').append(div);
    } else {
        alert("Нou have an empty field!");
    }
})



