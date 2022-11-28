import * as React from 'react';
import { useState } from 'react';
import './RGBaseSearchBar.css';

type Props = $ReadOnly<{|
  darken?: boolean,
  hasBorder?: boolean,
  onAction?: (search: string) => void,
  onKeyDown?: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onFocus?: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  onBlur?: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  placeholder?: string,
  triggerOnChange?: boolean
|}>;

const defaultProps = {
  hasBorder: false,
  onAction: () => null,
  onKeyDown: () => null,
  onFocus: () => null,
  onBlur: () => null,
  placeholder: 'Search here',
  darken: false,
  triggerOnChange: false,
};

function RGBaseSearchBar(props: Props): React.Node {
  const [searchBarValue, setSearchBarValue] = useState('');

  const {
    darken,
    hasBorder,
    onAction,
    onBlur,
    onFocus,
    onKeyDown,
    placeholder,
    triggerOnChange,
  } = props;

  const onChange = (ev) => {
    setSearchBarValue(ev.target.value);
    if (triggerOnChange) onAction?.(ev.target.value);
  };

  const handleKeyDown = (ev) => {
    const { key } = ev;
    if (key === 'Enter') {
      onAction?.(ev.target.value);
    }
    onKeyDown?.(ev);
  };

  const backgroundColor = darken ? '#e0e2e3' : '#f8f9fa';
  const border = hasBorder ? '1px solid #d3d3d3' : '1px solid #f8f9fa';

  return (
    <span className="rg-base-sb" style={{ backgroundColor, border }}>
      <span className="material-icons-outlined">
        search
      </span>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={searchBarValue}
      />
    </span>
  );
}
RGBaseSearchBar.defaultProps = defaultProps;

export default RGBaseSearchBar;
