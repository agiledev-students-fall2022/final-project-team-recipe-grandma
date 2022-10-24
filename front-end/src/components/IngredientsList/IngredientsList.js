import './IngredientsList.css';
import * as React from 'react';

type Props = $ReadOnly<{|
  ingredients: Array<string>,
  onAction: (ingredient: int) => void
|}>;

function IngredientsList(prop: Props): React.Node {
  const { ingredients, onAction } = prop;
  return (
    <div>
      <h4>Added Ingredients List</h4>
      <ul className="list-group">
        {ingredients.map((item, i) => (
          <li key={i} className="list-group-item">
            <div className="list-box">
              <p className="left">{item}</p>
              <button type="button" className="right" onClick={() => onAction(i)}>
                remove
              </button>
              <div className="clear" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsList;
