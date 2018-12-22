import { isObject, isString } from '@coglite/common/datakit';
import { MDFontIconOnly } from '@coglite/common/ux';

//import styles from '@emotion/styles';


import { observer } from 'mobx-react';
import * as React from 'react';

// const ErrorMsg:any = styles('div')({
//     fontSize: '12px',
//     backgroundColor: 'red',
//     color: 'white',
//     padding: "4px 8px"
// })

// const ErrorItemStyle:any = styles('div')((theme: any) => ({
//     margin: 8,
//     borderWidth: 1,
//     borderStyle: "solid",
//     backgroundColor: 'red',
// }))

// const ErrorItemTitle:any = styles('div')((theme: any) => ({
//     fontSize: '12px',
//     backgroundColor: 'red',
//     color: 'white',
//     padding: "4px 8px"
// }))

// const ErrorItemValue:any = styles('div')({
//     fontSize: '12px',
//     padding: 8,
//     overflow: "auto"
// })


import {style} from 'typestyle'

const ErrorMsg = (...props) => <div className={style({
    fontSize: '12px',
    backgroundColor: 'red',
    color: 'white',
    padding: "4px 8px"
})
}/>

const ErrorItemStyle = (...props) => <div className={style({
    margin: 8,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: 'red',
})
}/>

const ErrorItemTitle = (...props) => <div className={style({
    fontSize: '12px',
    backgroundColor: 'red',
    color: 'white',
    padding: "4px 8px"
})
}/>

const ErrorItemValue = (...props) => <div className={style({
    fontSize: '12px',
    padding: 8,
    overflow: "auto"
})
}/>


interface IErrorItemProps {
    title: string;
    className?: any;
    children?: React.ReactNode
}

export let ErrorItem = observer((props: IErrorItemProps ) => 
            <ErrorItemStyle>
                <ErrorItemTitle>{props.title}</ErrorItemTitle>
                <ErrorItemValue>
                    {props.children}
                </ErrorItemValue>
            </ErrorItemStyle>
)


interface IErrorProps {
    error?: any;
    className?: any;
}

let getErrorMessage = (error) => isString(error) ? error : (error.message || "An error has occurred");


let ErrorMessage = observer((props: IErrorProps) => 
      <React.Fragment>
      {
          props.error && 
            <ErrorMsg key="message">
            {getErrorMessage(props.error)}
            </ErrorMsg>
          
      }
      </React.Fragment>
)


// let ErrorStack = observer((props: IErrorProps) => 
//       <React.Fragment>
//       {
//           props.error 
//           && props.error.stack
//           && Object.keys(props.error.stack)
//           .forEach(key => <ErrorItem className="stack-item" title="Stack"><pre>{key}</pre></ErrorItem>
//       }
//       </React.Fragment>
// )

class ErrorStack extends React.Component<IErrorProps, any> {
    render() {
        const error = this.props.error;
        if(error) {
            let stack = error ? error.stack : null;
            if(stack) {
                return <ErrorItem className="stack-item" title="Stack"><pre>{stack}</pre></ErrorItem>
            }
        }
        return null;
    }
}

let tryGetErrorValue = (value) => {
    let valueContent
    if(isObject(value)) {
            try {valueContent = <pre>{JSON.stringify(value, null, "\t")}</pre>}
            catch(err) {}
    } 
    else {valueContent = String(value)}
    return valueContent
}

let createErrorMessage = (error) => {
    let errorMessages : React.ReactNode[] = [];
    error && isObject(error) && Object.keys(error).forEach((key) =>
        {
            key !== "message" 
            && key !== "stack"
            && errorMessages.push(
            <ErrorItem key={key} title={key}>
            <pre>{tryGetErrorValue(error[key])}</pre>
            </ErrorItem>
            )   
    })  
 return errorMessages
 
}

let ErrorDetail = observer((props) =>
    <React.Fragment>
       {props.error && createErrorMessage(props.error)}
    </React.Fragment>
)

let Error = observer((props: IErrorProps) => 
      <React.Fragment>
      {
          props.error && 
                <div role="error">
                    <ErrorMessage {...props} />
                    <ErrorStack {...props} />
                    <ErrorDetail {...props} />
                </div>
          
      }
      </React.Fragment>
)


let CompactError = observer((props: IErrorProps) => 
      <React.Fragment>
      {
          props.error && 
                <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                        <MDFontIconOnly icon={'error'}/>
                </div>
          
      }
      </React.Fragment>
)

export { IErrorProps, Error, CompactError };