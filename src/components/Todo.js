import React, { Component } from 'react';
import Header from './Header'
import TodoForm from './TodoForm';
import TodoList from './TodoList'
import './Todo.css';
class Todo extends Component {


  constructor() {
    super()
    this.state = {
      filterTodo: [],
      arrayOfTask: [],
      filterStatus: 'all',
      taskEditing: null,
      editingText: '',
      itemsLeft: 0,
      checked:false
    }
  }



  saveTask = (enteredTask) => {
    const currentTask = {
      title: enteredTask,
      id: Math.random().toString(),
      completed: false,
      active: true
    };

    this.setState(
       [{ arrayOfTask: this.state.arrayOfTask.push(currentTask) }],
      () => { this.handleShow(this.state.arrayOfTask)}
        );
    this.handleShow(this.state.arrayOfTask);
  };
 

  handleRemove = (id) => {
    const updatedArrayOfTask = this.state.arrayOfTask.filter(element => (element.id !== id))
    this.setState(
      { arrayOfTask: updatedArrayOfTask },
      () => { this.handleShow(this.state.arrayOfTask) }
    )
  }

  handleCompleted = (id) => {
    const updatedArrayOfTask = this.state.arrayOfTask.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
        task.active = !task.active;
        this.setState({ checked: !task.completed})
      }
      return task;
    })
    this.setState([{ arrayOfTask: updatedArrayOfTask }])
    this.handleShow(updatedArrayOfTask)
  }

  editTask = (id) => {
    const updatedArrayOfTask = this.state.arrayOfTask.map((task) => {
      if (task.id === id) {
        task.title = this.state.editingText
      }
      return task;
    })
    this.setState({ arrayOfTask: updatedArrayOfTask });
    this.setState({ taskEditing: null })
    this.setState({ editingText: '' })

  }
  handleClearCompleted = () => {
    let updatedArrayOfTask = this.state.arrayOfTask.filter(element => (element.completed !== true));
    this.setState({ arrayOfTask: updatedArrayOfTask })
    this.handleShow(updatedArrayOfTask)
  }
  handleShow = (array) => {
    let updatedArrayOfTask = array.filter(element => (element.completed !== true))
    this.setState({ itemsLeft: updatedArrayOfTask.length })
  }


  filterHandler = (status) => {
    // let active = this.state.arrayOfTask.filter(element => (element.active === true));
    // let complete = this.state.arrayOfTask.filter(element => (element.completed === true));
    // switch (status) {
    //   case 'completed':
    //     this.setState({filterTodo: complete});
    //     break;
    //   case 'active':
    //     this.setState({filterTodo: active});
    //     break;
    //   case 'all':
    //     this.setState({ filterTodo: this.state.arrayOfTask});
    //     break;
    //   default:
    //     this.setState({filterTodo:this.state.arrayOfTask})
    //     break;
    // }
    this.setState({ filterStatus: status })
  }



  render() {
    return (
      <section>
        <Header />
        <TodoForm onSaveTask={this.saveTask} />
        <div className={'main-div'}>
          <ul className="todo-list-items" id="ul-list">

            {this.state.arrayOfTask.map((task) => {
              if(this.state.filterStatus==='completed'){
                if(!task.completed){
                  return null ;
                  }
              }
              if (this.state.filterStatus === 'active') {
                if (!task.active) {
                  return null;
                }
              }
              return (
                <TodoList
                  onRemove={() => this.handleRemove(task.id)}
                  onComplete={() => this.handleCompleted(task.id)}
                  onChecked={task.completed}
                  onSubmitEdit={() => this.editTask(task.id)}
                  onChangeInput={(e) => this.setState({ editingText: e.target.value })}
                  onChangingTitle={() => { this.setState({ taskEditing: task.id }) }}
                  editingText={this.state.editingText}
                  taskEditing={this.state.taskEditing}
                  title={task.title}
                  key={task.id}
                  id={task.id}
                  completed={this.state.checked}
                />
              )
            }
           )}
          </ul>

          <div className="main-div-bottom">
            <button
              type="button"
              className="link-button"
            >
              <span >{this.state.itemsLeft}</span> items left

            </button>

            <button
              type="button"
              className="link-button format"
              onClick={this.handleClearCompleted}
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
              onClick={() => this.filterHandler('all')}
            >
              All
            </button>
          </li>
          <li id="active">
            <button
              type="button"
              className="link-button"
              onClick={() => this.filterHandler('active')}
            >
              Active
            </button>
          </li>
          <li id="completed">
            <button
              type="button"
              className="link-button"
              onClick={() => this.filterHandler('completed')}
            >
              Completed
            </button>
          </li>
        </ul>
      </section>

    );
  }
}

export default Todo;

// const Todo = () => {
//   const [arrayOfTask, setArrayOfTask] = useState([]);
//   const [taskEditing, setTaskEditing] = useState(null);
//   const [editingText, setEditingText] = useState('');
//   useEffect(()=>{
//     const json = localStorage.getItem('arrayOfTask');
//     const loadtTask =JSON.parse(json)
//     if (loadtTask){
//       setArrayOfTask(loadtTask)
//     }
//   },[])
//   useEffect(()=>{
//     const json = JSON.stringify(arrayOfTask)
//     localStorage.setItem('arrayOfTask' ,json)
//   },[arrayOfTask])
//   const saveTask = (enteredTask) => {
//     const currentTask = {
//       title: enteredTask,
//       id: Math.random().toString(),
//       completed: false,
//       active: false
//     };
//     setArrayOfTask(prevTask => [...prevTask, currentTask]);

//   };
//   const handleRemove = (id) => {
//     const updatedArrayOfTask = arrayOfTask.filter(element => (element.id !== id))
//     setArrayOfTask(updatedArrayOfTask)
//   }
//   const handleCompleted = (id) => {
//     const updatedArrayOfTask = arrayOfTask.map((task) => {
//       if (task.id === id) {
//         task.completed = !task.completed;
//       }
//       return task;
//     })
//     setArrayOfTask(updatedArrayOfTask)
//   }
//   const editTask = (id) => {
//     const updatedArrayOfTask = arrayOfTask.map((task)=>{
//       if (task.id===id){
//         task.title=editingText
//       }
//       return task;
//     })
//     setArrayOfTask(updatedArrayOfTask);
//     setTaskEditing(null);
//     setEditingText('')
//   }
//   return (
//     <section>
//       <Header />
//       <TodoForm onSaveTask={saveTask} />
//       <ul className="todo-list-items" id="ul-list">
//         {arrayOfTask.map((task) => (
//           <TodoList
//             onRemove={() => handleRemove(task.id)}
//             onComplete={() => handleCompleted(task.id)}
//             onChecked={task.completed}
//             changeText={() => { setTaskEditing(task.id) }}
//             editingText={editingText}
//             taskEditing={taskEditing}
//             changeHandler={(e) => setEditingText(e.target.value)}
//             editTask={() => (editTask(task.id))}
//             item={task.title}
//             key={task.id}
//             id={task.id}
//           />
//         ))}
//       </ul>

//     </section>

//   )
// }
// export default Todo;