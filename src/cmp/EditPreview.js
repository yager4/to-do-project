import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'



export default class EditPreview extends Component {

    state = {
        toDo: {},
        index: ''

    }

    componentDidMount() {
        const { props } = this
        if (props.toDo !== this.state.toDo) {
            this.setState({ toDo: props.toDo })
            this.setState({ index: props.index })
        }
    }
    handlerChange = (ev) => {
        const value = ev.target.value

        this.setState(prvState => ({ ...prvState, toDo: { ...prvState.toDo, txt: value } }))
    }
    render() {
        const { state } = this
        const { props } = this
        if (!props.toDo) {
            return <div></div>

        }

        return (
            <div style={{ border: 0 }} className="toDoList-contaner" >

                <textarea
                    name={state.toDo.txtId}
                    type="text"
                    className="txt-container"
                    value={props.toDo.txt}
                    onChange={this.props.handlerChange}
                    style={{ width: props.txtLength }} />
                <FontAwesome
                    onClick={() => props.removeTodo(props.todoParentId, state.toDo.txtId)}
                    className="fas fa-trash"
                    name="fas fa-trash"
                    size="2x"
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: '30px' }}
                />
            </div>

        )
    }
}
