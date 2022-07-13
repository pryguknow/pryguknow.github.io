'use strict';
const divReels = document.getElementById('reels');
const reelsNumberText = document.getElementById('reelsText');
const numberSymbolsText = document.getElementById('symbolsNumber');
const symbolsText = document.getElementById('symbol');
const enterParametersButton = document.querySelector(`[class="enter"]`);

let amountReels = 0;
let amountSymbols = 0;
let allSymbols;


enterParametersButton.addEventListener('click', (e) =>{
    e.preventDefault();
    reelsNumberText.value && numberSymbolsText.value && symbolsText.value ? () => {
        amountReels = reelsNumberText.value;
        amountSymbols = numberSymbolsText.value;
        allSymbols = symbolsText.value;
        divReels.innerHTML += 'style="display: none"';
        } : alert("error");
    // reelsNumberText.value  ? amountReels = reelsNumberText.value: alert('You have not filled in the field "Enter the number of reels"');
    // numberSymbolsText.value ? amountSymbols = numberSymbolsText.value : alert('You have not filled in the field "Enter number of symbols on the reel:');
    // symbolsText.value ? allSymbols = symbolsText.value : alert('You have not filled in the field "Enter symbols"');


})

