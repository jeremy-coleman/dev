//import { isObject, isString } from '@coglite/common/datakit';
import { MDFontIconOnly } from '@coglite/common/ux';



import { observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

//import styled from '@emotion/styled';
// const ErrorMsg:any = styled('div')({
//     fontSize: '12px',
//     backgroundColor: 'red',
//     color: 'white',
//     padding: "4px 8px"
// })

// const ErrorItemStyle:any = styled('div')((theme: any) => ({
//     margin: 8,
//     borderWidth: 1,
//     borderStyle: "solid",
//     backgroundColor: 'red',
// }))

// const ErrorItemTitle:any = styled('div')((theme: any) => ({
//     fontSize: '12px',
//     backgroundColor: 'red',
//     color: 'white',
//     padding: "4px 8px"
// }))

// const ErrorItemValue:any = styled('div')({
//     fontSize: '12px',
//     padding: 8,
//     overflow: "auto"
// })


let E = stylesheet({
 ErrorMsg :{
    fontSize: '12px',
    backgroundColor: 'red',
    color: 'white',
    padding: "4px 8px"
},

 ErrorItemStyle :{
    margin: 8,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: 'red',
},

 ErrorItemTitle:{
    fontSize: '12px',
    backgroundColor: 'red',
    color: 'white',
    padding: "4px 8px"
},

 ErrorItemValue :{
    fontSize: '12px',
    padding: 8,
    overflow: "auto"
}
})


// const errorStyles = theme =>  stylesheet({
//         root: {},
//         compact: {
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center"
//         },
//         message: {
//             fontSize: theme.fonts.medium.fontSize,
//             backgroundColor: theme.palette.redDark,
//             color: theme.palette.white,
//             padding: "4px 8px"
//         },
//         item: {
//             margin: 8,
//             borderWidth: 1,
//             borderStyle: "solid",
//             borderColor: theme.palette.redDark
//         },
//         itemTitle: {
//             fontSize: theme.fonts.small.fontSize,
//             backgroundColor: theme.palette.redDark,
//             color: theme.palette.white,
//             padding: "4px 8px"
//         },
//         itemValue: {
//             fontSize: theme.fonts.small.fontSize,
//             padding: 8,
//             overflow: "auto"
//         }
// });


interface IErrorItemProps {
    title: string;
    className?: any;
    children?: React.ReactNode
}

export let ErrorItem = observer((props: IErrorItemProps ) => 
            <div className={E.ErrorItemStyle}>
                <div className={E.ErrorItemTitle}>{props.title}</div>
                <div className={E.ErrorItemValue}>
                    {props.children}
                </div>
            </div>
)


interface IErrorProps {
    error?: any;
    className?: any;
}

let getErrorMessage = (error) => error === typeof 'string' ? error : (error.message || "An error has occurred");


let ErrorMessage = observer((props: IErrorProps) => 
      <React.Fragment>
      {
          props.error && 
            <div className={E.ErrorMsg} key="message">
            {getErrorMessage(props.error)}
            </div>
          
      }
      </React.Fragment>
)

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
    if(value === typeof 'object') {
            try {valueContent = <pre>{JSON.stringify(value, null, "\t")}</pre>}
            catch(err) {}
    } 
    else {valueContent = String(value)}
    return valueContent
}

let createErrorMessage = (error) => {
    let errorMessages : React.ReactNode[] = [];
    error && error === typeof 'object' && Object.keys(error).forEach((key) =>
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