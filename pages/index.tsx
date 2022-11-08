import styled from "@emotion/styled";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";
import { Feed } from "../components/Feed";
import { Settings } from "../components/Settings";
import { Camera } from "../components/Camera";
import SwipeableViews from "react-swipeable-views";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { fetchFeed } from "../firebase/videos";
import CircularProgress from "@mui/material/CircularProgress";
import { FeedLoading } from "../components/FeedLoading";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { useStore } from "../hooks/useStore";

export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const { page, setPage, setVideos, videoLoading, setVideoLoading } =
    useStore();

  const swipeableStyles = {
    height: "calc(var(--doc-height) - 56px)",
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
    <>
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
    </>
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
  height: 100%;
`;

