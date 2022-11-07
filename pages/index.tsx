import styled from "@emotion/styled";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { Feed } from "../components/Feed";
import { Settings } from "../components/Settings";
import { Camera } from "../components/Camera";
import SwipeableViews from "react-swipeable-views";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { Video } from "../types/Video";
import { fetchFeed } from "../firebase/videos";

export default function Home() {
  const [page, setPage] = useState(1);
  const [user, error] = useAuthState(auth);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const swipeableStyles = {
    height: "90vh",
    WebkitOverflowScrolling: "touch", // iOS momentum scrolling
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const v = await fetchFeed(user);
        setVideos(v);
        setLoading(false);
      })();
    }
  }, [user]);

  if (error) {
    return <h1>Couldn't fetch user</h1>;
  }

  if (!user || loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ProtectedRoute>
      <Wrapper>
        <Container>
          <SwipeableViews
            index={page}
            onChangeIndex={setPage}
            // @ts-ignore
            containerStyle={swipeableStyles}
          >
            <Camera
              setVideos={setVideos}
              setLoading={setLoading}
              user={user}
              setPage={setPage}
            />
            <Feed
              user={user}
              videos={videos}
              setVideos={setVideos}
              setPage={setPage}
            />
            <Settings />
          </SwipeableViews>
        </Container>
        <NavBarPosition>
          <Navbar page={page} setPage={setPage} />
        </NavBarPosition>
      </Wrapper>
    </ProtectedRoute>
  );
}

const Container = styled.div`
  flex-grow: 1;
  margin-bottom: 56px;
`;

const NavBarPosition = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

