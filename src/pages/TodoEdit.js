import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import update from 'immutability-helper';


import EditPreview from '../cmp/EditPreview.js'
import { updateTodo, loadTodos } from '../state management/actionTodo.js'




class TodoEdit extends Component {

    state = {
        todo: {},
        isOnEdit: false

    }
    componentDidMount() {
        const { props } = this
        this.setState({ todo: props.toDos })

    }
    componentDidUpdate(prveProp) {
        const { props } = this
        if (prveProp.toDos !== props.toDos) {
            this.setState({ todo: props.toDos })

        }
    }

    handlerChange = (ev) => {

        const { todo } = this.state
        const value = ev.target.value
        const id = ev.target.name
        const txtIndex = todo.toDos.findIndex(toDo => toDo.txtId === id)
        const newState = update(this.state.todo, {
            toDos: {
                [txtIndex]: {
                    txt: { $set: value }
                }
            }
        })

        this.setState({ todo: newState });

    }
    onEdit = () => {
        const { todo } = this.state
        const { props, state } = this

        const todoTedit = [...todo.toDos.filter(toDo => toDo.txt !== "")]
        const stateTodo = update(todo, {
            toDos: { $set: todoTedit }
        })
        props.updateTodo(stateTodo).then(() => {
            props.becomeEditable()
            props.loadTodos()
        })
    }
    render() {
        const { state } = this
        const { props } = this

        if (!Object.entries(this.state.todo).length) {
            return <div> </div>
        }
        return (

            <div className="preview-container" >
                <h1>{state.todo.day}
                </h1>
                <div>{state.todo.toDos.map((toDo, index) => {
                    return (
                        <EditPreview
                            todoParentId={state.todo._id}
                            removeTodo={props.removeTodo}
                            handlerChange={this.handlerChange}
                            index={index}
                            onEdit={this.onEdit}
                            key={toDo.txtId}
                            toDo={toDo}
                            isOnEdit={state.isOnEdit}
                        >
                        </EditPreview>
                    )
                })}</div>

                <Button onClick={this.onEdit} animated='vertical'>
                    <Button.Content hidden>save</Button.Content>
                    <Button.Content visible>
                        <Icon name='save' size={'big'} />
                    </Button.Content>
                </Button>

            </div >
        )
    }
}

const mapStateToProps = () => {
    return {
    }
}
const mapDispatchToProps = {
    updateTodo,
    loadTodos
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoEdit)



