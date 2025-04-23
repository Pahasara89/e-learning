import React, { useState, useEffect } from "react";
import { commentService } from "../services/CommentService";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "../css/CommentList.css";
import { useNotifications } from "../context/NotificationContext";

const CommentList = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await commentService.getComments(postId);
      setComments(data);
      setError(null);
    } catch (err) {
      setError("Failed to load comments. Please try again later.");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (text) => {
    try {
      const newComment = {
        postId,
        userId: currentUser.id,
        username: currentUser.name,
        userAvatar: currentUser.avatar,
        text,
        timestamp: new Date().toISOString()
      };

      const savedComment = await commentService.addComment(newComment);
      setComments(prevComments => [savedComment, ...prevComments]);
      
      // Add notification for comment
      addNotification({
        id: Date.now(),
        type: 'comment',
        postId,
        userId: currentUser.id,
        username: currentUser.name,
        timestamp: new Date().toISOString(),
        content: `${currentUser.name} commented on a post: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
        read: false
      });
      
      return true;
    } catch (err) {
      console.error("Error adding comment:", err);
      return false;
    }
  };

  const handleUpdateComment = (updatedComment) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  const handleDeleteComment = (commentId) => {
    setComments(prevComments => 
      prevComments.filter(comment => comment.id !== commentId)
    );
  };

  if (loading) return <div className="comments-loading">Loading comments...</div>;
  
  if (error) return <div className="comments-error">{error}</div>;

  return (
    <div className="comments-section">
      <h3 className="comments-heading">Comments</h3>
      
      <CommentForm onSubmit={handleAddComment} currentUser={currentUser} />
      
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              onCommentUpdate={handleUpdateComment}
              onCommentDelete={handleDeleteComment}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;