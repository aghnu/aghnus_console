import { createHTMLElement } from "./utilities";

class KeyboardMonitor {
    constructor() {
        if (KeyboardMonitor._instance) {
            throw "singleton is already initialized";
        }

        KeyboardMonitor._instance = this;

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
        this.updateFunc = () => {};
        this.virtualKeyboard;

        // init
        this.#setupKeyListeners();
    }

    static getInstance() {
        if (KeyboardMonitor._instance) {
            return KeyboardMonitor._instance;
        }

        throw "singletone was not initialized"
    }

    #setupKeyListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            this.pressKey(key, () => {e.preventDefault()});
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

    setUpdateFunc(func) {
        this.updateFunc = func;
    }

    pressKey(key, callback=null) {
        let isValid = false;
        if (this.keyIsAllowedShow(key)) {
            this.updateFunc(key);
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

export { KeyboardMonitor };