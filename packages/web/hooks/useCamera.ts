import { useState, useRef, useCallback } from "react";
import { wait2Second } from "../utils/wait";
import type Webcam from "react-webcam";

export const useCamera = () => {
  const webcamRef = useRef<Webcam>();
  const mediaRecorderRef = useRef();
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartCaptureClick = useCallback(async () => {
    if (!webcamRef.current) return;
    if (webcamRef.current && !webcamRef.current.stream) return;

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

    await wait2Second();

    // @ts-ignore
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleCancel = useCallback(() => {
    setRecordedChunks([]);
  }, [setRecordedChunks]);

  return {
    webcamRef,
    capturing,
    recordedChunks,
    setRecordedChunks,
    handleStartCaptureClick,
    handleCancel,
  };
};
