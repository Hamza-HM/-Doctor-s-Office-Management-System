import { User as FirebaseUser } from "firebase/auth";

export interface User extends FirebaseUser {
  stsTokenManager?: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
}

// export interface User {
//   displayName?: string;
//   email: string;
//   emailVerified: boolean;
//   isAnonymous?: boolean;
//   metadata?: {
//     createdAt: string;
//     lastLoginAt: string;
//     lastSignInTime: string;
//     creationTime: string;
//   };
//   phoneNumber?: string;
//   photoURL?: string;
//   providerData?: string[]; // Simplified for brevity
//   providerId?: string;
//   reloadUserInfo?: {
//     localId: string;
//     email: string;
//     passwordHash: string;
//     emailVerified: boolean;
//     passwordUpdatedAt: number;
//     // Add other fields as needed
//   };
//   stsTokenManager: {
//     refreshToken: string;
//     accessToken: string;
//     expirationTime: number;
//   };
//   uid: string;
// }

export interface AuthStateProps {
  user: User | null;
  email: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  error: string;
}
