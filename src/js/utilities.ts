
interface CreateHTMLELementAttributes {
    [attribute: string]: string;
}

export function createHTMLElement(
    tag: string, 
    innerHTML: string = "", 
    attributes: CreateHTMLELementAttributes = {}
) {
    const el: HTMLElement = document.createElement(tag);
    el.innerHTML = innerHTML;
    for (let att in attributes) {
        el.setAttribute(att, attributes[att]);
    }
    return el;
}

export function setRandInterval (
    func: () => boolean,
    min: number, 
    max: number
): {
    clear: () => void
} {
    let currentTimeout: number;

    const runTimeout = () => {
        currentTimeout = window.setTimeout(() => {
            if (func()) {
                runTimeout();
            }
        }, Math.floor(Math.random() * (max - min + 1)) + min);
    }

    runTimeout();

    return {
        clear: () => {
            clearTimeout(currentTimeout);
        }
    }
}