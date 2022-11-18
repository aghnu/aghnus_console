
import { OutputStreamJob, InputStream, OutputStreamScreen } from "./ioStream";
import { createHTMLElement } from "./utilities";
import projectsData from "../data/projects.json";
import sitemapData from "../data/sitemap.json";
import sysConfig from "../data/config.json";
import portfolioData from "../data/portfolio.json";
import skillsData from "../data/skills.json";
import { KeyboardController } from "./keyboardController";
import { DisplayController } from "./displayController";

interface ProgramExeParam {
    'outStream'?: OutputStreamScreen,
    [name: string]: string | number | (() => void) | OutputStreamScreen
}


const SYSTEM_VERSION = sysConfig.updated;

const program_lock: {
    pid: string,
    locked: boolean,
    message: string,
    input_func: (cmd: string, param: ProgramExeParam) => void,
} = {
    pid: "",      
    locked: false,
    message: "",  
    input_func: null
};

const program_state: {
    pidCounter: number,
    cleaningFuncs: (()=>void)[]
} = {
    pidCounter: 0,
    cleaningFuncs: [],
}

const PROGRAM_META = [
    
    {name: 'help',      func: helpExe,          desc: 'list all the commands that aghnu.me currently supports',     star: true},
    {name: 'skills',    func: skillsExe,        desc: 'list my technical skills',                                   star: true},
    {name: 'portfolio', func: portfolioExe,     desc: 'print the portfolios',                                       star: true},
    {name: 'projects',  func: projectsExe,      desc: 'list all the projects that I worked on',                     star: true},
    {name: 'contact',   func: contactExe,       desc: 'list my contact information',                                star: true},
    
    {name: 'map',       func: mapExe,           desc: 'display site map'},
    
    {name: 'semantic',  func: semanticExe,      desc: 'display the semantic/no-script version of aghnu.me'},
    {name: 'home',      func: homeExe,          desc: 'display home page'},
    {name: 'clear',     func: clearExe,         desc: 'clear the terminal screen'},
    {name: 'keyboard',  func: keyboardExe,      desc: 'open/close the virtual keyboard'},
 
    {name: 'about',     func: aboutExe,         desc: 'list info about this website/project'},
    {name: 'resume',    func: resumeExe,        desc: 'print the link to my current resume'},
    {name: 'where',    func: whereExe,          desc: 'print the place where I live and my current time'},

]

const PROGRAM_HIDDEN = [
    {name: 'exit',      func: semanticExe},
    {name: 'skill',     func: skillsExe},
    {name: 'close',     func: semanticExe},
    {name: 'cmd',       func: helpExe},
    {name: 'man',       func: helpExe},
    {name: 'unlock',    func: unlockExe},
    {name: 'ls',        func: mapExe},
    {name: 'list',      func: mapExe},
    {name: 'uname',     func: systemExe},
    {name: 'cl',        func: clearExe},
    {name: 'welcome',   func: homeExe},
    {name: 'project',   func: projectsExe}
]

// const PROGRAM_ASYNC = [
//     'keyboard', 'unlock'
// ];

function addClearningFunc(func: () => void) {
    program_state.cleaningFuncs.push(func);
}

function clearClearningFunc() {
    for (let i = 0; i < program_state.cleaningFuncs.length; i++) {
        program_state.cleaningFuncs[i]();
    }
    program_state.cleaningFuncs = [];
}

function lockSystem(pid: string, message: string = "", input_func: (() => void) = null) {
    // just a simulation, since single thread it is safe
    if (program_lock.pid === "") {
        program_lock.pid = pid;
        program_lock.locked = true;
        program_lock.message = message;
        program_lock.input_func = input_func;
        return true;
    } else {
        return false;
    }
}

function updateLock(pid: string, message: string = "", input_func: ((cmd: string, param: ProgramExeParam) => void) = null) {
    if (program_lock.pid === pid) {
        program_lock.message = message;
        program_lock.input_func = input_func;
        return true;
    } else {
        return false;
    }
}

