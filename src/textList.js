import { PrintJob } from "./utilities";

// utility funcs
function PJ(type, param={}) {
    return new PrintJob(type, param);
}

// text lists
export const welcomePrintingJobTextList = [
    PJ("text", {text: "Hello stranger!<br>Welcome... Welcome..."}),
    PJ("text", {text: "Name is Gengyuan Huang<br>A programmer..."}),
    PJ("line", {height: 2}),

    PJ("text", {text: "I have recently graduated from the University of Alberta with a CS degree...<br>I have rent to pay, and a mouth to feed (my mouth)..."}),
    PJ("line", {height: 2}),

    PJ("text", {text: "if you wish to know more about me, my life or my cat...<br>or my social insurance number<br>please type /help"}),
    PJ("line", {height: 2}),

    PJ("text", {text: "To contact me:"}),
    PJ("link", {link: "mailto:gengyuan@ualberta.ca", text: "gengyuan@ualberta.ca", type: "email"}),
    PJ("line", {height: 1}),
]

