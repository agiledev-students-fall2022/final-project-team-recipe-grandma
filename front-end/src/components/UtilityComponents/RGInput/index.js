import * as React from 'react';
import './RGInput.css';

type Props = $ReadOnly<{|
  label?: string,
  onChange?: () => void,
  required?: boolean,
  type?: string,
  value: string
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
    value,
  } = props;
  const className = (value !== '') ? 'rg-input-box rgi-box rgi-labeled' : 'rg-input-box rgi-box';
  return (
    <div className={className}>
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
