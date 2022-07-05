
import { OutputStreamJob as Job, OutputStreamJob } from "./ioStream";
import { createHTMLElement } from "./utilities";

const SYSTEM_VERSION = '2022.07.05.01';

const program_lock = {
    'pid': "",
    'locked': false,
    'message': "",
    'input_func': null,
};

const PROGRAM_META = [
    {
        name: 'welcome',
        func: welcomeExe,
        desc: 'welcome message',

    },

    {
        name: 'help',
        func: helpExe,
        desc: 'list all the commands that aghnu.me currently supports',
        star: true,
    },

    {
        name: 'clear',
        func: clearExe,
        desc: 'clear the terminal screen',

    },

    {
        name: 'contact',
        func: contactExe,
        desc: 'list my contact information',
        star: true,

    },

    {
        name: 'keyboard',
        func: keyboardExe,
        desc: 'open/close the virtual keyboard',
    },

    {
        name:'projects',
        func: projectsExe,
        desc: 'list all the projects that I worked on',

    },

    {
        name: 'about',
        func: aboutExe,
        desc: 'more about this website/project',
    },

    {
        name: 'simplify',
        func: simplifyExe,
        desc: 'display the simplified text-based version of aghnu.me, reduced functionilities but information is condensed',
        star: true,
    },
    {
        name: 'map',
        func: mapExe,
        desc: 'display site map',
        star: true,
    },
    {
        name: 'posts',
        func: postsExe,
        desc: 'print the posts',
        star: true,
    },
    {
        name: 'system',
        func: systemExe,
        desc: 'display system and text version',
    },
]
const PROGRAM_HIDDEN = [
    {
        name: 'exit',
        func: exitExe,
    },
    {
        name: 'close',
        func: exitExe,
    },
    {
        name: 'cmd',
        func: helpExe,
    },
    {
        name: 'man',
        func: helpExe,
    },
    {
        name: 'unlock',
        func: unlockExe,
    },
    {
        name: 'ls',
        func: mapExe,
    },
    {
        name: 'list',
        func: mapExe,
    },
    {
        name: 'uname',
        func: systemExe,
    },
    {
        name: 'cl',
        func: clearExe,
    }
]
const PROGRAM_ASYNC = ['keyboard', 'unlock'];

function lockSystem(pid, message="", input_func=null) {
    // no real mutex
    // just a simulation

    // start
    if (program_lock.pid === "") {
        program_lock.pid = pid;
    // end, these two instruction need to be atomic in real setting, but not nessary for this website
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

function unlockExe() {
    unlockSystem(program_lock.pid);
}

function exitExe() {
    document.querySelector('#site-app').style.display = 'none';
    document.querySelector('#site-semantic').style.display = 'block';
}

function simplifyExe(param) {
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
            ProgramCore.getInstance().execute('y', {'outStream': param.outStream});
        };

        answer_no.onclick = () => {
            ProgramCore.getInstance().execute('n', {'outStream': param.outStream});                      
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
}

function postsExe(param) {
    param.outStream.print(new Job('list', {
        list: [
            new Job("text", {text: "Posts: "}),
            new Job("text", {text: "Check out this client side ASCII Art Generator I wrote using opencv.js: <a target='_blank' class='focus clickable' href='https://www.aghnu.me/tools/ascii_art_generator/' >Aghnu's ASCII Art Generator</a>"}),
            new Job("line", {height: 1}),
            new Job("text", {text: "3D Virtual Gallery I worte to display the poster results generated by <span class='highlight'>WNFA</span> at Zhejiang Exhibition Hall from 06.01.2022 to 06.12.2022: <a target='_blank' class='focus clickable' href='https://www.aghnu.me/gallery/WNFA' >WNFA 3D Virtual Gallery</a>"}),
            new Job("line", {height: 1}),
        ], min_interval: 0, max_interval: 0,
    }));
}

function systemExe(param) {
    param.outStream.print(new Job('list', {
        list: [
            new Job("custom", {element: (()=>{
                const container = createHTMLElement('div', '');
                const logo = createHTMLElement('p', "<span class='focus double-line'>Aghnu's Console<span>");
                const text = createHTMLElement('p', '<span class="highlight">System Ver. ' + SYSTEM_VERSION + '</span>')

                container.appendChild(logo);
                container.appendChild(text);

                return container;

            })()}),
            new Job("line", {height: 1}),
        ], min_interval: 0, max_interval: 0,
    }));
}

function mapExe(param) {
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "Sitemap of aghnu.me: "}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='/' >aghnu.me</a>"}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='/?simple=true' >aghnu.me/?simple=true</a>"}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='/tools/' >aghnu.me/tools/</a>"}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='/tools/ascii_art_generator/' >aghnu.me/tools/ascii_art_generator/</a>"}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='/gallery/' >aghnu.me/gallery/</a>"}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='/gallery/WNFA/' >aghnu.me/gallery/WNFA/</a>"}),
            new Job("line", {height: 1}),

        ],
        min_interval: 0, max_interval: 0,
    }));
}