function unlockSystem(pid: string) {
    // start
    if (pid === pid) {
        program_lock.pid = "";
    // end
        program_lock.locked = false;
        program_lock.message = "";
        program_lock.input_func = null;
        return true;   
    } else {
        return false;
    }
}

function genProcessID(): string {
    return String(program_state.pidCounter++);
}

function unlockExe(callback: (() => void) = null) {
    unlockSystem(program_lock.pid);
    if (callback !== null) {
        callback();
    }
}

function createDateStringElement(elClass: string, timeZone: string = 'default') {
    // init element
    const dateString: HTMLParagraphElement = createHTMLElement('p', '', {class: 'terminal-date' + ' ' + elClass}) as HTMLParagraphElement;

    // update functions
    const updateTimeString = (el: HTMLParagraphElement) => {
        const date = new Date();
        const setting = (timeZone === 'default') ? {} : {timeZone: timeZone};
        el.innerHTML = date.toLocaleDateString('en-CA', setting) + "&nbsp" + date.toLocaleTimeString('en-CA', setting);                    
    }

    // set up time update
    updateTimeString(dateString);
    const interval = setInterval(() => {
        updateTimeString(dateString);
    }, 1000);

    // clear function
    addClearningFunc(()=>{
        clearInterval(interval);
    });

    // return element
    return dateString;
}

function semanticExe(param: ProgramExeParam, callback: () => void = null) {
    const pid = genProcessID();
    lockSystem(pid, '<span class="highlight">[System is Currently Occupied]</span>');
    
    const answer_yes = createHTMLElement('span', 'YES', {class: 'focus clickable'}); 
    const answer_no = createHTMLElement('span', 'NO', {class: 'focus clickable'});
    const custom_el_clickSelect = () => {
        const container = createHTMLElement('p', 'or click: ');
        
        const gap = createHTMLElement('span', '&nbsp');
        
        container.appendChild(answer_yes);
        container.appendChild(gap);
        container.appendChild(answer_no);

        answer_yes.style.cursor = 'pointer';
        answer_no.style.cursor = 'pointer';

        answer_yes.onclick =  ()=> {
            ProgramCore.getInstance().execute('y');
        };

        answer_no.onclick = () => {
            ProgramCore.getInstance().execute('n');                      
        };

        return container;
    };

    param.outStream.print({type: "list", parameters: {
        list: [
            {type: "text", parameters: {text: "Go to a text-based version of aghnu.me with reduced functionility and condensed information."}},
            {type: "line", parameters: {height: 1}},
            {type: "text", parameters: {text: "Do you wish to continue? Type (y/N)"}},
            {type: "custom", parameters: {element: custom_el_clickSelect()}},
        ]
    }});

    updateLock(pid, 'System is Currently Occupied', (cmd, param) => {
        if (cmd === 'y' || cmd === 'Y' || cmd === 'yes') {
            unlockSystem(pid);
            param.outStream.print({type: "line", parameters: {height: 1}});

            answer_yes.onclick = null;
            answer_no.onclick = null;

            window.location.href = '?options=simple';

        } else if (cmd === 'n' || cmd === 'N' || cmd === 'no' || cmd === ''){
            unlockSystem(pid);
            param.outStream.print({type: "line", parameters: {height: 1}});
            answer_yes.onclick = null;
            answer_no.onclick = null;
        } else {
            param.outStream.print({type: "text", parameters: {text: '<span class="highlight">[Pick your options to continue]</span>'}});
        }
    });

    if (callback !== null) {
        callback();
    }
}

function skillsExe(param: ProgramExeParam, callback: (() => void) = null) {

    const skillsPrintJobs: OutputStreamJob[] = [];
    for (let i= 0; i < skillsData.skills.length; i++) {
        const d = skillsData.skills[i];
        skillsPrintJobs.push({type: "skills", parameters: {name: d.name, skills: d.skills}});
        skillsPrintJobs.push({type: "line", parameters: {height: 1}});
    }


    param.outStream.print({type: 'list', parameters: {
        list: [
            ...skillsPrintJobs
        ],
        callback: callback
    }});
}

