import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';

export const TopbarType = Object.freeze({
  TOPBAR_DEFAULT: 'default',
  TOPBAR_WITH_BACK_BUTON: 'topbar_with_back_button',
});

type Props = $ReadOnly<{|
  elements?: Array<React.Node>,
  leftElement?: React.Node,
  title?: string,
  type?: string,
  hasBackButton?: boolean,
  transparent?: boolean
|}>;

type TopbarWithBackButtonProps = $ReadOnly<{|
  onBackClick?: () => void,
  title?: string,
  menuElements?: Array<React.Node>,
  hasBackButton?: boolean,
  transparent: boolean
|}>;

type TopbarDefaultProps = $ReadOnly<{|
  title: string,
  transparent: boolean
|}>;

const defaultProps = {
  elements: null,
  leftElement: null,
  title: null,
  type: TopbarType.TOPBAR_DEFAULT,
  hasBackButton: true,
  transparent: false,
};

const TopbarWithBackButtonDefaultProps = {
  menuElements: null,
  title: null,
  hasBackButton: true,
  onBackClick: () => null,
};

function TopbarWithBackButton({
  onBackClick,
  title,
  menuElements,
  hasBackButton,
  transparent,
}: TopbarWithBackButtonProps): React.Node {
  const backButton = !hasBackButton ? null : (
    <button
      className="rg-tb-back-btn"
      type="button"
      onClick={onBackClick}
    >
      <span className="rg-tb-icon">
        <span className="rg-icon material-icons">
          arrow_back
        </span>
      </span>
    </button>
  );

  const transparentClassName = transparent ? 'rg-topbar rg-tb-transparent' : 'rg-topbar';
  return (
    <div className={transparentClassName}>
      <div className="rg-tb-left">
        {backButton}
      </div>
      {title ? (
        <div className="rg-tb-title">
          {title}
        </div>
      ) : null}
      <div className="rg-tb-right">
        {menuElements}
      </div>
    </div>
  );
}
TopbarWithBackButton.defaultProps = TopbarWithBackButtonDefaultProps;

function TopbarDefault({
  title,
  transparent,
}: TopbarDefaultProps): React.Node {
  const transparentClassName = transparent ? 'rg-topbar default rg-tb-transparent' : 'rg-topbar default';
  return (
    <div className={transparentClassName}>
      {title ? (
        <div className="rg-tb-title">
          {title}
        </div>
      ) : null}
    </div>
  );
}

function Topbar(props: Props): React.Node {
  const {
    elements,
    hasBackButton,
    leftElement,
    title,
    type,
    transparent,
  } = props;
  const navigate = useNavigate();
  const handleBackButton = () => navigate(-1);

  if (type === TopbarType.TOPBAR_WITH_BACK_BUTON) {
    return (
      <TopbarWithBackButton
        hasBackButton={hasBackButton}
        onBackClick={handleBackButton}
        menuElements={elements}
        leftElement={leftElement}
        title={title}
        transparent={transparent}
      />
    );
  }

  return (
    <TopbarDefault
      title={title}
      transparent={transparent}
    />
  );
}

Topbar.defaultProps = defaultProps;

export default Topbar;
