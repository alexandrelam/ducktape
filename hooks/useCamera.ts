import { useState, useRef, useCallback } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { wait2Second } from "../utils/wait";

export const useCamera = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartCaptureClick = useCallback(async () => {
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

  return {
    webcamRef,
    capturing,
    recordedChunks,
    handleStartCaptureClick,
    handleUpload,
  };
};
