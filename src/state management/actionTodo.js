import TodoService from '../services/TodoService.js'

export function loadTodos(filterBy = '') {

    return async (dispatch) => {
        try {
            const toDos = await TodoService.getTodos(filterBy);
            dispatch(setTodos(toDos))

        } catch (err) {
            console.log('TodoActions: err in loadTodo', err);

        }

    }

}
function setTodos(todos) {
    return {
        type: 'GET_TODOS',
        todos

    }
}
export function getTodoById(id) {

    return async (dispatch) => {
        try {
            const toDos = await TodoService.getTodoById(id);

            dispatch(getTodo(toDos))

        } catch (err) {
            console.log('TodoActions: err in getTodoById', err);

        }

    }

}
function getTodo(toDos) {
    return {
        type: 'GET_TODO',
        toDos

    }
}
export function updateTodo(todo) {
    return async (dispatch) => {
        try {
            console.log(todo)
            TodoService.editTodo(todo)
        } catch (err) {
            console.log('onEdit: err in updateTodo', err);

        }

    }

}
export function removeTodo(todoId, toDoId) {
    return async () => {
        try {
            TodoService.deleteTodo(todoId, toDoId)
        } catch (err) {
            console.log('deleteTodo: err in removeTodo', err);

        }

    }

}



