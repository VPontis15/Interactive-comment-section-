import AddComment from "./features/comment/AddComment";
import Comment from "./features/comment/Comment";
// import AppProvider from "./Context/AppContext";
import CommentSection from "./features/layout/CommentSection";

function App() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <CommentSection>
        <Comment />
      </CommentSection>
      <AddComment />
    </div>
  );
}

export default App;
