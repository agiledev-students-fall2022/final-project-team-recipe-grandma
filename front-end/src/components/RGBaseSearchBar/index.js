import * as React from 'react';
import { useState } from 'react';
import './RGBaseSearchBar.css';

type Props = $ReadOnly<{|
  darken?: boolean,
  onAction?: () => void,
  placeholder?: string
|}>;

const defaultProps = {
  onAction: () => null,
  placeholder: 'Search here',
  darken: true,
};

function RGBaseSearchBar(props: Props): React.Node {
  const [searchBarValue, setSearchBarValue] = useState('');

  const {
    darken,
    onAction,
    placeholder,
  } = props;

  const onChange = (ev) => {
    setSearchBarValue(ev.target.value);
    onAction?.();
  };

  const onKeyDown = (ev) => {
    const { key } = ev;
    if (key === 'Enter') {
      onAction?.();
    }
  };

  const backgroundColor = darken ? '#e0e2e3' : 'white';

  return (
    <span className="rg-base-sb" style={{ backgroundColor }}>
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
