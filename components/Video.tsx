import styles from "../styles/Video.module.css";
import { useState, useEffect } from "react";

type Props = {
  videoUrl: string;
  isFrontCamera: boolean;
};

export function Video({ videoUrl, isFrontCamera }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <video
      autoPlay
      muted
      loop
      className={`${styles.video} ${isMounted && styles.visible} ${
        isFrontCamera && styles.mirrored
      }`}
    >
      <source src={videoUrl} type="video/webm" />
    </video>
  );
}
