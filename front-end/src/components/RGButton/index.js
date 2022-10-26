import * as React from 'react';
import './RGButton.css';

type Props = $ReadOnly<{|
  onAction: () => void,
  text: string,
  width: string
|}>;

function RGButton(props: Props): React.Node {
  const {
    onAction,
    text,
    width,
  } = props;

  return (
    <button type="button" className="rg-button" onClick={onAction} style={{ width }}>
      {text}
    </button>
  );
}

export default RGButton;
