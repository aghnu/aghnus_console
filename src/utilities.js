import { KeyboardMonitor } from "./keyboardMonitor";

class PrintJob {
    constructor(type, parameters={}) {
        this.type = type;
        this.parameters = parameters;
    }
}

class Display {
    #flashCursor;
    #inputUpdateTaskList = [];
    #inputUpdate;
    #linkTypeIconSrc = {
        "email": "assets/img/icon_mail.svg",
        "link": "assets/img/icon_link.svg"
    };

    constructor(container) {
        if (Display._instance) {
            throw "singleton is already initialized";
        }

        // public fields
        Display._instance = this;
        this.terminal_container = container;
        this.inputTextArea = "";
        this.displayHist = {};
       

        // init setup
        new KeyboardMonitor();
        this.#setupKeyListeners();
        this.#createFlashCursor();
        
        
    }

    static getInstance() {
        if (Display._instance) {
            return Display._instance;
        }

        throw "singleton was not initialized";;
    }

    #createFlashCursor() {
        const prtStr = "guest@aghnu.me:/$:&nbsp";
        const cursorStr = "_";
        let fl = false;
        
        // setup cursor element and interval
        this.#flashCursor = createHTMLElement('div', '', {'id': 'terminal-input'});
        window.addEventListener('resize', () => {this.#flashCursor.scrollIntoView(true)});

        const prompt = createHTMLElement('p', prtStr, {'class': 'prompt'});
        const input = createHTMLElement('p', '', {'class': 'input', type: 'text', readonly: true});
        const pointer = createHTMLElement('p', cursorStr, {'class': 'pointer'});

        setInterval(() => {
            pointer.innerHTML = (fl) ? ' ' : cursorStr;
            fl = !fl;
        }, 500);

        this.#flashCursor.appendChild(prompt);
        this.#flashCursor.appendChild(input);
        this.#flashCursor.appendChild(pointer);

        KeyboardMonitor.getInstance().setInputBox(input);

        this.#addFuncToTaskInput(() => {
            input.innerHTML = this.inputTextArea.replaceAll(' ', '&nbsp');
            this.#flashCursor.scrollIntoView(true);
        });

        // add cursor to display
        this.terminal_container.appendChild(this.#flashCursor);
    }

    #addFuncToTaskInput(func) {
        this.#inputUpdateTaskList.push(func);
    }

    #setupKeyListeners() {
        const kmonitor = KeyboardMonitor.getInstance();
        this.#inputUpdate = (char) => {
            this.inputTextArea += char;

            // call functions inside the update list
            this.#inputUpdateTaskList.forEach((func) => func());
        };

        kmonitor.setUpdateFunc(this.#inputUpdate);

        // set specials
        kmonitor.addSpecialKey('Backspace', () => {
            this.inputTextArea = this.inputTextArea.slice(0, -1);
            this.#inputUpdateTaskList.forEach((func) => func());
        });


    }

    printLink(param) {
        const el = createHTMLElement('a', '', {'class': 'terminal-link', "href": param.link});
        const link_icon = createHTMLElement('img', '', {'class': 'icon', 'src': this.#linkTypeIconSrc[param.type]});
        const link_text = createHTMLElement('p', param.text, {'class': 'text'});

        el.appendChild(link_icon);
        el.appendChild(link_text);

        this.terminal_container.insertBefore(el, this.#flashCursor);
        this.#flashCursor.scrollIntoView(true);
    }

    printText(param) {
        const el = createHTMLElement('p', param.text);
        this.terminal_container.insertBefore(el, this.#flashCursor);
        this.#flashCursor.scrollIntoView(true);
    }

    printLine(param) {
        const el = createHTMLElement('p');

        if (param.height) {
            let innerHTML = "";
            for (let i = 0; i < param.height; i++) {
                innerHTML += "<br>";
            }
            el.innerHTML = innerHTML;
        } else {
            el.innerHTML = "<br>";
        }

        this.terminal_container.insertBefore(el, this.#flashCursor);
        this.#flashCursor.scrollIntoView(true);
    }

    print(printJob) {
        switch (printJob.type) {
            case "text":
                this.printText(printJob.parameters);
                break;
            case "line":
                this.printLine(printJob.parameters);
                break;
            case "link":
                this.printLink(printJob.parameters);
                break;
        }
    }

    printList(printJobList, min_interval=500, max_interval=null) {
        let printingIndex = 0;

        if (max_interval === null) {
            max_interval = min_interval;
        }
        const printing = setRandInterval(() => {
            if (printingIndex >= printJobList.length) {
                printing.clear();
            } else {
                this.print(printJobList[printingIndex++]);
            }
        }, min_interval, max_interval);
    }

    clear() {
        this.terminal_container.innerHTML = "";
        this.terminal_container.appendChild(this.#flashCursor);
        this.#flashCursor.scrollIntoView(true);
    }
}


function createHTMLElement(tag, innerHTML="", attributes={}) {
    const el = document.createElement(tag);
    el.innerHTML = innerHTML;
    for (let att in attributes) {
        el.setAttribute(att, attributes[att]);
    }
    return el;
}

function setRandInterval (func, min, max) {
    let currentTimeout;

    const runTimeout = () => {
        currentTimeout = setTimeout(() => {
            func();
            runTimeout();
        }, Math.floor(Math.random() * (max - min + 1)) + min);
    }

    runTimeout();

    return {
        clear: () => {
            clearTimeout(currentTimeout);
        }
    }
}


export { createHTMLElement,setRandInterval,Display,PrintJob };