function welcomeExe(param) {
    // print to out
    const pid = genProcessID();
    lockSystem(pid, '<span class="highlight">[System is Currently Occupied]</span>');

    param.outStream.print(new Job("list", {
        list: [
            new Job("lambda", {func: ()=>{
                systemExe(param);
            }}),
            new Job("separator", {height: 1}),

            new Job("text", {text: "Hello stranger! Welcome~ Welcome~ ;] My name is Gengyuan Huang, a programmer..."}),
            new Job("line", {height: 1}),

            new Job("text", {text: "I have recently graduated from the University of Alberta with a CS degree... I have rent to pay, and a mouth to feed (my mouth)... <span class='highlight'>I am open to work!</span>"}),
            new Job("line", {height: 1}),
            new Job("separator", {height: 1}),

            new Job("text", {text: "To navigate the site, you can either type commands into the console or click on the highlighted elements. Here are some useful commands:"}),
            ...(()=>{
                const list = [];
                PROGRAM_META.forEach(p => {
                    if (p.star) {
                        list.push(new Job("line", {height: 1}));
                        list.push(new Job("CMDDesc", {name: p.name, desc: p.desc, func: () => {
                            ProgramCore.getInstance().execute(p.name, {'outStream': param.outStream});
                        }}));
                        
                    }
                })
                return list;              
            })(),
            new Job("line", {height: 1}),
            new Job("separator", {height: 1}),
            new Job("lambda", {func: ()=>{
                postsExe(param);
                unlockSystem(pid);
                
            }})
        ],
        min_interval: 0, max_interval: 100,
    }));
}

function aboutExe(param) {
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "To know more about this website: "}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='https://github.com/aghnu/aghnu.github.io' >https://github.com/aghnu/aghnu.github.io</a>"}),
            new Job("text", {text: "- <a target='_blank' class='clickable focus' href='https://github.com/aghnu/aghnus_console' >https://github.com/aghnu/aghnus_console</a>"}),

            new Job("line", {height: 1}),

        ],
        min_interval: 0, max_interval: 0,
    }));
}

function helpExe(param) {
    param.outStream.print(new Job("list", {
        list: (()=>{
            const list = [];
            list.push(new Job("text", {text: "Commands:"}));

            PROGRAM_META.forEach(p => {
                list.push(new Job("CMDDesc", {name: p.name, desc: p.desc, func: () => {
                    ProgramCore.getInstance().execute(p.name, {'outStream': param.outStream});
                }}));
                list.push(new Job("line", {height: 1}));
            });

            
            return list;
        })(),
        min_interval: 0, max_interval: 0,
    }));
}

function clearExe(param) {
    param.outStream.clear();
}

function contactExe(param) {
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "To contact me:"}),
            new Job("link", {link: "mailto:gengyuan@ualberta.ca", name: "Email", text: "gengyuan@ualberta.ca", type: "email"}),
            new Job("link", {link: "https://github.com/aghnu", name: "Github", text: "aghnu", type: "github"}),
            new Job("link", {link: "https://www.linkedin.com/in/gengyuan-huang", name: "LinkedIn", text: "Gengyuan Huang", type: "linkedin"}),
            new Job("link", {link: "https://www.aghnu.me", name: "Website", text: "aghnu.me", type: "link"}),
            new Job("line", {height: 1}),
        ],
        min_interval: 0, max_interval: 0,
    }));
}

function keyboardExe(param) {
    const keyboard = document.querySelector('#virtual-keyboard');
    if (keyboard) {
        keyboard.classList.toggle('on');
    }

    param.outStream.broadCast();
}

