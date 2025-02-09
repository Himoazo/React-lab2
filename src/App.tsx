import './App.css'
import { useState, useEffect } from 'react'
import Todo from './components/Todo'
import { TodosInterface } from './Interfaces/TodosInterface';
import TodoForm from './components/TodoForm';



function App() {
  // States
  const [todos, setTodos] = useState<TodosInterface[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
useEffect(() => {
  getTodos();
}, []);

const getTodos = async () => {
  try {
    setLoader(true);

    const response = await fetch("http://localhost:3000/api/");
    
    if (!response.ok) {
      throw Error;
    } else {
      const data = await response.json();
      
      setTodos(data);
      setError(null);
    }
  } catch (error) {
    console.log(error);
    setError("Ett fel har inträffats");
  } finally {
    setLoader(false);
  }
}

  return (
    <main>
      <h1>Todo list</h1>

      {
        error && <p className='errorMsg'>{error}</p>
      }

      {
        loader && <p className=""> Hämtar todos...</p>
      }
      <TodoForm />
      <div>
        {
          todos.map((todo) => (
            <Todo todo={todo} key={todo.id} getTodos={ getTodos } />
          ))
        }
      </div>
    </main>
  )
}

export default App
