import * as React from 'react';

type Props = $ReadOnly<{|
  text: string,
  onAction: () => void
|}>;

function IngredientListItem(props: Props): React.Node {
  const {
    text,
    onAction,
  } = props;

  return (
    <li className="list-group-item">
      <div className="list-box">
        <p className="left">{text}</p>
        <button type="button" className="right" onClick={onAction}>
          remove
        </button>
        <div className="clear" />
      </div>
    </li>
  );
}

export default IngredientListItem;
