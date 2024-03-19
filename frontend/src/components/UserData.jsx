import React from "react";
import {useAuth} from '../store/Auth'
import {Link} from 'react-router-dom'

const UserData = () => {
  const {userData} =useAuth()
  return (
    <>
      <div className="absolute right-0 top-0 w-[400px]">
        <div>
          <div className="image"><img src={userData.userImage} alt={userData.name} /></div>
          <div className="name">{userData.name}</div>
          <div className="phone">{userData.phone}</div>
          <div className="email">{userData.email}</div>
          <div className="bio"></div>
          <div className="frinds-list">
            <div className="friend">
              <div className="user-image"></div>
              <div className="user-phone"></div>
              <div className="about-user">
                <div className="icon"></div>
                <div className="popup"></div>
              </div>
            </div>
          </div>
          <hr />
          <div className="account">
            <div className="logout"><Link to={"/logout"}>Logout</Link></div>
            <div className="delete-acount"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