function portfolioExe(param: ProgramExeParam, callback: (() => void) = null) {

    const portfolioProjectsPrintJobs: OutputStreamJob[] = [];
    for (let i= 0; i < portfolioData.projects.length; i++) {
        portfolioProjectsPrintJobs.push({type: "portfolio", parameters: portfolioData.projects[i]});
        portfolioProjectsPrintJobs.push({type: "line", parameters: {height: 1}});
    }

    param.outStream.print({type: 'list', parameters: {
        list: [
            ...portfolioProjectsPrintJobs
        ],
        callback: callback
    }});
}

function systemExe(param: ProgramExeParam, callback: (() => void) = null) {
    param.outStream.print({type: 'list', parameters: {
        callback: callback,
        list: [
            {type: "title", parameters: {text: "Aghnu's Console"}},
            {type: "text", parameters: {text: "Gengyuan Huang's Homepage", class: 'highlight'}},
            {type: "line", parameters: {height: 1}},
        ],
    }});
}

function mapExe(param: ProgramExeParam, callback: (() => void) = null) {

    const sitemapPrintJobs: OutputStreamJob[] = (():OutputStreamJob[] => {
        const list: OutputStreamJob[] = [];
        for (let i = 0; i < sitemapData.paths.length; i++) {
            const path = sitemapData.paths[i];
            list.push({type: "text", parameters: {
                text: `- <a target='_blank' class='clickable focus' href='${path.path}' >${sitemapData.origin + path.path}</a>`
            }});
        }

        return list;
    })();

    param.outStream.print({type: "list", parameters: {
        callback: callback,
        list: [
            {type: "text", parameters: {text: "Sitemap of aghnu.me: "}},
            {type: "line", parameters: {height: 1}},

            ...sitemapPrintJobs,

            {type: "line", parameters: {height: 1}},

        ],
        
    }});
}

function resumeExe(param: ProgramExeParam, callback: (() => void) = null) {
    param.outStream.print({type: "list", parameters: {
        list: [
            {type: "text", parameters: {text: "Current Resume: "}},
            {type: "line", parameters: {height: 1}},
            {type: "link", parameters: {link: "/static/doc/resume.pdf", name: "Resume", text: "resume_gengyuan.pdf", type: "link"}},
            {type: "line", parameters: {height: 1}},
        ],  
    }});
}

function homeExe(param: ProgramExeParam, callback: (() => void) = null) {
    // print to out
    const pid = genProcessID();
    lockSystem(pid, '<span class="highlight">[System is Currently Occupied]</span>');

    let printPause = false;

    param.outStream.print({type: "list", parameters: {
        checkpause: () => printPause,
        list: [
            {type: "line", parameters: {height: 1}},
            {type: "separator", parameters: {height: 1}},
            
            {type: "text", parameters: {text: `Hello stranger! Welcome to my homepage. My name is <span class='highlight'>Gengyuan Huang</span>, a software developer...`}},
            {type: "line", parameters: {height: 1}},
            {type: "link", parameters: {link: "/static/doc/resume.pdf", name: "Resume", text: "resume_gengyuan.pdf", type: "link"}},
            {type: "line", parameters: {height: 1}},

            {type: "separator", parameters: {height: 1}},
            {type: "text", parameters: {text: "To navigate the site, you can either type commands into the console or click on the highlighted elements. Here are some useful commands:"}},
            ...(()=>{
                const list: OutputStreamJob[] = [];
                PROGRAM_META.forEach(p => {
                    if (p.star) {
                        list.push({type: "line", parameters: {height: 1}});
                        list.push({type: "CMDDesc", parameters: {name: p.name, desc: p.desc, func: () => {
                            ProgramCore.getInstance().execute(p.name);
                        }}});
                        
                    }
                })
                return list;              
            })(),
            {type: "line", parameters: {height: 1}},
            {type: "separator", parameters: {height: 1}},
            
        ],
        callback: () => {
            setTimeout(() => {
                unlockSystem(pid);                           
            }, 100);
        },
        
    }});
}

