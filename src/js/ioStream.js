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
        if (InputStream._instance) {
            return InputStream._instance;
        }
        InputStream._instance = this;


        this.oldInput = "";
        this.input = "";
        this.listeners = [];
    }

    static getInstance() {
        if (InputStream._instance) {
            return InputStream._instance;
        }

        return new InputStream();
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
    constructor() {
        if (OutputStreamScreen._instance) {
            return OutputStreamScreen._instance;
        }
        OutputStreamScreen._instance = this;


        this.out = document.querySelector("#terminal-container #terminal-output");
        this.listeners = [];
    }

    static getInstance() {
        if (OutputStreamScreen._instance) {
            return OutputStreamScreen._instance;
        }

        return new OutputStreamScreen();
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
        const el = createHTMLElement('div', '', {'class': 'terminal-link'});

        const link_name_container = createHTMLElement('div', '', {'class': 'name'})
        const link_icon = createHTMLElement('div', icon[param.type]('#984511', '1.11em'), {'class': 'icon'});
        const link_name = createHTMLElement('p', param.name, {'class': 'name-text highlight text-label'});
        
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
        const el = createHTMLElement('div', '', {'class': 'terminal-cmddesc'});
        const cmd_name = createHTMLElement('p', param.name, {'class': 'name focus clickable text-label'});
        const cmd_sep = createHTMLElement('p', ':', {'class': 'sep'});
        const cmd_desc = createHTMLElement('p', param.desc, {'class': 'desc'});

        cmd_name.onclick = param.func;

        el.appendChild(cmd_name);
        el.appendChild(cmd_sep);
        el.appendChild(cmd_desc);

        this.append(el);
    }

    printProject(param) {
        const el = createHTMLElement('div', '', {'class': 'terminal-project'});
        
        
        // const pro_link = createHTMLElement('a', '', {'class': 'link', 'href': param.link, 'target': '_blank', rel: 'noopener noreferrer'});
        const pro_name = createHTMLElement('p', param.name, {'class': 'name highlight text-label'});
        const pro_sep = createHTMLElement('p', ':', {'class': 'sep'});
        const pro_desc = createHTMLElement('p', param.desc, {'class': 'desc'});
        const pro_tags = createHTMLElement('p', param.tags, {'class': 'tags highlight'});
        const pro_container = createHTMLElement('div', '', {'class': 'container'})

        // pro_link.appendChild(pro_name);
        pro_container.appendChild(pro_tags);
        pro_container.appendChild(pro_desc);

        // append links
        for (let i = 0; i < param.links.length; i++) {
            const link = param.links[i];
            pro_container.appendChild(createHTMLElement('a', link.title, {'class': 'link focus clickable', 'target': '_blank','href': link.link}));
        }

        el.appendChild(pro_name);
        el.appendChild(pro_sep);
        el.appendChild(pro_container);
        

        this.append(el);
    }

    printText(param) {
        const el = createHTMLElement('p', param.text, {class: (param.class) ? param.class : ""});
        this.append(el);
    }

    printSkills(param) {

        const el = createHTMLElement('div', '', {class: 'terminal-skills'});

        const skillsName = createHTMLElement('p', param.name, {class: 'skills-name focus'});
        const skillsContainer = createHTMLElement('div', '', {class: 'skills-container'});

        for (let i = 0; i < param.skills.length; i++) {
            const skillEl = createHTMLElement('p', param.skills[i], {class: "item"});
            skillsContainer.appendChild(skillEl);
        }

        el.appendChild(skillsName);
        el.appendChild(skillsContainer);


        this.append(el);
    }

    printTitle(param) {
        const el = createHTMLElement('p', param.text, {class: 'terminal-title'});
        this.append(el);
    }

    printPortfolio(param) {
        const container = createHTMLElement('div', '', {class: 'terminal-portfolio'});
        const containerTitle = createHTMLElement('div', '', {class: 'title-container'});
        const containerContent = createHTMLElement('div', '', {class: 'content-container'});
        const containerLink = createHTMLElement('div', '', {class: 'link-container'});

        const title = createHTMLElement('p', param.title, {class: 'focus title'});
        const tags = createHTMLElement('p', param.tags, {class: 'highlight tags'});
        const description = createHTMLElement('p', param.desc, {class: "desc"});

        param.links.forEach((l)=>{
            const link = createHTMLElement('a', l.title, {class: 'focus clickable', target: '_blank', href: l.link})
            containerLink.appendChild(link);
        })

        containerTitle.appendChild(title);
        containerTitle.appendChild(tags);

        containerContent.appendChild(containerLink);
        containerContent.appendChild(description);
        

        container.appendChild(containerTitle);
        container.appendChild(containerContent);

        this.append(container);
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
        const callback = param.callback;
        const checkpause = param.checkpause;
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
                // callback
                if (callback) {
                    callback();
                }
                return false;
            } else {
                if (checkpause) {
                    if (!checkpause()) {
                        this.print(printJobList[printingIndex++]);
                    }
                } else {
                    this.print(printJobList[printingIndex++]);
                }
                return true;
            }
        }, min_interval, max_interval);
    }

    printPair(param) {
        const el = createHTMLElement('div', '', {class: 'terminal-pair'});

        const left = createHTMLElement('div', '', {class: 'left'});
        const right = createHTMLElement('div', '', {class: 'right'});
        const sep = createHTMLElement('p', '-', {'class': 'sep'});
        
        left.appendChild(param.pair[0]);
        right.appendChild(param.pair[1]);

        el.appendChild(left);
        el.appendChild(sep);
        el.appendChild(right);
        this.append(el);
    }

    printCustom(param) {
        const el = param.element;
        this.append(el);
    }

    printSep(param) {
        // this.printLine(param);
        const el = createHTMLElement('p', "* * *", {class: 'separator'});
        this.append(el);
        this.printLine(param);
    }

    print(printJob) {
        switch (printJob.type) {
            case "text":
                this.printText(printJob.parameters);
                break;
            case "title":
                this.printTitle(printJob.parameters);
                break;
            case "pair":
                this.printPair(printJob.parameters);
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
            case "skills":
                this.printSkills(printJob.parameters);
                break;
            case "portfolio":
                this.printPortfolio(printJob.parameters);
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

