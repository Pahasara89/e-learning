import React, { useState } from "react";
import { commentService } from "../services/CommentService";
import '../css/Comment.css'

const Comment = ({ comment, onCommentUpdate, onCommentDelete, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(comment.content);
  };

  const handleSaveEdit = async () => {
    try {
      await commentService.updateComment(comment._id, { 
        ...comment, 
        content: editText 
      });
      
      onCommentUpdate({
        ...comment,
        content: editText
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await commentService.deleteComment(comment._id);
      onCommentDelete(comment._id);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const isAuthor = currentUser && comment.userId === currentUser.id;

  return (
    <div className="comment">
      <div className="comment-avatar">
        <img src={comment.userAvatar || "/default-avatar.png"} alt={comment.username} />
      </div>
      
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{comment.username}</span>
          <span className="comment-time">{new Date(comment.timestamp).toLocaleString()}</span>
        </div>
        
        {isEditing ? (
          <div className="comment-edit">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="comment-edit-textarea"
            />
            <div className="comment-edit-actions">
              <button onClick={handleSaveEdit} className="btn-save">Save</button>
              <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="comment-text">{comment.content}</div>
        )}
        
        {isAuthor && !isEditing && (
          <div className="comment-actions">
            <button onClick={handleEdit} className="btn-edit">Edit</button>
            <button onClick={handleDelete} className="btn-delete">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;