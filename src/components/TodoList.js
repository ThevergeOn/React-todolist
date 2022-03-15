import React from 'react';
import './TodoList.css';

const TodoList = (props) => {

  const checked = (ckeck) => {
    let classList = "p-element ";
    if (ckeck) {
      classList += 'done-item'
    }
    return classList;
  };
  return (

    <li>
      <div className="inputs">
        <input
          type="checkbox"
          onChange={props.onComplete}
          checked={props.onChecked}
        />

        {props.taskEditing === props.id ?
          (<input
            type='text'
            id="edit-input"
            className="cursor"
            value={props.editingText}
            onChange={props.onChangeInput}

          />)
          :
          (<p
            className={checked(props.onChecked)}>
            {props.title}
          </p>
          )}

      </div>
      <div>

        {props.taskEditing === props.id ?
          (<input type="submit" className={'margin-r pointer'} value="Submit" onClick={props.onSubmitEdit} />) :
          (<input type="submit" className={'margin-r pointer'} value="Edit" onClick={props.onChangingTitle} />)}

        <button type="button" className="close" onClick={props.onRemove}>
          <span>✕</span>
        </button>
      </div>

    </li>
  )
}


export default TodoList;


