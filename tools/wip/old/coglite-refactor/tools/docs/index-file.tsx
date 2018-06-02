import * as React from "react";
import { renderToString } from "react-dom/server";

import {TitleBar} from './ElectronTitleBar/TitleBar'

export interface IndexPageProps {
    title: string;
    scripts: string[];
    styles: string[];
}

export const IndexPage = (props: IndexPageProps) => {
    const { title, scripts, styles } = props;
    return (
        <html>
            <head>
                <title>{title}</title>
                <meta charSet="UTF-8" />
                {
                    styles.map((css, i) => (
                        <link key={`css_${i}`}
                            rel="stylesheet"
                            type="text/css"
                            href={css} />
                    ))
                }
            </head>
            <body>
                
                <div id="main"></div>
                {scripts.map((src, i) => (
                    <script key={`script_${i}`}
                        src={src} />
                ))}
            </body>
        </html>);
};

export const render = (props: IndexPageProps) => renderToString(< IndexPage {...props} />);

import * as fs from "fs";
import * as path from "path";
export interface RendertoFieProps extends IndexPageProps {
    outDir: string;
    fileName: string;
}

// prevent render twice
let _outPath: string;

export const renderToFile = (props: RendertoFieProps) => {
    if (_outPath) return _outPath;
    const { title, scripts, styles } = props;
    _outPath = path.join(props.outDir, props.fileName);
    fs.writeFileSync(_outPath, render({ title, scripts, styles }));
    return _outPath;
};
