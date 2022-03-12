import React, { Component } from 'react';
import './TodoList.css';
// import { FcCheckmark } from "react-icons/fc";
// import { TiEdit } from 'react-icons/ti';

class TodoList extends Component {

  constructor() {
    super()
    this.state = {}
  }

  checked = (ckeck) => {
    let classList = "p-element ";
    if (ckeck) {
      classList += 'done-item'
    }
    return classList;
  }

  // if(taskObject.active) {
  //   checkBox.checked = taskObject.active;
  // }
// checkHandler=()=>{
//   if (ckeck){
//     checked=
//   }
// }
  render() {
    return (
      <li>
        <div className="cursor inputs">
          <input
            type="checkbox"
            onChange={this.props.onComplete}
            Checked={this.props.completed}
          />

          {this.props.taskEditing === this.props.id ?
            (<input
              type='text'
              id="edit-input"
              value={this.props.editingText}
              onChange={this.props.onChangeInput}
              
            />)
            :
            (<p
              className={this.checked(this.props.onChecked)}>
              {this.props.title}
            </p>
            )}

        </div>
        <div>

          {this.props.taskEditing === this.props.id ?
            (<input type="submit" className={'margin-r'} value="Submit" onClick={this.props.onSubmitEdit} />) :
            (<input type="submit" className={'margin-r'} value="Edit" onClick={this.props.onChangingTitle} />)}

          <button type="button" className="close" onClick={this.props.onRemove}>
            <span>✕</span>
          </button>
        </div>

      </li>
    );
  }
}

export default TodoList;


