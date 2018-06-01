import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import * as React from 'react'
import base from '../configs';
import {EventEmitter} from 'events';
import {createReadStream} from 'fs';
import * as readline from 'readline';
import * as fs from 'fs';
import * as os from 'os';



class CSVService {

    readFileByLimit = (csvFilePath, limit) =>  {
        return new Observable(observer => {
            const readStream = createReadStream(csvFilePath);
            const lineReader = readline.createInterface({
                input: readStream
            });
            let LineCounter = 0;
            const chunk = [];
            lineReader.on('line', (line) => {
                if (LineCounter >= limit) {
                    lineReader.close();
                } else {
                    chunk.push(line.split(','));
                }
                LineCounter++;
            });
            lineReader.on('close', () => {
                observer.next(chunk);
            });
        });
    };


    combineDataSets = (files, fields) => {
        return new Observable(observer => {
            const readStreams = [];
            const lineReaders = [];
            const arrOfObs$ = [];
            const combinedFileDir = base.uploadDir;
            const combinedFileName = new Date().getTime().toString().concat('_combined.csv');
            const combinedFile = fs.createWriteStream(combinedFileDir.concat(combinedFileName), {flags: 'a'});
            const eventEmitter = new EventEmitter();

            files.map((file, index) => {
                readStreams[index] = createReadStream(file.filePath);
                lineReaders[index] = readline.createInterface({
                    input: readStreams[index]
                });

                arrOfObs$[index] = Observable.fromEvent(lineReaders[index], 'line')
                    .takeUntil(Observable.fromEvent(lineReaders[index], 'close'))
                    .concat(Observable.interval(10)
                        .map((emptyLine: any) => emptyLine = '')
                        .takeUntil(Observable.fromEvent(eventEmitter, 'processFinished')));
            });

            const zip$ = (a$) => Observable.zip(...arrOfObs$);
            zip$(arrOfObs$).subscribe(lines => {
                    if (lines.join('') === '') {
                        eventEmitter.emit('processFinished');
                    } else {
                        const combinedFileLine: any = [];
                        lines.map((line: any, index) => {
                            const file = files[index];
                            file.fields.map(fieldIndex => {
                                const arrLine = line.split(',');
                                combinedFileLine.push(arrLine[fieldIndex]);
                            });
                        });
                        combinedFile.write(combinedFileLine.join(',').concat(os.EOL), 'utf8');
                    }
                },
                error => observer.error(error),
                () => observer.next(combinedFileDir.concat(combinedFileName))
            );
        });
    }
}


export default CSVService;