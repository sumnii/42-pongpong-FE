import React, { createContext } from "react";

type setProfileUser = React.Dispatch<React.SetStateAction<string>>;
type setProfileImgIsUp = React.Dispatch<React.SetStateAction<boolean>>;

export const ProfileContext = createContext<setProfileUser | null>(null);
export const ProfileImgIsUpContext = createContext<boolean | null>(null);
export const ProfileSetImgIsUpContext = createContext<setProfileImgIsUp | null>(null);
