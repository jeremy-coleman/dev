
import * as React from 'react';
import { AddressBarStatus, AddressBarTextBox, AddressBarRefresh } from './addressBarStatus';
import { AddressBarMenu } from './addressBarMenu';
import { AddressBarSearch } from './addressBarSearch';
import { AddressBarUserCredentials } from './addressBarUserCredentials';


export class AddressBar extends React.Component<any, any> {

    pageClicked = (ev: Event) => {
        if (ev.defaultPrevented)
            return;
        let target = ev.srcElement;
        while (target) {
            // NOTE: potential bugs bc target.className is not always string, ex SVGAnimatedString doesn't have an 'includes' function.
            if (target.className && target.className.toString().includes("addressbar")) {
                ev.preventDefault();
                return;
            }
            target = target.parentElement;
        }

        // Click was outside the address bar. Close open subpanels.
       //clearWindowService ..TODO ();

    }

    componentWillMount() {window.addEventListener('click', (e) => this.pageClicked(e));}
    componentWillUnmount() {window.removeEventListener('click', (e) => this.pageClicked(e));}

    render() { 
        return (
            <div className="addressbar">
                <AddressBarStatus />
                <AddressBarTextBox />
                <AddressBarRefresh />
                <AddressBarMenu />
                <AddressBarSearch />
                <AddressBarUserCredentials />
            </div>
        );
      }

}
