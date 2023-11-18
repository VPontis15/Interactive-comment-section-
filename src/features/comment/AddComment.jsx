import styled from "styled-components";
import { useAppContext } from "../../Context/AppContext";
const AddCommentDiv = styled.div`
  display: flex;
  align-items: start;
  background-color: #fff;
  padding: 2em;
  border-radius: 15px;
  gap: 1em;
  margin-block: 2rem;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.25em 0.75em;
`;

const SendButton = styled.button`
  background-color: hsl(238, 40%, 52%);
  color: #fff;
  border: none;
  padding: 0.65em 1.75em;
  border-radius: 15px;
  text-transform: uppercase;
  cursor: pointer;
`;

function AddComment() {
  const { currentUser, dispatch, comment, handleAddComment, setComment } =
    useAppContext();
  console.log(currentUser);
  return (
    <AddCommentDiv autoFocus={true}>
      <img src={currentUser.image.png} />

      <TextArea
        required={true}
        onChange={(e) => {
          handleAddComment(e);
        }}
        value={comment}
        placeholder="   Add comment..."
      ></TextArea>
      <SendButton
        onClick={() => {
          if (!comment) return;
          dispatch({
            type: "addComment",
            payload: {
              id: 8,
              user: {
                username: currentUser.username,
                image: currentUser.image,
              },
              score: 0,
              content: comment,
              createdAt: "1 day ago",
            },
          });
          setComment("");
        }}
      >
        Send
      </SendButton>
    </AddCommentDiv>
  );
}

export default AddComment;
