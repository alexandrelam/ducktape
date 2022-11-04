import styled from "@emotion/styled";
import { useState } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useCamera } from "../hooks/useCamera";

export function Camera() {
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: isFrontCamera ? "user" : { exact: "environment" },
  };

  const {
    webcamRef,
    capturing,
    recordedChunks,
    handleStartCaptureClick,
    handleUpload,
  } = useCamera();

  function flipCamera() {
    setIsFrontCamera(!isFrontCamera);
  }

  return (
    <>
      <Wrapper>
        <FlipCameraButton variant="contained" onClick={flipCamera}>
          <FlipCameraAndroidIcon />
        </FlipCameraButton>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          mirrored={isFrontCamera}
        />
        <ButtonWrapper>
          {capturing ? null : (
            <StyledButton
              variant="contained"
              component="label"
              onClick={handleStartCaptureClick}
            >
              <PhotoCamera />
            </StyledButton>
          )}
          {recordedChunks.length > 0 && (
            <Button
              onClick={handleUpload}
              variant="contained"
              component="label"
            >
              <FileUploadIcon />
            </Button>
          )}
        </ButtonWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100vw;
  position: absolute;
  bottom: 30px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 4rem;
`;

const FlipCameraButton = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 100;
`;