function aboutExe(param: ProgramExeParam, callback: (() => void) = null) {

    let printPause = false;
    param.outStream.print({type: "list", parameters: {
        checkpause: () => printPause,
        list: [
            {type: "lambda", parameters: {func: ()=>{
                printPause = true;
                systemExe(param, () => printPause = false);         
            }}},
            {type: "separator", parameters: {height: 1}},

            {type: "lambda", parameters: {func: ()=>{
                printPause = true;
                mapExe(param, () => {printPause = false});
            }}},

            {type: "text", parameters: {text: "To know more about this website: "}},
            {type: "line", parameters: {height: 1}},
            {type: "text", parameters: {text: "- <a target='_blank' class='clickable focus' href='https://github.com/aghnu/aghnu.me' >https://github.com/aghnu/aghnu.me</a>"}},
            {type: "text", parameters: {text: "- <a target='_blank' class='clickable focus' href='https://github.com/aghnu/aghnus_console' >https://github.com/aghnu/aghnus_console</a>"}},
            {type: "line", parameters: {height: 1}},
            {type: "text", parameters: {text: "Designed & Built by Gengyuan Huang"}},
            {type: "line", parameters: {height: 1}},
            {type: "separator", parameters: {height: 1}},
            {type: "text", parameters: {text: '<span class="highlight">Website last updated on ' + SYSTEM_VERSION}},
            {type: "line", parameters: {height: 1}},

        ],
        
    }});
    if (callback !== null) {
        callback();
    }
}

function helpExe(param: ProgramExeParam, callback: (() => void) = null) {

    const cmdPJList: OutputStreamJob[] = [];

    PROGRAM_META.forEach(p => {
        cmdPJList.push({type: "CMDDesc", parameters: {name: p.name, desc: p.desc, func: () => {
            ProgramCore.getInstance().execute(p.name);
        }}});
        cmdPJList.push({type: "line", parameters: {height: 1}});
    });    

    param.outStream.print({type: "list", parameters: {
        list: [
            {type: "text", parameters: {text: "To navigate the site, you can either type commands into the console or click on the highlighted elements."}},
            {type: "line", parameters: {height: 1}},
            ...cmdPJList
        ],
        
    }});
    if (callback !== null) {
        callback();
    }
}

function clearExe(param: ProgramExeParam, callback: (() => void) = null) {
    param.outStream.clear();
    clearClearningFunc();
    param.outStream.print({type: "list", parameters: {
        list: [
            {type: "text", parameters: {text: "To navigate the site, you can either type commands into the console or click on the highlighted elements."}},
            {type: "line", parameters: {height: 1}},
        ],
        
    }});

    if (callback !== null) {
        callback();
    }
}

function whereExe(param: ProgramExeParam, callback: (() => void) = null) {
    let printPause = false;
    param.outStream.print({type: "list", parameters: {
        checkpause: () => printPause,
        list: [
            {type: "pair", parameters: {pair: [
                createHTMLElement('p', "Location", {class: "highlight"}),
                createHTMLElement('p', sysConfig.location, {class: "focus"}),
            ]}},
            {type: "pair", parameters: {pair: [
                createHTMLElement('p', "Time", {class: "highlight"}),
                createDateStringElement('focus', sysConfig.timezone),
            ]}},
            {type: "line", parameters: {height: 1}},
        ],
        callback: () => {
            if (callback !== null) {
                callback();
            }
        },
        
    }});
}

