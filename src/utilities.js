class PrintJob {
    constructor(type, parameters={}) {
        this.type = type;
        this.parameters = parameters;
    }
}

class Display {
    #flashCursor;
    #flashCursorInterval;
    #linkTypeIconSrc = {
        "email": "/assets/img/icon_mail.svg",
        "link": "/assets/img/icon_link.svg"
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
        let fl = true;
        
        // setup cursor element and interval
        this.#flashCursor = createHTMLElement('p', prtStr, {'id': 'terminal-prompt'});
        window.addEventListener('resize', () => {this.#flashCursor.scrollIntoView(true)});
        this.#flashCursorInterval = setInterval(() => {
            this.#flashCursor.innerHTML = (fl) ? prtStr + cursorStr : prtStr;
            fl = !fl;
        }, 500);

        // add cursor to display
        this.terminal_container.appendChild(this.#flashCursor);
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