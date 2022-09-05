import { DisplayController } from "./displayController";
import { InputStream, OutputStreamScreen } from "./ioStream";
import { createHTMLElement } from "./utilities";

import "../style/style.scss";
import { KeyboardController } from "./keyboardController";
import { ProgramCore } from "./programExe";


function createHTMLStructure() {
    const site_app = createHTMLElement('div', '', {id: 'site-app'});

    const overlay_layer = createHTMLElement('div','',{'id': 'overlay-layer', 'class':'layer'});
    const terminal_layer = createHTMLElement('div','',{'id': 'terminal-layer', 'class':'layer'});

    // third layer
    const terminal_layer_virtual_keyboard = createHTMLElement('div','',{'id': 'virtual-keyboard'});
    const terminal_layer_terminal_container = createHTMLElement('div','',{'id': 'terminal-container'});
    const terminal_layer_function_key_container = createHTMLElement('div','',{'id': 'function-key-container', 'class': 'noselect'});
    const terminal_layer_footer = createHTMLElement('div','',{'id': 'footer'});

    const terminal_container_output = createHTMLElement('div', '', {'id': 'terminal-output'});
    
    const function_key_container_left = createHTMLElement('div', '', {'class': 'container left'});
    const function_key_container_middle = createHTMLElement('div', '', {'class': 'container middle'});
    const function_key_container_right = createHTMLElement('div', '', {'class': 'container right'});

    terminal_layer_terminal_container.appendChild(terminal_container_output);

    terminal_layer_function_key_container.appendChild(function_key_container_left);
    terminal_layer_function_key_container.appendChild(function_key_container_middle);
    terminal_layer_function_key_container.appendChild(function_key_container_right);

    terminal_layer.appendChild(terminal_layer_virtual_keyboard);
    terminal_layer.appendChild(terminal_layer_terminal_container);
    terminal_layer.appendChild(terminal_layer_function_key_container);
    terminal_layer.appendChild(terminal_layer_footer);

    // second layer
    const side_bar_left = createHTMLElement('div', '', {'id': 'sidebar-left'});

    overlay_layer.appendChild(side_bar_left);


    site_app.appendChild(overlay_layer);
    site_app.appendChild(terminal_layer);

    document.body.appendChild(site_app);

    return site_app;
}   

function main() {
    // init iostream
    const inStream = new InputStream();
    const outStream = new OutputStreamScreen(document.querySelector("#terminal-container #terminal-output"));

    // singletons
    new ProgramCore();
    new DisplayController(inStream, outStream);
    new KeyboardController(inStream, outStream);

    // default
    ProgramCore.getInstance().execute('welcome', {"outStream": outStream});
}

window.addEventListener('load', () => {
    // setup html structure
    const site_app = createHTMLStructure();
    const site_semantic = document.querySelector('#site-semantic');

    // setup site app
    main();

    // switch between semantic and app by users choice
    const url = new URL(window.location);
    const isSimple = (url.searchParams.get('simple')) ? (url.searchParams.get('simple')) : 'false';    
    if (isSimple === 'true') {
        site_semantic.style.display = 'block';
    } else {
        site_app.style.display = 'block';
    }
});