import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { Video } from "../types/Video";
import { User } from "../types/User";

export function Feed() {
  const [user] = useAuthState(auth);
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const storage = getStorage();

  async function getVideosFromUser(userUid: string) {
    const v: string[] = [];
    const userDoc = await getDoc(doc(db, "users", userUid));
    const videos = userDoc.data()?.videos;
    await Promise.all(
      videos.map(async (video: Video) => {
        const url = await getDownloadURL(ref(storage, video.path));
        v.push(url);
      })
    );
    return v;
  }

  useEffect(() => {
    // Find all the prefixes and items.
    (async () => {
      const v: string[] = [];
      const userDoc = await getDoc(doc(db, "users", user!.uid));
      // add my videos
      v.push(...(await getVideosFromUser(user!.uid)));

      // add my friends videos
      const friends = userDoc.data()?.friends;
      await Promise.all(
        friends.map(async (friend: User) => {
          v.push(...(await getVideosFromUser(friend.uid)));
        })
      );

      setVideos(v);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (videos.length === 0) {
    return (
      <div>
        Vous n'avez pas encore de vidéos, créez une vidéo ou ajoutez des amis !
      </div>
    );
  }

  return (
    <FeedContainer>
      {videos.map((video, key) => (
        <Video autoPlay muted loop key={key}>
          <source src={video} type="video/webm" />
        </Video>
      ))}
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 666px;
  margin: auto;
`;

const Video = styled.video`
  width: 100%;
`;
