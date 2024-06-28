import React from "react";
import "./profile.css";

const mockUser = {
  name: "John Doe",
  bio: "Software Developer | React Enthusiast",
  location: "San Francisco, CA",
  avatar: "/images/profile-avatar-img.png",
  description:
    "I'm a passionate software developer with 5 years of experience in web technologies. I love building user-friendly interfaces and solving complex problems. When I'm not coding, you can find me hiking or reading sci-fi novels.",
};

const Profile: React.FC = () => {
  return (
    <div className="profile">
      <div className="hero">
        <div className="profile-content">
          <img src={mockUser.avatar} alt={mockUser.name} className="avatar" />
        </div>
      </div>
      <div className="profile-content">
        <button className="edit-button">Edit Profile</button>
        <div className="user-info">
          <h1 className="name">{mockUser.name}</h1>
          <p className="bio">{mockUser.bio}</p>
          <p className="location">{mockUser.location}</p>
        </div>
        <p className="description">{mockUser.description}</p>
      </div>
    </div>
  );
};

export default Profile;
