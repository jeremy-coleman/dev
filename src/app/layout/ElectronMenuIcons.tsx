import * as React from 'react'
import * as Icons from '../components/icons';
import { remote } from 'electron';
const { Menu } = remote;

export class ElectronCommandBarMenu extends React.Component<any, any> {

showMenu() {
        const settings = null
        const kernelActive = true;
        const kernelInstalled = true;
        const template: Electron.MenuItemConstructorOptions[] = [
            {
                label: 'New Service',
                click: () => {},
                enabled: kernelInstalled
            },

            {
                label: 'Execute Service',
                type: 'submenu',
                enabled: kernelActive,
                submenu: [
                    {
                        label: 'Send System Event',
                        type: 'submenu',
                        enabled: true,
                        submenu: [
                            {
                                label: 'TODO: send event to main process',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'TODO: send event to main process',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'TODO: send event to main process',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'TODO: send event to main process',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'infos and things',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'ping',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'delete Data',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            }
                        ]
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Leave',
                        click: () => {  }
                    }
                ]
            },

            {
                type: 'separator'
            },
            {
                label: 'App Settings TODO: add back modal',
                click: () => {}
            },
            {
                type: 'separator'
            },
            {
                label: 'Zoom',
                type: 'submenu',
                enabled: true,
                submenu: [
                    {
                        label: 'Zoom In',
                        accelerator: 'CommandOrControl+=',
                        click: () => { /*NodeJSMainProxy.zoomIn();*/}
                    },
                    {
                        label: 'Zoom Out',
                        accelerator: 'CommandOrControl+-',
                        click: () => {/*NodeJSMainProxy.zoomOut();*/ }
                    },
                    {
                        label: 'Reset Zoom',
                        accelerator: 'CommandOrControl+0',
                        click: () => {/*NodeJSMainProxy.zoomReset();*/}
                    },
                ]
            },
            {
                type: 'separator'
            },


            
            {
                label: 'About',
                click: () => {}
            },
            {
                type: 'separator'
            },
            {
                label: 'Legal',
                click: () => window.open('https://google.com')
            },
            {
                label: 'Privacy',
                click: () => window.open('https://google.com')
            },
            {
                label: 'Credits',
                click: () => window.open('https://google.com')
            },
            {
                type: 'separator'
            },
            {
                label: 'Report issues',
                click: () => window.open('https://coglite.com')
            },
        ];

        const menu = Menu.buildFromTemplate(template);
        //@ts-ignore
        menu.popup();
    }

    render() {
        return (
            <a className='undecorated-text' href='javascript:void(0)' title='Settings'>
                <div className="addressbar-menu" dangerouslySetInnerHTML={{ __html: Icons.hamburgerIcon('toolbar-button', 24) }} onClick={() => this.showMenu()} />
            </a>
        );
    }
}