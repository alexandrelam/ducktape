import styled from "@emotion/styled";
import Webcam from "react-webcam";
import { useState, useRef, useCallback } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CancelIcon from "@mui/icons-material/Cancel";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export function Camera() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    // @ts-ignore
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    // @ts-ignore
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    // @ts-ignore
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    // @ts-ignore
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleUpload = useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      try {
        const storage = getStorage();
        const storageRef = ref(storage, `${new Date().toISOString()}`);

        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, blob);
        setRecordedChunks([]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [recordedChunks]);
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
          {capturing ? (
            <Button
              onClick={handleStopCaptureClick}
              variant="contained"
              component="label"
            >
              <CancelIcon />
            </Button>
          ) : (
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
