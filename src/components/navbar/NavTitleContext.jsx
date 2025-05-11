import { createContext, useContext, useState } from 'react';

const NavTitleContext = createContext();

export const useNavTitle = () => useContext(NavTitleContext);

export const NavTitleProvider = ({ children }) => {
  const [navTitle, setNavTitle] = useState(
    localStorage.getItem('corpName') || 'Travel Tally'
  );

  const updateNavTitle = (title) => {
    setNavTitle(title);
    localStorage.setItem('corpName', title);
  };

  const clearNavTitle = () => {
    setNavTitle('Travel Tally');
    localStorage.removeItem('corpName');
  };

  return (
    <NavTitleContext.Provider value={{ navTitle, updateNavTitle, clearNavTitle }}>
      {children}
    </NavTitleContext.Provider>
  );
};
