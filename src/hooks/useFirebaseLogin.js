import React, { useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

export const useFirebaseLogin = () => {
  const [currentUser, setCurrentUser] = useState(null);
  let unsubscribeFromAuth = null;
  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
        });
      }
      setCurrentUser(userAuth);
      return () => {
        unsubscribeFromAuth();
      };
    });
  }, []);

  return { currentUser };
};
