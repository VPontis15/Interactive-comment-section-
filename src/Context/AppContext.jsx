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
      return {
        ...state,
        isClicked: !state.isClicked,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload) {
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

    // case "likeReply":

    case "dislikeReply":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.replies && comment.replies.length > 0) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id === action.payload) {
                if (!reply.isDisliked) {
                  return {
                    ...reply,
                    score: reply.score - 1,
                    isLiked: false, // Ensure mutually exclusive liking/disliking
                    isDisliked: true,
                  };
                } else {
                  return {
                    ...reply,
                    score: reply.score + 1,
                    isDisliked: false,
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

    case "addComment":
      if (!action.payload) return;
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "deleteComment":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };

    case "deleteReply": {
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.replies) {
            const updatedReplies = comment.replies.filter((reply) => {
              return reply.id !== action.payload;
            });
            return {
              ...comment,
              replies: updatedReplies,
            };
          }
        }),
      };
    }
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
