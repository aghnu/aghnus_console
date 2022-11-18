import { createHTMLElement,setRandInterval } from "./utilities";
import { icon } from "./svgfactory";

type HTMLElementOutSection = {sectionFocus?: boolean} & HTMLElement;
type OutputStreamJobParameters = {
    type?: string
    title?: string
    name?: string
    link?: string
    text?: string
    desc?: string
    tags?: string
    class?: string
    sum?: string
    
    height?: number

    checkpause?: () => boolean
    min_interval?: number
    max_interval?: number

    pair?: [HTMLElement, HTMLElement]
    element?: HTMLElement

    func?: () => void
    callback?: () => void

    links?: {title: string, link: string}[]
    skills?: string[]
    list?: OutputStreamJob[]
};
type AnchorLink = {
    title: string;
    link: string;
}
export interface OutputStreamJob {
    type: string;
    parameters: OutputStreamJobParameters;
}

export class InputStream {
    static _instance: InputStream;
    
    private oldInput: string = "";
    private input: string = "";
    private listeners: Array<(inputStream: InputStream) => void> = [];

    constructor() {
        if (InputStream._instance) {
            return InputStream._instance;
        }
        InputStream._instance = this;
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

    updateInput(input: string) {
        this.oldInput = this.input;
        this.input = input;

        this.listeners.forEach(func => func(this));
    }

    subscribe(func: (inputStream: InputStream) => void) {
        this.listeners.push(func);
    }
}

export class OutputStreamScreen {
    static _instance: OutputStreamScreen;
    
    private root!: HTMLElement;
    private out!: HTMLElementOutSection;
    private listeners: Array<(outputStreamScreen: OutputStreamScreen) => void> = [];

    constructor() {
        if (OutputStreamScreen._instance) {
            return OutputStreamScreen._instance;
        }
        OutputStreamScreen._instance = this;

        this.root = document.querySelector("#site-app .terminal-container .terminal-output")!;
        this.out = this.createOutSection();

        // init
        // subscript section focus
        this.subscribe(()=>{
            if (this.out.sectionFocus !== true) {
                this.focusSection(this.out);
            }
        });
    }

    static getInstance() {
        if (OutputStreamScreen._instance) {
            return OutputStreamScreen._instance;
        }

        return new OutputStreamScreen();
    }

    focusSection(el: HTMLElementOutSection) {
        // remove all other focus non blocking
        
        el.classList.add('section-focus');
        el.sectionFocus = true;
        new Promise(()=>{
            for (let i = 0; i < this.root.children.length; i++) {
                const child = this.root.children[i] as HTMLElementOutSection;
                if (child !== el) {
                    child.classList.remove('section-focus');
                    child.sectionFocus = false;
                }                
            }
        });

    }

    createOutSection(): HTMLElementOutSection {
        const el = createHTMLElement('div', '', {class: 'terminal-exe-section'}) as HTMLElementOutSection;
        
        this.root.append(el);
        this.focusSection(el);
        
        const updateFocus = () => {
            if (el.sectionFocus !== true) {
                this.focusSection(el);     
            }
        }

        el.addEventListener('mouseover', () => {
            updateFocus();
        }, {passive: true});

        el.addEventListener('touchstart', () => {
            updateFocus();
        }, {passive: true});

        el.addEventListener('touchend', () => {
            updateFocus();
        }, {passive: true});

        return el;
    }

    newOutSection() {
        this.out = this.createOutSection();
    }

