import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadUser = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem('user');
      if (userDataJson) {
        const userData = JSON.parse(userDataJson);
        setUser(userData); // Certifique-se de que o usuário tenha um campo 'username'
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadUser, selectedImage, setSelectedImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
