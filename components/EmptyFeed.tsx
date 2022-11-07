import styled from "@emotion/styled";
import Button from "@mui/material/Button";

type Props = {
  setPage: (page: number) => void;
};

export function EmptyFeed({ setPage }: Props) {
  return (
    <Container>
      <Image
        src="https://media1.tenor.com/images/3825a1d9496e8301788267237333787c/tenor.gif?itemid=26947911"
        alt=""
      />
      <Title>Pas de ducktape</Title>
      <span>Ajoutez des amis pour voir leurs ducktapes!</span>
      <ButtonWrapper>
        <Button onClick={() => setPage(0)}>Créez un ducktape</Button>
        <Button onClick={() => setPage(2)}>Ajoutez des amis</Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 30rem;
  object-fit: cover;
`;

const Title = styled.h2`
  margin: 0;
  margin-top: 1rem;
`;
