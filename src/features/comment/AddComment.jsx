import styled from "styled-components";
import { useAppContext } from "../../Context/AppContext";

function AddComment() {
  const { currentUser } = useAppContext();

  const AddComment = styled.div`
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

  return (
    <AddComment autoFocus={true}>
      <img src={currentUser.image.png} />
      <TextArea placeholder="   Add comment..."></TextArea>
      <SendButton>Send</SendButton>
    </AddComment>
  );
}

export default AddComment;
