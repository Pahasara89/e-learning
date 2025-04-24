import React, { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
import "../css/Share.css";
import { AddLinkOutlined, EmailOutlined, ForwardToInboxRounded, SendOutlined, ShareOutlined, TimelineOutlined } from "@mui/icons-material";
import Toast from "./Toast";

const Share = ({ post, currentUser }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const { addNotification } = useNotifications();

  const shareOptions = [
    { id: 'timeline', name: 'Share to Timeline', icon: <TimelineOutlined /> },
    { id: 'message', name: 'Send as Message', icon: <ForwardToInboxRounded/> },
    { id: 'copy', name: 'Copy Link', icon: <AddLinkOutlined/> },
    { id: 'email', name: 'Share via Email', icon: <EmailOutlined/> }
  ];

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
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
      content: `You shared your post via ${option.name}`,
      read: false
    });
    
    // Handle different share methods
    switch (option.id) {
      case 'copy':
        // In a real app, you'd copy a URL to clipboard
        showToast("Link copied to clipboard!", "success");
        break;
      case 'email':
        window.location.href = `mailto:?subject=Check out this post&body=I thought you might be interested in this: ${window.location.href}`;
        showToast("Email client opened!", "info");
        break;
      default:
        // For timeline and message, just show confirmation
        showToast(`Post shared via ${option.name}!`, "success");
    }
    
    setIsShareModalOpen(false);
  };

  return (
    <div className="share-container">
      <button className="share-button" onClick={toggleShareModal}>
        <ShareOutlined className="share-icon"/>
        <span>Share</span>
      </button>
      
      {isShareModalOpen && (
        <div className="share-modal-overlay" onClick={toggleShareModal}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Share this post</h3>
              <button className="share-modal-close" onClick={toggleShareModal}>
                <SendOutlined className="fas fa-times"/>
              </button>
            </div>
            
            <div className="share-options">
              {shareOptions.map(option => (
                <button 
                  key={option.id}
                  className="share-option" 
                  onClick={() => handleShare(option)}
                >
                  <span className="share-option-icon">{option.icon}</span>
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default Share;