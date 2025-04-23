import React, { useState, useEffect } from "react";
import Post from "./Post";
import "../css/PostList.css";

const PostList = ({ currentUser }) => {
  // In a real app, this would come from an API
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts from an API
    const fetchPosts = async () => {
      setLoading(true);
      
      // Simulated delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockPosts = [
        {
          id: 1,
          userId: "user1",
          username: "Jane Smith",
          userAvatar: "https://i.pravatar.cc/150?img=1",
          content: "Just finished creating my first online course on web development! So excited to share it with you all!",
          image: "https://source.unsplash.com/random/600x400/?coding",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          likes: [
            { userId: "user2", username: "John Doe", timestamp: new Date(Date.now() - 1800000).toISOString() },
            { userId: "user3", username: "Sarah Wilson", timestamp: new Date(Date.now() - 900000).toISOString() }
          ],
          commentCount: 5,
          shares: 2
        },
        {
          id: 2,
          userId: "user2",
          username: "John Doe",
          userAvatar: "https://i.pravatar.cc/150?img=2",
          content: "Has anyone taken the new machine learning course? I'm thinking about enrolling but would love some feedback first!",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          likes: [],
          commentCount: 3,
          shares: 0
        },
        {
          id: 3,
          userId: "user3",
          username: "Sarah Wilson",
          userAvatar: "https://i.pravatar.cc/150?img=3",
          content: "Just earned my certification in data science! The journey was challenging but worth it.",
          image: "https://source.unsplash.com/random/600x400/?certificate",
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          likes: [
            { userId: "user1", username: "Jane Smith", timestamp: new Date(Date.now() - 5400000).toISOString() }
          ],
          commentCount: 8,
          shares: 5
        }
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    };
    
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="posts-loading">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="posts-container">
      {posts.map(post => (
        <Post key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default PostList;