import type { User as FirebaseUser } from "firebase/auth";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";
import { Video } from "../types/Video";
import { db } from "./config";

async function getVideosFromUser(userUid: string) {
  const storage = getStorage();

  const v: Video[] = [];
  const userDoc = await getDoc(doc(db, "users", userUid));
  const videos = userDoc.data()?.videos;
  await Promise.all(
    videos.map(async (video: Video) => {
      const url = await getDownloadURL(ref(storage, video.path));
      v.push({
        ...video,
        url,
        author: userDoc.data()?.name || "",
        authorUid: userDoc.id,
      });
    })
  );
  return v;
}

export async function fetchFeed(user: FirebaseUser) {
  const v: Video[] = [];
  const userDoc = await getDoc(doc(db, "users", user!.uid));
  // add my videos
  v.push(...(await getVideosFromUser(user!.uid)));

  // add my friends videos
  const friends = userDoc.data()?.friends;
  await Promise.all(
    friends.map(async (friend: FirebaseUser) => {
      v.push(...(await getVideosFromUser(friend.uid)));
    })
  );
  return v;
}

export async function deleteVideo(
  user: FirebaseUser,
  videos: Video[],
  videoToDelete: Video
) {
  const storage = getStorage();

  const v = {
    createdAt: videoToDelete.createdAt,
    path: videoToDelete.path,
  };
  try {
    updateDoc(doc(db, "users", user!.uid), {
      videos: arrayRemove(v),
    });
    const videoRef = ref(storage, videoToDelete.path);
    deleteObject(videoRef);
    return videos.filter((v) => v.path !== videoToDelete.path);
  } catch (error) {
    console.log(error);
  }
  return videos;
}
