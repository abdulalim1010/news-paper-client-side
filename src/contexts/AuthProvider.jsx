import React, { useEffect, useState } from 'react';
import { AuthContext } from './authcontext/AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOutUser = () => {
    setLoading(true);
    return auth.signOut();
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
         
          await axios.put("https://y-ruby-three.vercel.app/users", {
            name: currentUser.displayName || "Anonymous",
            email: currentUser.email,
            role: "user", // default role
          });

          const res = await axios.get(`https://y-ruby-three.vercel.app/users?email=${currentUser.email}`);
          const dbUser = res.data; 

        
          setUser({
            ...currentUser,
            role: dbUser?.role || "user",
            isPremium: dbUser?.isPremium || false,
          });
        } catch (err) {
          console.error("MongoDB user fetch error:", err);
          setUser({ ...currentUser, role: "user", isPremium: false });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    creatUser,
    signInUser,
    signInWithGoogle,
    logOutUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
