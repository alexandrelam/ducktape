import styled from "@emotion/styled";
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
import { createContext } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { FeedLoading } from "../components/FeedLoading";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

type ContextProps = {
  user: FirebaseUser;
  page: number;
  setPage: (page: number) => void;
  videos: Video[];
  setVideos: (videos: Video[]) => void;
  setVideoLoading: (loading: boolean) => void;
};

export const Store = createContext<ContextProps | null>(null);

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [user, loading, error] = useAuthState(auth);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoLoading, setVideoLoading] = useState(true);

  const swipeableStyles = {
    height: "90vh",
    WebkitOverflowScrolling: "touch", // iOS momentum scrolling
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    (async () => {
      const v = await fetchFeed(user!);
      setVideos(v);
      setVideoLoading(false);
    })();
  }, [user, loading]);

  if (error) {
    return <h1>Couldn't fetch user</h1>;
  }

  if (!user || loading) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  return (
    <Store.Provider
      value={{ user, page, setPage, videos, setVideos, setVideoLoading }}
    >
      <Wrapper>
        <Container>
          <SwipeableViews
            index={page}
            onChangeIndex={setPage}
            // @ts-ignore
            containerStyle={swipeableStyles}
          >
            <Camera />
            {videoLoading ? <FeedLoading /> : <Feed />}
            <Settings />
          </SwipeableViews>
        </Container>
        <NavBarPosition>
          <Navbar />
        </NavBarPosition>
      </Wrapper>
      <ToastContainer autoClose={1000} />
    </Store.Provider>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

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

