import * as React from 'react';
import { useState } from 'react';
import './RGBaseSearchBar.css';

type Props = $ReadOnly<{|
  darken?: boolean,
  hasBorder?: boolean,
  onAction?: (search: string) => void,
  placeholder?: string
|}>;

const defaultProps = {
  hasBorder: false,
  onAction: () => null,
  placeholder: 'Search here',
  darken: false,
};

function RGBaseSearchBar(props: Props): React.Node {
  const [searchBarValue, setSearchBarValue] = useState('');

  const {
    darken,
    hasBorder,
    onAction,
    placeholder,
  } = props;

  const onChange = (ev) => {
    setSearchBarValue(ev.target.value);
    onAction?.(ev.target.value);
  };

  const onKeyDown = (ev) => {
    const { key } = ev;
    if (key === 'Enter') {
      onAction?.();
    }
  };

  const backgroundColor = darken ? '#e0e2e3' : '#f8f9fa';
  const border = hasBorder ? '1px solid #d3d3d3' : '1px solid #f8f9fa';

  return (
    <span className="rg-base-sb" style={{ backgroundColor, border }}>
      <span className="material-icons-outlined">
        search
      </span>
      <input
        onKeyDown={onKeyDown}
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
