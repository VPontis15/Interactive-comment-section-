import { createContext, useContext, useReducer, useState } from "react";
import data from "../Data/data.json";

const AppContext = createContext();

const initialState = {
  comments: data.comments.map((comment) => {
    return {
      ...comment,
      isLiked: false,
      isDisliked: false,
    };
  }),

  currentUser: data.currentUser,

  replies: data.comments
    .reduce((arr, comment) => {
      if (comment.replies.length > 1) return [...comment.replies];
      return [];
    })
    .map((reply) => {
      return { ...reply, isLiked: false, isDisliked: false };
    }),
  allData: data.comments
    .reduce((arr, comment) => {
      if (comment.replies.length) return [arr, comment, ...comment.replies];
    })
    .map((comment) => {
      return {
        ...comment,
        isLiked: false,
        isDisliked: false,
      };
    }),
};

function reducer(state, action) {
  switch (action.type) {
    case "likeComment":
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload) {
            if (!comment.isLiked)
              return {
                ...comment,
                score: state.isDisliked ? comment.score + 2 : comment.score + 1,
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
