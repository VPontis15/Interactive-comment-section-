import { useAppContext } from "../../Context/AppContext";

function ReplyBtn({ replyTo }) {
  const { dispatch, currentUser, comment, setComment } = useAppContext();
  return (
    <button
      onClick={() => {
        if (comment === "" || /^\s*$/.test(comment)) return;
        dispatch({
          type: "addReply",
          payload: {
            id: Math.floor(Math.random() * 10534),
            user: {
              username: currentUser.username,
              image: currentUser.image,
            },
            type: "reply",
            score: 0,
            content: comment,
            createdAt: "now",
            replyingTo: replyTo,
            replies: [],
          },
        });
        setComment("");
      }}
    >
      Reply
    </button>
  );
}

export default ReplyBtn;
