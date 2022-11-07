import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteVideo } from "../firebase/videos";
import { EmptyFeed } from "./EmptyFeed";
import { useStore } from "../hooks/useStore";
import { Video } from "../types/Video";

function dateToTime(date: Date) {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Feed() {
  const { user, videos, setVideos, setPage } = useStore();
  if (videos.length === 0) {
    return <EmptyFeed setPage={setPage} />;
  }

  const sortedVideos = videos.sort((a: Video, b: Video) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <FeedContainer>
      {sortedVideos.map((video) => (
        <Overlay key={video.url}>
          <OverlayTextWrapper>
            <OverlayText>{video.author}</OverlayText>
            <OverlayText>{dateToTime(new Date(video.createdAt))}</OverlayText>
          </OverlayTextWrapper>
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

const OverlayTextWrapper = styled.div`
  position: absolute;
  margin-left: 1rem;
  margin-top: 1rem;
`;

const OverlayText = styled.h2`
  color: white;
  margin: 0.2rem;
  font-size: 2rem;
  opacity: 0.5;
`;
