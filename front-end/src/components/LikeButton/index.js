import * as React from 'react';
import './LikeButton.css';

// type Props = $ReadOnly<{|
// //   className?: string,
//   disabled?: boolean,
//   isBoxed?: boolean,
//   isFlat?: boolean,
//   onAction: () => void,
//   onKeyDown?: (ev: SyntheticEvent<HTMLButtonElement>) => void,
//   text: string,
//   width?: string
// |}>;

const defaultProps = {
  className: '',
  disabled: false,
  isBoxed: false,
  isFlat: false,
  onKeyDown: () => null,
  width: '200%',
};

function LikeButton(props: Props): React.Node {
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

  const disabledClassName = disabled ? `like-base-button ${className} disabled` : `like-base-button ${className}`;
  const boxClassName = isBoxed ? `like-boxed-button ${disabledClassName}` : disabledClassName;
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

LikeButton.defaultProps = defaultProps;

export default LikeButton;
