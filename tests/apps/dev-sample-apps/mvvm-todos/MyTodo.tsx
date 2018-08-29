import * as React from 'react'
import {createComponent} from '@coglite/framework/mvvm'


import {view} from './TodoView'
import {TodoViewModel} from './TodoViewModel'


const TodoEditor = createComponent<any>({displayName: 'TodoEditor', view})(TodoViewModel)


class MyTodo extends React.PureComponent<any, any>{
render(){
return(
    <TodoEditor 
        user="Jeremy" 
        onTodoSaved={() => alert('Todos saved!')} 
        onTodoAdded={(todo) => console.log('New todo:', todo)}
    />
)
}}


export {MyTodo as default, MyTodo}