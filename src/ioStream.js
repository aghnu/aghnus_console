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
    }

    append(el) {
        this.out.appendChild(el);
    }

    insert(el, index) {
        const children = this.out.children;
        const i = (index < 0) ? children.length + index : index;
        
        this.out.insertBefore(el, children[i]);
    }
}

