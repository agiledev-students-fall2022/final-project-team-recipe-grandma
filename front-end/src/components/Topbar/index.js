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
  hasBackButton?: boolean
|}>;

type TopbarWithBackButtonProps = $ReadOnly<{|
  onBackClick?: () => void,
  title?: string,
  menuElements?: Array<React.Node>,
  hasBackButton?: boolean
|}>;

type TopbarDefaultProps = $ReadOnly<{|
  title: string
|}>;

const defaultProps = {
  elements: null,
  leftElement: null,
  title: null,
  type: TopbarType.TOPBAR_DEFAULT,
  hasBackButton: true,
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
  return (
    <div className="rg-topbar">
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
}: TopbarDefaultProps): React.Node {
  return (
    <div className="rg-topbar">
      {title ? (
        <div className="rg-tb-title">
          title
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
      />
    );
  }

  return (
    <TopbarDefault
      title={title}
    />
  );
}

Topbar.defaultProps = defaultProps;

export default Topbar;
