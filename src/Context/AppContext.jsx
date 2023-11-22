import { createContext, useContext, useReducer, useRef, useState } from "react";
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
          isEditing: false,
        };
      });
      return {
        ...comment,
        isLiked: false,
        isDisliked: false,
        type: "comment",
        replies: updatedReplies,
        isEditing: false,
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

                  score: comment.score + 1,
                  isLiked: true,
                  isDisliked: false,
                };
              else {
                return {
                  ...comment,
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
                      score: reply.score + 1,
                      isLiked: true,
                      isDisliked: false,
                    };
                  } else {
                    return {
                      ...reply,
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
                  isLiked: false,
                };
              else
                return {
                  ...comment,
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
                if (reply.id === action.payload.id && !reply.isDisliked) {
                  return {
                    ...reply,
                    score: reply.score - 1,
                    isDisliked: true,
                    isLiked: false,
                  };
                } else {
                  return {
                    ...reply,
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
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case "editComment":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.replies) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id === action.payload.id) {
                return {
                  ...reply,
                  content: "hi",
                };
              } else return { ...reply };
            });
            return { ...comment, replies: updatedReplies };
          }
          return { ...comment };
        }),
      };

    case "editCommentBtn":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === action.payload) {
                  return {
                    ...reply,
                    isEditing: !reply.isEditing,
                  };
                }
                return reply;
              }),
            };
          }
          if (comment.id === action.payload) {
            return {
              ...comment,
              isEditing: !comment.isEditing,
            };
          }
          return comment;
        }),
      };

    case "deleteComment":
      if (action.payload.entityType === "comment") {
        const updatedComments = state.comments.filter(
          (comment) => comment.id !== action.payload.id
        );

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

    case "addReply": {
      return {
        ...state,
        isOpen: !state.isOpen,
        comments: state.comments.map((comment) => {
          if (state.replyId === comment.id) {
            console.log(state.replyId);
            return {
              ...comment,
              replies: [...comment.replies, action.payload],
            };
          }

          return comment;
        }),
      };
    }
    default:
      throw new Error("Wron Input");
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [comment, setComment] = useState("");
  const edit = useRef(null);
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
        edit,
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
