import React, { Component } from 'react';
import './Header.css'
import './Todo.css';
class Header extends Component {
  state = {  } 
  render() { 
    return (
      <div className="top-div-header">
        <h1>TODO</h1>
        <div id="theme-icon" className="cursor">
          {/* <img src="./images/moon.svg" alt="moon" class="darkImage" /> */}
          {/* <img src="../images/sun-fill.svg" alt="sun" class="lightImage" /> */}
        </div>
      </div>
    );
  }
}
 
export default Header;
