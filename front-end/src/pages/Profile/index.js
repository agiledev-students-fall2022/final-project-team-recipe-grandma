import * as React from 'react';
import { useState, useEffect } from 'react';
import RGRecipe from '../../components/RGRecipe';
import Topbar, { TopbarType } from '../../components/Topbar';

import * as Util from '../../util';
import './Profile.css';

function Profile(): React.Node {
  const [data, setData] = useState([]);
  const [pillBodyType, setPillBodyType] = useState('');
  useEffect(() => {
    const apiCallback = (apiData) => {
      const mutatedData = apiData.map((rec, ind) => {
        const newRec = { ...rec, index: ind };
        return newRec;
      });
      setData(mutatedData);
    };
    Util.fetchMyRecipes(apiCallback);
  }, []);

  const recipes = data.map((item, ind) => (
    <RGRecipe
      key={ind}
      author="John Doe"
      authorID="1"
      imageUrl={item.imageURL}
      recipeUrl={`recipe/${item.index}`}
      title={item.name}
    />
  ));

  const renderPillBody = () => {
    switch (pillBodyType) {
      case 'recipes':
        return recipes;
      case 'followers':
        return (
          <div>Followers</div>
        );
      case 'following':
        return (
          <div>Following</div>
        );
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
        title="John Doe"
      />
      <section className="rga-section rg-user-profile">
        <div>
          <header className="profile-header">
            <img src="https://picsum.photos/200" alt="avatar" />
            <div className="profile-info">
              <div className="info-header">
                <h6>John Doe</h6>
                <button
                  onClick={() => null}
                  type="button"
                >
                  Edit Profile
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
              <button
                onClick={() => setPillBodyType('followers')}
                type="button"
              >
                <span>Followers</span>
              </button>
              <button
                onClick={() => setPillBodyType('following')}
                type="button"
              >
                <span>Following</span>
              </button>
            </div>
            {renderPillBody()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
