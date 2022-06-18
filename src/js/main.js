import { DisplayController } from "./displayController";
import { InputStream, OutputStreamScreen } from "./ioStream";
import { createHTMLElement } from "./utilities";

import "../style/style.scss";
import { KeyboardController } from "./keyboardController";
import { ProgramCore,welcomeExe } from "./programExe";


function createHTMLStructure() {
    const site_app = createHTMLElement('div', '', {id: 'site-app'});

    const second_layer = createHTMLElement('div','',{'id': 'second-layer', 'class':'layer clickthrough noselect'});
    const third_layer = createHTMLElement('div','',{'id': 'third-layer', 'class':'layer'});

    const third_layer_virtual_keyboard = createHTMLElement('div','',{'id': 'virtual-keyboard'});
    const third_layer_terminal_container = createHTMLElement('div','',{'id': 'terminal-container'});
    const third_layer_function_key_container = createHTMLElement('div','',{'id': 'function-key-container', 'class': 'noselect'});
    const third_layer_footer = createHTMLElement('div','',{'id': 'footer'});

    const terminal_container_output = createHTMLElement('div', '', {'id': 'terminal-output'});
    
    const function_key_container_left = createHTMLElement('div', '', {'class': 'container left'});
    const function_key_container_middle = createHTMLElement('div', '', {'class': 'container middle'});
    const function_key_container_right = createHTMLElement('div', '', {'class': 'container right'});

    third_layer_terminal_container.appendChild(terminal_container_output);

    third_layer_function_key_container.appendChild(function_key_container_left);
    third_layer_function_key_container.appendChild(function_key_container_middle);
    third_layer_function_key_container.appendChild(function_key_container_right);

    third_layer.appendChild(third_layer_virtual_keyboard);
    third_layer.appendChild(third_layer_terminal_container);
    third_layer.appendChild(third_layer_function_key_container);
    third_layer.appendChild(third_layer_footer);

    site_app.appendChild(second_layer);
    site_app.appendChild(third_layer);

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
    welcomeExe({"outStream": outStream});

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