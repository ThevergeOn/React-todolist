import React, { Component } from 'react';
import './TodoForm.css';
// import { AiOutlinePlus } from 'react-icons/ai';

class TodoForm extends Component {
  constructor() {
    super()
    this.state = {
      enteredTask: ''
    }
  }
  taskChangeHandler = (event) => {
    this.setState({ enteredTask: event.target.value });
  };
  submitHandler = (event) => {
   const task = `${this.state.enteredTask}`;
    if (task.length > 0) {
      this.props.onSaveTask(task);
    } else {
      alert('Please enter a valid task')
    }
    
    this.setState({ enteredTask:''})
  };

  render() {
    return (
      <div className="form">
        <input
          id="myInput"
          className="inputValue"
          type="text"
          placeholder="Creat a new todo..."
          value={this.state.enteredTask}
          onChange={this.taskChangeHandler}
        />
        <input type='submit' onClick={this.submitHandler} value='Add Task' />
      </div>
    );
  }
}

export default TodoForm;
