import { ProgramCore } from "./programExe";
import { createHTMLElement } from "./utilities";
import { InputStream } from "./ioStream";

export class KeyboardController {
    static _instance: KeyboardController;

    private keyAllowedShowSet!: Set<string>;
    private specialKeyHandlers: {[keyName: string]: () => void} = {};
    private inputStream!: InputStream;

    // HTMLElements
    private site_app_virtual_keyboard!: HTMLElement;

    // state
    private externalKeyEvent: boolean = false;


    constructor() {

        if (KeyboardController._instance) {
            return KeyboardController._instance;
        }
        KeyboardController._instance = this;


        this.keyAllowedShowSet = new Set([
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
            "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
            "u", "v", "w", "x", "y", "z", 

            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", 
            "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", 
            "U", "V", "W", "X", "Y", "Z", 

            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
            
            "/", ' ',
        ]);

        this.inputStream = InputStream.getInstance();

        //elements
        this.site_app_virtual_keyboard = createHTMLElement('div','',{'class': 'virtual-keyboard'});

        // init
        this.setUpSpecialKey();
        this.setupKeyListeners();
        this.createVirtualKeyboard();

    }

    static getInstance() {
        if (KeyboardController._instance) {
            return KeyboardController._instance;
        }

        return new KeyboardController();
    }

    private setupKeyListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            this.pressKey(key, () => {e.preventDefault()});
        });
    }

    private setUpSpecialKey() {
        this.addSpecialKey('Backspace', () => {
            this.inputStream.updateInput(this.inputStream.getInput().slice(0, -1));
        });

        this.addSpecialKey('Enter', () => {
            const programCore = ProgramCore.getInstance();
            const inputCMD = this.inputStream.getInput();
            this.inputStream.updateInput("");

            programCore.execute(inputCMD);
        });
    }

    private createVirtualKeyboard() {

        const keyboardKeyMap = [
            ['1','2','3','4','5','6','7','8','9','0',],
            ['q','w','e','r','t','y','u','i','o','p'],
            ['a','s','d','f','g','h','j','k','l',],
            ['z','x','c','v','b','n','m','/'],
            [' ', 'Backspace','Enter'],
        ]

        const keyboardTextMap = [
            ['1','2','3','4','5','6','7','8','9','0',],
            ['q','w','e','r','t','y','u','i','o','p'],
            ['a','s','d','f','g','h','j','k','l',],
            ['z','x','c','v','b','n','m','/'],
            ['Space', 'Back', 'Enter'],
        ]

        const keyboard_container = createHTMLElement('div', '', {class: 'keyboard-container'})

        for (let r = 0; r < keyboardTextMap.length; r++) {
            const keyboard_key_row = createHTMLElement('div', '', {'class': 'row'});
            for (let i = 0; i < keyboardTextMap[r].length; i++) {
                const text = keyboardTextMap[r][i];
                const key = keyboardKeyMap[r][i];

                const keyboard_key = createHTMLElement('div', '<p class="label">' + text + '</p>', {'class': `key noselect virtual-key-${text}`});
                
                let keyPressed = false;
                let continueTypingCheckingTimeout: number;
                let continueTypingInterval: number;


                const keyDownFunc = () => {
                    clearTimeout(continueTypingCheckingTimeout);
                    clearInterval(continueTypingInterval);

                    keyboard_key.classList.add('hold');
                    keyPressed = true;

                    continueTypingCheckingTimeout = window.setTimeout(() => {
                        if (keyPressed === true) {
                            continueTypingInterval = window.setInterval(() => {
                                this.pressKey(key);
                            }, 30);
                        }
                    }, 500);
                }

                const keyUpFunc = () => {  
                    clearTimeout(continueTypingCheckingTimeout);
                    clearInterval(continueTypingInterval);
                    if (keyPressed) {
                        this.pressKey(key)
                    }
    
                    keyboard_key.classList.remove('hold');
                    keyPressed = false;
                    
                }

                // touch events
                let touchEvent = false;
                keyboard_key.addEventListener('touchstart', (e) => {
                    // e.preventDefault();
                    touchEvent = true;
                    if ((this.externalKeyEvent === false)) {
                        keyDownFunc();
                    }
                    
                });

                keyboard_key.addEventListener('touchend', (e) => {
                    // e.preventDefault();
                    touchEvent = true;

                    if ((this.externalKeyEvent === false)) {
                        keyUpFunc();
                    }
                    
                });

                keyboard_key.addEventListener('touchcancel', (e) => {
                    // e.preventDefault();
                    touchEvent = true;
                    if ((this.externalKeyEvent === false)) {
                        keyUpFunc();
                    }
                    
                });

                // click events
                keyboard_key.addEventListener('mousedown', (e) => {
                    if ((touchEvent === false) && (this.externalKeyEvent === false)) {
                        e.preventDefault();
                        keyDownFunc();                        
                    }
                });

                keyboard_key.addEventListener('mouseup', (e) => {
                    if ((touchEvent === false) && (this.externalKeyEvent === false)) {
                        e.preventDefault();
                        keyUpFunc();                        
                    }

                });

                //global up
                document.addEventListener('mouseup', (e) => {
                    if ((touchEvent === false) && (this.externalKeyEvent === false)) {
                        keyUpFunc();
                    } else {
                        touchEvent = false;
                    }
                });

                keyboard_key_row.appendChild(keyboard_key);
            }
            keyboard_container.append(keyboard_key_row);
        }     
        
        this.site_app_virtual_keyboard.appendChild(keyboard_container);
    }


    getKeyboardElement() {
        return this.site_app_virtual_keyboard;
    }

    lockKeyEvent() {
        this.externalKeyEvent = true;
    }

    unlockKeyEvent() {
        this.externalKeyEvent = false;
    }

    keyIsAllowedShow(key: string) {
        return this.keyAllowedShowSet.has(key);
    }

    keyIsSpecial(key: string) {
        return this.specialKeyHandlers[key] !== undefined;
    }

    addSpecialKey(key: string, func: () => void) {
        this.specialKeyHandlers[key] = func;
    }

    updateInputWithKey(key: string) {
        this.inputStream.updateInput(this.inputStream.getInput() + key);
    }

    pressKey(key: string, callback: () => void = () => {}) {
        let isValid = false;
        if (this.keyIsAllowedShow(key)) {
            this.updateInputWithKey(key);
            isValid = true;
        }

        if (this.keyIsSpecial(key)) {
            this.specialKeyHandlers[key]();
            isValid = true;
        }

        if (isValid) {
            callback();
        }
    }
}