import styled from "@emotion/styled";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState, useEffect } from "react";

export function Feed() {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "photos"));
      const docs = await getDocs(q);
      const p = docs.docs.map((doc) => doc.data().image) as string[];
      setPhotos(p);
    })();
  }, []);

  return (
    <FeedContainer>
      {photos.map((photo, key) => (
        <Img src={photo} alt="moi" key={key} />
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
