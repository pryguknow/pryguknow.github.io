'use strict';


const firstPayoutsPage = new FirstPayoutsPage;
const divReels = document.getElementById('reels');
const enterParametersButton = document.querySelector(`[class="enter"]`);
const baseDiv = document.querySelector('.base');
let patternCheckBox = document.getElementById('patternCheckbox');

let allWinLines = [];
let createWinLinesDiv;
let createWinLinesY;
let createWinLinesX;
let selectedWinLine = []
let resultSymbols;
let resultSymbolsSuite;
let countText;
let checkBox = false;
let copyBtn;
let acceptSymbol;




enterParametersButton.addEventListener('click', (e) =>{
    e.preventDefault();
    firstPayoutsPage.upDateInputInformation();
    let amountWinLines = firstPayoutsPage.amountWinLines;
    let amountTemplates = firstPayoutsPage.templatesAmount;
    if (patternCheckBox.checked && (amountTemplates > 0)){
            checkBox = true;
        }else if ((!patternCheckBox.checked && (amountTemplates > 0)) || (patternCheckBox.checked && (amountTemplates <= 0))){
            alert("You need to select template or turn off 'Patterns' checkbox");
        }

    if (firstPayoutsPage.lineSize.width && firstPayoutsPage.lineSize.height && firstPayoutsPage.symbols && amountWinLines) {
       divReels.remove();

       createWinLinesDiv = new CreateElement('div', 'winLines', "table", baseDiv);
        const div = createWinLinesDiv.createElement();
        if (patternCheckBox.checked){
            countText = `You need to select ${amountTemplates} templates`;
        }else{
            countText = `You need to select ${amountWinLines} wining lines`;
        }
        const createCountDiv = new CreateElement('div', "headCounter", "block", document.querySelector(div), countText);
        let headCounter = createCountDiv.createElement();
        document.querySelector(headCounter).style.backgroundColor = "green";

        for (let y = 0; y < firstPayoutsPage.lineSize.height; y++){
            createWinLinesY = new CreateWinLines(`symbol${y}`, div, "block", false, false);
            createWinLinesY.createWinLines();
            for (let x = 0 ; x < firstPayoutsPage.lineSize.width ; x++){
                createWinLinesX = new CreateWinLines(`winLineButtons`, `.symbol${y}`, "table", x, y);
                createWinLinesX.createWinLines();
            }
        }
        document.querySelector(div).style.margin = 'auto';

        const creatDivWithBtns = new CreateElement('div', 'btnsDiv', 'table', baseDiv);
        const divWithBtns = creatDivWithBtns.createElement();
        document.querySelector(divWithBtns).style.margin = 'auto';


// Create submit button
        const createBtnElement = new CreateElement('button', 'submit', 'table-line', document.querySelector(divWithBtns), "Enter");
        const btnElement = createBtnElement.createElement();
//logic for btn on winline
       const winLineButtons = document.querySelectorAll('.winLineButtons');
       winLineButtons.forEach(btn => {
           btn.addEventListener('click', () => {
               btn.style.backgroundColor === 'yellow' ? btn.style.backgroundColor = 'red': btn.style.backgroundColor = 'yellow';
            })
       })

//create "Cancel last round" or "Cancel all pattern" btn and logic
        let cancelLastWinLinBtn;
        if (checkBox === true){
            const createCancelButton = new CreateElement('button', 'cancel','table-line', document.querySelector(divWithBtns) ,'Cancel all pattern');
            cancelLastWinLinBtn = createCancelButton.createElement();
        }else {
            const createCancelButton = new CreateElement('button', 'cancel', 'table-line', document.querySelector(divWithBtns), 'Cancel last win line');
            cancelLastWinLinBtn = createCancelButton.createElement();
        }

        document.querySelector(cancelLastWinLinBtn).style.margin = '20%';
        document.querySelector(cancelLastWinLinBtn).style.margin = 'auto';
        document.querySelector(cancelLastWinLinBtn).addEventListener('click', () => {
            if (allWinLines.length > 0){
                if (checkBox === true){
                    allWinLines = [];
                    amountTemplates = firstPayoutsPage.templatesAmount;
                    document.querySelector(headCounter).textContent = `${amountTemplates} template(s) to choose`;
                } else {
                    allWinLines.pop();
                    ++amountWinLines;
                    document.querySelector(headCounter).textContent = `${amountWinLines} winning(s) lines to choose`;
                }
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
                    let patternCalculate = new PatternCalculate(varWinSymbol, firstPayoutsPage.lineSize.width, firstPayoutsPage.lineSize.height);
                    varWinSymbol = patternCalculate.createSymbolsLinesForCheat();
                    varWinSymbol.forEach(i => {
                        allWinLines.push(i);
                    })
                    document.querySelector(headCounter).textContent = `${amountTemplates - 1} template(s) need to choose`;
                    --amountTemplates;

                }else{
                    allWinLines.push(varWinSymbol);
                    document.querySelector(headCounter).textContent = `${amountWinLines - 1} winning line(s) to choose`;
                    --amountWinLines;
                }
                selectedWinLine = [];
                winLineButtons.forEach(btn => {
                    btn.style.backgroundColor = "yellow";
                })
                if (amountWinLines === 0 || (checkBox && amountTemplates === 0)){
                    document.querySelector(div).remove();
                    document.querySelector(btnElement).remove();
                    document.querySelector(cancelLastWinLinBtn).remove();



                    const finaleResult = new FinalePayoutsPage(firstPayoutsPage.lineSize, allWinLines, firstPayoutsPage.correctSymbols)
                    resultSymbols = finaleResult.resultCalculation();

                    const createParentDiv = new CreateElement('div', 'parentDiv', 'table', baseDiv, false);
                    const parentDiv = createParentDiv.createElement();
                    document.querySelector(parentDiv).style.margin = 'auto';

                    const createTextCountElement = new CreateElement('div', 'textCounter', 'table', document.querySelector(parentDiv), `You have ${firstPayoutsPage.correctSymbols.length * firstPayoutsPage.amountWinLines} win lines for cheat`);
                    const textCounteElm = createTextCountElement.createElement();
                    document.querySelector(textCounteElm).style.backgroundColor = 'yellow';

                    let resultString = '';

                    resultSymbols.forEach(cheat => {
                        resultString = '';
                        cheat.forEach(s => {
                            resultString += s.join('') + ' '
                        });
                        resultString = resultString.trim();

                        const createBaseDivElement = new CreateElement('div', 'result', 'block', document.querySelector(parentDiv));
                        const createBaseDiv = createBaseDivElement.createElement();

                        const createResultDiv = new CreateElement('div', `resDiv${count}`, 'table', document.querySelector(createBaseDiv))
                        const resultDiv = createResultDiv.createElement();

                        const createInputElm = new CreateElement('input', `text${count}`, "table-cell", document.querySelector(resultDiv), false);
                        resultSymbolsSuite = createInputElm.createElement();
                        document.querySelector(resultSymbolsSuite).countEl = count;

                        const createCopyBtn = new CreateElement('button', `copyBtn`, 'table-cell', document.querySelector(resultDiv), "Copy");
                        copyBtn = createCopyBtn.createElement();

                        const createAcceptSymbol = new CreateElement('div', `acceptSymbol${count}`, 'table-cell', document.querySelector(resultDiv));
                        const acceptSymbol = createAcceptSymbol.createElement();
                        document.querySelector(acceptSymbol).style.color = "Green";

                        document.querySelector(copyBtn).countEl = count;
                        document.querySelector(resultSymbolsSuite).style.width = `${(firstPayoutsPage.lineSize.height * 11)*firstPayoutsPage.lineSize.width}px`
                        document.querySelector(resultSymbolsSuite).value = resultString;

                        count++;
                    });
                    document.querySelectorAll(copyBtn).forEach(btn =>{
                        btn.addEventListener('click', e => {
                            e.preventDefault();
                            const textEl = btn.previousSibling;
                            textEl.select();
                            document.execCommand('copy');
                            const symbol = btn.nextSibling;
                            symbol.innerHTML = '&#10004;';
                            symbol.style.backgroundColor = "white";
                        })
                    })

                }
            } else {
                    alert("You need to choose a wining line")
                }
        })

    } else {
        alert("Нou have an empty field!");
    }
})







