import * as React from 'react';

type Props = $ReadOnly<{|
  onAction: () => void,
  text: string
|}>;

function Button(props: Props): React.Node {
  const { onAction, text } = props;
  return (
    <button
      type="button"
      onClick={() => onAction()}
    >
      {text}
    </button>
  );
}

export default Button;
