import styled from "@emotion/styled";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { Feed } from "../components/Feed";
import { Settings } from "../components/Settings";

export default function Home() {
  const [page, setPage] = useState(1);

  return (
    <ProtectedRoute>
      <Wrapper>
        <Container>
          {page === 1 && <Feed />}
          {page == 2 && <Settings />}
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
  overflow-y: scroll;
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

