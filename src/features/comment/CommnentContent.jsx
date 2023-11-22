import styled from "styled-components";

import RepliesContainer from "../Replies/RepliesContainer";
import LikeComponent from "./LikeComponent";
import { useAppContext } from "../../Context/AppContext";
import DeleteBtn from "../ui/DeleteBtn";
import AddComment from "./AddComment";
import Reply from "../Replies/Reply";

const UserName = styled.span`
  font-weight: bold;
`;

const UserAvatar = styled.img`
  display: block;
  max-width: 100%;
  width: 3.5rem;
  object-fit: cover;
`;

const UserDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ReplyingTo = styled.span`
  color: hsl(238, 40%, 52%);
  font-weight: bold;
`;

const Comment = styled.li`
  display: flex;
  width: 100%;
  align-items: start;
  gap: 1.5rem;
  background-color: #fff;
  padding: 1.5em;
  margin-bottom: 1em;
  border-radius: 15px;
`;

const CommentContent = styled.p`
  max-width: 65ch;
  line-height: 1.6;
`;

const EditComment = styled.textarea`
  outline: 2px solid #e3e3e3;

  outline: none;
  resize: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  margin: 0;
  width: 100%;
  height: 100%;
  min-height: 100px;
  overflow: hidden;
  cursor: text;
  color: black;
  &:disabled {
    border: none;
    outline: none;
    resize: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    min-height: 100px;
    overflow: hidden;
    cursor: text;
    color: black;
  }
`;

const ReplyButton = styled.button`
  display: inline-flex;
  gap: 0.5rem;
  background: none;
  border: none;
  color: hsl(238, 40%, 52%);
  font-weight: bold;
  align-items: center;
  cursor: pointer;
`;
const currentUserText = {
  display: `inlineBlock`,
  padding: `0 .7em`,
  color: `#fff`,
  backgroundColor: `hsl(238, 40%, 52%)`,
  textTransform: "lowercase",
};

// const { comments } = data;

function CommnentContent() {
  const { comments, dispatch, currentUser, replyId, isOpen } = useAppContext();

  return (
    <>
      {comments.map((comment) => {
        return (
          <>
            <Comment key={comment.id}>
              <LikeComponent entityType={comment.type} id={comment.id}>
                <span> {comment.score}</span>{" "}
              </LikeComponent>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div key={comment.id} style={{}}>
                  <UserDetailsContainer
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <UserAvatar src={comment.user.image.png} />
                    {currentUser.username === comment.user.username && (
                      <span style={currentUserText}> YOU</span>
                    )}
                    <UserName>{comment.user.username}</UserName>
                    <span>{comment.createdAt}</span>
                    {currentUser.username !== comment.user.username && (
                      <ReplyButton
                        onClick={() =>
                          dispatch({
                            type: "storeReplyId",
                            payload: comment.id,
                          })
                        }
                        style={{ marginLeft: "auto" }}
                      >
                        <img
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          src={`../../../public/icon-reply.svg`}
                        />
                        Reply
                      </ReplyButton>
                    )}
                    {currentUser.username == comment.user.username && (
                      <DeleteBtn entityType={comment.type} id={comment.id} />
                    )}
                  </UserDetailsContainer>{" "}
                  <CommentContent>{comment.content}</CommentContent>
                </div>{" "}
                {isOpen && replyId === comment.id && (
                  <Reply replyTo={comment.user.username} />
                )}
              </div>
            </Comment>

            {comment.replies && (
              <RepliesContainer>
                {comment.replies.map((reply) => {
                  return (
                    <Comment
                      style={{
                        marginLeft: "4rem",
                      }}
                      key={reply.id}
                    >
                      <LikeComponent entityType={reply.type} id={reply.id}>
                        {reply.score}
                      </LikeComponent>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <UserDetailsContainer>
                          <UserAvatar src={reply.user.image.png} />
                          {currentUser.username === reply.user.username && (
                            <span style={currentUserText}> YOU</span>
                          )}
                          <UserName>{reply.user.username}</UserName>
                          <span>{reply.createdAt}</span>
                          {currentUser.username !== reply.user.username && (
                            <ReplyButton
                              onClick={() =>
                                dispatch({
                                  type: "storeReplyId",
                                  payload: reply.id,
                                })
                              }
                              style={{ marginLeft: "auto" }}
                            >
                              <img
                                style={{
                                  width: "20px",
                                  height: "20px",
                                }}
                                src={`../../../public/icon-reply.svg`}
                              />
                              Reply
                            </ReplyButton>
                          )}
                          {currentUser.username == reply.user.username && (
                            <>
                              {/* <EditBtn reply={reply} id={reply.id} /> */}
                              <DeleteBtn
                                entityType={reply.type}
                                id={reply.id}
                              />
                            </>
                          )}
                        </UserDetailsContainer>{" "}
                        <CommentContent key={reply.id}>
                          <ReplyingTo>{`@${reply.replyingTo} `}</ReplyingTo>
                          {reply.content}
                        </CommentContent>
                        {isOpen && replyId === reply.id && <Reply />}
                      </div>
                    </Comment>
                  );
                })}
              </RepliesContainer>
            )}
          </>
        );
      })}
    </>
  );
}

export default CommnentContent;
