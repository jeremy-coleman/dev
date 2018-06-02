import request from 'browser-request';
import urljoin from  'url-join';
import * as io from 'socket.io-client';
import * as rxjs from 'rxjs/Rx';


const connectionsMap: any = {};
const { Subscriber, Observable, Subject } = rxjs;



// BEGIN FROM ENCHANNEL-ZMQ
function deepFreeze(obj) {
    // Freeze properties before freezing self
    Object.getOwnPropertyNames(obj).forEach(name => {
        const prop = obj[name];
        if(typeof prop === 'object' && prop !== null && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });
    // Freeze self
    return Object.freeze(obj);
}

function createSubscriber(socket) {
    return Subscriber.create(messageObject => {
        socket.emit('msg', messageObject);
    }, err => {
        // We don't expect to send errors to the kernel
        console.error(err);
    }, () => {
        // tear it down, tear it *all* down
        socket.removeAllListeners();
        socket.close();
    });
}

function createObservable(socket) {
    return Observable.fromEvent(socket, 'msg')
        .map(msg => deepFreeze(msg))
        .publish()
        .refCount();
}

function createSubject(socket) {
    const subj = Subject.create(createSubscriber(socket),
        createObservable(socket));
    return subj;
}
// END FROM ENCHANNEL-ZMQ


export let rp = async (url) => {return fetch(url).then(function(response){return response.json()})}



export async function spawn(endpoint, kernelName) {
    return rp(urljoin(endpoint, 'spawn', kernelName)).then(x => JSON.parse(x).id );
}

export function connect(endpoint, kernelId) {
    return new Promise(resolve => {
        var connections = connectionsMap[kernelId] = {
            shell: io.connect(urljoin(endpoint, 'shell', kernelId)),
            stdio: io.connect(urljoin(endpoint, 'stdio', kernelId)),
            iopub: io.connect(urljoin(endpoint, 'iopub', kernelId)),
            control: io.connect(urljoin(endpoint, 'control', kernelId)),
        };
        resolve({
            shell: createSubject(connections.shell),
            control: createSubject(connections.control),
            iopub: createSubject(connections.iopub),
            stdio: createSubject(connections.stdio),
        });
    });
}

export function disconnect(channels) {
    if (typeof channels === 'string') {
        const connections = connectionsMap[channels];
        connections.shell.disconnect();
        connections.stdio.disconnect();
        connections.iopub.disconnect();
        connections.control.disconnect();
        return Promise.resolve();
    } else {

        channels.shell.complete();
        channels.stdio.complete();
        channels.iopub.complete();
        channels.control.complete();
        return Promise.resolve();
    }

}

export function shutdown(endpoint, kernelId) {
    return rp(urljoin(endpoint, 'shutdown', kernelId)).then(url => {
        if (JSON.parse(url).id !== kernelId) return Promise.reject('wrong kernel stopped');
    });
}
