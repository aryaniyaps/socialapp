import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

async function getProfile(userId: string) {
  return await getDoc(doc(db, `profiles/${userId}`));
}

async function updateProfile(
  userId: string,
  data: {
    username?: string;
    avatarUrl?: string;
  }
) {
  return await updateDoc(doc(db, `profiles/${userId}`), {
    username: data.username,
    avatarUrl: data.avatarUrl,
  });
}

function getUser() {
  return auth.currentUser;
}

const repo = { getProfile, updateProfile, getUser };

export default repo;
