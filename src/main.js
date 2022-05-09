import { DisplayController } from "./displayController";
import { InputStream, OutputStreamScreen } from "./ioStream";
import { createHTMLElement } from "./utilities";

import "./style/style.scss";
import { KeyboardController } from "./keyboardController";
import { ProgramCore,welcomeExe } from "./programExe";


function createHTMLStructure() {
    const top_layer = createHTMLElement('div','',{'id': 'top-layer', 'class':'layer clickthrough noselect'});
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


    document.body.appendChild(top_layer);
    document.body.appendChild(second_layer);
    document.body.appendChild(third_layer);

}   

function main() {
    // when dom css assets loaded
    window.addEventListener('load', () => {
        // setup html structure
        createHTMLStructure();
        
        // init iostream
        const inStream = new InputStream();
        const outStream = new OutputStreamScreen(document.querySelector("#terminal-container #terminal-output"));

        const programCore = new ProgramCore();
        const displayController = new DisplayController(inStream, outStream);
        const keyboardController = new KeyboardController(inStream, outStream);
    
        welcomeExe({"outStream": outStream});
    });
}

main();