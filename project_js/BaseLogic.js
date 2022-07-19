'use strict';


const firstPayoutsPage = new FirstPayoutsPage;
const divReels = document.getElementById('reels');
const enterParametersButton = document.querySelector(`[class="enter"]`);
const baseDiv = document.querySelector('.base');
//const headCounterDiv = new CreateElement('div', "counter", 'table', div)

let createWinLinesDiv;
let createWinLinesY;
let createWinLinesX;
//let btn = document.createElement('button');
//const headCounter = document.createElement('div');
let resultDiv = document.createElement('div');
let selectedWinLine = []
const allWinLines = [];
let resultSymbols;
let resultSymbolsSuite;



enterParametersButton.addEventListener('click', (e) =>{
    e.preventDefault();
    firstPayoutsPage.upDate();
    if (firstPayoutsPage.lineSize.width&& firstPayoutsPage.lineSize.height && firstPayoutsPage.symbols && firstPayoutsPage.amountWinLines) {
       divReels.remove();
       createWinLinesDiv = new CreateElement('div', 'winLines', "table", baseDiv);


       // div.classList.add('winLines');
       // div.style.display = "table"
       //baseDiv.append(div);
        const div = createWinLinesDiv.createElement();
        //const headCounterDiv = new CreateElement('div', "counter", 'table', div)
        //headCounterDiv.createElement();
       // headCounter.classList.add('counter');
       // headCounter.style.display = "table";
       // headCounter.textContent = `You need to choose ${firstPayoutsPage.amountWinLines} wining lines.`;
       // div.append(headCounter);
       //  console.log(firstPayoutsPage.lineSize.height);
       //  console.log(firstPayoutsPage.lineSize.width)


        for (let y = 0; y < firstPayoutsPage.lineSize.height; y++){
            createWinLinesY = new CreateWinLines(`symbol${y}`, div, "block", false, false);
            createWinLinesY.createWinLines();
            for (let x = 0; x < firstPayoutsPage.lineSize.width; x++){
                createWinLinesX = new CreateWinLines(`winLineButtons`, `.symbol${y}`, "table", x, y);
                createWinLinesX.createWinLines();
            }
        }
//create win lines tab


       // for (let y = 0; y < firstPayoutsPage.lineSize.height; y++){
       //     createNewDiv(`symbol${y}`, div, "block", false, false, false, false);
       //     for (let x = 0; x < firstPayoutsPage.lineSize.width; x++){
       //         createNewDiv(`winLineButtons`, `.symbol${y}`, "table", true, x, y, false);
       //     }
       // }



// Create submit button
        const createBtnElement = new CreateElement('button', 'submit', "table", baseDiv, "Enter");
        const btnElement = createBtnElement.createElement();
       // btn.style.display = "table";
       // btn.classList.add('submit');
       //createBtnElement.textContent = "Enter";
       // baseDiv.append(btn);

       const winLineButtons = document.querySelectorAll('.winLineButtons');
       winLineButtons.forEach(btn => {
           btn.addEventListener('click', () => {
              btn.style.backgroundColor = 'red';
              const y = btn.y;
              const x = btn.x;
              selectedWinLine.push(x, y);
            })
       })


        document.querySelector(btnElement).addEventListener('click', (e) => {
            e.preventDefault();
            if (selectedWinLine.length) {
                let varWinSymbol = [];
                selectedWinLine.forEach(item => {
                    varWinSymbol.push(item);
                })
                allWinLines.push(varWinSymbol);
                selectedWinLine = [];
                --firstPayoutsPage.amountWinLines;
                winLineButtons.forEach(btn => {
                    btn.style.backgroundColor = "yellow";
                })
                if (firstPayoutsPage.amountWinLines === 0){
                    document.querySelector(div).remove();
                    document.querySelector(btnElement).remove();


                    resultDiv.classList.add('result');
                    resultDiv.style.display = "table";
                    baseDiv.append(resultDiv);


                    resultSymbols = createFinishWinSymbols(firstPayoutsPage.lineSize, allWinLines, firstPayoutsPage.correctSymbols);
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
                        resultSymbolsSuite.style.width = `${(firstPayoutsPage.lineSize.height * 11)*firstPayoutsPage.lineSize.width}px`
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
        div.style.width = `${firstPayoutsPage.lineSize.width * 42}px`;
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







