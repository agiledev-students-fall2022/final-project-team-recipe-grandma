import { useState } from "react";
import "./IngredientsList.css";
import * as React from 'react';

export default function IngredientsList() {
  var initialState = ["apple", "peach"];
  // var noIngredients = false;
  var [state, setState] = useState(initialState);

  function removeItem(index) {
    // var newState = state.splice(index, 1);
    setState((oldState) => oldState.filter((_, i) => i !== index));

    console.log(state);
  }

  return (
    <ul className="list-group">
      {state.map((item, i) => {
        return state.length === 0 ? (
          <li className="empty-list">input your ingredients</li>
        ) : (
          <li className="list-group-item">
            <div className="list-box">
              <p className="left">{item}</p>
              <button className="right" onClick={() => removeItem(i)}>
                remove
              </button>
              <div className="clear"></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
