import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export async function addFriend(userUid: string, friendUid: string) {
  if (userUid === friendUid) return;
  const friendDoc = await getDoc(doc(db, "users", friendUid));
  await updateDoc(doc(db, "users", userUid), {
    friends: arrayUnion({
      uid: friendUid,
      name: friendDoc.data()?.name,
      photoURL: friendDoc.data()?.photoURL,
    }),
  });
}
