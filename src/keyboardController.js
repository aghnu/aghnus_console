import { ProgramCore } from "./programExe";
import { createHTMLElement } from "./utilities";
import { OutputStreamJob } from "./ioStream";

export class KeyboardController {
    constructor(inputStream, outputStream) {
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

        this.specialKeyHandlers = {};
        this.inputStream = inputStream;
        this.outputStream = outputStream;

        // init
        this.#setUpSpecialKey();
        this.#setupKeyListeners();
        this.#createVirtualKeyboard();
    }

    #setupKeyListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            this.pressKey(key, () => {e.preventDefault()});
        });
    }

    #createVirtualKeyboard() {

        const keyboardKeyMap = [
            ['1','2','3','4','5','6','7','8','9','0',],
            ['q','w','e','r','t','y','u','i','o','p'],
            ['a','s','d','f','g','h','j','k','l',],
            ['z','x','c','v','b','n','m','/'],
            [' ', 'Enter','Backspace'],
        ]

        const keyboardTextMap = [
            ['1','2','3','4','5','6','7','8','9','0',],
            ['q','w','e','r','t','y','u','i','o','p'],
            ['a','s','d','f','g','h','j','k','l',],
            ['z','x','c','v','b','n','m','/'],
            ['Space', 'Enter', 'Back'],
        ]

        const keyboard_container = document.querySelector('#virtual-keyboard');

        for (let r = 0; r < keyboardTextMap.length; r++) {
            const keyboard_key_row = createHTMLElement('div', '', {'class': 'row'});
            for (let i = 0; i < keyboardTextMap[r].length; i++) {
                const text = keyboardTextMap[r][i];
                const key = keyboardKeyMap[r][i];

                const keyboard_key = createHTMLElement('button', text, {'class': 'key noselect', 'id': "virtual-key-" + text});
                
                let keyPressed = false;
                let continueTypingCheckingTimeout = null;
                let continueTypingInterval = null;


                const keyDownFunc = () => {
                    if (continueTypingCheckingTimeout) {
                        clearTimeout(continueTypingCheckingTimeout);
                        continueTypingCheckingTimeout = null;
                    }

                    if (continueTypingInterval) {
                        clearInterval(continueTypingInterval);
                        continueTypingInterval = null;
                    }
                    

                    keyboard_key.classList.add('hold');
                    keyPressed = true;

                    continueTypingCheckingTimeout = setTimeout(() => {
                        if (keyPressed === true) {
                            continueTypingInterval = setInterval(() => {
                                this.pressKey(key);
                            }, 30);
                        }
                    }, 500);
                }

                const keyUpFunc = () => {  
                    
                    if (continueTypingCheckingTimeout) {
                        clearTimeout(continueTypingCheckingTimeout);
                        continueTypingCheckingTimeout = null;
                    }

                    if (continueTypingInterval) {
                        clearInterval(continueTypingInterval);
                        continueTypingInterval = null;
                    } else {
                        if (keyPressed) {
                            this.pressKey(key)
                        }
                    }
    
                    keyboard_key.classList.remove('hold');
                    keyPressed = false;
                    
                }

                // touch events
                keyboard_key.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    keyDownFunc();
                });

                keyboard_key.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    keyUpFunc();
                });

                keyboard_key.addEventListener('touchcancel', (e) => {
                    e.preventDefault();
                    keyUpFunc();
                });

                // click events
                keyboard_key.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    keyDownFunc();
                });

                keyboard_key.addEventListener('mouseup', (e) => {
                    e.preventDefault();
                    keyUpFunc();
                });

                //global up
                document.addEventListener('mouseup', (e) => {
                    keyUpFunc();
                });



                keyboard_key_row.appendChild(keyboard_key);
            }
            keyboard_container.append(keyboard_key_row);
        }      
    }

    #setUpSpecialKey() {
        this.addSpecialKey('Backspace', () => {
            this.inputStream.updateInput(this.inputStream.getInput().slice(0, -1));
        });

        this.addSpecialKey('Enter', () => {
            const programCore = ProgramCore.getInstance();
            const inputCMD = this.inputStream.getInput();
            this.inputStream.updateInput("");
            
            if (inputCMD === "") {
                this.outputStream.print(new OutputStreamJob('line', {'height': 1}));
            } else {
                programCore.execute(inputCMD , {outStream: this.outputStream});
            }
            
            
        });
    }

    keyIsAllowedShow(key) {
        return this.keyAllowedShowSet.has(key);
    }

    keyIsSpecial(key) {
        return this.specialKeyHandlers[key] !== undefined;
    }

    addSpecialKey(key, func) {
        this.specialKeyHandlers[key] = func;
    }

    updateInputWithKey(key) {
        this.inputStream.updateInput(this.inputStream.getInput() + key);
    }

    pressKey(key, callback=null) {
        let isValid = false;
        if (this.keyIsAllowedShow(key)) {
            this.updateInputWithKey(key);
            isValid = true;
        }

        if (this.keyIsSpecial(key)) {
            this.specialKeyHandlers[key]();
            isValid = true;
        }

        if (isValid && callback !== null) {
            callback();
        }
    }
}