import * as React from 'react';
import './RGButton.css';

type Props = $ReadOnly<{|
  className?: string,
  isBoxed?: boolean,
  isFlat?: boolean,
  onAction: () => void,
  onKeyDown?: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  text: string,
  width?: string
|}>;

const defaultProps = {
  className: '',
  isBoxed: false,
  isFlat: false,
  onKeyDown: () => null,
  width: '100%',
};

function RGButton(props: Props): React.Node {
  const {
    className,
    isBoxed,
    isFlat,
    onAction,
    onKeyDown,
    text,
    width,
  } = props;

  const handleKeyDown = (ev) => {
    onAction?.();
    onKeyDown?.(ev);
  };

  const boxClassName = isBoxed ? `rg-base-button rg-boxed-button ${className}` : `rg-base-button ${className}`;
  const finalClassName = isFlat ? `${boxClassName} flat` : boxClassName;

  return (
    <button
      onKeyDown={handleKeyDown}
      type="button"
      className={finalClassName}
      onClick={onAction}
      style={{ width }}
    >
      {text}
    </button>
  );
}

RGButton.defaultProps = defaultProps;

export default RGButton;
