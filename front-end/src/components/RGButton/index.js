import * as React from 'react';
import './RGButton.css';

type Props = $ReadOnly<{|
  isBoxed?: boolean,
  onAction: () => void,
  text: string,
  width?: string
|}>;

const defaultProps = {
  isBoxed: false,
  width: '100%',
};

function RGButton(props: Props): React.Node {
  const {
    isBoxed,
    onAction,
    text,
    width,
  } = props;

  const className = isBoxed ? 'rg-base-button rg-boxed-button' : 'rg-base-button';

  return (
    <button type="button" className={className} onClick={onAction} style={{ width }}>
      {text}
    </button>
  );
}

RGButton.defaultProps = defaultProps;

export default RGButton;
