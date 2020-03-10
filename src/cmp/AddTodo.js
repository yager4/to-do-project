import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'



export default class AddTodo extends Component {

    state = {
        txt: '',
        todoId: ''
    }

    componentDidMount() {
        const { props } = this
        this.setState({ todoId: props.todoId })
    }

    handleOnChange = (ev) => {
        const value = ev.target.value
        this.setState({ txt: value })

    }



    render() {
        const { props, state } = this
        return (
            <div className="addTodo-container">
                <textarea value={this.state.txt} onChange={this.handleOnChange}>
                </textarea>
                <div>
                    <Button onClick={() => {
                        this.setState({txt:''})
                        props.addTodo(state.txt, state.todoId)
                    }} animated='vertical'>
                        <Button.Content hidden>save</Button.Content>
                        <Button.Content visible>
                            <Icon name='save' size={'big'} />
                        </Button.Content>
                    </Button>
                </div>


            </div>
        )
    }
}
