
import { OutputStreamJob as Job, InputStream, OutputStreamScreen } from "./ioStream";
import { createHTMLElement } from "./utilities";
import projectsData from "../data/projects.json";
import sitemapData from "../data/sitemap.json";
import sysConfig from "../data/config.json";

const SYSTEM_VERSION = sysConfig.sys_ver;
const TEXT_VERSION = sysConfig.txt_ver;

const program_lock = {
    'pid': "",      'locked': false,
    'message': "",  'input_func': null
};

const program_state = {
    cleaningFuncs: [],
}

const PROGRAM_META = [
    {name: 'map',       func: mapExe,           desc: 'display site map',                                           star: true},
    {name: 'help',      func: helpExe,          desc: 'list all the commands that aghnu.me currently supports',     star: true},

    {name: 'posts',     func: postsExe,         desc: 'print the posts'},
    {name: 'contact',   func: contactExe,       desc: 'list my contact information'},
    {name: 'simplify',  func: simplifyExe,      desc: 'display the simplified no-script version of aghnu.me'},
    {name: 'home',      func: homeExe,          desc: 'display home page'},
    {name: 'clear',     func: clearExe,         desc: 'clear the terminal screen'},
    {name: 'keyboard',  func: keyboardExe,      desc: 'open/close the virtual keyboard'},
    {name: 'projects',  func: projectsExe,      desc: 'list all the projects that I worked on'},
    {name: 'about',     func: aboutExe,         desc: 'more about this website/project'},
    {name: 'system',    func: systemExe,        desc: 'display system and text version'},
    {name: 'resume',    func: resumeExe,        desc: 'print the link to my current resume'},

]

const PROGRAM_HIDDEN = [
    {name: 'exit',      func: exitExe},
    {name: 'close',     func: exitExe},
    {name: 'cmd',       func: helpExe},
    {name: 'man',       func: helpExe},
    {name: 'unlock',    func: unlockExe},
    {name: 'ls',        func: mapExe},
    {name: 'list',      func: mapExe},
    {name: 'uname',     func: systemExe},
    {name: 'cl',        func: clearExe},
    {name: 'welcome',   func: homeExe}
]

const PROGRAM_ASYNC = [
    'keyboard', 'unlock'
];

function addClearningFunc(func) {
    program_state.cleaningFuncs.push(func);
}

function clearClearningFunc() {
    for (let i = 0; i < program_state.cleaningFuncs.length; i++) {
        program_state.cleaningFuncs[i]();
    }
    program_state.cleaningFuncs = [];
}

function lockSystem(pid, message="", input_func=null) {
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

function updateLock(pid, message="", input_func=null) {
    if (program_lock.pid === pid) {
        program_lock.message = message;
        program_lock.input_func = input_func;
        return true;
    } else {
        return false;
    }
}

function unlockSystem(pid) {
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

let pidCounter = 0;


function genProcessID() {
    return pidCounter++;
}

function unlockExe(callback=null) {
    unlockSystem(program_lock.pid);
    if (callback !== null) {
        callback();
    }
}

function exitExe(callback=null) {
    document.querySelector('#site-app').style.display = 'none';
    document.querySelector('#site-semantic').style.display = 'block';
    if (callback !== null) {
        callback();
    }
}

function simplifyExe(param, callback=null) {
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

    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "Go to a text-based version of aghnu.me with reduced functionility and condensed information."}),
            new Job("line", {height: 1}),
            new Job("text", {text: "Do you wish to continue? Type (y/N)"}),
            new Job("custom", {element: custom_el_clickSelect()}),
        ],
        min_interval: 0, max_interval: 0,
    }));

    updateLock(pid, 'System is Currently Occupied', (cmd, param) => {
        if (cmd === 'y' || cmd === 'Y') {
            unlockSystem(pid);
            param.outStream.print(new Job("line", {height: 1}));
            exitExe();

            answer_yes.onclick = null;
            answer_no.onclick = null;

            window.location = '?simple=true';

        } else if (cmd === 'n' || cmd === 'N' || cmd === ''){
            unlockSystem(pid);
            param.outStream.print(new Job("line", {height: 1}));
            answer_yes.onclick = null;
            answer_no.onclick = null;
        } else {
            param.outStream.print(new Job("text", {text: '<span class="highlight">[Pick your options to continue]</span>'}));
        }
    });

    if (callback !== null) {
        callback();
    }
}

