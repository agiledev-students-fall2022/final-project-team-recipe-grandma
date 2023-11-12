import * as React from 'react';
import './RGButton.css';

type Props = $ReadOnly<{|
  className?: string,
  disabled?: boolean,
  isBoxed?: boolean,
  isFlat?: boolean,
  onAction: () => void,
  onKeyDown?: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  text: string,
  width?: string
|}>;

const defaultProps = {
  className: '',
  disabled: false,
  isBoxed: false,
  isFlat: false,
  onKeyDown: () => null,
  width: '100%',
};

function RGButton(props: Props): React.Node {
  const {
    className,
    disabled,
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

  const disabledClassName = disabled ? `rg-base-button ${className} disabled` : `rg-base-button ${className}`;
  const boxClassName = isBoxed ? `rg-boxed-button ${disabledClassName}` : disabledClassName;
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