    hasElement(el: HTMLElement) {
        const children = this.out.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i] as HTMLElement === el) {
                return true;
            }             
        }

        return false;
    }

    broadCast() {
        this.listeners.forEach(func => func(this));
    }

    append(el: HTMLElement) {
        this.out.appendChild(el);
        this.broadCast();
    }

    insert(el: HTMLElement, index: number) {
        const children = this.out.children;
        const i = (index < 0) ? children.length + index : index;
        
        this.out.insertBefore(el, children[i]);
        this.broadCast();
    }

    clear() {
        this.root.innerHTML = "";
        this.newOutSection();
        this.broadCast();
    }

    subscribe(func: (outputStreamScreen: OutputStreamScreen) => void) {
        this.listeners.push(func);
    }

    printLink(param: OutputStreamJobParameters) {
        const el = createHTMLElement('div', '', {'class': 'terminal-link'});

        const link_name_container = createHTMLElement('div', '', {'class': 'name'})
        const link_icon = createHTMLElement('div', icon[param.type as string]('#3465a4', '20px'), {'class': 'icon'});
        const link_name = createHTMLElement('p', param.name as string, {'class': 'name-text highlight text-label'});
        
        const link_sep = createHTMLElement('p', ':', {'class': 'sep'});

        const link_container = createHTMLElement('div', '', {'class': 'container'})
        const link_link = createHTMLElement('a', '', {'class': 'link', 'href': param.link as string, 'target': '_blank', rel: 'noopener noreferrer'});
        const link_text = createHTMLElement('p', param.text as string, {'class': 'text clickable focus'});
        
        link_name_container.appendChild(link_icon);
        link_name_container.appendChild(link_name);

        link_link.appendChild(link_text);
        link_container.appendChild(link_link);

        el.appendChild(link_name_container);
        el.appendChild(link_sep);
        el.appendChild(link_container);

        this.append(el);
    }

    printCMDDesc(param: OutputStreamJobParameters) {
        const el = createHTMLElement('div', '', {'class': 'terminal-cmddesc'});
        const cmd_name = createHTMLElement('p', param.name as string, {'class': 'name focus clickable text-label'});
        const cmd_sep = createHTMLElement('p', ':', {'class': 'sep'});
        const cmd_desc = createHTMLElement('p', param.desc as string, {'class': 'desc'});

        cmd_name.onclick = param.func as (() => void);

        el.appendChild(cmd_name);
        el.appendChild(cmd_sep);
        el.appendChild(cmd_desc);

        this.append(el);
    }

    printProject(param: OutputStreamJobParameters) {
        const el = createHTMLElement('div', '', {'class': 'terminal-project'});
        
        
        // const pro_link = createHTMLElement('a', '', {'class': 'link', 'href': param.link, 'target': '_blank', rel: 'noopener noreferrer'});
        const pro_name = createHTMLElement('p', param.name as string, {'class': 'name focus text-label'});
        const pro_sep = createHTMLElement('p', ':', {'class': 'sep'});
        const pro_desc = createHTMLElement('p', param.desc as string, {'class': 'desc'});
        const pro_tags = createHTMLElement('p', param.tags as string, {'class': 'tags highlight'});
        const pro_container = createHTMLElement('div', '', {'class': 'container'})

        // pro_link.appendChild(pro_name);
        pro_container.appendChild(pro_tags);
        pro_container.appendChild(pro_desc);

        // append links
        for (let i = 0; i < (param.links as AnchorLink[]).length; i++) {
            const link = (param.links as AnchorLink[])[i];
            pro_container.appendChild(createHTMLElement('a', link.title as string, {'class': 'link focus clickable', 'target': '_blank','href': link.link}));
        }

        el.appendChild(pro_name);
        el.appendChild(pro_sep);
        el.appendChild(pro_container);
        

        this.append(el);
    }

    printText(param: OutputStreamJobParameters) {
        const el = createHTMLElement('p', param.text as string, (param.class as string !== undefined) ? {class: param.class as string} : {});
        this.append(el);
    }

    printSkills(param: OutputStreamJobParameters) {

        const el = createHTMLElement('div', '', {class: 'terminal-skills'});

        const skillsName = createHTMLElement('p', param.name as string, {class: 'skills-name focus'});
        const skillsContainer = createHTMLElement('div', '', {class: 'skills-container'});

        for (let i = 0; i < (param.skills!).length; i++) {
            const skillEl = createHTMLElement('p', param.skills![i], {class: "item"});
            const skillArrow = createHTMLElement('p', '○', {class: "arrow focus"});
            const skillContainer = createHTMLElement('div', '', {class: "item-container"});

            skillContainer.appendChild(skillArrow);
            skillContainer.appendChild(skillEl);

            skillsContainer.appendChild(skillContainer);
        }

        el.appendChild(skillsName);
        el.appendChild(skillsContainer);


        this.append(el);
    }

    printTitle(param: OutputStreamJobParameters) {
        const el = createHTMLElement('p', param.text as string, {class: 'terminal-title'});
        this.append(el);
    }

    printPortfolio(param: OutputStreamJobParameters) {
        const container = createHTMLElement('div', '', {class: 'terminal-portfolio'});
        // const containerTitle = createHTMLElement('div', '', {class: 'title-container'});
        // const containerContent = createHTMLElement('div', '', {class: 'content-container'});
        const containerLink = createHTMLElement('div', '', {class: 'link-container'});

        const title = createHTMLElement('p', param.title as string, {class: 'focus title'});
        const sum = createHTMLElement('p', param.sum as string, {class: 'highlight sum'});
        const description = createHTMLElement('p', param.desc as string, {class: "desc"});

        (param.links as AnchorLink[]).forEach((l)=>{
            const link = createHTMLElement('a', '<span class="clickable">' + l.title + '</span>', {class: 'highlight', target: '_blank', href: l.link});
            containerLink.appendChild(link);
        })

        container.appendChild(title);
        container.appendChild(sum);
        container.appendChild(containerLink);

        
        container.appendChild(description);

        this.append(container);
    }

    printLine(param: OutputStreamJobParameters) {
        const el = createHTMLElement('p');

        if (param.height) {
            let innerHTML = "";
            for (let i = 0; i < (param.height as number); i++) {
                innerHTML += "<br>";
            }
            el.innerHTML = innerHTML;
        } else {
            el.innerHTML = "<br>";
        }

        this.append(el);
    }

    printList(param: OutputStreamJobParameters) {
        const printJobList = param.list;
        const callback = param.callback;
        const checkpause = param.checkpause;
        let min_interval = param.min_interval;
        let max_interval = param.max_interval;
        const default_interval_min = 10;
        const default_interval_max = 25;

        if (min_interval === undefined) {
            min_interval = default_interval_min;
            max_interval = default_interval_max;
        }

        if (max_interval === undefined) {
            max_interval = min_interval;
        }

        let printingIndex = 0;
        const printing = setRandInterval(() => {
            if (printingIndex >= printJobList!.length) {
                printing.clear();
                // callback
                if (callback) {
                    callback();
                }
                return false;
            } else {
                if (checkpause) {
                    if (!checkpause()) {
                        this.print(printJobList![printingIndex++]);
                    }
                } else {
                    this.print(printJobList![printingIndex++]);
                }
                return true;
            }
        }, min_interval, max_interval);
    }

    printPair(param: OutputStreamJobParameters) {
        const el = createHTMLElement('div', '', {class: 'terminal-pair'});

        const left = createHTMLElement('div', '', {class: 'left'});
        const right = createHTMLElement('div', '', {class: 'right'});
        const sep = createHTMLElement('p', '-', {'class': 'sep'});
        
        left.appendChild(param.pair![0]);
        right.appendChild(param.pair![1]);

        el.appendChild(left);
        el.appendChild(sep);
        el.appendChild(right);
        this.append(el);
    }

    printCustom(param: OutputStreamJobParameters) {
        const el = param.element!;
        this.append(el);
    }

    printSep(param: OutputStreamJobParameters) {
        // this.printLine(param);
        const el = createHTMLElement('p', "* * *", {class: 'separator'});
        this.append(el);
        this.printLine(param);
    }

    print(printJob: OutputStreamJob) {
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
                printJob.parameters.func!();
                break;
        }

    }
}

