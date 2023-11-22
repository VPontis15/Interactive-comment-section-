import { createContext, useContext, useReducer, useState } from "react";
import data from "../Data/data.json";

const AppContext = createContext();

const initialState = {
  comments: data.comments.map((comment) => {
    if (comment.replies) {
      const updatedReplies = comment.replies.map((reply) => {
        return {
          ...reply,
          type: "reply",
          isLiked: false,
          isDisliked: false,
        };
      });
      return {
        ...comment,
        isLiked: false,
        isDisliked: false,
        type: "comment",
        replies: updatedReplies,
      };
    }
  }),

  currentUser: data.currentUser,
  replyId: null,
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "likeComment":
      if (action.payload.entityType === "comment") {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.payload.id) {
              if (!comment.isLiked)
                return {
                  ...comment,
                  score: state.isDisliked
                    ? comment.score + 2
                    : comment.score + 1,
                  isLiked: true,
                };
              else {
                return {
                  ...comment,
                  score: comment.score - 1,
                  isLiked: false,
                };
              }
            }
            return comment;
          }),
        };
      }
      if (action.payload.entityType === "reply")
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.replies && comment.replies.length > 0) {
              const updatedReplies = comment.replies.map((reply) => {
                if (reply.id === action.payload.id) {
                  if (!reply.isLiked) {
                    return {
                      ...reply,
                      score: reply.isDisliked
                        ? reply.score + 2
                        : reply.score + 1,
                      isLiked: true,
                      isDisliked: false,
                    };
                  } else {
                    return {
                      ...reply,
                      score: reply.score - 1,
                      isLiked: false,
                    };
                  }
                }
                return reply;
              });

              return {
                ...comment,
                replies: updatedReplies,
              };
            }
            return comment;
          }),
        };
      break;

    case "dislikeComment":
      if (action.payload.entityType === "comment")
        return {
          ...state,

          comments: state.comments.map((comment) => {
            if (comment.id === action.payload.id) {
              if (!comment.isDisliked)
                return {
                  ...comment,
                  score: comment.score - 1,
                  isDisliked: true,
                };
              else
                return {
                  ...comment,
                  score: comment.score + 1,
                  isDisliked: false,
                };
            }
            return comment;
          }),
        };
      if (action.payload.entityType === "reply")
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.replies) {
              const updatedReplies = comment.replies.map((reply) => {
                if (reply.id === action.payload.id) {
                  return {
                    ...reply,
                    score: reply.score - 1,
                    isDisliked: true,
                  };
                } else {
                  return {
                    ...reply,
                    score: reply.score,
                    isDisliked: false,
                  };
                }
              });
              return { ...comment, replies: updatedReplies };
            }
            return comment;
          }),
        };
      break;
    // case "likeReply":

    case "addComment":
      if (/^[^a-zA-Z0-9\s]*$/.test(action.payload)) return;
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case "deleteComment":
      if (action.payload.entityType === "comment") {
        const updatedComments = state.comments.filter(
          (comment) => comment.id !== action.payload.id
        );
        console.log(updatedComments); // Check the result of the filter operation

        return {
          ...state,
          comments: updatedComments,
        };
      }

      if (action.payload.entityType === "reply") {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.replies) {
              const updatedReplies = comment.replies.filter((reply) => {
                return reply.id !== action.payload.id;
              });
              return {
                ...comment,
                replies: updatedReplies,
              };
            }
            return comment;
          }),
        };
      }
      break;

    case "storeReplyId":
      return {
        ...state,
        replyId: action.payload,
        isOpen: !state.isOpen,
      };
    case "reply": {
      return {
        ...state,
        replyingTo: action.payload,
        replies: state.replyingTo?.comments.replies,
      };
    }
    default:
      throw new Error("Wron Input");
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [comment, setComment] = useState("");
  function handleAddComment(e) {
    setComment(e.target.value);
  }

  return (
    <AppContext.Provider
      value={{
        comments: state.comments,
        currentUser: state.currentUser,
        replies: state.replies,
        allComments: state.allComments,
        likes: state.comments.score,
        isLiked: state.isLiked,
        comment,
        replyId: state.replyId,
        isOpen: state.isOpen,
        handleAddComment,
        setComment,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);

  return context;
}

export { AppProvider, useAppContext };
