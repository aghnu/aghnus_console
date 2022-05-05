import { createHTMLElement } from "./utilities"

class Display {
    #flashCursor;
    #flashCursorInterval;

    constructor(container) {
        if (Display._instance) {
            throw "singleton is already initialized";
        }

        // public fields
        Display._instance = this;
        this.terminal_container = container;
        this.inputTextArea = "";

        // init setup
        this.#createflashCursor();
    }

    static getInstance() {
        if (ShowIDGenerator._instance) {
            return ShowIDGenerator._instance;
        }

        throw "singleton was not initialized";;
    }

    #createflashCursor() {
        const prtStr = "guest@aghnu.me:/$: ";
        const cursorStr = "_";
        let fl = false;
        
        // setup cursor element and interval
        this.#flashCursor = document.createElement('p');
        this.#flashCursor.setAttribute('id', "terminal-prompt");
        window.addEventListener('resize', () => {this.#flashCursor.scrollIntoView(true)});
        this.#flashCursorInterval = setInterval(() => {
            this.#flashCursor.innerHTML = (fl) ? prtStr + cursorStr : prtStr;
            fl = !fl;
        }, 500);

        // add cursor to display
        this.terminal_container.appendChild(this.#flashCursor);
    }

    print(text) {
        const el = createHTMLElement('p', text);
        this.terminal_container.insertBefore(el, this.#flashCursor);
        this.#flashCursor.scrollIntoView(true);
    }

    printJob(textList, interval=500) {
        let printingIndex = 0;
        const printing = setInterval(() => {
            if (printingIndex >= textList.length) {
                clearInterval(printing);
            } else {
                this.print(textList[printingIndex++]);
            }
        }, interval);
    }

    clear() {
        this.terminal_container.innerHTML = "";
        this.terminal_container.appendChild(this.#flashCursor);
        this.#flashCursor.scrollIntoView(true);
    }
}

function main() {


    // when dom css assets loaded
    window.addEventListener('load', () => {
        // init display singleton
        const display = new Display(document.querySelector("#terminal-container"));
        const welcomePrintingJobTextList = [
            "Hello stranger...",
            "Welcome... Welcome...","",
            "[slowly clipping]","","","",
            "name is Gengyuan Huang",
            "a programmer...","","",
            "<br><br>","","",
            "I have recently graduated from the University with a CS degree...","","",
            "I have rent to pay, and a mouth to feed (my mouth)...","","","",
            "<br><br>","",
            "if you wish to know more about me, my life or my cat...","",
            "or my social insurance number","",
            "please type /help",
            "<br><br>",
        ]

        display.printJob(welcomePrintingJobTextList, 600);
    
    });


}

main();