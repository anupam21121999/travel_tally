import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [phoneData, setPhoneData] = useState("");

  return (
    <UserContext.Provider value={{ phoneData, setPhoneData }}>
      {children}
    </UserContext.Provider>
  );
};
