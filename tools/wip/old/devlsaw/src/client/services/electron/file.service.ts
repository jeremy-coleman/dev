import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import * as React from 'react'
import {basename} from 'path';
import base from '../configs';
import DBService from './db.service';
import {createReadStream, createWriteStream, existsSync, mkdirSync, unlink} from 'fs';



class FileService {

     upload = (files) =>  {
        return new Observable(observer => {
            this.dir();
            if (files && files.length > 0) {
                files.map(file => {
                    const fileName = basename(file);
                    const createdAt = new Date().getTime().toString();
                    const filePath = base.uploadDir
                        .concat(createdAt)
                        .concat(fileName);
                    this.cpFile(file, filePath).subscribe(
                        success => {
                            this.saveFileDir({
                                'path': filePath,
                                'fileName': fileName,
                                'createdAt': createdAt,
                            }).subscribe(
                                (sourceFile) => observer.next(sourceFile),
                                error => observer.error(error)
                            );
                        },
                        error => observer.error(error)
                    );
                });
            } else {
                observer.next(false);
            }
        });

    };

    cpFile = (file,filePath) => {
        return new Observable(observer => {
            createReadStream(file).pipe(createWriteStream(filePath))
                .on('error', (err) => {
                    observer.error(err);
                })
                .on('close', () => {
                    observer.next();
                });
        });
    };

    saveFileDir = (sourceFiles) => {
        return new Observable(observer => {
            DBService.get('files').then(files => {
                files.insert(sourceFiles).then(() => {
                    observer.next(sourceFiles);
                });
            });
        });
    };


    mvFile = (oldFilePat, newFilePath) => {
        return new Observable(observer => {
            createReadStream(oldFilePat).pipe(createWriteStream(newFilePath))
                .on('error', (err) => {
                    observer.error(err);
                })
                .on('close', () => {
                    unlink(oldFilePat, (err) => {
                        if (err) {
                            observer.error(err);
                        } else {
                            observer.next(newFilePath);
                        }
                    });
                });
        });
    };

    dir = () => {
        if (!existsSync(base.uploadDir)) {
            mkdirSync(base.uploadDir);
        }
    }
}


export default FileService;