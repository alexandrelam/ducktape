import styled from "@emotion/styled";
import { Navbar } from "../components/Navbar";
import { Feed } from "../components/Feed";
import { Settings } from "../components/Settings";
import { Camera } from "../components/Camera";
import SwipeableViews from "react-swipeable-views";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer } from "react-toastify";
import { useStore } from "../hooks/useStore";
import { useMe } from "../api/useMe";

export default function Home() {
  const { user, isLoading } = useMe();

  const { page, setPage } = useStore();

  const swipeableStyles = {
    height: "calc(var(--doc-height) - 56px)",
    WebkitOverflowScrolling: "touch", // iOS momentum scrolling
  };

  if (!user || isLoading) {
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
            <Feed />
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

