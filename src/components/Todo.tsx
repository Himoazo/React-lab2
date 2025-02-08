import React from 'react'

const Todo = ({todo} : {todo: any}) => {
  return (
    <div>
    <h2>{todo.todo_name}</h2>
    <p>{todo.description}</p>
    <span>{todo.status }</span>
  </div>
  )
}

export default Todo