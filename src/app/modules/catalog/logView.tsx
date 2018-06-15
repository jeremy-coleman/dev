import * as React from 'react';
import { Subscription, Subject } from 'rxjs';
import * as Icons from '../../components/icons';
import { safeStringify } from '../../common/utils';

const { remote } = require('electron');
const { Menu } = remote;


export enum Severity {
    log,
    info,
    trace,
    debug,
    warn,
    error
}

interface ILogEntry {
    severity: Severity,
    timestamp: Date,
    message: any,
    args: any
}


const number2 = (n: number): string =>  ('0' + n).slice(-2);

const timestamp = (entry: ILogEntry) => {
    const hours = number2(entry.timestamp.getHours());
    const minutes = number2(entry.timestamp.getMinutes());
    const seconds = number2(entry.timestamp.getSeconds());
    return <span className='wc-logview-timestamp'>{`[${hours}:${minutes}:${seconds}]`}&nbsp;</span>
}

const emit = (val: any, className: string) => {
    if (!val) return null;
    if (val.hasOwnProperty('messageType') && val['messageType'] === 'link') {
        //return <div className={className}><a className={className} title={val.title} href={val.link}>{val.text}</a>&nbsp;</div>
        return <span className={className} key={val.link}><a title={val.title} href={val.link}>{val.text}</a>&nbsp;</span>
    } else {
        let str = safeStringify(val);
        return str.match(/\S+/g).map((s, i) => <span className={className} key={s + i}>{s}&nbsp;</span>);
    }
}


const message = (entry: ILogEntry, className: string) => {
    return emit(entry.message, className);
}

const args = (entry: ILogEntry, className: string) => {
    if (entry.args && entry.args.length) {
        return entry.args
            .filter(arg => !!arg)
            .map((arg, i) => emit(arg, className));
    }
    return null;
}

const format = (entry: ILogEntry, index: number, items: any[], wrapStyle: any) => {
    const className = 'wc-logview-' + Severity[entry.severity];
    return (
        <div key={index} className='cog-log-entry' style={wrapStyle}>
            {timestamp(entry)}
            {message(entry, className)}
            {args(entry, className) }
        </div>
    );
}


export interface ILogViewState {
    entries: ILogEntry[]
}

export class LogView extends React.Component<any, ILogViewState> {
    static log$ = new Subject<ILogEntry>();
    scrollMe: Element;
    autoscrollSubscription: Subscription;
    logSubscription: Subscription;

    constructor(props) {
        super(props);
        this.state = { entries: [] };
    }



    componentDidMount() {

        this.logSubscription = LogView.log$.subscribe(
            entry => {
                // Yep we have to set this.state here because otherwise we lose entries due to batching.
                if (entry) { this.state = { entries: [...this.state.entries, entry] };} 
                else {this.state = { entries: [] };}
                this.setState(this.state);
            }
        );
    }

    componentWillUnmount() {
        //this.autoscrollSubscription.unsubscribe();
        //this.logSubscription.unsubscribe();
    }

    componentDidUpdate(prevProps: {}, prevState: ILogViewState) {}

//whitespace can be set to 'nowrap' for no wordwrap
    render() {
        return (
            <div>
                <div className="cog-panel-header">
                    <span className="logview-header-text">Log</span>
                    <a className='undecorated-text' href='javascript:void(0)' title='Log Menu'>
                        <div className='logview-clear-output-button' dangerouslySetInnerHTML={{__html: Icons.hamburgerIcon('toolbar-button-dark', 24) }} onClick={() => this.showMenu()} />
                    </a>
                </div>
                <div className="wc-logview" ref={ref => this.scrollMe = ref}>
                    {this.state.entries.map((entry, i, items) => format(entry, i, items, { whiteSpace: ('normal')}))} 
                </div>
            </div>
        );
    }

    showMenu() {
        const template: Electron.MenuItemConstructorOptions[] =
         [
            { label: 'Clear log', click: () => LogView.clear() },
            { type : 'checkbox', 
              label: 'Word wrap', click: () => {} }
         ];
        const menu = Menu.buildFromTemplate(template);
        //@ts-ignore
        menu.popup();
    }

    public static add(severity: Severity, message: any, ...args: any[]) {
        let entry: ILogEntry = {
            severity,
            timestamp: new Date(),
            message,
            args
        };
        this.log$.next(entry);
        console[Severity[severity]](message, ...args);
    }

    public static clear() {
        this.log$.next(null);
    }
}
