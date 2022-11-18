import * as React from 'react';
import './RGInput.css';

type Props = $ReadOnly<{|
  error?: boolean,
  label?: string,
  onChange?: () => void,
  required?: boolean,
  placeholder?: string,
  type?: string,
  value: string
|}>;

const defaultProps = {
  label: '',
  onChange: () => null,
  required: false,
  error: false,
  type: 'text',
  placeholder: null,
};

function RGInput(props: Props): React.Node {
  const {
    error,
    label,
    onChange,
    required,
    type,
    value,
    placeholder,
  } = props;
  const baseClassName = (value !== '') ? 'rg-input-box rgi-box rgi-labeled' : 'rg-input-box rgi-box';
  const placeholderClassName = placeholder && placeholder !== '' ? `${baseClassName} raised` : baseClassName;
  const className = error ? `${placeholderClassName} rgi-error` : placeholderClassName;
  return (
    <div className={className}>
      <input
        onChange={onChange}
        type={type}
        required={required}
        placeholder={placeholder}
      />
      <span>{label}</span>
    </div>
  );
}

RGInput.defaultProps = defaultProps;

export default RGInput;
