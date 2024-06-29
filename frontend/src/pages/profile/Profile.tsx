import React, { useEffect, useState } from "react";
import "./styles/profile.css";
import { SlLocationPin } from "react-icons/sl";
import { BiSolidEditAlt } from "react-icons/bi";
import EditProfile from "./EditProfile";
import { UserUpdateData, User } from "@src/types/auth/user";
import {
  listenToAuthChanges,
  updateUserProfile,
} from "@src/store/actions/userActions";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@src/store";
import { useSelector } from "react-redux";

const mockUser: User = {
  fullName: "John Doe",
  bio: "Specialist of skin surgery",
  location: "Alger, Algeria",
  avatar: "/images/profile-avatar-img.png",
  description:
    "I'm a passionate software developer with 5 years of experience in web technologies. I love building user-friendly interfaces and solving complex problems. When I'm not coding, you can find me hiking or reading sci-fi novels.",
  coverPhoto: "/images/profile-hero-img.png",
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { profile, loading } = useSelector<RootState, RootState["user"]>(
    (state) => state.user
  );
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedUser: UserUpdateData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser, uid: profile?.uid }));
    dispatch(updateUserProfile({ ...updatedUser, uid: profile?.uid }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader "></div>;
      </div>
    );
  }

  if (isEditing) {
    return (
      <EditProfile user={user} onSave={handleSave} onCancel={handleCancel} />
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-hero">
        <div className="hero">
          <img
            src={profile?.avatar}
            alt={profile?.fullName}
            className="avatar"
          />
        </div>
        <div className="profile-content">
          <div className="user-info">
            <div>
              <h1 className="name">{profile?.fullName}</h1>
              <p className="bio">{mockUser.bio}</p>
              <div className="location">
                <SlLocationPin />
                <p>{profile?.location}</p>
              </div>
            </div>
            <button className="edit-button" onClick={handleEditClick}>
              <BiSolidEditAlt />
              <p>Edit Profile</p>
            </button>
          </div>
        </div>
      </div>
      <div className="profile-description">
        <h1 className="desc-title">Profile Description</h1>
        <p className="description">{profile?.description}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed to :</p>
        <ul>
          {[1, 2, 3, 4].map((_, j) => (
            <li key={j}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do e
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
