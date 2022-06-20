import { createHTMLElement,setRandInterval } from "./utilities";
import { icon } from "./svgfactory";



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

    broadCast() {
        this.listeners.forEach(func => func(this));
    }

    append(el) {
        this.out.appendChild(el);
        this.broadCast();
    }

    insert(el, index) {
        const children = this.out.children;
        const i = (index < 0) ? children.length + index : index;
        
        this.out.insertBefore(el, children[i]);
        this.broadCast();
    }

    clear() {
        this.out.innerHTML = "";
        this.broadCast();
    }

    subscribe(func) {
        this.listeners.push(func);
    }

    printLink(param) {
        const el = createHTMLElement('div', '', {'id': 'terminal-link'});

        const link_name_container = createHTMLElement('div', '', {'class': 'name'})
        const link_icon = createHTMLElement('div', icon[param.type]('#984511', '24px'), {'class': 'icon'});
        const link_name = createHTMLElement('p', param.name, {'class': 'name-text highlight'});
        
        const link_sep = createHTMLElement('p', ':', {'class': 'sep'});

        const link_container = createHTMLElement('div', '', {'class': 'container'})
        const link_link = createHTMLElement('a', '', {'class': 'link', 'href': param.link, 'target': '_blank', rel: 'noopener noreferrer'});
        const link_text = createHTMLElement('p', param.text, {'class': 'text clickable focus'});
        
        link_name_container.appendChild(link_icon);
        link_name_container.appendChild(link_name);

        link_link.appendChild(link_text);
        link_container.appendChild(link_link);

        el.appendChild(link_name_container);
        el.appendChild(link_sep);
        el.appendChild(link_container);

        this.append(el);
    }

    printCMDDesc(param) {
        const el = createHTMLElement('div', '', {'id': 'terminal-cmddesc'});
        const cmd_name = createHTMLElement('p', param.name, {'class': 'name focus clickable'});
        const cmd_sep = createHTMLElement('p', ':', {'class': 'sep'});
        const cmd_desc = createHTMLElement('p', param.desc, {'class': 'desc'});

        cmd_name.onclick = param.func;

        el.appendChild(cmd_name);
        el.appendChild(cmd_sep);
        el.appendChild(cmd_desc);

        this.append(el);
    }

    printProject(param) {
        const el = createHTMLElement('div', '', {'id': 'terminal-project'});
        
        const pro_container = createHTMLElement('div', '', {'class': 'container'})
        const pro_link = createHTMLElement('a', '', {'class': 'link', 'href': param.link, 'target': '_blank', rel: 'noopener noreferrer'});
        const pro_name = createHTMLElement('p', param.name, {'class': 'name focus clickable'});

        const pro_sep = createHTMLElement('p', ':', {'class': 'sep'});

        const pro_desc = createHTMLElement('p', param.desc, {'class': 'desc'});
        
        pro_link.appendChild(pro_name);
        pro_container.appendChild(pro_link);

        el.appendChild(pro_container);
        el.appendChild(pro_sep);
        el.appendChild(pro_desc);

        this.append(el);
    }

    printText(param) {
        const el = createHTMLElement('p', param.text);
        this.append(el);
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

        this.append(el);
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

    printCustom(param) {
        const el = param.element;
        this.append(el);
    }

    printSep(param) {
        this.printLine(param);
        const el = createHTMLElement('p', "* * *", {class: 'separator'});
        this.append(el);
        this.printLine(param);
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
            case "CMDDesc":
                this.printCMDDesc(printJob.parameters);
                break;
            case "project":
                this.printProject(printJob.parameters);
                break;
            case "separator":
                this.printSep(printJob.parameters);
                break;
            case "custom":
                this.printCustom(printJob.parameters);
                break;
            case "lambda":
                printJob.parameters.func();
                break;
        }
    }
}

