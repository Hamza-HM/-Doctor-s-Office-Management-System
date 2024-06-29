export interface EditableUserFields {
  fullName: string;
  bio: string;
  location: string;
  description?: string;
}

export interface User extends EditableUserFields {
  fullName: string;
  bio: string;
  location: string;
  description: string;
  avatar: string;
  coverPhoto: string;
}

export interface UserData {
  uid?: string;
  email?: string;
  fullName?: string;
  location?: string;
  description?: string;
  avatar?: string;
}

export interface UserUpdateData {
  email?: string;
  fullName?: string;
  name?: string;
  bio?: string;
  location?: string;
  description?: string;
  avatar?: string;
  coverPhoto?: string;
}
