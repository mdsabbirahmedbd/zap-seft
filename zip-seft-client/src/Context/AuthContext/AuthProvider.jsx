import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../Firebase/Firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const google_provider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user,setuser] = useState()
    const [loading,setLoading] = useState(true)

    const createUser = (email,password) => {
        setLoading(true)
         return createUserWithEmailAndPassword(auth,email,password)
    }
    const singinUser = (email,password) => {
        setLoading(true)
         return signInWithEmailAndPassword(auth,email,password)
    }
    const logoutUser = () => {
        setLoading(true)
         return signOut(auth)
    }

    const loginwithGoogle = () => {
      setLoading(true)
      return signInWithPopup(auth,google_provider)
    }

    useEffect(()=>{
        const unsubscride = onAuthStateChanged(auth,(currentUser) => {
           setuser(currentUser)
           setLoading(false)
        })
        return () => {
            unsubscride()
        }
    },[])





  const authInfo = {
    createUser,
    singinUser,
    logoutUser,
    loading,
    user,
    loginwithGoogle
  };


  return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;
