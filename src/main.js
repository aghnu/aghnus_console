import { Display } from "./utilities";
import { welcomePrintingJobTextList } from "./textList";
import "./style/style.scss";


function main() {


    // when dom css assets loaded
    window.addEventListener('load', () => {
        // init display singleton
        const display = new Display(document.querySelector("#terminal-container"));

        // welcome message
        display.printList(welcomePrintingJobTextList, 600, 1800);
    
    });


}

main();