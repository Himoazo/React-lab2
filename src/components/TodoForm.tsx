import  { useState, useContext} from 'react'
import { TodosInterface } from '../Interfaces/TodosInterface'
import { FormErros } from '../Interfaces/FormErrors'
import { AppContext } from '../App'
import './TodoForm.css'

const TodoForm = () => {
  //States Todo creation & validation
    const [CreateTodoForm, setCreateTodoForm] = useState<TodosInterface>({todo_name: "", description: "", status: 0})
    const [formErrors, setFormErrors] = useState<FormErros>({})
  // Import getTodos from App.tsx using context
  const { getTodos } = useContext(AppContext);

  //Validation
  const validateForm = (event: any) => {
    event.preventDefault();
    
    const formValidation: FormErros = {};

    if (!CreateTodoForm.todo_name || CreateTodoForm.todo_name.length < 3 || CreateTodoForm.todo_name.length > 50) {
      formValidation.todo_name = "Todo namn måste anges och vara mellan 3 och 50 tecken";
    }

    if (CreateTodoForm.description.length > 200) {
      formValidation.description = "Beskrivning kan inte vara längre än 200 tecken";
    }

    if (CreateTodoForm.status === undefined || CreateTodoForm.status === null || CreateTodoForm.status < 0
      || CreateTodoForm.status > 2) {
      formValidation.status = "Status kan endast vara 'Ej påbörjad', 'Påbörjad' eller 'Avklarad'"
    }

    if (Object.keys(formValidation).length > 0) {
      setFormErrors(formValidation);
    } else {
      setFormErrors({});
      createTodo();
    }
  }
  
  //Create todo
  const createTodo = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(CreateTodoForm)
      });
    
    if (!response.ok) {
      if (response.status === 422) {
          throw "Denna todo finns redan";
      } else if (response.status === 500) {
        throw "Server fel, försök igen senare";
      } else {
        throw "Ett fel har inträffats, försök igen";
        }
      } 
    
      getTodos();
      setCreateTodoForm({ todo_name: "", description: "", status: 0 });
      setFormErrors({});
    } catch (error: any) {
      setFormErrors({ Error: error || "Ett fel har inträffats"});
    }  
  }

  return (
    <form className='createTodo' onSubmit={validateForm}>
      <label htmlFor='todo_name'>Todo: </label> 
          <input type="text" name="todo_name" id='todo_name' value={CreateTodoForm.todo_name}
             onChange={(event)=> setCreateTodoForm({...CreateTodoForm, todo_name: event.target.value})}  minLength={3} maxLength={30} />
        {formErrors?.todo_name && <span className='errorMsg'> {formErrors.todo_name} </span> }

      <label htmlFor='description'>Beskrivning: </label>
          <textarea typeof='text' name="description" id='description' value={CreateTodoForm.description}
             onChange={(event)=> setCreateTodoForm({...CreateTodoForm, description: event.target.value})} /* maxLength={200} */ />
        {formErrors?.description && <span className='errorMsg'> {formErrors.description} </span> }

      <label htmlFor='status'>Status: </label>
        <select name="status" id='status' value={CreateTodoForm.status} onChange={(event)=> setCreateTodoForm({...CreateTodoForm, status: Number(event.target.value)})} >
          <option value="0">Ej påbörjad</option>
          <option value="1">Påbörjad</option>
          <option value="2">Avklarad</option>
        </select>
        {formErrors?.status && <span className='errorMsg'> {formErrors.status} </span>}
      
        {formErrors?.Error && <span className='errorMsg'> {formErrors.Error} </span> }
      <button type="submit">Create Todo</button>
    </form>
  )
}

export default TodoForm