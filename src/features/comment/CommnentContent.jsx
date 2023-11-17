import data from "../../Data/data.json";
import LikeComponent from "./LikeComponent";

const { comments } = data;
console.log(comments);

function CommnentContent() {
  return (
    <>
      {comments.map((comment) => {
        return (
          <li
            key={comment.id}
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <LikeComponent />
            <div>
              <div style={{ display: "flex" }}>
                <img src={comment.user.image.png} />
                <span>{comment.user.username}</span>
                <span>{comment.createdAt}</span>
                <button style={{ marginLeft: "auto" }}>Reply</button>
              </div>
              <p>{comment.content}</p>
            </div>
          </li>
        );
      })}
    </>
  );
}

export default CommnentContent;
