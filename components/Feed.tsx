import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";

export function Feed() {
  const [videos, setVideos] = useState<string[]>([]);

  const storage = getStorage();
  const listRef = ref(storage);

  useEffect(() => {
    // Find all the prefixes and items.
    (async () => {
      const v: string[] = [];
      const res = await listAll(listRef);
      await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          v.push(url);
        })
      );
      setVideos(v);
    })();
  }, []);

  if (!videos.length) {
    return <div>Loading...</div>;
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
