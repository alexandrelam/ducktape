import styled from "@emotion/styled";

export default function Home() {
  return (
    <Container>
      <img
        src="https://images.unsplash.com/photo-1667337404447-abff670817aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
        alt="duck image"
      />
      <img
        src="https://images.unsplash.com/photo-1667337404447-abff670817aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
        alt="duck image"
      />
      <img
        src="https://images.unsplash.com/photo-1667337404447-abff670817aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
        alt="duck image"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

