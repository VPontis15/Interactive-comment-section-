import Comment from "./features/comment/Comment";

import CommentSection from "./features/layout/CommentSection";

function App() {
  return (
    <div>
      <CommentSection>
        <Comment />
      </CommentSection>
    </div>
  );
}

export default App;
