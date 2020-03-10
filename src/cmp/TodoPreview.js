import React, { Component } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import FontAwesome from 'react-fontawesome'
import TodoEdit from '../pages/TodoEdit.js'
import AddTodo from '../cmp/AddTodo.js'




export default class PreviewTodo extends Component {
    state = {
        isEdit: false,
        numberOfAdd: true

    }
    componentDidMount() {

        const { props } = this

        this.setState({ toDos: props.toDos })

    }
    componentDidUpdate() {
        const { props } = this




        if (props.todo.toDos.length === 0) {
            if (this.state.isEdit) {
                this.setState({ isEdit: false })

            }
        }

    }
    becomeEditable = () => {
        this.setState(prevState => ({ isEdit: !prevState.isEdit }))
    }
    render() {
        const { props } = this
        const { state } = this
        const { isEdit } = this.state


        return (
            <div>
                {isEdit ?
                    <TodoEdit removeTodo={props.removeTodo} toDos={props.todo} becomeEditable={this.becomeEditable} /> :
                    <div className="preview-container">
                        <FontAwesome onClick={this.becomeEditable}
                            className="super-crazy-colors"
                            name="fas fa-edit"
                            size="2x"
                            // spin
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: '30px' }}
                        />
                        <h1>{props.todo.day}</h1>

                        <Droppable droppableId={props.todo._id} key={props.todo._id}>
                            {(Provided, snapshot) => {
                                return <div
                                    ref={Provided.innerRef}

                                    {...Provided.droppableProps}
                                // style={{ backgroundColor: snapshot.isDraggingOver ? '#263B4A' : '#ffffff' }}

                                >{props.todo.toDos.map((toDo, index) => {
                                    return (
                                        < Draggable key={toDo.txtId} draggableId={toDo.txtId} index={index} >
                                            {(Provided, snapshot) => {
                                                return <div
                                                    ref={Provided.innerRef}
                                                    {...Provided.draggableProps}
                                                    {...Provided.dragHandleProps}
                                                    className="toDoList-contaner"
                                                    style={{
                                                        userSelect: 'none',
                                                        // backgroundColor: snapshot.isDragov ? '#263B4A' : '#456C86',
                                                        ...Provided.draggableProps.style
                                                    }}>
                                                    <h2
                                                        onClick={() => props.handlerMarkTodoTxt(props.todo._id, toDo)}
                                                        style={{ textDecoration: toDo.isDone ? 'line-through' : '' }}>
                                                        {toDo.txt}
                                                    </h2>
                                                </div>
                                            }}
                                        </Draggable>

                                    )
                                })}
                                    {Provided.placeholder}
                                    {
                                        state.numberOfAdd ? <AddTodo addTodo={props.addTodo} todoId={props.todo._id} ></AddTodo> :
                                            ''
                                    }

                                </div>
                            }}
                        </Droppable>
                    </div>
                }
            </div>
        )
    }
}


