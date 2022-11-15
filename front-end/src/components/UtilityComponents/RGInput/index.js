import * as React from 'react';
import './RGInput.css';

type Props = $ReadOnly<{|
  label?: string,
  onChange?: () => void,
  required?: boolean,
  type?: string
|}>;

const defaultProps = {
  label: '',
  onChange: () => null,
  required: false,
  type: 'text',
};

function RGInput(props: Props): React.Node {
  const {
    label,
    onChange,
    required,
    type,
  } = props;
  return (
    <div className="rg-input-box rgi-box">
      <input
        onChange={onChange}
        type={type}
        required={required}
      />
      <span>{label}</span>
    </div>
  );
}

RGInput.defaultProps = defaultProps;

export default RGInput;
