import styled from "styled-components";
import data from "../../Data/data.json";
import { useAppContext } from "../../Context/AppContext";

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

function LikeComponent({ children, id, entityType }) {
  const { dispatch } = useAppContext();

  return (
    <LikeContainer>
      <LikeButton
        value={children}
        onClick={() => {
          dispatch({
            type: "likeComment",
            payload: { id: id, entityType: entityType },
          });
        }}
      >
        +
      </LikeButton>
      <span
        style={{
          textAlign: "center",
          color: " hsl(238, 40%, 52%)",
          fontWeight: "bold",
        }}
      >
        {children}
      </span>
      <LikeButton
        onClick={() => {
          console.log(id);
          dispatch({
            type: "dislikeComment",
            payload: { id: id, entityType: entityType },
          });
        }}
      >
        -
      </LikeButton>
    </LikeContainer>
  );
}

export default LikeComponent;
