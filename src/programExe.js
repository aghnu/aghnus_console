
import { OutputStreamJob as Job, OutputStreamJob } from "./ioStream";

const PROGRAM_META = [
    {
        name:'welcome',
        func: welcomeExe,
        desc: 'welcome message',

    },

    {
        name:'help',
        func: helpExe,
        desc: 'list all the commands that aghnu.me currently supports',

    },

    {
        name:'clear',
        func: clearExe,
        desc: 'clear the terminal screen',

    },

    {
        name:'contact',
        func: contactExe,
        desc: 'list my contact information',

    },

    {
        name:'keyboard',
        func: keyboardExe,
        desc: 'open/close the virtual keyboard',

    },

    {
        name:'projects',
        func: projectsExe,
        desc: 'list all the projects that I worked on',

    },

    {
        name:'about',
        func: aboutExe,
        desc: 'more about this website/project',
    },
]

export function welcomeExe(param) {
    // print to out
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "Hello stranger! Welcome~ Welcome~ :)<br>Name is Gengyuan Huang<br>A programmer..."}),
            new Job("line", {height: 1}),

            new Job("text", {text: "I have recently graduated from the University of Alberta with a CS degree...<br>I have rent to pay, and a mouth to feed (my mouth)... -> I am open to work!"}),
            new Job("line", {height: 1}),

            new Job("text", {text: 'If you wish to know more about me, my life or my cat...<br>or my social insurance number<br>please type or click -> "help"'}),
            new Job("line", {height: 1}),

            new Job("text", {text: "This is my personal website. It is a fun project designed and programmed by me, using pure JavaScript"}),
            new Job("text", {text: 'If you want to learn more about this project<br>please type or click -> "about"'}),
            new Job("line", {height: 1}),

            new Job("text", {text: 'If you wish to contact me<br>please type or click -> "contact"'}),
            new Job("line", {height: 1}),

        ],
        min_interval: 0, max_interval: 150,
    }));
}

export function aboutExe(param) {
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "Under Construction :)"}),
            new Job("line", {height: 1}),

        ],
        min_interval: 0, max_interval: 0,
    }));
}

export function helpExe(param) {
    param.outStream.print(new Job("list", {
        list: (()=>{
            const list = [];
            list.push(new Job("text", {text: "Commands:"}));
            list.push(new Job("line", {height: 1}));

            PROGRAM_META.forEach(p => {
                list.push(new Job("CMDDesc", {name: p.name, desc: p.desc, func: () => p.func(param)}));         
            });

            list.push(new Job("line", {height: 1}));
            return list;
        })(),
        min_interval: 0, max_interval: 0,
    }));
}

export function clearExe(param) {
    param.outStream.clear();
}

export function contactExe(param) {
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "To contact me:"}),
            new Job("line", {height: 1}),
            new Job("link", {link: "mailto:gengyuan@ualberta.ca", name: "Email", text: "gengyuan@ualberta.ca", type: "email"}),
            new Job("link", {link: "mailto:scotthuang007@outlook.com", name: "Email", text: "scotthuang007@outlook.com", type: "email"}),
            new Job("link", {link: "https://github.com/aghnu", name: "Github", text: "aghnu", type: "github"}),
            new Job("link", {link: "https://www.linkedin.com/in/gengyuan-huang", name: "LinkedIn", text: "Gengyuan Huang", type: "linkedin"}),
            new Job("link", {link: "https://www.aghnu.me", name: "Website", text: "aghnu.me", type: "link"}),
            new Job("line", {height: 1}),
        ],
        min_interval: 0, max_interval: 0,
    }));
}

export function keyboardExe(param) {
    const keyboard = document.querySelector('#virtual-keyboard');
    if (keyboard) {
        keyboard.classList.toggle('on');
    }

    param.outStream.broadCast();
}


export function projectsExe(param) {
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "Past Projects:"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "Yonder", desc: "Yonder is a distributed social network using RESTful API. (UAlberta CMPUT404 class project)", link: "https://github.com/aghnu/yonder"}),
            new Job("project", {name: "MoodSwing", desc: "MoodSwing is a Java-based android app designed to record and archive user’s mood in relation to geo location and time. Users can follow each other on MoodSwing and view their friend's mood records. (UAlberta CMPUT301 class project)", link: "https://github.com/aghnu/MoodSwing"}),
            new Job("project", {name: "A python implementation of Hollow Heap", desc: "hollow_heap.py is a python implementation of Hollow Heap base on Thomas Dueholm Hansen, Haim Kaplan, Robert E. Tarjan, Uri Zwick 's paper https://arxiv.org/abs/1510.06535. (UAlberta CMPUT403 class project)", link: "https://github.com/aghnu/Hollow_Heap"}),
            new Job("project", {name: "XiaoHongShu Userscript", desc: "a tampermonkey userscript to export xiaohongshu.com search query result to speadsheet ", link: "https://github.com/aghnu/xiaohongshu_search_export_userscript"}),
            new Job("project", {name: "Interactive Moodle Plugin", desc: "This plugin is a Moodle Activity Module that is developed for Delphi technology as part of their future online learning platform for aviators. (UAlberta CMPUT401 class project)", link: "https://github.com/aghnu/Interactive-Moodle-Plugin-Showcase"}),
            new Job("line", {height: 1}),

            new Job("text", {text: "Current Projects:"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "Jia's Lab", desc: "Dr. Huijue Jia's personal website.", link: "https://jiaslab-org.github.io/"}),
            new Job("project", {name: "Stranding Air", desc: "A website for a group of passionate people who are interested in exploring the boundary of visual design, art, media, and technology.", link: "https://www.strandingair.com"}),            
            new Job("project", {name: "Aghnu's Console", desc: "A personal project that shows my frustration and my passion for Human-Computer Interaction. Oh... It also serves as my personal website.", link: "https://github.com/aghnu/aghnu.github.io"}),
            new Job("project", {name: "WNFA", desc: "WNFA (Words Never Fall Apart) is an interactive art project that uses grid method and machine learning to generate art from handwritten poems.", link: "https://github.com/aghnu/WNFA"}),

            new Job("line", {height: 1}),
        ],
        min_interval: 0, max_interval: 0,
    }));
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
        param.outStream.print(new OutputStreamJob('text', {'text': ">&nbsp" + cmd}));
        if (this.path[cmd] === undefined) {
            param.outStream.print(new OutputStreamJob('text', {'text': "Command Not Found"}));
        } else {
            this.path[cmd].exe(param);
        }
    }
};


