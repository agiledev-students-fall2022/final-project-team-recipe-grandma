import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = $ReadOnly<{|
  routePath: string,
  icon: string,
  currentSelection: string,
  text: string,
  onAction?: (route: string) => void
|}>;

const DefaultProps = {
  onAction: () => null,
};

function NavbarListItem(props: Props): React.Node {
  const {
    routePath,
    icon,
    text,
    currentSelection,
    onAction,
  } = props;
  const isActive = `rg-nav-item ${currentSelection === text ? 'active' : ''}`;

  const handleAction = () => {
    onAction?.(text);
  };

  return (
    <button className={isActive} onClick={handleAction} onKeyDown={handleAction} type="button">
      <li>
        <Link className="rg-nav-link" to={routePath}>
          <span className="rg-nav-icon">
            <span className="rg-icon material-icons-outlined">
              {icon}
            </span>
          </span>
          <span className="rg-nav-text">{text}</span>
        </Link>
      </li>
    </button>
  );
}

NavbarListItem.defaultProps = DefaultProps;

export default NavbarListItem;
