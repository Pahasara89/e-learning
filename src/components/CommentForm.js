import React, { useState } from "react";
import "../css/CommentForm.css";

const CommentForm = ({ onSubmit, currentUser }) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await onSubmit(text);
      if (success) {
        setText("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="comment-form-avatar">
        <img src={currentUser?.avatar || "/default-avatar.png"} alt={currentUser?.name} />
      </div>
      
      <div className="comment-form-input">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          disabled={isSubmitting}
          required
        />
        
        <button 
          type="submit" 
          className="comment-submit-btn"
          disabled={isSubmitting || !text.trim()}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;