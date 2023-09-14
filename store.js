import { Store, registerInDevtools } from "pullstate";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { ref } from "firebase/database";
import { app, auth } from "./firebase.js";

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
    AuthStore.update((store) => {
      store.user = resp.user;
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
    const resp = createUserWithEmailAndPassword(auth, email, password).then((user) => {
      // The user has been signed up successfully.
      // Store the user's data in the database.
      ref('users/' + user.uid).set({
        email: email,
        password: password,
        firstName,
        lastName,
        course,
        batch
      });
    });

    // add the displayName
    displayName = firstName + " " + lastName
    await updateProfile(resp.user, { displayName });

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
