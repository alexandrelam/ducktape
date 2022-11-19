import styled from "@emotion/styled";
import { useState } from "react";
import Webcam from "react-webcam";
import { Video } from "./Video";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import CancelIcon from "@mui/icons-material/Cancel";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useCamera } from "../hooks/useCamera";
import { useStore } from "../hooks/useStore";
import { CountdownButton } from "./CountdownButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useMe } from "../api/useMe";
import { getCookie } from "../utils/cookie";
import { mutate } from "swr";

export function Camera() {
  const { setPage } = useStore();
  const { user } = useMe();

  const {
    webcamRef,
    capturing,
    recordedChunks,
    setRecordedChunks,
    handleStartCaptureClick,
    handleCancel,
  } = useCamera();

  const [isFrontCamera, setIsFrontCamera] = useState(
    localStorage.getItem("isFrontCamera") === "true"
  );

  const [backdropLoadingOpen, setBackdropLoadingOpen] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: isFrontCamera ? "user" : { exact: "environment" },
  };

  function flipCamera() {
    setIsFrontCamera(!isFrontCamera);
    localStorage.setItem("isFrontCamera", (!isFrontCamera).toString());
  }

  function getVideoUrl() {
    return URL.createObjectURL(
      new Blob(recordedChunks, { type: "video/webm" })
    );
  }

  async function handleUpload() {
    setBackdropLoadingOpen(true);

    const formData = new FormData();
    formData.append("video", new Blob(recordedChunks, { type: "video/webm" }));
    formData.append("isFrontCamera", isFrontCamera.toString());

    await fetch(`http://localhost:4000/api/v1/users/${user.id}/videos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: formData,
    });

    mutate(`http://localhost:4000/api/v1/users/${user.id}/videos`);

    setRecordedChunks([]);
    setBackdropLoadingOpen(false);
    setPage(1);
  }

  return (
    <>
      <Wrapper>
        <Backdrop
          sx={{ color: "#fff", zIndex: 200 }}
          open={backdropLoadingOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <FlipCameraButton variant="contained" onClick={flipCamera}>
          <FlipCameraAndroidIcon />
        </FlipCameraButton>
        {!capturing && recordedChunks.length > 0 ? (
          <Video videoUrl={getVideoUrl()} isFrontCamera={isFrontCamera} />
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
          {recordedChunks.length > 0 ? (
            <StyledButton
              onClick={handleUpload}
              variant="contained"
              // @ts-ignore
              component="label"
            >
              <FileUploadIcon />
            </StyledButton>
          ) : null}
          {!capturing && recordedChunks.length > 0 ? (
            <Button
              variant="contained"
              color="error"
              // @ts-ignore
              component="label"
              onClick={handleCancel}
            >
              <CancelIcon />
            </Button>
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
  bottom: 0;
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
