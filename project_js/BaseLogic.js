'use strict';


const firstPayoutsPage = new FirstPayoutsPage;
const divReels = document.getElementById('reels');
const enterParametersButton = document.querySelector(`[class="enter"]`);
const baseDiv = document.querySelector('.base');
let patternCheckBox = document.getElementById('patternCheckbox');

const allWinLines = [];
let createWinLinesDiv;
let createWinLinesY;
let createWinLinesX;
let selectedWinLine = []
let resultSymbols;
let resultSymbolsSuite;
let countText;
let checkBox = false;




enterParametersButton.addEventListener('click', (e) =>{
    e.preventDefault();
    firstPayoutsPage.upDateInputInformation();
    (patternCheckBox.checked && !firstPayoutsPage.templatesAmount) ? checkBox = true : alert("You need to select template or turn off 'Patterns' checkbox");
    if (firstPayoutsPage.lineSize.width&& firstPayoutsPage.lineSize.height && firstPayoutsPage.symbols && firstPayoutsPage.amountWinLines) {
       divReels.remove();

       createWinLinesDiv = new CreateElement('div', 'winLines', "table", baseDiv);
        const div = createWinLinesDiv.createElement();
        if (patternCheckBox.checked){
            countText = `You need to select ${firstPayoutsPage.templatesAmount} templates`;
        }else{
            countText = `You need to select ${firstPayoutsPage.amountWinLines} wining lines`;
        }
        const createCountDiv = new CreateElement('div', "headCounter", "block", document.querySelector(div), countText);
        let headCounter = createCountDiv.createElement();

        for (let y = 0; y < firstPayoutsPage.lineSize.height; y++){
            createWinLinesY = new CreateWinLines(`symbol${y}`, div, "block", false, false);
            createWinLinesY.createWinLines();
            for (let x = 0 ; x < firstPayoutsPage.lineSize.width ; x++){
                createWinLinesX = new CreateWinLines(`winLineButtons`, `.symbol${y}`, "table", x, y);
                createWinLinesX.createWinLines();
            }
        }


// Create submit button
        const createBtnElement = new CreateElement('button', 'submit', "table", baseDiv, "Enter");
        const btnElement = createBtnElement.createElement();
//logic for btn on winline
       const winLineButtons = document.querySelectorAll('.winLineButtons');
       winLineButtons.forEach(btn => {
           btn.addEventListener('click', () => {
               btn.style.backgroundColor === 'yellow' ? btn.style.backgroundColor = 'red': btn.style.backgroundColor = 'yellow';
            })
       })

//create "Cancel last round" btn and logic
        const createCancelButton = new CreateElement('button', 'cancel','table', baseDiv ,'Cancel last win line');
        const cancelLastWinLinBtn = createCancelButton.createElement();
        document.querySelector(cancelLastWinLinBtn).addEventListener('click', () => {
            if (allWinLines.length != 0){
                allWinLines.pop();
                ++firstPayoutsPage.amountWinLines;
                document.querySelector(headCounter).textContent = `${firstPayoutsPage.amountWinLines} winning lines/templates to choose`;
            } else {
                alert("You don't have any win line");
            }

        })

 //adding the selected winline to the general array

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
                if (checkBox === true){
                    console.log(varWinSymbol)
                    let patternCalculate = new PatternCalculate(varWinSymbol, firstPayoutsPage.lineSize.width, firstPayoutsPage.lineSize.height);
                    varWinSymbol = patternCalculate.createLinesForCheat();
                    varWinSymbol.forEach(i => {
                        allWinLines.push(i);
                    })
                    //console.log(varWinSymbol);
                    document.querySelector(headCounter).textContent = `${firstPayoutsPage.templatesAmount} template(s) need to choose`;
                    --firstPayoutsPage.templatesAmount
                }else{
                    allWinLines.push(varWinSymbol);
                    document.querySelector(headCounter).textContent = `${firstPayoutsPage.amountWinLines} winning line(s) to choose`;
                    --firstPayoutsPage.amountWinLines;
                }
                selectedWinLine = [];
                winLineButtons.forEach(btn => {
                    btn.style.backgroundColor = "yellow";
                })
                if (firstPayoutsPage.amountWinLines === 0 || (checkBox && firstPayoutsPage.templatesAmount === 0)){
                    document.querySelector(div).remove();
                    document.querySelector(btnElement).remove();
                    document.querySelector(cancelLastWinLinBtn).remove();
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

                        const createInputElm = new CreateElement('input', `text${count}`, "table", document.querySelector(resultDiv), false);
                        resultSymbolsSuite = createInputElm.createElement();

                        document.querySelector(resultSymbolsSuite).style.width = `${(firstPayoutsPage.lineSize.height * 11)*firstPayoutsPage.lineSize.width}px`
                        document.querySelector(resultDiv).append(document.querySelector(resultSymbolsSuite));
                        document.querySelector(resultSymbolsSuite).value = resultString;
                        count++;
                    });
                    const createTextCountElement = new CreateElement('div', 'textCounter', 'table', baseDiv, `You have ${count + firstPayoutsPage.correctSymbols.length} win lines for cheat`);
                    createTextCountElement.createElement();


                }
            } else {
                    alert("You need to choose a wining line")
                }
        })

    } else {
        alert("Нou have an empty field!");
    }
})







