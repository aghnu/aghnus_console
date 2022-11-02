import { DisplayController } from "./displayController";
import { InputStream, OutputStreamScreen } from "./ioStream";
import { createHTMLElement } from "./utilities";

import "../style/style.scss";
import { KeyboardController } from "./keyboardController";
import { ProgramCore } from "./programExe";

export var GLOBAL_CONFIG = {
    desktop_mode: false,
    simple_mode: false
};

function createHTMLStructure() {
    const site_app = createHTMLElement('div', '', {id: 'site-app'});

    // third layer
    // const site_app_virtual_keyboard = createHTMLElement('div','',{'class': 'virtual-keyboard'});
    const site_app_terminal_container = createHTMLElement('div','',{'class': 'terminal-container'});
    const terminal_container_output = createHTMLElement('div', '', {'class': 'terminal-output'});
    
    site_app_terminal_container.appendChild(terminal_container_output);

    // site_app.appendChild(site_app_virtual_keyboard);
    site_app.appendChild(site_app_terminal_container);

    document.body.appendChild(site_app);

    return site_app;
}   

function main() {
    // singletons
    new ProgramCore();
    new InputStream();
    new OutputStreamScreen();
    new DisplayController();

    // default
    ProgramCore.getInstance().execute('home');
}

window.addEventListener('load', () => {
    // setup html structure
    const site_app = createHTMLStructure();
    const site_semantic = document.querySelector('#site-semantic');

    // process url
    const url = new URL(window.location);
    
    GLOBAL_CONFIG.desktop_mode = (url.searchParams.get('desktop')) ? true : false;  
    GLOBAL_CONFIG.simple_mode = (url.searchParams.get('simple')) ? true : false;   
    
    if (GLOBAL_CONFIG.desktop_mode) {
        site_app.classList.add('desktop');
    }


    if (GLOBAL_CONFIG.simple_mode) {
        site_app.parentNode.removeChild(site_app);
        site_semantic.style.display = 'block';
    } else {
        site_semantic.parentNode.removeChild(site_semantic);
        main();
    }
    
});