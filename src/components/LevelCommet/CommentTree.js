import Comment from "./Comment";

const CommentsList = ({ comments, selectedComment, onCommentClick }) => {
  const rootComments = comments.filter((comment) => !comment.comment_parentId);
  console.log("root",rootComments);
  return (
    <div className="comments-list">
      {rootComments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          comments={comments}
          selectedComment={selectedComment}
          onCommentClick={onCommentClick}
        />
      ))}
    </div>
  );
};

export default CommentsList;