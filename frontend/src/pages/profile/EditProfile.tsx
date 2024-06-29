import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, EditableUserFields } from "@src/types/auth/user";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store";

import { updateUserProfile } from "@src/store/actions/userActions";
import { useDispatch } from "react-redux";

import "./styles/edit-profile.css";

interface EditProfileFormProps {
  user: User;
  onSave: (updatedUser: EditableUserFields) => void;
  onCancel: () => void;
}

const editProfileSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  bio: yup.string().required("Specialty is required"),
  location: yup
    .string()
    .max(50, "Location must be at most 50 characters")
    .required("Location is required"),
  description: yup
    .string()
    .max(500, "Description must be at most 500 characters"),
});

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [showImageSelect, setShowImageSelect] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { profile } = useSelector<RootState, RootState["user"]>(
    (state) => state.user
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeProfilePic = () => {
    if (selectedImage) {
      dispatch(updateUserProfile({ avatar: selectedImage, uid: profile?.uid }));
      setShowImageSelect(false);
      setSelectedImage("");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditableUserFields>({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      fullName: profile?.fullName,
      bio: user.bio,
      location: profile?.location,
      description: profile?.description,
    },
  });

  const onSubmit = (data: EditableUserFields) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="profile-container">
      <div className="edit-profile-container">
        <div className="profile-header">
          <h1>Edit Profile</h1>
          <p>
            Your profile will be displayed publicly so be careful what you share
          </p>
        </div>

        <div className="cover-photo">
          <h5 className="cover-pic-header">Cover</h5>
          <img src={user.coverPhoto} alt="" style={{ width: "100%" }} />
        </div>
        <div className="profile-picture">
          <h2>Profile Picture</h2>
          <div className="pic-btn-container">
            <img
              src={profile?.avatar}
              alt="Avatar"
              style={{ borderRadius: "50%" }}
            />
            <div className="row">
              {!showImageSelect ? (
                <button
                  type="button"
                  className="btn btn-primary btn-fit"
                  onClick={() => setShowImageSelect(true)}
                >
                  Change Photo
                </button>
              ) : (
                <div>
                  <select
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select an image</option>
                    <option value="/images/male-img.jpg">Male</option>
                    <option value="/images/female-img.png">Female</option>
                  </select>
                  <div style={{ margin: "10px 0 0 0" }}>
                    <button
                      type="button"
                      className="btn btn-primary btn-fit"
                      onClick={handleChangeProfilePic}
                      disabled={!selectedImage}
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-fit btn-transparent"
                      onClick={() => {
                        setShowImageSelect(false);
                        setSelectedImage("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <button type="button" className="btn btn-fit btn-transparent">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" {...register("fullName")} />
          {errors.fullName && (
            <span className="error">{errors.fullName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="bio">Specialty</label>
          <input type="text" id="bio" {...register("bio")} />
          {errors.bio && <span className="error">{errors.bio.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" {...register("location")} />
          {errors.location && (
            <span className="error">{errors.location.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Profile Description</label>
          <textarea id="description" {...register("description")} />
          {errors.description && (
            <span className="error">{errors.description.message}</span>
          )}
        </div>

        <div className="button-group">
          <div className="button-container">
            <button
              onClick={onCancel}
              type="button"
              className="btn btn-fit btn-transparent"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-fit">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
