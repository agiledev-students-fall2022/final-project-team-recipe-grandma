import React from 'react';
import './UserUpload.css';
import RecipeUpload from '../../components/RecipeUpload';

function UserUpload(): React.Node {
  return (
    <div className="UserUpload">
      <img
        className="profile-pic"
        src="https://picsum.photos/seed/picsum/200/200"
        alt=""
      />
      <h1>My recipes</h1>
      <RecipeUpload />
    </div>
  );
}

export default UserUpload;
