import styled from "@emotion/styled";
import { useState } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import CancelIcon from "@mui/icons-material/Cancel";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useCamera } from "../hooks/useCamera";
import { fetchFeed } from "../firebase/videos";
import { useStore } from "../hooks/useStore";
import { CountdownButton } from "./CountdownButton";

export function Camera() {
  const { user, setVideos, setVideoLoading, setPage } = useStore();

  const {
    webcamRef,
    capturing,
    recordedChunks,
    handleStartCaptureClick,
    handleFirebaseUpload,
    handleCancel,
  } = useCamera();

  const [isFrontCamera, setIsFrontCamera] = useState(true);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: isFrontCamera ? "user" : { exact: "environment" },
  };

  function flipCamera() {
    setIsFrontCamera(!isFrontCamera);
  }

  function getVideoUrl() {
    return URL.createObjectURL(
      new Blob(recordedChunks, { type: "video/webm" })
    );
  }

  async function handleUpload() {
    setVideoLoading(true);
    await handleFirebaseUpload();
    const v = await fetchFeed(user);
    setVideos(v);
    setVideoLoading(false);
    setPage(1);
  }

  return (
    <>
      <Wrapper>
        <FlipCameraButton variant="contained" onClick={flipCamera}>
          <FlipCameraAndroidIcon />
        </FlipCameraButton>
        {!capturing && recordedChunks.length > 0 ? (
          <video src={getVideoUrl()} autoPlay loop />
        ) : (
          <Webcam
            audio={false}
            // @ts-ignore
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={isFrontCamera}
          />
        )}
        <ButtonWrapper>
          {!capturing && recordedChunks.length > 0 ? (
            <StyledButton
              variant="contained"
              color="error"
              // @ts-ignore
              component="label"
              onClick={handleCancel}
            >
              <CancelIcon />
            </StyledButton>
          ) : null}
          {!capturing && recordedChunks.length === 0 ? (
            <StyledButton
              variant="contained"
              // @ts-ignore
              component="label"
              onClick={handleStartCaptureClick}
            >
              <PhotoCamera />
            </StyledButton>
          ) : null}
          {capturing ? <CountdownButton /> : null}
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
  position: fixed;
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
