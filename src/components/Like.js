import React, { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../css/Like.css";

const Like = ({ postId, initialLikes = [], currentUser }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(
    initialLikes.some(like => like.userId === currentUser?.id)
  );
  const { addNotification } = useNotifications();

  const handleLike = () => {
    if (!currentUser) return;

    if (isLiked) {
      // Remove like
      setLikes(prevLikes => 
        prevLikes.filter(like => like.userId !== currentUser.id)
      );
    } else {
      // Add like
      const newLike = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.name,
        timestamp: new Date().toISOString()
      };
      
      setLikes(prevLikes => [...prevLikes, newLike]);
      
      // Create notification for the like
      addNotification({
        id: Date.now(),
        type: 'like',
        postId,
        userId: currentUser.id,
        username: currentUser.name,
        timestamp: new Date().toISOString(),
        content: `${currentUser.name} you like a post`,
        read: false 
      });
    }
    
    setIsLiked(!isLiked);
  };

  return (
    <div className="like-container">
      <button 
        className={`like-button ${isLiked ? 'liked' : ''}`} 
        onClick={handleLike}
      >
        {isLiked ? (
          <FavoriteIcon className="like-icon" />
        ) : (
          <FavoriteBorderIcon className="like-icon" />
        )}
        {likes.length > 0 && (
          <span className="like-count">{likes.length}</span>
        )}
      </button>
    </div>
  );
};

export default Like;