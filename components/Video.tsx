import styles from "../styles/Video.module.css";
import { useState, useEffect } from "react";

type Props = {
  videoUrl: string;
};

export function Video({ videoUrl }: Props) {
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
      className={`${styles.video} ${isMounted && styles.visible}`}
    >
      <source src={videoUrl} type="video/webm" />
    </video>
  );
}
