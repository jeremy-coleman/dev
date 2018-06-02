import {Observable} from 'rxjs';
import * as uuid from 'uuid';
import {userInfo} from 'os';
import {spawn} from 'child_process';
import {spawn as enchanelspawn, shutdown, connect, disconnect} from './enchannel.service';

class NotebookService {
    static replySub: any;
    static session: any;
    python = null;
    session;
    client = null;
    kernelRelay = 'node_modules/kernel-relay/src/app.js';
    endpoint = 'http://localhost:3005/';
    kernelName = 'python3';
    kernelId = null;
    killPort = 'fuser -k -TERM -n tcp 3005';
    response = ['stream', 'error', 'display_data'];
    kernelSub;
    replySub;
    executeRequest = {
        header: {
            username: userInfo().username,
            session: NotebookService.session,
            msg_type: 'execute_request',
            msg_id: uuid.v4(),
            date: new Date(),
            version: '5.2',
        },
        parent_header: {},
        metadata: {},
        content: {
            code: '',
            silent: false,
            store_history: true,
            user_expressions: {},
            allow_stdin: true,
        },
    };
    data = {
        output: {
            success: 1,
            output: '',
            errorType: '',
            outputType: 'string'
        },
        code: '',
        inputIndex: 1,
        index: 1,
        language: 'python'
    };

     killProcess = () => {
        if(this.python) {
            disconnect(this.kernelId);
            shutdown(this.endpoint,this.kernelId);
            // NotebookService.python.kill();
        }
         this.python = null;
         this.client = null;
         this.shspawn(this.killPort); //f will be deleted in future
    };


    shspawn = (command) => spawn('sh', ['-c', command], {stdio: 'inherit'});

     execData = (code) => {
        this.session = uuid.v4();
        this.executeRequest.content.code = code;
        this.executeRequest.header.session = this.session;
        this.executeRequest.header.msg_id = this.session;
    };


    clientConnection = () => {
        if (!this.client) {
            enchanelspawn(this.endpoint, this.kernelName).then(id => {
                connect(this.endpoint, id).then(channels => {
                    this.client = channels;
                    this.kernelId = id;
                    // enable matplotlib
                    this.execData('%matplotlib inline');
                    // os.chdir("${environment.uploadDir}")
                    this.client.shell.next(this.executeRequest);
                });
            });
        }
    };

    connectKernel = () => {
        if (!this.python) {
            //  NotebookService.python = this.shspawn(this.kernelRelay);
            this.python = spawn('node', [this.kernelRelay, '3005']);
            setTimeout(() => {
                this.clientConnection();
            }, 2000);
        }
    };

    resetKernel = () => {
        if (this.python) {
            shutdown(this.endpoint, this.kernelId);
            this.client = null;
            this.clientConnection();
        }
    };

    execPython = (line) => {
        return new Observable(observer => {

            this.execData(line.code);
            if (this.kernelSub || NotebookService.replySub) {
                this.kernelSub.unsubscribe();
                this.replySub.unsubscribe();
            }
            this.data.code = line.code;
            this.data.index = line.index;
            this.data.output.outputType = 'string';
            this.kernelSub = this.client.iopub
            // @ts-ignore
                .filter(msg => this.response.includes(msg.header.msg_type))
                .map(msg => msg)
                .subscribe(response => {
                    const header = response.header;
                    const content = response.content;
                    if (header.msg_type === 'error') {
                        this.data.output.success = 0;
                        this.data.output.errorType = content.ename;
                        this.data.output.output = content.evalue;
                    } else if (header.msg_type === 'stream') {
                        this.data.output.output = content.text;
                    } else if (header.msg_type === 'display_data') {
                        this.data.output.output = 'data:image/png;base64,' + content.data['image/png'];
                        this.data.output.outputType = 'display';
                    }
                    setTimeout(() => {
                        observer.next(this.data);
                    }, 100);
                });
            this.replySub = this.client.shell.map(msg => msg).subscribe(msg => {
                this.data.inputIndex = msg.content.execution_count - 1;
            });
            this.client.shell.next(this.executeRequest);
        });
    };
}

export default NotebookService;