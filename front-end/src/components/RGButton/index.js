import * as React from 'react';
import './RGButton.css';

type Props = $ReadOnly<{|
  isBoxed?: boolean,
  onAction: () => void,
  onKeyDown?: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  text: string,
  width?: string
|}>;

const defaultProps = {
  isBoxed: false,
  onKeyDown: () => null,
  width: '100%',
};

function RGButton(props: Props): React.Node {
  const {
    isBoxed,
    onAction,
    onKeyDown,
    text,
    width,
  } = props;

  const className = isBoxed ? 'rg-base-button rg-boxed-button' : 'rg-base-button';

  return (
    <button
      onKeyDown={onKeyDown}
      type="button"
      className={className}
      onClick={onAction}
      style={{ width }}
    >
      {text}
    </button>
  );
}

RGButton.defaultProps = defaultProps;

export default RGButton;
