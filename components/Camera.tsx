import styled from "@emotion/styled";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useCamera } from "../hooks/useCamera";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export function Camera() {
  const {
    webcamRef,
    capturing,
    recordedChunks,
    handleStartCaptureClick,
    handleUpload,
  } = useCamera();
  return (
    <>
      <Wrapper>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          mirrored={true}
        />
        <div>
          {capturing ? null : (
            <Button
              variant="contained"
              component="label"
              onClick={handleStartCaptureClick}
            >
              <PhotoCamera />
            </Button>
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
        </div>
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
