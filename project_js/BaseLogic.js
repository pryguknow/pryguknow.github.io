'use strict';


const firstPayoutsPage = new FirstPayoutsPage;
const divReels = document.getElementById('reels');
const enterParametersButton = document.querySelector(`[class="enter"]`);
const baseDiv = document.querySelector('.base');
const allWinLines = [];

let createWinLinesDiv;
let createWinLinesY;
let createWinLinesX;
let selectedWinLine = []
let resultSymbols;
let resultSymbolsSuite;




enterParametersButton.addEventListener('click', (e) =>{
    e.preventDefault();
    firstPayoutsPage.upDateInputInformation();
    if (firstPayoutsPage.lineSize.width&& firstPayoutsPage.lineSize.height && firstPayoutsPage.symbols && firstPayoutsPage.amountWinLines) {
       divReels.remove();

       createWinLinesDiv = new CreateElement('div', 'winLines', "table", baseDiv);
        const div = createWinLinesDiv.createElement();
        let countText = `You need to select ${firstPayoutsPage.amountWinLines} wining lines`;
        const createCountDiv = new CreateElement('div', "headCounter", "block", document.querySelector(div), countText);
        let headCounter = createCountDiv.createElement();

        for (let y = 0; y < firstPayoutsPage.lineSize.height; y++){
            createWinLinesY = new CreateWinLines(`symbol${y}`, div, "block", false, false);
            createWinLinesY.createWinLines();
            for (let x = 0; x < firstPayoutsPage.lineSize.width; x++){
                createWinLinesX = new CreateWinLines(`winLineButtons`, `.symbol${y}`, "table", x, y);
                createWinLinesX.createWinLines();
            }
        }


// Create submit button
        const createBtnElement = new CreateElement('button', 'submit', "table", baseDiv, "Enter");
        const btnElement = createBtnElement.createElement();


       const winLineButtons = document.querySelectorAll('.winLineButtons');
       winLineButtons.forEach(btn => {
           btn.addEventListener('click', () => {
               //btn.count++;
               btn.style.backgroundColor === 'yellow' ? btn.style.backgroundColor = 'red': btn.style.backgroundColor = 'yellow';
               // if (btn.count % 2 === 0) {
               //     btn.style.backgroundColor = 'red';
               //     // const y = btn.y;
               //     // const x = btn.x;
               //     // selectedWinLine.push(x, y);
               //     // console.log(selectedWinLine);
               //     // console.log(btn.count);
               // } else {
               //     btn.style.backgroundColor = 'yellow';
               //     // selectedWinLine.pop();
               //     // selectedWinLine.pop();
               //     // console.log(selectedWinLine);
               //     // console.log(btn.count);
               // }

            })
       })


        document.querySelector(btnElement).addEventListener('click', (e) => {
            e.preventDefault();
            let count = 0;
            winLineButtons.forEach(btn => {
                if ( btn.style.backgroundColor === 'red'){
                    const y = btn.y;
                    const x = btn.x;
                    selectedWinLine.push(x, y);
                }
            })

            if (selectedWinLine.length) {
                let varWinSymbol = [];
                selectedWinLine.forEach(item => {
                    varWinSymbol.push(item);
                })
                allWinLines.push(varWinSymbol);
                selectedWinLine = [];
                --firstPayoutsPage.amountWinLines;
                document.querySelector(headCounter).textContent = `${firstPayoutsPage.amountWinLines} winning lines to choose`;
                winLineButtons.forEach(btn => {
                    btn.style.backgroundColor = "yellow";
                })
                if (firstPayoutsPage.amountWinLines === 0){
                    document.querySelector(div).remove();
                    document.querySelector(btnElement).remove();
                    const createDivElement = new CreateElement('div', 'result', 'table', baseDiv);
                    const resultDiv = createDivElement.createElement();


                    const finaleResult = new FinalePayoutsPage(firstPayoutsPage.lineSize, allWinLines, firstPayoutsPage.correctSymbols)
                    resultSymbols = finaleResult.resultCalculation();

                    let resultString = '';

                    resultSymbols.forEach(cheat => {
                        resultString = '';
                        cheat.forEach(s => {
                            resultString += s.join('') + ' '
                        });
                        resultString = resultString.trim();
                        //console.log(resultString)

                        const createInputElm = new CreateElement('input', `text${count}`, "table", document.querySelector(resultDiv), false);
                        resultSymbolsSuite = createInputElm.createElement();

                        document.querySelector(resultSymbolsSuite).style.width = `${(firstPayoutsPage.lineSize.height * 11)*firstPayoutsPage.lineSize.width}px`
                        document.querySelector(resultDiv).append(document.querySelector(resultSymbolsSuite));
                        document.querySelector(resultSymbolsSuite).value = resultString;

                        count++;
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







