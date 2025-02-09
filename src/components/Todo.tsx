const Todo = ({ todo, getTodos }: { todo: any, getTodos: Function}) => {
  
  const changeStat = async (event: any) => {
    const changedStat = { ...todo, status: Number(event.target.value) }
    
    try {
      const response = await fetch("http://localhost:3000/api/" + todo.id, {
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
    } catch (error) {
      
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
    </div>
  )
}

export default Todo