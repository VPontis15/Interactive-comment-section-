import { createContext, useContext, useReducer } from "react";
import data from "../Data/data.json";

const AppContext = createContext();

const initialState = {
  comments: data.comments,

  replyingTo: {},
  replies: [],
  user: data.comments.score,
};

function reducer(state, action) {
  switch (action.type) {
    case "likeComment":
      return {
        ...state,
        likes: action.payload,
      };
    case "dislikeComment":
      return {
        ...state,
        likes: action.payload,
      };
    case "addComment":
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

  return (
    <AppContext.Provider
      value={{
        comments: state.comments,
        replyingTo: state.replyingTo,
        replies: state.replies,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  console.log(context);
  return context;
}

export { AppProvider, useAppContext };
