import { createContext, Dispatch, SetStateAction } from "react";

interface UserDetail {
  _id: any; // Ensure this matches the expected type
  _creationTime: number;
  name: string;
  email: string;
  picture: string;
  uid: string;
}

interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: Dispatch<SetStateAction<UserDetail | null>>;
}

export const UserDetailContext = createContext<UserDetailContextType | null>(null);
