import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RGRecipe from '../../components/RGRecipe';
import Topbar, { TopbarType } from '../../components/Topbar';
import { signOut, selectUser } from '../../features/auth/authSlice';

import * as Util from '../../util';
import './Profile.css';

function Profile(): React.Node {
  const [data, setData] = useState([]);
  const [pillBodyType, setPillBodyType] = useState('');

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const apiCallback = (apiData) => {
      const mutatedData = apiData.map((rec, ind) => {
        const newRec = { ...rec, index: ind };
        return newRec;
      });
      setData(mutatedData);
    };
    Util.fetchMyRecipes(apiCallback, `Bearer ${user.token}`);
  }, []);

  const logoutUser = () => {
    dispatch(signOut());
    navigate('/', { replace: true });
  };

  const recipes = data.map((item, ind) => (
    <RGRecipe
      key={ind}
      author={item.author}
      authorID={item.userId}
      imageUrl={item.cover}
      recipeUrl={`recipe/${item._id}`}
      title={item.name}
    />
  ));

  const renderPillBody = () => {
    switch (pillBodyType) {
      case 'recipes':
        return recipes;
      // case 'followers':
      //   return (
      //     <div>Followers</div>
      //   );
      // case 'following':
      //   return (
      //     <div>Following</div>
      //   );
      default:
        return recipes;
    }
  };

  // [TODO]@mohammedajao Later, I'd like to move pillbar to its own component

  return (
    <>
      <Topbar
        hasBackButton
        type={TopbarType.TOPBAR_DEFAULT}
        title={user.name}
      />
      <section className="rga-section rg-user-profile">
        <div>
          <header className="profile-header">
            <img src="https://picsum.photos/200" alt="avatar" />
            <div className="profile-info">
              <div className="info-header">
                <h6>{user.name}</h6>
                <button
                  onClick={logoutUser}
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
          <div className="rg-pillbar">
            <div className="rg-pillbar-header">
              <button
                onClick={() => setPillBodyType('recipes')}
                className="active"
                type="button"
              >
                <span>My Recipes</span>
              </button>
              {/* <button
                onClick={() => setPillBodyType('followers')}
                type="button"
              >
                <span>Followers</span>
              </button> */}
              {/* <button
                onClick={() => setPillBodyType('following')}
                type="button"
              >
                <span>Following</span>
              </button> */}
            </div>
            {renderPillBody()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
