import React from 'react';
import './UserUpload.css';

function UserUpload(): React.Node {
  return (
    <div className="UserUpload">
      <img
        className="profile-pic"
        src="https://picsum.photos/seed/picsum/200/300"
        alt=""
      />
    </div>
  );
}

export default UserUpload;
