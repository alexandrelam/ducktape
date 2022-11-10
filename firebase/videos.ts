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
      try {
        const url = await getDownloadURL(ref(storage, video.path));
        v.push({
          ...video,
          url,
          author: userDoc.data()?.name || "",
          authorUid: userDoc.id,
        });
      } catch (error) {
        console.log(error);
      }
    })
  );
  return v;
}

function dateMoreThanOneDayAgo(date: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  return new Date().getTime() - date.getTime() > oneDay;
}

async function deleteExpiredVideos(videos: Video[]) {
  const videosToDelete: Video[] = [];

  videos.forEach((video) => {
    if (dateMoreThanOneDayAgo(new Date(video.createdAt))) {
      videosToDelete.push(video);
    }
  });

  videosToDelete.forEach(async (video) => {
    const storage = getStorage();
    await deleteObject(ref(storage, video.path));
    await updateDoc(doc(db, "users", video.authorUid), {
      videos: arrayRemove({
        path: video.path,
        isFrontCamera: video.isFrontCamera,
        createdAt: video.createdAt,
      }),
    });
  });

  return videosToDelete;
}

export async function fetchFeed(user: FirebaseUser) {
  let v: Video[] = [];
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

  // delete expired videos
  // we do that so user don't have to wait for the video to be deleted
  const videosToDelete = await deleteExpiredVideos(v);
  v = v.filter((video) => !videosToDelete.includes(video));

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
    isFrontCamera: videoToDelete.isFrontCamera,
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