function postsExe(param, callback=null) {
    param.outStream.print(new Job('list', {
        list: [
            new Job("text", {text: "Posts: "}),
            new Job("text", {text: "Check out this client side ASCII Art Generator I wrote using opencv.js: <a target='_blank' class='focus clickable' href='https://www.aghnu.me/tools/ascii_art_generator/' >Aghnu's ASCII Art Generator</a>"}),
            new Job("line", {height: 1}),
            new Job("text", {text: "3D Virtual Gallery that displays the poster results generated by <span class='highlight'>WNFA</span> at Zhejiang Exhibition Hall from 06.01.2022 to 06.12.2022: <a target='_blank' class='focus clickable' href='https://www.aghnu.me/gallery/WNFA' >WNFA 3D Virtual Gallery</a>"}),
            new Job("line", {height: 1}),
            new Job("text", {text: "WNFA Poster Generator - The online version of the <span class='highlight'>WNFA</span> project powered by Azure serverless products. You can write a poem in most languages and use the website to generate a unique poster for that poem: <a target='_blank' class='focus clickable' href='https://www.aghnu.me/WNFA' >WNFA Poster Generator</a>"}),
            new Job("line", {height: 1}),
        ], min_interval: 0, max_interval: 0,
        callback: callback
    }));
}

function systemExe(param, callback=null) {
    param.outStream.print(new Job('list', {
        callback: callback,
        list: [
            new Job("custom", {element: (()=>{
                const container = createHTMLElement('div', '');
                const logo = createHTMLElement('p', "<span class='focus double-line'>Aghnu's Console<span>");
                const text = createHTMLElement('p', '<span class="highlight">System&nbspVer.&nbsp&nbsp' + SYSTEM_VERSION + '</span><br><span class="highlight">Text&nbspVer.&nbsp&nbsp&nbsp&nbsp' + TEXT_VERSION + '</span>')

                container.appendChild(logo);
                container.appendChild(text);                

                return container;

            })()}),
            new Job("line", {height: 1}),
        ], min_interval: 0, max_interval: 0,
    }));
}

function mapExe(param, callback=null) {

    const sitemapPrintJobs = (()=>{
        const list = [];
        for (let i = 0; i < sitemapData.paths.length; i++) {
            const path = sitemapData.paths[i];
            list.push(new Job("text", {
                text: `- <a target='_blank' class='clickable focus' href='${path.path}' >${sitemapData.origin + path.path}</a>`
            }),);
        }

        return list;
    })();

    param.outStream.print(new Job("list", {
        callback: callback,
        list: [
            new Job("text", {text: "Sitemap of aghnu.me: "}),
            new Job("line", {height: 1}),

            ...sitemapPrintJobs,

            new Job("line", {height: 1}),

        ],
        min_interval: 0, max_interval: 0,
    }));
}

function resumeExe(param, callback=null) {
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "Current Resume: "}),
            new Job("line", {height: 1}),
            new Job("link", {link: "/static/doc/resume.pdf", name: "Resume", text: "resume_gengyuan.pdf", type: "link"}),
            new Job("line", {height: 1}),
        ],
        min_interval: 0, max_interval: 0,
    }));
}

function homeExe(param, callback=null) {
    // print to out
    const pid = genProcessID();
    lockSystem(pid, '<span class="highlight">[System is Currently Occupied]</span>');

    let printPause = false;

    param.outStream.print(new Job("list", {
        checkpause: () => printPause,
        list: [
            new Job("lambda", {func: ()=>{
                printPause = true;
                systemExe(param, () => {printPause = false});
            }}),
            new Job("separator", {height: 1}),

            new Job("text", {text: "Hello stranger! Welcome~ Welcome~ My name is <span class='highlight'>Gengyuan Huang</span>, a software developer..."}),
            new Job("line", {height: 1}),

            // new Job("text", {text: ""}),
            // new Job("line", {height: 1}),
            new Job("link", {link: "/static/doc/resume.pdf", name: "Resume", text: "resume_gengyuan.pdf", type: "link"}),

            new Job("line", {height: 1}),
            new Job("separator", {height: 1}),

            new Job("text", {text: "To navigate the site, you can either type commands into the console or click on the highlighted elements. Here are some useful commands:"}),
            ...(()=>{
                const list = [];
                PROGRAM_META.forEach(p => {
                    if (p.star) {
                        list.push(new Job("line", {height: 1}));
                        list.push(new Job("CMDDesc", {name: p.name, desc: p.desc, func: () => {
                            ProgramCore.getInstance().execute(p.name);
                        }}));
                        
                    }
                })
                return list;              
            })(),
            new Job("line", {height: 1}),
            new Job("separator", {height: 1}),
            new Job("lambda", {func: ()=>{
                printPause = true;
                postsExe(param, () => {printPause = false});
                unlockSystem(pid);
                
            }})
        ],
        min_interval: 0, max_interval: 100,
    }));
    if (callback !== null) {
        callback();
    }
}

