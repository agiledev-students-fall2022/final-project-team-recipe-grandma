import React from 'react';
import './UserUpload.css';
import UserUpload from '../../pages/UserUpload';

function UserUploadPage(): React.Node {
  return (
    <div className="UserUpload">
      <img
        className="profile-pic"
        src="https://picsum.photos/seed/picsum/200/200"
        alt=""
      />
      <h1>My recipes</h1>
      <UserUpload />
    </div>
  );
}

export default UserUploadPage;
