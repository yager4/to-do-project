const initialState = {
    todos: []
};


export default function toDoReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_TODOS':
            return { ...state, todos: action.todos }
        case 'GET_TODO':
            return { ...state, toDos: action.toDos }
        default:
            return state;
    }

}