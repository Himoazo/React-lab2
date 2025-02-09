import { TodosInterface } from "../Interfaces/TodosInterface";
import { useState } from "react";

const Todo = ({ todo, getTodos }: { todo: TodosInterface, getTodos: Function }) => {
  //Error state
  const [error, setError] = useState<string | null>(null);
  const changeStat = async (event: any) => {
    const changedStat = { ...todo, status: Number(event.target.value) }
    
    try {
      const response = await fetch("http://localhost:3000/apis/" + todo.id, {
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

  const deleteTodo = async (id?: number) => {
    try {
      const response = await fetch("http://localhost:3000/api/" + id, {
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
    <div>
      <h2>{todo.todo_name}</h2>
      <p>{todo.description}</p>
      <span>{todo.status === 0 ? "Ej påbörjad" : todo.status === 1 ? "Påbörkad"
        : todo.status === 2 ? "Avklarad" : "Ogilltig status"}</span>
      
      <form>
        <label htmlFor="status">Uppdatera status</label>
        <select name="status" id="status" defaultValue={todo.status} onChange={changeStat}>
          <option value="0">Ej påbörjad</option>
          <option value="1">Påbörjad</option>
          <option value="2">Avklarad</option>
        </select>
      </form>
      <button onClick={() => { deleteTodo(todo.id) }}>Ta bort</button>
      
      {error && <p className='errorMsg'>{error}</p>}
    </div>
  )
}


export default Todo