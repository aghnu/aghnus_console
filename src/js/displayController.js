import { createHTMLElement } from "./utilities";
import { icon } from "./svgfactory";
import { ProgramCore } from "./programExe";
import sysConfig from "../data/config.json";

export class DisplayController {
    #promptStr = "guest@aghnu.me:/$:&nbsp";
    #cursorStr = '_';
    #inputPromptEl;

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
        this.#connectOutputInputStream();
    }

    refresh() {
        this.#inputPromptEl.scrollIntoView(true);
    }

    #connectOutputInputStream() {
        
        this.out.subscribe(() => {
            this.refresh();
        });

        this.in.subscribe(() => {
            this.refresh();
        })
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
                    ProgramCore.getInstance().execute('keyboard', {'outStream': this.out});
                },
            },
            {
                'type': 'clean',
                'text': 'clear',
                'col': 'middle',
                'func': () => {
                    ProgramCore.getInstance().execute('clear', {'outStream': this.out});
                },
            },
            {
                'type': 'help',
                'text': 'help',
                'col': 'right',
                'func': () => {
                    ProgramCore.getInstance().execute('help', {'outStream': this.out});
                },
            },
            {
                'type': 'contact',
                'text': 'contact',
                'col': 'left',
                'func': () => {
                    ProgramCore.getInstance().execute('contact', {'outStream': this.out});
                },
            },
            {
                'type': 'info',
                'text': 'about',
                'col': 'middle',
                'func': () => {
                    ProgramCore.getInstance().execute('about', {'outStream': this.out});
                },
            },
            {
                'type': 'projects',
                'text': 'projects',
                'col': 'right',
                'func': () => {
                    ProgramCore.getInstance().execute('projects', {'outStream': this.out});
                },
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
        const footerCopyEl = createHTMLElement('p', '', {'id': 'footer-copy-str'});
        const footerLocaEl = createHTMLElement('p', '', {'id': 'footer-loca-str'});

        const footerTextContainer = createHTMLElement('div', '', {'class': 'text-container'});




        const date = new Date();
        footerCopyEl.innerHTML = '© 2022 Gengyuan Huang';
        footerLocaEl.innerHTML = sysConfig.location;
        footerDateEl.innerHTML = date.toLocaleDateString('en-CA', {timeZone: sysConfig.timezone}) + "&nbsp" + date.toLocaleTimeString('en-CA', {timeZone: sysConfig.timezone});
        setInterval(() => {
            const date = new Date();
            footerDateEl.innerHTML = date.toLocaleDateString('en-CA', {timeZone: sysConfig.timezone}) + "&nbsp" + date.toLocaleTimeString('en-CA', {timeZone: sysConfig.timezone});
        }, 1000);

        footerTextContainer.appendChild(footerDateEl);
        footerTextContainer.appendChild(footerLocaEl);
        // footerTextContainer.appendChild(footerCopyEl);
        footer.appendChild(footerTextContainer);
    }

    #createInputPrompt() {
        let userInputStr = "";
        const terminal_container = document.querySelector("#terminal-container");
        this.#inputPromptEl = createHTMLElement('p', '', {'id': 'terminal-input'});
        let pointerFlashingInterval;
        
        const updatePrompt = () => {
            clearInterval(pointerFlashingInterval);
            userInputStr = this.in.getInput().replaceAll(' ', '&nbsp');
            this.#inputPromptEl.innerHTML = this.#promptStr + userInputStr + this.#cursorStr;
            let flash = false;
            pointerFlashingInterval = setInterval(() => {
                this.#inputPromptEl.innerHTML = (flash) ? this.#promptStr + userInputStr + this.#cursorStr : this.#promptStr + userInputStr + "&nbsp";
                flash = !flash;
            }, 500);
        }

        // subscribe to input update
        updatePrompt();
        this.in.subscribe(updatePrompt);

        // add cursor to display
        terminal_container.append(this.#inputPromptEl);
    }
}
