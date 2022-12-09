import { useEffect } from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import Button from "@mui/material/Button";

export function CountdownButton() {
  const [countdown, setCountdown] = useState(200);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledButton
      variant="contained"
      // @ts-ignore
      component="label"
      color="error"
    >
      <h2>{(countdown / 100).toFixed(2)}</h2>
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  width: 100%;
  height: 4rem;
`;
