import * as React from 'react'
import { WindowControls } from './window-controls'
import { MenuBar } from './menu'

export const TitleBar = ({ children, icon, menu, disableMinimize, disableMaximize, className }) => (
  <div id="electron-app-title-bar" className={`electron-app-title-bar ${className || ''}`}>
    <div className="resize-handle resize-handle-top" />
    <div className="resize-handle resize-handle-left" />
    {typeof icon !== 'undefined' && <img className="icon" src={icon} />}
    <MenuBar menu={menu} />
    {children}
    <WindowControls disableMinimize={disableMinimize} disableMaximize={disableMaximize} />
  </div>
)