function contactExe(param: ProgramExeParam, callback: (() => void) = null) {

    let printPause = false;
    param.outStream.print({type: "list", parameters: {
        checkpause: () => printPause,
        list: [
            {type: "text", parameters: {text: "To contact me:"}},

            {type: "line", parameters: {height: 1}},
            {type: "lambda", parameters: {func: ()=>{
                printPause = true;
                whereExe(param, () => {printPause = false});
            }}},

            {type: "link", parameters: {link: "mailto:gengyuan@ualberta.ca", name: "Email", text: "gengyuan@ualberta.ca", type: "email"}},
            {type: "link", parameters: {link: "https://github.com/aghnu", name: "Github", text: "aghnu", type: "github"}},
            {type: "link", parameters: {link: "https://www.linkedin.com/in/gengyuanh", name: "LinkedIn", text: "Gengyuan Huang", type: "linkedin"}},
            {type: "link", parameters: {link: "https://www.aghnu.me", name: "Website", text: "aghnu.me", type: "link"}},
            {type: "line", parameters: {height: 1}},

        ],
        callback: () => {
            if (callback !== null) {
                callback();
            }
        },
        
    }});
}

function keyboardExe(param: ProgramExeParam, callback: (() => void) = null) {

    DisplayController.getInstance().toggleKeyboard();

    param.outStream.broadCast();
    if (callback !== null) {
        callback();
    }
}

function projectsExe(param: ProgramExeParam, callback: (() => void) = null) {
    // get past projects
    const pastProjects = (()=>{
        const outList = [];
        
        for (let i = 0; i < projectsData.past.length; i++) {
            const project = projectsData.past[i];
            
            outList.push({type: "project", parameters: {
                name: project.title,
                tags: project.tags,
                desc: project.desc,
                links: project.links,
            }});
            outList.push({type: "line", parameters: {height: 1}});

        }

        return outList.reverse();
    })();

    // get recent projects
    const recentProjects = (()=>{
        const outList = [];
        
        for (let i = 0; i < projectsData.recent.length; i++) {
            const project = projectsData.recent[i];
            
            outList.push({type: "project", parameters: {
                name: project.title,
                tags: project.tags,
                desc: project.desc,
                links: project.links,
            }});
            outList.push({type: "line", parameters: {height: 1}});

        }

        return outList.reverse();
    })();

    param.outStream.print({type: "list", parameters: {
        list: [
            {type: "text", parameters: {text: "Past Projects:"}},
            ...pastProjects,

            {type: "text", parameters: {text: "Recent Projects:"}},
            ...recentProjects,

            {type: "line", parameters: {height: 1}}
        ],
        
    }});

    if (callback !== null) {
        callback();
    }
}

export class ProgramCore {
    static _instance: ProgramCore;

    private path: {
        [name: string]: {'exe': Function}
    };

    private outStream: OutputStreamScreen;


    constructor() {
        if (ProgramCore._instance) {
            return ProgramCore._instance;
        }

        ProgramCore._instance = this;

        this.path;

        // init
        this.updatePath();
        this.outStream = OutputStreamScreen.getInstance();
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
            this.path[exe.name].exe = exe.func;
        });
        PROGRAM_HIDDEN.forEach(exe => {
            this.path[exe.name].exe = exe.func;
        })
    }

    execute(inputCMD: string, param: ProgramExeParam = {}) {
        const cmdList = inputCMD.split(' ').filter((c) => c !== '');
        const cmd = (cmdList.length === 0) ? '' : cmdList[0];
        param.outStream = this.outStream;



        if (!program_lock.locked) {
            if (cmd === "") {
                param.outStream.print({type: 'line', parameters: {'height': 1}});
            } else {
                this.outStream.newOutSection();
                if (inputCMD !== "") {
                    this.outStream.print({type: 'text', parameters: {'text': "<span class='wrap'>>&nbsp</span>" + "<span class='wrap'>" + inputCMD.split(' ').join('&nbsp') + "</span>"}}); 
                }
                if (this.path[cmd] === undefined) {
                    param.outStream.print({type: 'text', parameters: {'text': "<span class='highlight'>[Command Not Found]</span>"}});
                } else {
                    param.outStream.print({type: 'text', parameters: {'text': `<span class='highlight'>[${cmd}]</span>`}});
                    this.path[cmd].exe(param);
                }                       
            }
     
        } else {
            if (program_lock.input_func === null) {
                param.outStream.print({type: 'text', parameters: {'text': program_lock.message}});
            } else {
                program_lock.input_func(cmd, param);
            }
        }
    }
};


