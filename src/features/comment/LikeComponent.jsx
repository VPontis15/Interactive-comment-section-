import styled from "styled-components";

const LikeContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: hsl(223, 19%, 93%);
  padding: 1.5em 1.25em;
  border-radius: 20px;
`;

const LikeButton = styled.button`
  color: hsl(211, 10%, 45%);
  font-weight: bold;
  border: none;
  font-size: 1.125rem;
  text-align: center;
`;

function LikeComponent() {
  return (
    <LikeContainer>
      <LikeButton>+</LikeButton>
      <span
        style={{
          textAlign: "center",
          color: " hsl(238, 40%, 52%)",
          fontWeight: "bold",
        }}
      >
        5
      </span>
      <LikeButton>-</LikeButton>
    </LikeContainer>
  );
}

export default LikeComponent;
