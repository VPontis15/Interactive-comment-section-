import styled from "styled-components";
import { useAppContext } from "../../Context/AppContext";
import ReplyBtn from "../ui/ReplyBtn";
import ClearBtn from "../ui/ClearBtn";

const ReplyArea = styled.textarea`
  resize: none;
  width: 100%;
  max-width: 100%;
  border: none;
  border-bottom: 1px solid #0b0b0b;
  min-height: 5px;
  margin-top: 0.5rem;
  height: 30px;
  overflow-y: auto;

  &:focus {
    outline: 1px solid #0b0b0b;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
`;

const ReplyDiv = styled.div`
  max-width: 100%;
  flex: 1;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
`;

function Reply({ replyTo }) {
  const {
    comment,
    handleAddComment,
    setComment,

    currentUser,
  } = useAppContext();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Avatar src={currentUser?.image.png} />
      <ReplyDiv>
        <ReplyArea
          onChange={handleAddComment}
          value={comment}
          placeholder=" Add a reply..."
        ></ReplyArea>
        <ButtonContainer>
          <ReplyBtn replyTo={replyTo} />
          <ClearBtn />
        </ButtonContainer>
      </ReplyDiv>
    </div>
  );
}

export default Reply;
