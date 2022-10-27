import { useState, useEffect } from 'react';
import * as React from 'react';
import './UserUpload.css';
import RecipeUpload from '../../components/RecipeUpload';
import * as Util from '../../util';
import StringConfig from '../../StringConfig';

function UserUpload(): React.Node {
  const [data, setData] = useState([]);
  useEffect(() => {
    Util.fetchMyRecipes(setData);
  }, []);
  return (
    <div className="UserUpload row">
      <div className="user-data col-12 row">
        <img
          className="profile-pic col-2"
          src="https://picsum.photos/seed/picsum/200/200"
          alt=""
        />
        <header className="user-header col-10">
          <h5>John Doe</h5>
        </header>
      </div>
      <hr />
      <div className="user-recipes col-12">
        <h1>My recipes</h1>
        {data.length > 0 ? data.map((item, i) => (
          <RecipeUpload key={i} review={item} />
        )) : StringConfig.API_FAILURE_WARNING}
      </div>
    </div>
  );
}

export default UserUpload;
