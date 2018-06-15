import * as React from 'react';
import * as Icons from '../../../components/icons';

let enabled = true;
let refreshClicked = () => {}


export let AddressBarStatus = () => 
            <div className="addressbar-status">
                &nbsp;
            </div>


export let AddressBarTextBox = () => 
            <div className="addressbar-textbox">
                <input
                    type="text"
                    //@ts-ignore
                    ref={ref => this.textBoxRef = ref}
                    placeholder="Enter Search.." />
            </div>
            

export let AddressBarRefresh = () =>
            <a className='undecorated-text' href='javascript:void(0)' title='Start here'>
                <div className='addressbar-refresh' dangerouslySetInnerHTML={{ __html: Icons.reloadIcon("toolbar-button" + (enabled ? "" : " toolbar-button-disabled"), 24) }} onClick={() => refreshClicked()} />
            </a>
        
   