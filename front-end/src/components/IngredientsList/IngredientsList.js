import * as React from 'react';

import IngredientListItem from '../IngredientListItem';
import './IngredientsList.css';

type Props = $ReadOnly<{|
  ingredients: Array<string>,
  onAction: (ingredientIndex: int) => void
|}>;

function IngredientsList(prop: Props): React.Node {
  const { ingredients, onAction } = prop;

  return (
    <div>
      <h3>Added Ingredients List</h3>
      <ul className="list-group">
        {ingredients.map((item, i) => (
          <IngredientListItem key={i} text={item} onAction={() => onAction(i)} />
        ))}
      </ul>
    </div>
  );
}

export default IngredientsList;
