import { DisplayController } from "./displayController";
import { InputStream, OutputStreamScreen } from "./ioStream";
import { createHTMLElement } from "./utilities";

import "../style/style.scss";
import { ProgramCore } from "./programExe";

export const GLOBAL_CONFIG: {
  desktop_mode: boolean;
  simple_mode: boolean;
} = {
  desktop_mode: false,
  simple_mode: false,
};

export var global_desktop_window: MessageEventSource | null = null;
export var global_desktop_origin: string | null = null;

type DataInit = {
  type: "init";
  colorPlain: string;
  colorFocus: string;
  colorBackground: string;
  colorAppBackground: string;
  colorDesc: string;
  fontSize: string;
};

function createHTMLStructure(): HTMLElement {
  const site_app = createHTMLElement("div", "", { id: "site-app" });

  // third layer
  const site_app_terminal_container = createHTMLElement("div", "", {
    class: "terminal-container",
  });
  const terminal_container_output = createHTMLElement("div", "", {
    class: "terminal-output",
  });

  site_app_terminal_container.appendChild(terminal_container_output);
  site_app.appendChild(site_app_terminal_container);

  document.body.appendChild(site_app);

  return site_app;
}

function initParser(data: DataInit) {
  const siteRoot: HTMLElement | null = document.querySelector(":root");

  if (siteRoot !== null) {
    siteRoot.style.setProperty(
      "--terminal-text-color-primary",
      data.colorPlain
    );
    siteRoot.style.setProperty("--terminal-text-color-focus", data.colorFocus);
    siteRoot.style.setProperty(
      "--terminal-background-color",
      data.colorBackground
    );
    siteRoot.style.setProperty(
      "--terminal-app-background-color",
      data.colorAppBackground
    );

    siteRoot.style.setProperty(
      "--terminal-text-color-secondary",
      data.colorDesc
    );
    siteRoot.style.setProperty("--font-size", data.fontSize);
  }
}

function initProgram() {
  // singletons
  new ProgramCore();
  new InputStream();
  new OutputStreamScreen();
  new DisplayController();

  // default
  ProgramCore.getInstance().execute("home");
}

function initProgramDesktop() {
  // singletons
  new ProgramCore();
  new InputStream();
  new OutputStreamScreen();
  new DisplayController();

  // default
  ProgramCore.getInstance().execute("about");
}

function main(): void {
  // setup html structure
  const site_app: HTMLElement = createHTMLStructure();
  const site_semantic: HTMLElement = document.querySelector("#site-semantic")!;
  const site_texture: HTMLElement = document.querySelector("#site-texture")!;

  // process url
  const url: URL = new URL(window.location.href);

  const params = new Set(
    url.searchParams.get("options")
      ? url.searchParams.get("options")!.split(",")
      : []
  );

  GLOBAL_CONFIG.desktop_mode = params.has("desktop") ? true : false;
  GLOBAL_CONFIG.simple_mode = params.has("simple") ? true : false;

  // check desktop mode
  if (GLOBAL_CONFIG.desktop_mode) {
    site_app.classList.add("desktop");
    document.body!.removeChild(site_texture);
  }

  // check simple mode
  if (GLOBAL_CONFIG.simple_mode) {
    site_app.parentNode!.removeChild(site_app);
    site_semantic.style.display = "block";

    // special case, desktop mode
    window.addEventListener("message", (e) => {
      global_desktop_window = e.source;
      global_desktop_origin = e.origin;

      if (e.data !== undefined && e.data.type === "init") {
        document.body!.removeChild(site_texture);
        document.body.classList.add("desktop");

        initParser(e.data as DataInit);
      }
    });
    return;
  } else {
    site_semantic.parentNode!.removeChild(site_semantic);
  }

  // start program
  if (GLOBAL_CONFIG.desktop_mode) {
    // wait for init
    window.addEventListener("message", (e) => {
      global_desktop_window = e.source;
      global_desktop_origin = e.origin;

      if (e.data !== undefined && e.data.type === "init") {
        initParser(e.data as DataInit);
        initProgramDesktop();
      }
    });
  } else {
    const siteRoot: HTMLElement | null = document.querySelector(":root");

    if (siteRoot !== null) {
      siteRoot.style.setProperty("--terminal-background-color", "#282c34");
      siteRoot.style.setProperty("--terminal-app-background-color", "#282c34");
    }
    initProgram();
  }
}

main();
