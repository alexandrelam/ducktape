import styled from "@emotion/styled";
import { Video } from "../types/Video";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import type { User } from "firebase/auth";
import { deleteVideo } from "../firebase/videos";
import { Dispatch, SetStateAction } from "react";

type Props = {
  user: User;
  videos: Video[];
  setVideos: Dispatch<SetStateAction<Video[]>>;
  loading: boolean;
};

export function Feed({ user, videos, setVideos, loading }: Props) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (videos.length === 0) {
    return (
      <div>
        Vous n'avez pas encore de vidéos, créez une vidéo ou ajoutez des amis !
      </div>
    );
  }

  return (
    <FeedContainer>
      {videos.map((video) => (
        <Overlay key={video.url}>
          <OverlayText>{video.author}</OverlayText>
          {user.uid === video.authorUid ? (
            <StyledIconButton
              aria-label="delete"
              size="large"
              onClick={() => {
                setVideos(videos.filter((v) => v.url !== video.url));
                deleteVideo(user, videos, video);
              }}
            >
              <DeleteIcon />
            </StyledIconButton>
          ) : null}
          <Video autoPlay muted loop>
            <source src={video.url} type="video/webm" />
          </Video>
        </Overlay>
      ))}
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 666px;
  margin: auto;
`;

const Video = styled.video`
  width: 100%;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 1rem;
  top: 1.5rem;
  color: white;
  opacity: 0.3;
  z-index: 150;
`;

const Overlay = styled.div`
  position: relative;
`;

const OverlayText = styled.h2`
  position: absolute;
  color: white;
  font-size: 2rem;
  opacity: 0.5;
  margin-left: 1rem;
`;
