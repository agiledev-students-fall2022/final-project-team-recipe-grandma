import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserUpload.css';
import RecipeUpload from '../../components/RecipeUpload';
import * as Util from '../../util';
import StringConfig from '../../StringConfig';

function UserUpload(): React.Node {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Util.fetchMyRecipes(setData);
  }, []);

  return (
    <div className="UserUpload">
      <img
        className="profile-pic"
        src="https://picsum.photos/seed/picsum/200/200"
        alt=""
      />
      <h1>My recipes</h1>
      {data.length > 0 ? data.map((item, ind) => (
        <RecipeUpload key={ind} details={item} onAction={() => navigate(`recipe/${ind}`)} />
      )) : StringConfig.API_FAILURE_WARNING}
    </div>
  );
}

export default UserUpload;
