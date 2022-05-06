class KeyboardMonitor {
    constructor() {
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

        // init
        this.#setupKeyListeners();
    }

    #setupKeyListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (this.keyIsAllowedShow(key)) {
                this.updateFunc(key);
                e.preventDefault();
            }

            if (this.keyIsSpecial(key)) {
                this.specialKeyHandlers[key]();
                e.preventDefault();
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

    setUpdateFunc(func) {
        this.updateFunc = func;
    }
}

export { KeyboardMonitor };