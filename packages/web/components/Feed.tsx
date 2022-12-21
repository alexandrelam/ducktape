import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Video as VideoType } from "models/Video";
import { Video } from "./Video";
import { useFeed } from "../api/useFeed";
import { useMe } from "../api/useMe";
import { FeedLoading } from "./FeedLoading";
import { User } from "models/User";
import { mutate } from "swr";
import axios from "../api/privateAxios";
import { EmptyFeed } from "./EmptyFeed";
import { useStore } from "../hooks/useStore";

async function deleteVideo(user: User, video: VideoType) {
  await axios(`/api/v1/users/${user.id}/videos/${video.id}`, {
    method: "DELETE",
  });
  mutate(`/api/v1/users/${user.id}/videos`);
}

function dateToTime(date: Date) {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Feed() {
  const { setPage } = useStore();
  const { user, isLoading: isUserLoading } = useMe();
  const { feed, isLoading } = useFeed();

  if (isLoading || isUserLoading || !feed) {
    return <FeedLoading />;
  }

  const sortedFeed = feed.sort((a: VideoType, b: VideoType) => {
    const aDate = new Date(a.lastModifiedDate);
    const bDate = new Date(b.lastModifiedDate);
    return bDate.getTime() - aDate.getTime();
  });

  if (sortedFeed.length === 0) {
    return <EmptyFeed setPage={setPage} />;
  }

  return (
    <FeedContainer>
      {sortedFeed.map((video) => (
        <Overlay key={video.id}>
          <OverlayTextWrapper>
            <OverlayText>{user.name}</OverlayText>
            <OverlayText>
              {dateToTime(new Date(video.lastModifiedDate))}
            </OverlayText>
          </OverlayTextWrapper>
          {/**@ts-ignore */}
          {user.id == video.userId ? (
            <StyledIconButton
              aria-label="delete"
              size="large"
              onClick={async () => {
                await deleteVideo(user, video);
              }}
            >
              <DeleteIcon />
            </StyledIconButton>
          ) : null}
          <Video
            videoUrl={`${process.env.API_URL}/${video.newFilename}`}
            isFrontCamera={video.isFrontCamera}
          />
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
  z-index: 100;
`;

const OverlayText = styled.h2`
  color: white;
  margin: 0.2rem;
  font-size: 2rem;
  opacity: 0.5;
`;
