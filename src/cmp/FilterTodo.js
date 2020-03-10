import React from 'react'
import { Input } from 'semantic-ui-react'

export default function filterTodo(props) {
    return (
        <div className="filter-container">
            <Input onChange={(ev)=>props.handleFilter(ev.target.value)} placeholder='Search...' />
        </div>
    )
}