function aboutExe(param, callback=null) {

    let printPause = false;
    param.outStream.print(new Job("list", {
        checkpause: () => printPause,
        list: [
            new Job("lambda", {func: ()=>{
                printPause = true;
                mapExe(param, () => {printPause = false});
            }}),

            new Job("text", {text: "To know more about this website: "}),
            new Job("line", {height: 1}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='https://github.com/aghnu/aghnu.me.azure' >https://github.com/aghnu/aghnu.me.azure</a>"}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='https://github.com/aghnu/aghnus_console' >https://github.com/aghnu/aghnus_console</a>"}),
            new Job("line", {height: 1}),
            new Job("text", {text: "© 2022 Gengyuan Huang"}),
            new Job("line", {height: 1}),

        ],
        min_interval: 0, max_interval: 0,
    }));
    if (callback !== null) {
        callback();
    }
}

function helpExe(param,callback=null) {
    param.outStream.print(new Job("list", {
        list: (()=>{
            const list = [];
            list.push(new Job("text", {text: "Commands:"}));

            PROGRAM_META.forEach(p => {
                list.push(new Job("CMDDesc", {name: p.name, desc: p.desc, func: () => {
                    ProgramCore.getInstance().execute(p.name);
                }}));
                list.push(new Job("line", {height: 1}));
            });

            
            return list;
        })(),
        min_interval: 0, max_interval: 0,
    }));
    if (callback !== null) {
        callback();
    }
}

function clearExe(param, callback=null) {
    param.outStream.clear();
    clearClearningFunc();
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "To navigate the site, you can either type commands into the console or click on the highlighted elements."}),
            new Job("line", {height: 1}),
        ],
        min_interval: 0, max_interval: 0,
    }));

    if (callback !== null) {
        callback();
    }
}

function contactExe(param, callback=null) {
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "To contact me:"}),
            new Job("line", {height: 1}),
            new Job("link", {link: "mailto:gengyuan@ualberta.ca", name: "Email", text: "gengyuan@ualberta.ca", type: "email"}),
            new Job("link", {link: "https://github.com/aghnu", name: "Github", text: "aghnu", type: "github"}),
            new Job("link", {link: "https://www.linkedin.com/in/gengyuanh", name: "LinkedIn", text: "Gengyuan Huang", type: "linkedin"}),
            new Job("link", {link: "https://www.aghnu.me", name: "Website", text: "aghnu.me", type: "link"}),
            new Job("line", {height: 1}),
        ],
        min_interval: 0, max_interval: 0,
    }));
    if (callback !== null) {
        callback();
    }
}

function keyboardExe(param,callback=null) {
    const keyboard = document.querySelector('#virtual-keyboard');
    if (keyboard) {
        keyboard.classList.toggle('on');
    }

    param.outStream.broadCast();
    if (callback !== null) {
        callback();
    }
}

function projectsExe(param, callback=null) {
    // get past projects
    const pastProjects = (()=>{
        const outList = [];
        
        for (let i = 0; i < projectsData.past.length; i++) {
            const project = projectsData.past[i];
            
            outList.push(new Job("project", {
                name: project.title,
                tags: project.tags,
                desc: project.desc,
                links: project.links,
            }));
            outList.push(new Job("line", {height: 1}));

        }

        return outList.reverse();
    })();

    // get recent projects
    const recentProjects = (()=>{
        const outList = [];
        
        for (let i = 0; i < projectsData.recent.length; i++) {
            const project = projectsData.recent[i];
            
            outList.push(new Job("project", {
                name: project.title,
                tags: project.tags,
                desc: project.desc,
                links: project.links,
            }));
            outList.push(new Job("line", {height: 1}));

        }

        return outList.reverse();
    })();

    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "Past Projects:"}),
            ...pastProjects,

            new Job("text", {text: "Recent Projects:"}),
            ...recentProjects,

            new Job("line", {height: 1})
        ],
        min_interval: 0, max_interval: 0,
    }));

    if (callback !== null) {
        callback();
    }
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
            this.path[exe.name] = {'exe': exe.func};
        });
        PROGRAM_HIDDEN.forEach(exe => {
            this.path[exe.name] = {'exe': exe.func};
        })
    }

    execute(cmd, param={}) {
        param.outStream = this.outStream;

        if (PROGRAM_ASYNC.includes(cmd) || !program_lock.locked) {
            if (cmd === "") {
                param.outStream.print(new Job('line', {'height': 1}));
            } else {
                
                if (this.path[cmd] === undefined) {
                    param.outStream.print(new Job('text', {'text': "<span class='highlight'>[Command Not Found]</span>"}));
                } else {
                    param.outStream.print(new Job('text', {'text': `<span class='highlight'>[${cmd}]</span>`}));
                    this.path[cmd].exe(param);
                }                       
            }
     
        } else {
            if (program_lock.input_func === null) {
                param.outStream.print(new Job('text', {'text': program_lock.message}));
            } else {
                program_lock.input_func(cmd, param);
            }
        }
    }
};


