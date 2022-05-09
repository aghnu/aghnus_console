
import { OutputStreamJob as Job } from "./ioStream";

const PROGRAM_META = [
    {
        name:'/welcome',
        func: welcomeExe,
    },

    {
        name:'/help',
        func: helpExe,
    },

    {
        name:'/clear',
        func: clearExe,
    },

    {
        name:'/contact',
        func: contactExe,
    },

    {
        name:'/keyboard',
        func: keyboardExe,
    },

    {
        name:'/projects',
        func: projectsExe,
    },
]

export function welcomeExe(param) {
    // print to out
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "Hello stranger!<br>Welcome... Welcome...<br>Name is Gengyuan Huang<br>A programmer..."}),
            new Job("line", {height: 1}),
        
            new Job("text", {text: "I have recently graduated from the University of Alberta with a CS degree...<br>I have rent to pay, and a mouth to feed (my mouth)..."}),
            new Job("line", {height: 1}),
        
            new Job("text", {text: "If you wish to know more about me, my life or my cat...<br>or my social insurance number<br>please type /help"}),
            new Job("line", {height: 1}),
    
        ],
        min_interval: 600, max_interval: 1200,
    }));
}

export function helpExe() {

}

export function clearExe(param) {
    param.outStream.clear();
}

export function contactExe() {

}

export function keyboardExe() {
    const keyboard = document.querySelector('#virtual-keyboard');
    if (keyboard) {
        keyboard.classList.toggle('on');
    }
}


export function projectsExe() {

}

export class ProgramCore {
    constructor() {
        if (ProgramCore._instance) {
            return ProgramCore._instance;
        }

        ProgramCore._instance = this;

        this.path;

        // init
        this.updatePath();
    }

    static getInstance() {
        if (ProgramCore._instance) {
            return ProgramCore._instance;
        }

        return new ProgramCore();
    }

    updatePath() {
        this.path = {};
        PROGRAM_META.forEach(exe => {
            this.path[exe.name] = {'exe': exe.func};
        });
    }

    execute(cmd, param) {
        console.log(this.path);
        this.path[cmd].exe(param);
    }
};


