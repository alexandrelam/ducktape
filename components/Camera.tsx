import Webcam from "react-webcam";
import { useRef, useCallback } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export function Camera() {
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    addDoc(collection(db, "photos"), {
      image: imageSrc,
    });
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        mirrored={true}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
}
