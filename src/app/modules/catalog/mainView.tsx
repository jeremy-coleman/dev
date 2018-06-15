import * as React from 'react';
var Splitter = require('react-split-pane');
import { InspectorView } from './inspectorView'
import { LogView } from './logView';
import * as Icons from '../../components/icons';


const remote = require('electron').remote;




export class MainView extends React.Component<any, any> {
    settingsUnsubscribe: any;
    settingsLoadUnsubscribe: any;
    reuseKey: number = 0;
    conversationId: string;
    userId: string;
    serviceID: string;
    cogChatContainer: HTMLElement;
    shouldWarnOfServiceChange: boolean = false;



    verticalSplitChange(size: number) { this.updateCogChatContainerCSS(size)}

    updateCogChatContainerCSS(size: number) {
        if (this.cogChatContainer) {
            let bounds = remote.getCurrentWindow().getBounds();
            if (bounds.width - size <= 450) {
                this.cogChatContainer.classList.remove('wc-wide');
                this.cogChatContainer.classList.add('wc-narrow');
            } else if (bounds.width - size >= 768) {
                this.cogChatContainer.classList.remove('wc-narrow');
                this.cogChatContainer.classList.add('wc-wide');
            } else {
                this.cogChatContainer.classList.remove('wc-wide', 'wc-narrow');
            }
        }
    }

    initCogChatContainerRef(ref, initialWidth:number) {
        this.cogChatContainer = ref;
        this.updateCogChatContainerCSS(initialWidth);
    }

    cogChatComponent(initialWidth:number) {

            return (
                <div className='cog-app-msg-view-background'>
                    <div className='box-centered' dangerouslySetInnerHTML={{ __html: Icons.tempFrameworkIconEmbossed('', 158) }} />
                </div>
            );
        }
    

    render() {
        let vertSplit
        let horizSplit
        return (

<div className='mainview'>

    <div className='fill-parent'>

        <Splitter 
            split="vertical"
            minSize={0}
            maxSize={-200}
            defaultSize={300}
            primary="first"
            onChange={(size) => this.verticalSplitChange(size)}
        >
                    <div className="fill-parent">
                    <Splitter 
                        split="horizontal"
                        primary="second"
                        minSize={42}
                        maxSize={-44}
                        defaultSize={300}
                        onChange={(size) => (size)}>
                        
                        <div className="wc-app-msg-view-panel">
                        <InspectorView />
                        </div>
                        
                        <div className="fill-parent">
                        <LogView />
                        </div>

                    </Splitter>
                    </div>
                
                    <div className='fill-parent'>
                        {this.cogChatComponent(vertSplit)}
                    </div>
    

            
        </Splitter>
    </div>
    
</div>
        );
    }
}
