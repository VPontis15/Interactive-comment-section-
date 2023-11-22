import styled from "styled-components";
import { useAppContext } from "../../Context/AppContext";

const ReplyArea = styled.textarea`
  resize: none;
  width: 100%;
  max-width: 100%;
  border: none;
  border-bottom: 1px solid #0b0b0b;

  height: 25px;
  outline: none;
`;

const ReplyDiv = styled.div`
  max-width: 100%;
`;

function Reply() {
  return (
    <ReplyDiv>
      <ReplyArea placeholder=" Add a reply..."></ReplyArea>
      <div style={{ marginLeft: "auto", maxWidth: "100%" }}>
        <button>Send</button>
        <button>Cancel</button>
      </div>
    </ReplyDiv>
  );
}

export default Reply;
