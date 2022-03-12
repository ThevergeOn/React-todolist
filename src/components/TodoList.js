import React, { Component } from 'react';
import './TodoList.css';

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

 
  render() {
    return (
      <li>
        <div className="inputs">
          <input
            type="checkbox"
            onChange={this.props.onComplete}
            checked={this.props.onChecked}
          />

          {this.props.taskEditing === this.props.id ?
            (<input
              type='text'
              id="edit-input"
              className="cursor"
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
            (<input type="submit" className={'margin-r pointer'} value="Submit" onClick={this.props.onSubmitEdit} />) :
            (<input type="submit" className={'margin-r pointer'} value="Edit" onClick={this.props.onChangingTitle} />)}

          <button type="button" className="close" onClick={this.props.onRemove}>
            <span>✕</span>
          </button>
        </div>

      </li>
    );
  }
}

export default TodoList;


