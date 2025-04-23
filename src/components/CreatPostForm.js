// src/components/Post/CreatePostForm.js
import React, { useState } from "react";
import "../css/CreatePostForm.css";

const CreatePostForm = ({ currentUser, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setContent("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && !image) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      const newPost = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.name,
        userAvatar: currentUser.avatar,
        content,
        image,
        timestamp: new Date().toISOString(),
        likes: [],
        commentCount: 0,
        shares: 0
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call the parent handler
      onPostCreated(newPost);
      
      // Reset form
      setContent("");
      setImage(null);
      setIsExpanded(false);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <div className="create-post-header">
          <div className="post-avatar">
            <img src={currentUser?.avatar || "/default-avatar.png"} alt={currentUser?.name} />
          </div>
          
          <div className="post-input-container">
            <textarea
              className="post-input"
              placeholder={`What's on your mind, ${currentUser?.name?.split(' ')[0] || 'there'}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        {isExpanded && (
          <>
            {image && (
              <div className="post-image-preview">
                <img src={image} alt="Preview" />
                <button 
                  type="button" 
                  className="remove-image-button"
                  onClick={handleRemoveImage}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
            
            <div className="post-actions-container">
              <div className="post-attachments">
                <label className="attachment-button">
                  <i className="fas fa-image"></i>
                  <span>Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    disabled={isSubmitting}
                  />
                </label>
                
                <button type="button" className="attachment-button" disabled={isSubmitting}>
                  <i className="fas fa-video"></i>
                  <span>Video</span>
                </button>
                
                <button type="button" className="attachment-button" disabled={isSubmitting}>
                  <i className="fas fa-paperclip"></i>
                  <span>Attachment</span>
                </button>
              </div>
              
              <div className="post-submit-container">
                <button 
                  type="button" 
                  className="post-cancel" 
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                
                <button 
                  type="submit" 
                  className="post-submit"
                  disabled={isSubmitting || (!content.trim() && !image)}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CreatePostForm;