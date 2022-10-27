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
  console.log(data);
  return (
    <div className="UserUpload">
      <img
        className="profile-pic"
        src="https://picsum.photos/seed/picsum/200/200"
        alt=""
      />
      <h1>My recipes</h1>
      {data.data.length > 0 ? data.data.map((item, i) => (
        <RecipeUpload key={i} review={item} />
      )) : StringConfig.API_FAILURE_WARNING}
    </div>
  );
}

export default UserUpload;
