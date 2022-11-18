import * as React from 'react';
import { useState } from 'react';
import './UserUpload.css';
import Topbar, { TopbarType } from '../../components/Topbar';
import RGInput from '../../components/UtilityComponents/RGInput';

function UserUpload(): React.Node {
  const [titleText, setTitleText] = useState('');
  // We need a loading state for the file upload
  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = () => null;
  return (
    <>
      <Topbar
        hasBackButton
        type={TopbarType.TOPBAR_WITH_BACK_BUTON}
        title="Create a recipe"
      />
      <section className="rga-section rg-ur-main">
        <div className="rg-upload-recipe">
          <div
            className="file-drop-zone"
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <span className="icon material-icons-outlined">
              file_upload
            </span>
            <h6>Upload your cover image</h6>
            <p>A preview will appear below</p>
            <input type="file" />
          </div>
          <div className="file-loading-status">
            <div className="status-details">
              <div className="main-icon">
                <span className="main-icon material-icons">
                  article
                </span>
                <p>File Name</p>
              </div>
              <span className="status-icon material-icons-outlined">
                done
              </span>
            </div>
            <div className="status-bar" />
          </div>
          <br />
          <RGInput
            onChange={(ev) => setTitleText(ev.target.value)}
            type="text"
            label="Recipe Title"
            value={titleText}
          />
        </div>
      </section>
    </>
  );
}

export default UserUpload;
