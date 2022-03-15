import React, { useState } from 'react';
import './TodoForm.css';
// import { AiOutlinePlus } from 'react-icons/ai';
const  TodoForm=(props)=>{
  const [enteredTask, setEnteredTask]=useState('');

  const taskChangeHandler = (event) => {
    setEnteredTask(event.target.value)
  };
  const submitHandler = (event) => {
    const task = enteredTask;
    if (task.length > 0) {
      props.onSaveTask(task);
    } else {
      alert('Please enter a valid task')
    }
    setEnteredTask('')
  };
  return(
     <div className="form">
        <input
          id="myInput"
          className="inputValue"
          type="text"
          placeholder="Creat a new todo..."
          value={enteredTask}
          onChange={taskChangeHandler}
        />
        <input type='submit' onClick={submitHandler} value='Add Task' />
      </div>
  )
}

export default TodoForm;
