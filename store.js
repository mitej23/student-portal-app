import { Store, registerInDevtools } from "pullstate";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { app, auth, db } from "./firebase.js";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

export const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null,
});

const unsub = onAuthStateChanged(auth, (user) => {
  console.log("onAuthStateChange", user);
  AuthStore.update((store) => {
    store.user = user;
    store.isLoggedIn = user ? true : false;
    store.initialized = true;
  });
});

export const appSignIn = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    let userId = resp?.user?.email

    // firestore retrieve user
    const q = query(collection(db, 'users'), where('email', '==', userId))
    const userSnapshot = await getDocs(q)
    const userData = userSnapshot.docs[0].data();

    AuthStore.update((store) => {
      store.user = userData
      store.isLoggedIn = resp.user ? true : false;
    });
    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};

export const appSignOut = async () => {
  try {
    await signOut(auth);
    AuthStore.update((store) => {
      store.user = null;
      store.isLoggedIn = false;
    });
    return { user: null };
  } catch (e) {
    return { error: e };
  }
};

export const appSignUp = async (email,
  password,
  firstName,
  lastName,
  course,
  batch) => {
  try {
    // this will trigger onAuthStateChange to update the store..
    // const resp = await createUserWithEmailAndPassword(auth, email, password);
    // Add a new document with a generated id


    const resp = await createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
      // The user has been signed up successfully.
      // Store the user's data in the database.
      try {
        const newUserRef = doc(collection(db, "users"));
        await setDoc(newUserRef, {
          email: email,
          firstName,
          lastName,
          course,
          batch,
          userId: user.uid
        });
        return user
      } catch (error) {
        console.log(error)
      }

    });

    // add the displayName
    displayName = firstName + " " + lastName
    await updateProfile(resp, { displayName });

    AuthStore.update((store) => {
      store.user = auth.currentUser;
      store.isLoggedIn = true;
    });

    return { user: auth.currentUser };
  } catch (e) {
    return { error: e };
  }
};

registerInDevtools({ AuthStore });
