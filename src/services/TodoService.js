import todos from './Todo.js';
import storageService from '../services/storageService.js';
import update from 'immutability-helper';
import TODO from './todoClass.js'


export default {
    getTodos,
    editTodo,
    deleteTodo,
    getTodoById,
    dragAndDropSave,
    addTodo
}

let gTodos = storageService.load('todos') || todos;



function getTodoById(TodoId) {

    const toDos = gTodos.find(toDos => toDos._id === TodoId)
    return Promise.resolve(toDos)
}

async function editTodo(todoToEdit) {
    console.log(todoToEdit)
    const todoIndex = await gTodos.findIndex(todo => todo._id === todoToEdit._id)

    const newGtodo = update(gTodos, {
        [todoIndex]:
            { $set: todoToEdit }
    })
    
    gTodos = [...newGtodo]
    storageService.store('todos', gTodos)
}

function getTodos(filterBy) {
    if (filterBy === '') {
        return Promise.resolve([...gTodos]);

    }
 
    return gTodos.filter(todo => {

        return todo.toDos.some(txt=>{
            return txt.txt.toLowerCase().includes(filterBy.toLowerCase())
        })
    })
}

async function addTodo(txt, todoId) {
    const todo = await { ...gTodos.find(todo => todo._id === todoId) }
    const todoIndex = gTodos.findIndex(todo => todo._id === todoId)

    const newToDo = new TODO(txt);

    const newTodo = update(todo, { toDos: { $push: [newToDo] } })
    gTodos = update(gTodos, {
        [todoIndex]: { $set: newTodo }

    })
    storageService.store('todos', gTodos)

    return true

}
function deleteTodo(todoParentId, toDoId) {
    const [todoChild] = [...gTodos.filter(todo => todo._id === todoParentId)]
    const todoChildIndex = gTodos.findIndex(todo => todo._id === todoParentId)

    const indexChildTodosRemove = todoChild.toDos.findIndex(todo => todo.txtId === toDoId)
    const newChildTodos = update(todoChild, { toDos: { $splice: [[indexChildTodosRemove, 1]] } })
    gTodos = update(gTodos, {
        [todoChildIndex]: { $set: newChildTodos }

    })
    storageService.store('todos', gTodos)

    return true
}
function dragAndDropSave(todos) {
    gTodos = [...todos]
    storageService.store('todos', gTodos)
}
