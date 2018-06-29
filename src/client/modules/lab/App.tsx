import * as React from 'react';
import {Mosaic, MosaicWindow} from 'react-mosaic-component'
import { VerticalStretch } from '../../design';



export type ViewId = 'a' | 'b' | 'c' | 'new';

const ViewIdMosaic = Mosaic.ofType<ViewId>();
const ViewIdMosaicWindow = MosaicWindow.ofType<ViewId>();

const TITLE_MAP: Record<ViewId, string> = {
    a: 'Graph Window',
    b: 'Populations',
    c: 'Layout',
    new: 'New Window',
};

export class CogliteLabApp extends React.Component {
    public render() {
        return (
            <div style={{height: '100vh', display: 'flex'}}>
                    <VerticalStretch>
                    <nav className="pt-navbar">
                        <div className="pt-navbar-group pt-align-left">
                            <div className="pt-navbar-heading">Untitled Lab</div>
                            <span className="pt-navbar-divider"/>
                            <div className="pt-input-group">
                                <span className="pt-icon pt-icon-search"/>
                                <input
                                    type="search"
                                    className="pt-input pt-small"
                                    placeholder="Search groups..."
                                />
                            </div>

                        </div>
                        <div className="pt-navbar-group pt-align-right">
                            <button className="pt-button pt-minimal pt-icon-control"><span>Configure Workspace</span></button>
                            <div className="pt-button-group pt-minimal">
                                <a className="pt-button pt-icon-undo" role="button"/>
                                <a className="pt-button pt-icon-redo" role="button"/>
                            </div>
                            <span className="pt-navbar-divider"/>
                            <button className="pt-button pt-minimal pt-icon-user"/>
                            <button className="pt-button pt-minimal pt-icon-help"/>
                            <button className="pt-button pt-minimal pt-icon-cog"/>
                        </div>
                    </nav>

                    <ViewIdMosaic
                            renderTile={(id, path) => (
                                <ViewIdMosaicWindow path={path} createNode={() => 'new'} title={TITLE_MAP[id]}>
                                    {id === 'a' && <div>ID: A</div>}
                                    {id === 'b' && <div>ID: B</div>}
                                    {id === 'c' && <h1>{TITLE_MAP[id]}</h1>}

                                </ViewIdMosaicWindow>
                            )}
                            initialValue={{
                                direction: 'row',
                                first: 'a',
                                second: {
                                    direction: 'column',
                                    first: 'b',
                                    second: 'c',
                                },
                            }}
                    />
                    </VerticalStretch>
                    </div>
                )}}

