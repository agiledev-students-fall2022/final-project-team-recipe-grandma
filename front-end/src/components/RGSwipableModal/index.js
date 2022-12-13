import * as React from 'react';
import { useState } from 'react';
import './RGSwipableModal.css';

type Props = $ReadOnly<{|
  children?: React.Node,
  hideOnClose?: boolean,
  onClose?: (isClosed?: boolean) => void,
  onOpen?: (isOpen?: boolean) => void,
  openModal: boolean,
  overflowEndState?: string
|}>;

const defaultProps = {
  children: null,
  hideOnClose: false,
  onClose: () => null,
  onOpen: () => null,
  overflowEndState: '',
};

const MIN_SWIPE_DIST = 50;

function RGSwipableModal({
  children,
  hideOnClose,
  onClose,
  onOpen,
  openModal,
  overflowEndState,
}: Props): React.Node {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  if (openModal) document.body.style.overflowY = 'hidden';

  const onTouchStart = (ev) => {
    setTouchEnd(null);
    setTouchStart(ev.targetTouches[0].clientY);
    document.body.style.overflowY = 'hidden';
  };

  const onTouchMove = (ev) => {
    setTouchEnd(ev.targetTouches[0].clientY);
  };

  const onUpSwipe = () => {
    onOpen?.(true);
    onClose?.(false);
  };

  const onDownSwipe = () => {
    document.body.style.overflowY = overflowEndState;
    onClose?.(true);
    onOpen?.(false);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    const isUpSwipe = dist > MIN_SWIPE_DIST;
    const isDownSwipe = dist < -MIN_SWIPE_DIST;
    if (isDownSwipe || isUpSwipe) console.log('swipe', isDownSwipe ? 'down' : 'up');
    return isDownSwipe ? onDownSwipe() : onUpSwipe();
  };

  const classNameOnClose = !openModal
    ? `rg-swipable-modal ${hideOnClose ? 'modal-hidden' : 'modal-closed'}`
    : 'rg-swipable-modal';

  return (
    <div className={classNameOnClose}>
      <button type="button" onClick={() => onDownSwipe()}>
        <div className="background" />
      </button>
      <div className="modal-container">
        <div
          className="closable-region"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="closable-bar" />
        </div>
        <button
          className="closable-btn"
          onClick={() => onDownSwipe()}
          type="button"
        >
          <span className="rg-icon material-icons-outlined">
            close
          </span>
        </button>
        <div className="children-cont">
          {children}
        </div>
      </div>
    </div>
  );
}

RGSwipableModal.defaultProps = defaultProps;

export default RGSwipableModal;
