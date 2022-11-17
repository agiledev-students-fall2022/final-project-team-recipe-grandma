import * as React from 'react';
import './RGInput.css';

type Props = $ReadOnly<{|
  error?: boolean,
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
  error: false,
  type: 'text',
};

function RGInput(props: Props): React.Node {
  const {
    error,
    label,
    onChange,
    required,
    type,
    value,
  } = props;
  const baseClassName = (value !== '') ? 'rg-input-box rgi-box rgi-labeled' : 'rg-input-box rgi-box';
  const className = error ? `${baseClassName} rgi-error` : baseClassName;
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
