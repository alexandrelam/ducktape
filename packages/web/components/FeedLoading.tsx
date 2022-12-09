import Skeleton from "@mui/material/Skeleton";
import styled from "@emotion/styled";

export function FeedLoading() {
  return (
    <>
      <StyledSkeleton variant="rectangular" height={500} />
      <StyledSkeleton variant="rectangular" height={500} />
      <StyledSkeleton variant="rectangular" height={500} />
    </>
  );
}

const StyledSkeleton = styled(Skeleton)`
  margin: 1rem;
`;
