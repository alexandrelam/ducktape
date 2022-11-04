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

  return (
    <FeedContainer>
      {videos.map((video, key) => (
        <video autoPlay muted loop key={key}>
          <source src={video} type="video/webm" />
        </video>
      ))}
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 99vw;
`;
