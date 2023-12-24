const Comment = ({ comment, comments, selectedComment, onCommentClick }) => {
  const childComments = comments.filter(
    (childComment) => childComment.comment_parentId === comment._id
  );

  const handleCommentClick = () => {
    onCommentClick(comment._id);
  };

  return (
    <div className="comment">
      <div className="comment-content">{comment.comment_content}</div>
      {childComments.length > 0 && (
        <div className="child-comments">
          {childComments.map((childComment) => (
            <Comment
              key={childComment._id}
              comment={childComment}
              comments={comments}
              selectedComment={selectedComment}
              onCommentClick={onCommentClick}
            />
          ))}
        </div>
      )}
      {childComments.length > 0 && (
        <button onClick={handleCommentClick}>View replies</button>
      )}
    </div>
  );
};

export default Comment;