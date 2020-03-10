import React, { Component } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper';

import { loadTodos, updateTodo, removeTodo } from '../state management/actionTodo.js'
import ToDoList from '../cmp/ToDoList.js'
import FilterTodo from '../cmp/FilterTodo.js'
import TodoService from '../services/TodoService.js'

class todoApp extends Component {

    state = {
        filterBy: ''
    }


    componentDidMount() {
        this.props.loadTodos()

    }


    onDragEnd = (result) => {
        if (!result.destination) return
        const resultCopy = { ...result }
        const todos = [...this.props.todos]
        const { source, destination } = resultCopy
        if (source.droppableId !== destination.droppableId) {
            const columnSourceTodo = todos.find(todo => todo._id === source.droppableId)
            const columnDestinationTodo = todos.find(todo => todo._id === destination.droppableId)
            const [removed] = columnSourceTodo.toDos.splice(source.index, 1)
            columnDestinationTodo.toDos.splice(destination.index, 0, removed)
        } else {
            const columnTodo = todos.find(todo => todo._id === source.droppableId)
            const copiedItems = [...columnTodo.toDos]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            columnTodo.toDos = copiedItems

        }
        TodoService.dragAndDropSave(todos)

    }

    handlerMarkTodoTxt = (todoId, newToDo) => {
        const { props } = this
        const todos = [...this.props.todos]
        const todosForEdit = todos.find(todo => todo._id === todoId)
        const toDoIndex = todosForEdit.toDos.findIndex(toDo => toDo.txtId === newToDo.txtId)

        const newTodos = update(todosForEdit, {
            toDos: {
                [toDoIndex]: {
                    isDone: { $set: !todosForEdit.toDos[toDoIndex].isDone }
                }
            }
        })
        this.props.updateTodo(newTodos).then(() => {
            props.loadTodos()
        })

    }
    addTodo = (newTodo, todoId) => {
        const { props } = this
        TodoService.addTodo(newTodo, todoId).then(() => {
            props.loadTodos()
        })

    }

    removeTodo = (todoParentId, toDoId) => {
        const { props } = this
        props.removeTodo(todoParentId, toDoId).then(() => {
            props.loadTodos()
        })
    }
    handleFilter = (filterByTxt) => {
        this.props.loadTodos(filterByTxt)


    }


    render() {
        if (!this.props.todos) {
            return <div>Loadong........</div>
        }


        return (
            <div className="container">
                <FilterTodo handleFilter={this.handleFilter}></FilterTodo>
                <ToDoList
                    removeTodo={this.removeTodo}
                    addTodo={this.addTodo}
                    handlerMarkTodoTxt={this.handlerMarkTodoTxt}
                    onDragEnd={this.onDragEnd}
                    todos={this.props.todos}>
                </ToDoList>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}
const mapDispatchToProps = {
    loadTodos,
    updateTodo,
    removeTodo
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(todoApp)
