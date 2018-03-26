import ErrorOutlineIcon from 'material-ui-icons/ErrorOutline';
import Badge from 'material-ui/Badge';
import Tooltip from 'material-ui/Tooltip';
import * as React from 'react';


export const ValidationIcon = ({id, errorMessages}) => (
    <Tooltip
        id={id}
        title={errorMessages.map((e, idx) => <div key={`${id}_${idx}`}>{e}</div>)}
    >
        <Badge badgeContent={errorMessages.length}>
            <ErrorOutlineIcon color='error'/>
        </Badge>
    </Tooltip>
);
