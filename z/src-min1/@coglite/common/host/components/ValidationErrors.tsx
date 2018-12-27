import { observer } from 'mobx-react';
import * as React from 'react';

const errorLabelStyle = {
    fontWeight: 600
}

interface IValidationErrorsProps {
    errors?: any[];
    className?: string;
    message?: any,
    keyTitle?: any,
    idx?: any
    key?: any
    classes?: any
}

let ValidationErrors = observer((props: IValidationErrorsProps) => 
      <React.Fragment>
      {props.errors && props.errors.length > 0 && props.errors.map((error, idx) => 
            <span key={idx}>
                {error.keyTitle ? <label style={errorLabelStyle}>{error.keyTitle}: </label> : undefined}
                {error.message}
            </span>)
      }
      </React.Fragment>
)

export { IValidationErrorsProps, ValidationErrors }