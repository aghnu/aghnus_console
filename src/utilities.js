import { KeyboardMonitor } from "./keyboardMonitor";
import { icon } from "./svgfactory";

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
        this.#createFooter();
        this.#createFunctionKeys();
        this.#createVirtualKeyboard();
    }

    static getInstance() {
        if (Display._instance) {
            return Display._instance;
        }

        throw "singleton was not initialized";;
    }

    #createVirtualKeyboard() {
        const vKeyboard = KeyboardMonitor.getInstance();

        const keyboardKeyMap = [
            ['1','2','3','4','5','6','7','8','9','0','Backspace'],
            ['q','w','e','r','t','y','u','i','o','p'],
            ['a','s','d','f','g','h','j','k','l','Enter'],
            ['z','x','c','v','b','n','m','/'],
            [' '],
        ]

        const keyboardTextMap = [
            ['1','2','3','4','5','6','7','8','9','0','Backspace'],
            ['q','w','e','r','t','y','u','i','o','p'],
            ['a','s','d','f','g','h','j','k','l','Enter'],
            ['z','x','c','v','b','n','m','/'],
            ['Space'],
        ]

        const keyboard_container = document.querySelector('#virtual-keyboard');

        for (let r = 0; r < keyboardTextMap.length; r++) {
            const keyboard_key_row = createHTMLElement('div', '', {'class': 'row'});
            for (let i = 0; i < keyboardTextMap[r].length; i++) {
                const text = keyboardTextMap[r][i];
                const key = keyboardKeyMap[r][i];

                const keyboard_key = createHTMLElement('button', text, {'class': 'key'});
                keyboard_key.onclick = () => vKeyboard.pressKey(key);
                keyboard_key_row.appendChild(keyboard_key);
            }
            keyboard_container.append(keyboard_key_row);
        }      
    }

    #createFunctionKeys() {
        const col_l = document.querySelector("#function-key-container .left");
        const col_m = document.querySelector("#function-key-container .middle");
        const col_r = document.querySelector("#function-key-container .right");

        const keys = [
            {
                'type': 'keyboard',
                'text': 'keyboard',
                'col': 'left',
                'func': () => {},
            },
            {
                'type': 'clean',
                'text': 'clear',
                'col': 'middle',
                'func': () => {},
            },
            {
                'type': 'help',
                'text': 'help',
                'col': 'right',
                'func': () => {},
            },
            {
                'type': 'contact',
                'text': 'contact',
                'col': 'left',
                'func': () => {},
            },
            {
                'type': 'about',
                'text': 'about',
                'col': 'middle',
                'func': () => {},
            },
            {
                'type': 'github',
                'text': 'projects',
                'col': 'right',
                'func': () => {},
            },
        ];

        keys.forEach((key) => {
            const el = createHTMLElement('button', '', {'class': 'key', 'onclick': key.func});
            const elIcon = createHTMLElement('div', icon[key.type]('#984511', '26px'), {'class': 'icon'});
            const elText = createHTMLElement('text', key.text, {'class': 'text'});
            const elTextContainer = createHTMLElement('div', '', {'class': 'text-container'});
            
            elTextContainer.appendChild(elText);
            el.appendChild(elIcon);
            el.appendChild(elTextContainer);
            
            switch (key.col) {
                case 'left':
                    col_l.appendChild(el);
                    break;
                case 'middle':
                    col_m.appendChild(el);
                    break;
                case 'right':
                    col_r.appendChild(el);
                    break;
            }

        });
    }

    #createFooter() {
        const footer = document.querySelector('#footer');
        const footerDateEl = createHTMLElement('p', '', {'id': 'footer-date-str'});
        const footerTextContainer = createHTMLElement('div', '', {'class': 'text-container'});

        const date = new Date();
        footerDateEl.innerHTML = date.toLocaleDateString() + "&nbsp" + date.toLocaleTimeString();
        setInterval(() => {
            const date = new Date();
            footerDateEl.innerHTML = date.toLocaleDateString() + "&nbsp" + date.toLocaleTimeString();
        }, 1000);

        footerTextContainer.appendChild(footerDateEl);
        footer.appendChild(footerTextContainer);
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
            pointer.innerHTML = (fl) ? '&nbsp' : cursorStr;
            fl = !fl;
        }, 500);

        this.#flashCursor.appendChild(prompt);
        this.#flashCursor.appendChild(input);
        this.#flashCursor.appendChild(pointer);

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
        const link_icon = createHTMLElement('div', icon[param.type]('#78a88a', '24px'), {'class': 'icon'});
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