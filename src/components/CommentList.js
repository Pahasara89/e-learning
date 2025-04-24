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
      console.log('Received comments data:', data);
      
      if (!Array.isArray(data)) {
        console.error('Expected array of comments but received:', typeof data);
        throw new Error('Invalid response format');
      }

      // Transform the comments data to handle MongoDB ObjectId
      const transformedComments = data.map(comment => {
        console.log('Processing comment:', comment); // Debug log
        
        // Handle different possible structures of the comment data
        let commentId = '';
        let commentTimestamp = '';
        
        if (comment.id && typeof comment.id === 'object') {
          // If id is an object with timestamp property
          if (comment.id.timestamp) {
            commentId = comment.id.timestamp.toString();
            commentTimestamp = new Date(comment.id.date).toISOString();
          } else {
            // If id is an object but doesn't have timestamp
            commentId = comment.id.toString();
            commentTimestamp = new Date().toISOString(); // Use current date as fallback
          }
        } else {
          // If id is a string or number
          commentId = comment.id ? comment.id.toString() : '';
          commentTimestamp = comment.timestamp || new Date().toISOString();
        }
        
        return {
          _id: comment.id || comment._id, // Use either id or _id
          id: commentId,
          content: comment.content,
          postId: comment.postId,
          userId: comment.userId,
          timestamp: commentTimestamp,
          username: currentUser.name,
          userAvatar: currentUser.avatar
        };
      });

      console.log('Transformed comments:', transformedComments); // Debug log
      setComments(transformedComments);
      setError(null);
    } catch (err) {
      console.error("Error details:", err);
      setError(err.message || "Failed to load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (text) => {
    try {
      const newComment = {
        content: text,
        postId: postId,
        userId: currentUser.id
      };

      const savedComment = await commentService.addComment(newComment);
      
      console.log('Saved comment structure:', savedComment); // Debug log
      
      // Handle different possible structures of the saved comment data
      let commentId = '';
      let commentTimestamp = '';
      
      if (savedComment.id && typeof savedComment.id === 'object') {
        // If id is an object with timestamp property
        if (savedComment.id.timestamp) {
          commentId = savedComment.id.timestamp.toString();
          commentTimestamp = new Date(savedComment.id.date).toISOString();
        } else {
          // If id is an object but doesn't have timestamp
          commentId = savedComment.id.toString();
          commentTimestamp = new Date().toISOString(); // Use current date as fallback
        }
      } else {
        // If id is a string or number
        commentId = savedComment.id ? savedComment.id.toString() : '';
        commentTimestamp = savedComment.timestamp || new Date().toISOString();
      }
      
      // Transform the saved comment to match our frontend format
      const transformedComment = {
        _id: savedComment.id || savedComment._id, // Use either id or _id
        id: commentId,
        content: savedComment.content,
        postId: savedComment.postId,
        userId: savedComment.userId,
        timestamp: commentTimestamp,
        username: currentUser.name,
        userAvatar: currentUser.avatar
      };
      
      setComments(prevComments => [transformedComment, ...prevComments]);
      
      // Add notification for comment
      addNotification({
        id: Date.now(),
        type: 'comment',
        postId,
        userId: currentUser.id,
        username: currentUser.name,
        timestamp: new Date().toISOString(),
        content: `You commented on a post: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
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