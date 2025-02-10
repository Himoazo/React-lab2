import './App.css'
import { useState, useEffect , createContext} from 'react'
import Todo from './components/Todo'
import { TodosInterface } from './Interfaces/TodosInterface';
import TodoForm from './components/TodoForm';
import Header from './components/Header';
import Footer from './components/Footer';

export const AppContext = createContext({getTodos: ()=>{}});

function App() {
  // States Get & Error & loading
  const [todos, setTodos] = useState<TodosInterface[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

useEffect(() => {
  getTodos();
}, []);

  //Get todos
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
    <>
    <Header />
    <main>
      {
        error && <p className='errorMsg'>{error}</p>
      }

      {
        loader && <p className=""> Hämtar todos...</p>
      }
      <AppContext.Provider value={{getTodos}}>
        <TodoForm />
      </AppContext.Provider>
      
      <div className='todoGrid'>
        {
          todos.map((todo) => (
            <Todo todo={todo} key={todo.id} getTodos={ getTodos } />
          ))
        }
      </div>
      </main>
      <Footer />
    </>
  )
}

export default App