function projectsExe(param) {
    param.outStream.print(new Job("list", {
        list: [
            new Job("text", {text: "Past Projects:"}),
            new Job("project", {name: "Yonder", desc: "Yonder is a distributed social network using RESTful API. (UAlberta CMPUT404 class project)", link: "https://github.com/aghnu/yonder"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "MoodSwing", desc: "MoodSwing is a Java-based android app designed to record and archive user’s mood in relation to geo location and time. Users can follow each other on MoodSwing and view their friend's mood records. (UAlberta CMPUT301 class project)", link: "https://github.com/aghnu/MoodSwing"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "A python implementation of Hollow Heap", desc: "hollow_heap.py is a python implementation of Hollow Heap base on Thomas Dueholm Hansen, Haim Kaplan, Robert E. Tarjan, Uri Zwick 's paper https://arxiv.org/abs/1510.06535. (UAlberta CMPUT403 class project)", link: "https://github.com/aghnu/Hollow_Heap"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "XiaoHongShu Userscript", desc: "a tampermonkey userscript to export xiaohongshu.com search query result to speadsheet ", link: "https://github.com/aghnu/xiaohongshu_search_export_userscript"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "Interactive Moodle Plugin", desc: "This plugin is a Moodle Activity Module that is developed for Delphi technology as part of their future online learning platform for aviators. (UAlberta CMPUT401 class project)", link: "https://github.com/aghnu/Interactive-Moodle-Plugin-Showcase"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "Jia's Lab", desc: "Dr. Huijue Jia's personal website.", link: "https://jiaslab-org.github.io/"}),
            new Job("line", {height: 1}),

            new Job("text", {text: "Current Projects:"}),
            new Job("project", {name: "Stranding Air", desc: "A website for a group of passionate people who are interested in exploring the boundary of visual design, art, media, and technology.", link: "https://www.strandingair.com"}),            
            new Job("line", {height: 1}),
            new Job("project", {name: "GFE.js", desc: "GFE is a simplification of the project libgif-js. It provides a function to extract the frames of a gif.", link: "https://github.com/aghnu/gif_frames_extract_js"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "Aghnu's Console", desc: "A personal project that shows my frustration and my passion for Human-Computer Interaction. Oh... It also serves as my personal website.", link: "https://github.com/aghnu/aghnu.github.io"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "Aghnu's ASCII Art Generator", desc: "An ASCII Art Toolkit Website written in JavaScript, using opencv.js. Code is running on client side. It supports gif and static images convertion. The output is displayed as HTML elements and animated by JavaScript.<span class='highlight'>(Website Link: <a target='_blank' class='clickable focus' href='https://www.aghnu.me/tools/ascii_art_generator/' >https://www.aghnu.me/tools/ascii_art_generator/</a>)</span>", link: "https://github.com/aghnu/aghnus_ascii_art_generator"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "WNFA", desc: "WNFA (Words Never Fall Apart) is an interactive art project that uses grid method and machine learning to generate art from handwritten poems.", link: "https://github.com/aghnu/WNFA"}),
            new Job("line", {height: 1}),
            new Job("project", {name: "WNFA 3D Virtual Gallery", desc: "A 3D Virtual Gallery display the poster results generated by WNFA at Zhejiang Exhibition Hall from 06.01.2022 to 06.12.2022. It is written in pure JavaScript. 3D is achieved by CSS 3D transform.", link: "https://www.aghnu.me/gallery/WNFA"}),

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
        PROGRAM_HIDDEN.forEach(exe => {
            this.path[exe.name] = {'exe': exe.func};
        })
    }

    execute(cmd, param) {
        if (PROGRAM_ASYNC.includes(cmd) || !program_lock.locked) {
            if (cmd === "") {
                param.outStream.print(new OutputStreamJob('line', {'height': 1}));
            } else {
                
                if (this.path[cmd] === undefined) {
                    param.outStream.print(new OutputStreamJob('text', {'text': "<span class='highlight'>[Command Not Found]</span>"}));
                } else {
                    param.outStream.print(new OutputStreamJob('text', {'text': `<span class='highlight'>[${cmd}]</span>`}));
                    this.path[cmd].exe(param);
                }                       
            }
     
        } else {
            if (program_lock.input_func === null) {
                param.outStream.print(new OutputStreamJob('text', {'text': program_lock.message}));
            } else {
                program_lock.input_func(cmd, param);
            }
        }
    }
};


