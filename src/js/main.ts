import { DisplayController } from "./displayController";
import { InputStream, OutputStreamScreen } from "./ioStream";
import { createHTMLElement } from "./utilities";

import "../style/style.scss";
import { ProgramCore } from "./programExe";

export const GLOBAL_CONFIG: {
    desktop_mode: boolean,
    simple_mode: boolean
} = {
    desktop_mode: false,
    simple_mode: false
};

function createHTMLStructure(): HTMLElement {
    const site_app = createHTMLElement('div', '', {id: 'site-app'});

    // third layer
    const site_app_terminal_container = createHTMLElement('div','',{'class': 'terminal-container'});
    const terminal_container_output = createHTMLElement('div', '', {'class': 'terminal-output'});
    
    site_app_terminal_container.appendChild(terminal_container_output);
    site_app.appendChild(site_app_terminal_container);

    document.body.appendChild(site_app);

    return site_app;
}   

function main(): void {
    // setup html structure
    const site_app: HTMLElement = createHTMLStructure();
    const site_semantic: HTMLElement = document.querySelector('#site-semantic')!;

    // process url
    const url: URL = new URL(window.location.href);

    const params = new Set((url.searchParams.get('options')) ? url.searchParams.get('options')!.split(','): []);

    GLOBAL_CONFIG.desktop_mode = (params.has('desktop')) ? true : false;  
    GLOBAL_CONFIG.simple_mode = (params.has('simple')) ? true : false;   

    if (GLOBAL_CONFIG.desktop_mode) {
        site_app.classList.add('desktop');
    }

    if (GLOBAL_CONFIG.simple_mode) {
        site_app.parentNode!.removeChild(site_app);
        site_semantic.style.display = 'block';
    } else {
        site_semantic.parentNode!.removeChild(site_semantic);
        // singletons
        new ProgramCore();
        new InputStream();
        new OutputStreamScreen();
        new DisplayController();

        // default
        ProgramCore.getInstance().execute('home');
    }
}

main();


