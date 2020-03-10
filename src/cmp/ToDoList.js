import React from 'react'
import TodoPreview from './TodoPreview.js'
import { DragDropContext } from 'react-beautiful-dnd'


function ListToDo(props) {
    if (props.todos[1]) {
    }
    return (
        <div className="list-container">
            <DragDropContext onDragEnd={res => props.onDragEnd(res)}>
                {props.todos.map((todo, index) => {
                    return (
                        <TodoPreview
                            removeTodo={props.removeTodo}
                            addTodo={props.addTodo}
                            onDragEnd={props.onDragEnd}
                            key={todo._id}
                            todo={todo}
                            index={index}
                            handlerMarkTodoTxt={props.handlerMarkTodoTxt} >

                        </TodoPreview>
                    )

                })}
            </DragDropContext>
        </div>
    )
}


export default ListToDo

