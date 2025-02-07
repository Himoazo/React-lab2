import './App.css'
import { useState } from 'react'

interface TodosInterface {
  _id: number,
  todoTitle: string,
  description: string,
  status: string
}

// States
const [todos, setTodos] = useState<TodosInterface[] | []>([]);

const getTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/");

    if (!response.ok) {
      throw Error;
    } else {
      const data = await response.json();

      setTodos(data);
    }
  } catch (error) {
    
  }
}

function App() {
  

  return (
    <>
      <h1>Todo list</h1>
    </>
  )
}

export default App
