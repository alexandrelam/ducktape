import styled from "@emotion/styled";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { Feed } from "../components/Feed";
import { Settings } from "../components/Settings";
import { Camera } from "../components/Camera";
import SwipeableViews from "react-swipeable-views";

export default function Home() {
  const [page, setPage] = useState(1);

  const swipeableStyles = {
    height: "90vh",
    WebkitOverflowScrolling: "touch", // iOS momentum scrolling
  };

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
            <Camera />
            <Feed />
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

