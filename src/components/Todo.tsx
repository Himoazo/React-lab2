import { TodosInterface } from "../Interfaces/TodosInterface";
import { useState } from "react";
import './Todo.css';

const Todo = ({ todo, getTodos }: { todo: TodosInterface, getTodos: Function }) => {
  //Error state
  const [error, setError] = useState<string | null>(null);

  //Change Todo status
  const changeStat = async (event: any) => {
    const changedStat = { ...todo, status: Number(event.target.value) }
    
    try {
      const response = await fetch("https://react-api-express5.up.railway.app/api/" + todo.id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(changedStat)
      });
    
    if (!response.ok) {
      throw Error;
      } 
    
      getTodos();
      setError(null);
    } catch (error) {
      setError("Ett fel har inträffats");
    }
  }

  //Delete Todo
  const deleteTodo = async (id?: number) => {
    try {
      const response = await fetch("https://react-api-express5.up.railway.app/api/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      });

      if (!response.ok) {
        throw Error;
        } 
      
      getTodos();
      setError(null);
    } catch (error) {
      setError("Det gick inte att ta bort, försök igen");
    }
  }

  return (
  <div className="Todos" style={{backgroundColor: todo.status === 0 ? "#FFDDDD" : todo.status === 1 ? "#FFFFCC"
    : todo.status === 2 ? "#DDEEFF" : "white" }}>
    <h2>{todo.todo_name}</h2>
    <p className="description">{todo.description}</p>
    <span className="status">{todo.status === 0 ? "Ej påbörjad" : todo.status === 1 ? "Påbörkad"
      : todo.status === 2 ? "Avklarad" : "Ogilltig status"}</span>
    
    <form className="updateStatus">
      <label htmlFor="status">Uppdatera status</label>
      <select name="status" id="status" defaultValue={todo.status} onChange={changeStat}>
        <option value="0">Ej påbörjad</option>
        <option value="1">Påbörjad</option>
        <option value="2">Avklarad</option>
      </select>
    </form>
    <button className="delBtn" onClick={() => { deleteTodo(todo.id) }}>Ta bort</button>
    
    {error && <p className='errorMsg'>{error}</p>}
  </div>
  )
}


export default Todo