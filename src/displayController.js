import { createHTMLElement,setRandInterval } from "./utilities";
import { icon } from "./svgfactory";

export class PrintJob {
    constructor(type, parameters={}) {
        this.type = type;
        this.parameters = parameters;
    }
}

export class DisplayController {
    #promptStr = "guest@aghnu.me:/$:&nbsp";
    #cursorStr = '_';
    #displayRefreshFuncs = [];

    constructor(inputStream, outputStream) {
        // public fields
        this.out = outputStream;
        this.in = inputStream;
       
        // when window resize
        window.addEventListener('resize', () => this.refresh);

        // init setup
        this.#createInputPrompt();
        this.#createFooter();
        this.#createFunctionKeys();
    }

    refresh() {
        this.#displayRefreshFuncs.forEach(func => func());
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
                'func': () => {
                    const keyboard = document.querySelector('#virtual-keyboard');
                    if (keyboard) {
                        keyboard.classList.toggle('on');
                        this.refresh();
                    }
                },
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
            const el = createHTMLElement('button', '', {'class': 'key'});
            const elIcon = createHTMLElement('div', icon[key.type]('#984511', '26px'), {'class': 'icon'});
            const elText = createHTMLElement('text', key.text, {'class': 'text'});
            const elTextContainer = createHTMLElement('div', '', {'class': 'text-container'});
            
            el.onclick = key.func;

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

    #createInputPrompt() {
        let userInputStr = "";
        const inputPrompt = createHTMLElement('p', '', {'id': 'terminal-input'});

        let pointerFlashingInterval;
        const updatePrompt = () => {
            clearInterval(pointerFlashingInterval);
            userInputStr = this.in.getInput().replaceAll(' ', '&nbsp');
            inputPrompt.innerHTML = this.#promptStr + userInputStr + this.#cursorStr;
            let flash = false;
            pointerFlashingInterval = setInterval(() => {
                inputPrompt.innerHTML = (flash) ? this.#promptStr + userInputStr + this.#cursorStr : this.#promptStr + userInputStr + "&nbsp";
                flash = !flash;
            }, 500);
        }

        // subscribe to input update
        updatePrompt();
        this.in.subscribe(updatePrompt);
        this.#displayRefreshFuncs.push(() => inputPrompt.scrollIntoView(true));

        // add cursor to display
        this.out.append(inputPrompt);
    }

    printLink(param) {
        const el = createHTMLElement('a', '', {'class': 'terminal-link', "href": param.link});
        const link_icon = createHTMLElement('div', icon[param.type]('#78a88a', '24px'), {'class': 'icon'});
        const link_text = createHTMLElement('p', param.text, {'class': 'text'});

        el.appendChild(link_icon);
        el.appendChild(link_text);

        this.out.insert(el, -1);
        this.refresh();
    }

    printText(param) {
        const el = createHTMLElement('p', param.text);
        this.out.insert(el, -1);
        this.refresh();
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

        this.out.insert(el,-1);
        this.refresh();
    }

    printList(param) {
        const printJobList = param.list;
        const min_interval = param.min_interval;
        const max_interval = param.max_interval;
        const default_interval = 500;

        if (min_interval === undefined) {
            min_interval = default_interval;
            max_interval = default_interval;
        }

        if (max_interval === undefined) {
            max_interval = min_interval;
        }

        let printingIndex = 0;
        const printing = setRandInterval(() => {
            if (printingIndex >= printJobList.length) {
                printing.clear();
            } else {
                this.print(printJobList[printingIndex++]);
            }
        }, min_interval, max_interval);
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
            case "list":
                this.printList(printJob.parameters);
                break;
        }
    }
}
