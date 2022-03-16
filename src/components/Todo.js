import React, { useEffect, useState } from 'react';
import Header from './Header'
import TodoForm from './TodoForm';
import TodoList from './TodoList'
import './Todo.css';

const Todo = () => {
  const [filterTodo, setFilterTodo] = useState([]);
  const [arrayOfTask, setArrayOfTask] = useState([]);
  const [status, setStatus] = useState('all');
  const [taskEditing, setTaskEditing] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [itemsLeft, setItemsLeft] = useState(0);

  useEffect(() => {
    getLocalTodos()
  }, []);
  useEffect(() => {
    filterHandler();
    handleShow(arrayOfTask);
    saveLocalTodos();
  }, [arrayOfTask, status]);
  const saveTask = (enteredTask) => {
    const currentTask = {
      title: enteredTask,
      id: Math.random().toString(),
      completed: false,
      active: true
    };
    setArrayOfTask([
      ...arrayOfTask, currentTask
    ]);
  };
  const handleRemove = (id) => {
    setArrayOfTask(arrayOfTask.filter(element => element.id !== id));
  };
  const handleCompleted = (id) => {
    const updatedArrayOfTask = arrayOfTask.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
        task.active = !task.active;
      }
      return task;
    })
    setArrayOfTask(updatedArrayOfTask);
  };
 onst editTask = (id) => {
    const updatedArrayOfTask=arrayOfTask.map((task) => {
      if (task.id === id) {
        if (editingText.length > 0) {
          task.title = editingText;
        } else {
          alert('Please enter a valid task')
        }

      }
      return task;
    })
    setArrayOfTask(updatedArrayOfTask);
    setTaskEditing(null);
  };
  const handleClearCompleted = () => {
    setArrayOfTask(arrayOfTask.filter(element => element.completed !== true));
  };
  const handleShow = (array) => {
    let updatedArrayOfTask = array.filter(element => (element.completed !== true))
    setItemsLeft(updatedArrayOfTask.length)
  };
  const filterHandler = () => {
    let active = arrayOfTask.filter(element => (element.active === true));
    let complete = arrayOfTask.filter(element => (element.completed === true));
    switch (status) {
      case 'completed':
        setFilterTodo(complete);
        break;
      case 'active':
        setFilterTodo(active);
        break;
      default:
        setFilterTodo(arrayOfTask)
        break;
    }
  };
  const saveLocalTodos = () => {
    localStorage.setItem('arrayOfTask', JSON.stringify(arrayOfTask));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem('arrayOfTask') === null) {
      localStorage.setItem('arrayOfTask', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('arrayOfTask'));
      setArrayOfTask(todoLocal);
    }
  };
  return (
    <section>
      <Header />
      <TodoForm onSaveTask={saveTask} />
      <div className={'main-div'}>
        <ul className="todo-list-items" id="ul-list">
          {filterTodo.map((task) => (
            <TodoList
              onRemove={() => handleRemove(task.id)}
              onComplete={() => handleCompleted(task.id)}
              onChecked={task.completed}
              onSubmitEdit={() => editTask(task.id)}
              onChangeInput={(e) => setEditingText(e.target.value)}
              onChangingTitle={() => {
                return (
                  setTaskEditing(task.id),
                  setEditingText(task.title)
                )
              }}
              editingText={editingText}
              taskEditing={taskEditing}
              title={task.title}
              key={task.id}
              id={task.id}
            />
          ))}

        </ul>

        <div className="main-div-bottom">
          <button
            type="button"
            className="link-button"
          >
            <span >{itemsLeft}</span> items left

          </button>

          <button
            type="button"
            className="link-button format"
            onClick={handleClearCompleted}
          >
            Clear Completed
          </button>
        </div>
      </div>

      <ul className="bottom-div">
        <li id="all">
          <button
            type="button"
            className="link-button"
            onClick={() => setStatus('all')}
          >
            All
          </button>
        </li>
        <li id="active">
          <button
            type="button"
            className="link-button"
            onClick={() => setStatus('active')}
          >
            Active
          </button>
        </li>
        <li id="completed">
          <button
            type="button"
            className="link-button"
            onClick={() => setStatus('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    </section>

  );
};

export default Todo;
