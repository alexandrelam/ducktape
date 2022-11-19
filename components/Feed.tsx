import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Video as VideoType } from "../types/Video";
import { Video } from "./Video";
import { useFeed } from "../api/useFeed";
import { useMe } from "../api/useMe";
import { FeedLoading } from "./FeedLoading";
import { User } from "../types/User";
import { mutate } from "swr";
import { getCookie } from "../utils/cookie";

async function deleteVideo(user: User, video: VideoType) {
  await fetch(
    `${process.env.API_URL}/api/v1/users/${user.id}/videos/${video.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    }
  );
  mutate(`/api/v1/users/${user.id}/videos`);
}

function dateToTime(date: Date) {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Feed() {
  const { user } = useMe();
  const { feed, isLoading } = useFeed(user ? user.id : null);

  if (isLoading || !feed) {
    return <FeedLoading />;
  }

  const sortedFeed = feed.sort((a: VideoType, b: VideoType) => {
    const aDate = new Date(a.lastModifiedDate);
    const bDate = new Date(b.lastModifiedDate);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <FeedContainer>
      {sortedFeed.map((video) => (
        <Overlay key={video.id}>
          <OverlayTextWrapper>
            <OverlayText>
              {user.name} {user.id} {video.userId}
            </OverlayText>
            <OverlayText>
              {dateToTime(new Date(video.lastModifiedDate))}
            </OverlayText>
          </OverlayTextWrapper>
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
            videoUrl={`http://localhost:4000/${video.newFilename}`}
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
