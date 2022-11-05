import { createHTMLElement } from "./utilities";
import { icon } from "./svgfactory";
import { ProgramCore } from "./programExe";

import sysConfig from "../data/config.json";
import { InputStream, OutputStreamScreen } from "./ioStream";
import { KeyboardController } from "./keyboardController";

export class DisplayController {
    #promptStr = "<span class='focus'>guest@aghnu.me</span>:<span class='highlight'>~/</span>$:&nbsp";
    #cursorStr = '_';
    #inputPromptEl;

    constructor() {
        if (DisplayController._instance) {
            return DisplayController._instance;
        }
        DisplayController._instance = this;


        // public fields
        this.out = OutputStreamScreen.getInstance();
        this.in = InputStream.getInstance();

        // keyboard control
        this.keyboardController = KeyboardController.getInstance();
       
        // when window resize
        window.addEventListener('resize', () => this.refresh);

        // elements
        this.functionKey = createHTMLElement('div','',{'class': 'function-key'});
        this.footer = createHTMLElement('div','',{'class': 'footer'});
        this.app = document.querySelector('#site-app');

        // init setup
        this.#createInputPrompt();
        this.#createFooter();
        this.#createFunctionKeys();
        this.#connectOutputInputStream();

        // construct

        this.app.insertBefore(this.footer, this.app.querySelector('.terminal-container').nextSibling);
        this.app.insertBefore(this.functionKey, this.app.querySelector('.terminal-container').nextSibling);

        // state
        this.keyboardIsOpen = false;

        // timeinterval
        this.displayDelayTimeout = null;
        this.currentKeyboardElement = null;
        
    }

    static getInstance() {
        if (DisplayController._instance) {
            return DisplayController._instance;
        }

        return new DisplayController();
    }

    toggleKeyboard() {
        if (this.keyboardIsOpen) {
            this.app.removeChild(this.currentKeyboardElement);
            this.keyboardIsOpen = false;
        } else {
            clearTimeout(this.displayDelayTimeout);
            this.keyboardController.lockKeyEvent();

            const keyboardElement = this.keyboardController.getKeyboardElement()
            this.app.insertBefore(keyboardElement, this.app.querySelector('.terminal-container').nextSibling);
            this.currentKeyboardElement = keyboardElement;
            this.keyboardIsOpen = true;
            
            this.displayDelayTimeout = setTimeout(() => {
                this.keyboardController.unlockKeyEvent();            
            }, 250);
        }
    }

    refresh() {
        // hot fix
        const terminalContainer = document.querySelector('#site-app .terminal-container');
        terminalContainer.scrollTop = this.#inputPromptEl.offsetTop;
        // this.#inputPromptEl.scrollIntoView(true);
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
        const functionKeyContainer = createHTMLElement('div','',{'class': 'function-key-container'});

        const keys = [
            {
                'type': 'keyboard',
                'text': 'keyboard',
                'func': () => {
                    ProgramCore.getInstance().execute('keyboard');
                },
            },
            {
                'type': 'clean',
                'text': 'clear',
                'func': () => {
                    ProgramCore.getInstance().execute('clear');
                },
            },
            {
                'type': 'help',
                'text': 'help',
                'func': () => {
                    ProgramCore.getInstance().execute('help');
                },
            },
            {
                'type': 'home',
                'text': 'home',
                'func': () => {
                    ProgramCore.getInstance().execute('home');
                },
            },
            {
                'type': 'info',
                'text': 'about',
                'func': () => {
                    ProgramCore.getInstance().execute('about');
                },
            },
            {
                'type': 'projects',
                'text': 'projects',
                'func': () => {
                    ProgramCore.getInstance().execute('projects');
                },
            },
        ];

        keys.forEach((key) => {
            const el = createHTMLElement('div', '', {'class': 'key'});
            const elIcon = createHTMLElement('div', icon[key.type]('#cacfcc', '20px'), {'class': 'icon'});
            const elText = createHTMLElement('text', key.text, {'class': 'text'});
            const elTextContainer = createHTMLElement('div', '', {'class': 'text-container'});
            
            el.onclick = key.func;

            elTextContainer.appendChild(elText);
            el.appendChild(elIcon);
            el.appendChild(elTextContainer);

            functionKeyContainer.appendChild(el);

        });

        this.functionKey.appendChild(functionKeyContainer);
    }

    #createFooter() {
        const footerTextContainer = createHTMLElement('div', '', {'class': 'text-container'});
        const footerInfoText = createHTMLElement('p', "© 2022 Gengyuan Huang", {class: "info"});
        
        footerTextContainer.appendChild(footerInfoText);
        this.footer.appendChild(footerTextContainer);
    }

    #createInputPrompt() {
        let userInputStr = "";
        const terminal_container = document.querySelector("#site-app .terminal-container");
        this.#inputPromptEl = createHTMLElement('p', '', {'class': 'terminal-input'});
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

        this.#inputPromptEl.addEventListener('touchend', (e) => {
            ProgramCore.getInstance().execute('keyboard');
        });

        // subscribe to input update
        updatePrompt();
        this.in.subscribe(updatePrompt);

        // add cursor to display
        terminal_container.append(this.#inputPromptEl);
    }
}
