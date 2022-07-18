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
let resultDiv = document.createElement('div');
let amountWinLines = 0;
let allSymbols;
let selectedWinLine = []
const allWinLines = [];
const lineSize = {};
let resultSymbols;
let resultSymbolsSuite;



enterParametersButton.addEventListener('click', (e) =>{
    e.preventDefault();
    if (reelsNumberText.value && symbolsNumberText.value && symbolsText.value && winLinesText.value) {
       amountWinLines = winLinesText.value;
       lineSize["width"] = +reelsNumberText.value;
       lineSize["height"] = +symbolsNumberText.value;

       allSymbols = symbolsText.value.toUpperCase().trim();
       allSymbols = allSymbols.split(' ');


       divReels.remove();

       div.classList.add('winLines');
       div.style.display = "table"
       baseDiv.append(div);

       headCounter.classList.add('counter');
       headCounter.style.display = "table";
       headCounter.textContent = `You need to choose ${amountWinLines} wining lines.`;
       div.append(headCounter);

//create win lines tab


       for (let y = 0; y < lineSize.height; y++){
           createNewDiv(`symbol${y}`, div, "block", false, false, false, false);
           for (let x = 0; x < lineSize.width; x++){
               createNewDiv(`winLineButtons`, `.symbol${y}`, "table", true, x, y, false);
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
              selectedWinLine.push(x, y);
            })
       })


        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (selectedWinLine.length) {
                let varWinSymbol = [];
                selectedWinLine.forEach(item => {
                    varWinSymbol.push(item);
                })
                allWinLines.push(varWinSymbol);
                selectedWinLine = [];
                --amountWinLines;
                winLineButtons.forEach(btn => {
                    btn.style.backgroundColor = "yellow";
                })
                if (amountWinLines === 0){
                    div.remove();
                    btn.remove();


                    resultDiv.classList.add('result');
                    resultDiv.style.display = "table";
                    baseDiv.append(resultDiv);


                    resultSymbols = createFinishWinSymbols(lineSize, allWinLines, allSymbols);
                    let resultString = '';
                    resultSymbols.forEach(cheat => {
                        resultString = '';
                        cheat.forEach(s => {
                            resultString += s.join('') + ' '
                        });
                        resultString = resultString.trim();
                        resultSymbolsSuite = document.createElement('input');
                        resultSymbolsSuite.classList.add("text");
                        resultSymbolsSuite.style.display = "table";
                        resultSymbolsSuite.style.width = `${(lineSize.height * 11)*lineSize.width}px`
                        resultDiv.append(resultSymbolsSuite);
                        resultSymbolsSuite.value = resultString;
                    });


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
    if (btn) {
        div.style.width = "40px";
        div.style.backgroundColor = "yellow";
        div.style.float = "left";
        div.style.border = "1px solid darkblue"
        div.x = x;
        div.y = y;
        document.querySelector(appendDiv).append(div);
    } else {
        appendDiv.append(div);
        div.style.width = `${lineSize.width * 42}px`;
        div.style.backgroundColor = "yellow";

    }
}


function createFinishWinSymbols(linesSizes, winLines, symbols) {
    const results = [];

    symbols.forEach((s, i, arr) => {
        winLines.forEach((line) => {
            const emptyTable = [];
            const createEmptyTable = () => {
                for (let j = 0; j < linesSizes.width; j++) {
                    emptyTable.push([]);
                    for (let k = 0; k < linesSizes.height; k++) {
                        emptyTable[j].push(0);
                    }
                }
            }
            createEmptyTable();

            const n1 = i + 1 >= arr.length - 1 ? 0 : i + 1;
            const n2 = i + 2 >= arr.length - 1 ? 1 : i + 2;

            emptyTable.forEach((tableLine, y) => tableLine.forEach((z, col) => emptyTable[y][col] = y % 2 ? symbols[n1] : symbols[n2]));
            const cheatArray = [].concat(emptyTable);
            for (let m = 0; m < line.length; m += 2) {
                cheatArray[line[m]][line[m + 1]] = s;
            }
            results.push(cheatArray);

        });
    });
    return results
}







