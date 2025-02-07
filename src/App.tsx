import './App.css'
import { useState, useEffect } from 'react'

interface TodosInterface {
  id: number,
  todo_name: string,
  description: string,
  status: string
}



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
      <div>
        {
          todos.map((todo) => (
            <div key={todo.id}>
              <h2>{todo.todo_name}</h2>
              <p>{todo.description}</p>
              <span>{todo.status }</span>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default App
