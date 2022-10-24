import * as React from 'react';

type Props = $ReadOnly<{|
  onAction: () => void,
  text: string,
  className: string
|}>;

function CustomButton(props: Props): React.Node {
  const { onAction, className, text } = props;
  return (
    <button
      type="button"
      onClick={() => onAction()}
      className={className}
    >
      {text}
    </button>
  );
}

export default CustomButton;
