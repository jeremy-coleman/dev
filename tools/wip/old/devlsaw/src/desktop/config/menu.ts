import { app, Menu, shell } from "electron";


/*
this isn't currentl'y doing anything, add the following line to the mainWindow object in ./main.ts to use

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
  
  */




export default class MenuBuilder {
  mainWindow: any;

  constructor(mainWindow: any) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {

    this.setupDevelopmentEnvironment();
    

    let template;

    if (process.platform === "darwin") {
      template = this.buildDarwinTemplate();
    } else {
      template = this.buildDefaultTemplate();
    }

    const menu = Menu.buildFromTemplate(template as any);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {

    this.mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: "Inspect element",
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const EditMenu = {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          }
        }
      ]
    };

    const subMenuHelp = {
      label: "Help",
      submenu: [
        {
          label: "Learn More",
          click() {
            shell.openExternal("http://coglite.com");
          }
        },
        {
          label: "Documentation",
          click() {
            shell.openExternal(
              "https://github.com/"
            );
          }
        },
        {
          label: "Search Issues",
          click() {
            shell.openExternal("https://github.com");
          }
        }
      ]
    };

    return [EditMenu, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: "Help",
        submenu: [
          {
            label: "Learn More",
            click() {
              shell.openExternal("http://coglite.com");
            }
          },
          {
            label: "Documentation",
            click() {
              shell.openExternal(
                "https://github.com/"
              );
            }
          },
          {
            label: "Search Issues",
            click() {
              shell.openExternal("https://github.com/");
            }
          }
        ]
      }
    ];

    return templateDefault;
  }
}
