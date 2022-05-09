import { createHTMLElement,setRandInterval } from "./utilities";



export class OutputStreamJob {
    constructor(type, parameters={}) {
        this.type = type;
        this.parameters = parameters;
    }
}


export class InputStream {
    constructor() {
        this.oldInput = "";
        this.input = "";
        this.listeners = [];
    }

    getInput() {
        return this.input;
    }

    getPrevInput() {
        return this.oldInput;
    }

    updateInput(input) {
        this.oldInput = this.input;
        this.input = input;

        this.listeners.forEach(func => func(this));
    }

    subscribe(func) {
        this.listeners.push(func);
    }
}

export class OutputStreamScreen {
    constructor(div) {
        this.out = div;
        this.listeners = [];
    }

    hasElement(el) {
        const children = this.out.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i] === el) {
                return true;
            }             
        }

        return false;
    }

    append(el) {
        this.out.appendChild(el);
        this.listeners.forEach(func => func(this));
    }

    insert(el, index) {
        const children = this.out.children;
        const i = (index < 0) ? children.length + index : index;
        
        this.out.insertBefore(el, children[i]);
        this.listeners.forEach(func => func(this));
    }

    clear() {
        this.out.innerHTML = "";
        this.listeners.forEach(func => func(this));
    }

    subscribe(func) {
        this.listeners.push(func);
    }

    printLink(param) {
        const el = createHTMLElement('a', '', {'class': 'terminal-link', "href": param.link});
        const link_icon = createHTMLElement('div', icon[param.type]('#78a88a', '24px'), {'class': 'icon'});
        const link_text = createHTMLElement('p', param.text, {'class': 'text'});

        el.appendChild(link_icon);
        el.appendChild(link_text);

        this.out.append(el);
    }

    printText(param) {
        const el = createHTMLElement('p', param.text);
        this.out.append(el);
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

        this.out.append(el);
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

