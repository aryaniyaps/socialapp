import { collection, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

async function getProfile(userId: string) {
  const profileCollection = collection(db, "profiles");
  return doc(db, userId);
}

async function updateProfile(profile: {
  id: string;
  username?: string;
  avatarUrl?: string;
}) {
  const result = await supabase
    .from("profiles")
    .update({ username: profile.username, avatar_url: profile.avatarUrl })
    .match({ id: profile.id })
    .select("*")
    .throwOnError()
    .single();

  return result.data;
}

function getUser() {
  return auth.currentUser;
}

const repo = { getProfile, updateProfile, getUser };

export default repo;
