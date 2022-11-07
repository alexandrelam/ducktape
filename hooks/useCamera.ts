import { useState, useRef, useCallback } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { wait2Second } from "../utils/wait";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";

export const useCamera = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [user] = useAuthState(auth);

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

  const handleFirebaseUpload = useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      try {
        const title = `${new Date().toISOString()}.webm`;
        const storage = getStorage();
        const storageRef = ref(storage, title);

        await updateDoc(doc(db, "users", user!.uid), {
          videos: arrayUnion({
            path: title,
            createdAt: new Date().toISOString(),
          }),
        });

        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, blob);
        setRecordedChunks([]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [recordedChunks]);

  const handleCancel = useCallback(() => {
    setRecordedChunks([]);
  }, [setRecordedChunks]);

  return {
    webcamRef,
    capturing,
    recordedChunks,
    handleStartCaptureClick,
    handleFirebaseUpload,
    handleCancel,
  };
};