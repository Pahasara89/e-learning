import React, { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
import "../css/Share.css";

const Share = ({ post, currentUser }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { addNotification } = useNotifications();

  const shareOptions = [
    { id: 'timeline', name: 'Share to Timeline', icon: 'fas fa-stream' },
    { id: 'message', name: 'Send as Message', icon: 'fas fa-paper-plane' },
    { id: 'copy', name: 'Copy Link', icon: 'fas fa-link' },
    { id: 'email', name: 'Share via Email', icon: 'fas fa-envelope' }
  ];

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  const handleShare = (option) => {
    // In a real app, this would implement actual sharing functionality
    console.log(`Sharing post ${post.id} via ${option.id}`);
    
    // Create a notification for the share
    addNotification({
      id: Date.now(),
      type: 'share',
      postId: post.id,
      userId: currentUser.id,
      username: currentUser.name,
      timestamp: new Date().toISOString(),
      content: `${currentUser.name} shared your post via ${option.name}`,
      read: false
    });
    
    // Handle different share methods
    switch (option.id) {
      case 'copy':
        // In a real app, you'd copy a URL to clipboard
        alert("Link copied to clipboard!");
        break;
      case 'email':
        window.location.href = `mailto:?subject=Check out this post&body=I thought you might be interested in this: ${window.location.href}`;
        break;
      default:
        // For timeline and message, just show confirmation
        alert(`Post shared via ${option.name}!`);
    }
    
    setIsShareModalOpen(false);
  };

  return (
    <div className="share-container">
      <button className="share-button" onClick={toggleShareModal}>
        <i className="share-icon fas fa-share"></i>
        <span>Share</span>
      </button>
      
      {isShareModalOpen && (
        <div className="share-modal-overlay" onClick={toggleShareModal}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Share this post</h3>
              <button className="share-modal-close" onClick={toggleShareModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="share-options">
              {shareOptions.map(option => (
                <button 
                  key={option.id}
                  className="share-option" 
                  onClick={() => handleShare(option)}
                >
                  <i className={`share-option-icon ${option.icon}`}></i>
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;