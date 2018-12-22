import { MDFontIconOnly } from '@coglite/common/ux';
//import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react';
import * as React from 'react';


export let WorkspaceDropdownItem = observer((props) =>
        <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <button onClick={props.onSelectFromDropdown}>
            <input type="checkbox" checked={props.checked} tabIndex={-1} readOnly/>
            <span>{`${props.name}`}</span>    
        </button>
        <button><MDFontIconOnly icon={'delete'} onClick={props.onDeleteSingle}/></button>
    </span>
)
