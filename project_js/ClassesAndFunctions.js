class FirstPayoutsPage {
    reelsNumberText = document.getElementById('reelsText');
    reelsHeightText = document.getElementById('symbolsNumber');
    symbolsText = document.getElementById('symbol');
    winLinesAmountText = document.getElementById('winLinesText')

    amountWinLines = +this.winLinesAmountText.value;

     lineSize = {
    width: +this.reelsNumberText.value,
    height: +this.reelsHeightText.value
     }

     symbols = this.symbolsText.value.toUpperCase().trim();
     correctSymbols = this.symbols.split(' ');

     upDateInputInformation(){
         this.lineSize = {
             width: +this.reelsNumberText.value,
             height: +this.reelsHeightText.value
         }
         this.amountWinLines = +this.winLinesAmountText.value;
         this.symbols = this.symbolsText.value.toUpperCase().trim();
         this.correctSymbols = this.symbols.split(' ');
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
        console.log(this.div)
        this.div.classList.add(this.classList);
        this.div.style.display = this.display;
        this.div.style.height = "40px";
        if (this.display === "table") {
            this.div.style.width = "40px";
            this.div.style.backgroundColor = "yellow";
            this.div.style.float = "left";
            this.div.style.border = "1px solid darkblue"
            console.log("x")
            //console.log(this.append)
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
                results.push(cheatArray);
            })
        })
        return results
    }
}