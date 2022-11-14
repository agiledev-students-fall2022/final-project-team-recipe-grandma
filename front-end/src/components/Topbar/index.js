import { text } from 'express';
import * as React from 'react';

type Props = $ReadOnly<{|
  elements: Array<React.Node>,
  leftElement: React.Node,
  title?: string,
|}>;

const defaultProps = {
  title: null
};

function Topbar(props: Props): React.Node {
  const {
    elements,
    leftElement,
    title,
  } = props;
  return (
    <>
      <div className="rg-topbar">
        <div className="rg-tb-left">
          {leftElement}
        </div>
        {title ? (
          <div className="rg-tb-title">
            title
          </div>
        ) : null}
        <div className="rg-tb-right">
          {elements}
        </div>
      </div>
    </>
  );
}

Topbar.defaultProps = defaultProps;

export default Topbar;
