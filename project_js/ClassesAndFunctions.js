class FirstPayoutsPage {
    reelsNumberText = document.getElementById('reelsText');
    reelsHeightText = document.getElementById('symbolsNumber');
    symbolsText = document.getElementById('symbol');
    winLinesAmountText = document.getElementById('winLinesText');
    templatesAmountText = document.getElementById('patterns');

    amountWinLines = +this.winLinesAmountText.value;

     lineSize = {
    width: +this.reelsNumberText.value,
    height: +this.reelsHeightText.value
     }

     symbols = this.symbolsText.value.toUpperCase().trim();
     correctSymbols = this.symbols.split(' ');
     templatesAmount = +this.templatesAmountText.value;

     upDateInputInformation(){
         this.lineSize = {
             width: +this.reelsNumberText.value,
             height: +this.reelsHeightText.value
         }
         this.amountWinLines = +this.winLinesAmountText.value;
         this.symbols = this.symbolsText.value.toUpperCase().trim();
         this.correctSymbols = this.symbols.split(' ')
         this.templatesAmount = +this.templatesAmountText.value;
     }

}

class CreateElement{
    constructor(element, className, display, append, text) {
        this.element = element;
        this.className = className;
        this.display = display;
        this.append = append;
        this.text = text;
    }
    createElement(){
        this.element = document.createElement(this.element);
        this.element.classList.add(this.className);
        this.text ? this.element.textContent = this.text : 0;
        this.element.style.display = this.display;
        this.append.append(this.element);
        return `.${this.className}`
    }

}

class CreateWinLines{
    constructor(classList, append, display, x, y) {
        this.classList = classList;
        this.append = document.querySelector(append);
        this.display = display;
        this.x = x;
        this.y = y;
    }

    createWinLines(){
        this.div = document.createElement('div');
        this.div.classList.add(this.classList);
        this.div.style.display = this.display;
        this.div.style.height = "40px";
        this.div.count = 1;
        if (this.display === "table") {
            this.div.style.width = "40px";
            this.div.style.backgroundColor = "yellow";
            this.div.style.float = "left";
            this.div.style.border = "1px solid darkblue"
            this.div.x = this.x;
            this.div.y = this.y;
            this.append.append(this.div);
        } else {
            this.append ? this.append.append(this.div) : 0;
            this.div.style.width = `${firstPayoutsPage.lineSize.width * 42}px`;
            this.div.style.backgroundColor = "yellow";
        }
    }
}

class FinalePayoutsPage {
    constructor(lineSize, winLine, symbols) {
        this.lineSize = lineSize;
        this.winLine = winLine;
        this.symbols = symbols;
    }
    resultCalculation(){
        const results = [];

        this.symbols.forEach((symbol, index, arr) => {
            this.winLine.forEach((line) => {
                const emptyTable = [];
                const createEmptyTable = () => {
                    for (let j = 0; j < this.lineSize.width; j++) {
                        emptyTable.push([]);
                        for (let k = 0; k < this.lineSize.height; k++) {
                            emptyTable[j].push(0);
                        }
                    }
                }
                createEmptyTable();

                const n1 = index + 1 >= arr.length - 1 ? 0 : index + 1;
                const n2 = index + 2 >= arr.length - 1 ? 1 : index + 2;

                emptyTable.forEach((tableLine, y) => tableLine.forEach((z, col) => emptyTable[y][col] = y % 2 ? this.symbols[n1] : this.symbols[n2]));
                const cheatArray = [].concat(emptyTable);
                for (let m = 0; m < line.length; m += 2) {
                    cheatArray[line[m]][line[m + 1]] = symbol;
                }
                cheatArray.forEach(winLine => {winLine.reverse();})
                results.push(cheatArray);
            })
        })
        return results
    }
}



class PatternCalculate {
    constructor(patternWinLine, wightReel, heightReel) {
        this.patternWinLine = patternWinLine;
        this.wightReel = wightReel;
        this.heightReel = heightReel;

    }
    result = [];

    createSymbolsLinesForCheat(){
        const arrX = [];
        const arrY = [];
        const resultX = []
        let patternWinLine = [];
        let runX = [];
        this.patternWinLine.forEach((i) => {
            patternWinLine.push(i);
        })
        patternWinLine.forEach((i, index) => {((index + 1) % 2 === 0) ? arrY.push(i) : arrX.push(i);})
        let moveX = Math.max(...arrX);
        let moveY = Math.max(...arrY);
        moveX = (this.wightReel - 1) - moveX;
        moveY = (this.heightReel - 1) - moveY;


        if (moveX > 0){
            for (let j = 0; j < moveX + 1; j++) {
                runX = [];
                arrX.forEach(i => {
                    runX.push(i + j);
                })
                resultX.push(runX);
            }

            if (moveY > 0){
                resultX.forEach(i => {
                    this.movementY(moveY, arrY, i)
                })
            } else {
                resultX.forEach(running => {
                    let pattWinLine = [];
                    for (let k = 0; k < arrX.length; k++) {
                        pattWinLine.push(running[k]);
                        pattWinLine.push(arrY[k]);
                    }

                    this.result.push(pattWinLine)
                })
            }
        }
        return this.result;

    }
    movementY(moveY, arrY, arrX) {
        let resultY = [];
        for (let j = 0; j < moveY + 1; j++) {
            let runningY = [];
            arrY.forEach(i => {
                i += j;
                runningY.push(i);
            })
            resultY.push(runningY);

        }
        resultY.forEach(running => {
                let pattWinLine = [];
                for (let k = 0; k < arrY.length; k++) {
                    pattWinLine.push(arrX[k]);
                    pattWinLine.push(running[k]);
                }

                this.result.push(pattWinLine)
        })
    }
}