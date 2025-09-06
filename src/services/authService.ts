// src/services/authService.ts
import { auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

/**
 * Register new user with username + email + password
 */
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  // 1. Create user in Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // 2. Optionally set display name in Firebase Auth
  await updateProfile(user, { displayName: username });

  // 3. Save extra user data in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    username,
    createdAt: new Date(),
    role: "user",
  });
  return user;
};
/**
 * Login with email or username + password
 */
export const loginUser = async (usernameOrEmail: string, password: string) => {
  let email = usernameOrEmail;

  // If input is not an email → treat it as username
  if (!usernameOrEmail.includes("@")) {
    const q = query(
      collection(db, "users"),
      where("username", "==", usernameOrEmail)
    );
    const snap = await getDocs(q);

    if (snap.empty) throw new Error("No user found with that username");

    email = snap.docs[0].data().email;
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user; // 🔑 return only the user
};


/**
 * Logout
 */
export const logoutUser = async () => {
  return signOut(auth);
};
