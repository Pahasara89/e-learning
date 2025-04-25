import React, { useState, useEffect } from "react";
import Post from "./Post";
import "../css/PostList.css";

interface User {
  id: string | number;
  name?: string;
  username?: string;
  avatar?: string;
}

interface LikeData {
  id: number;
  userId: string | number;
  username?: string;
  timestamp: string;
}

interface PostData {
  id: number;
  userId: string | number;
  username: string;
  userAvatar: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: LikeData[];
  commentCount: number;
  shares: number;
}

interface PostListProps {
  currentUser: User | null;
}

const PostList: React.FC<PostListProps> = ({ currentUser }) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading posts from an API
    const fetchPosts = async (): Promise<void> => {
      setLoading(true);
      
      // Simulated delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockPosts: PostData[] = [
        {
          id: 1,
          userId: "user1",
          username: "Jeeva A",
          userAvatar: "https://i.pravatar.cc/150?img=1",
          content: "Just finished creating my first online course on web development! So excited to share it with you all!",
          image: "https://media.licdn.com/dms/image/v2/D5622AQEuVfx6HRVG5w/feedshare-shrink_800/feedshare-shrink_800/0/1721729211619?e=2147483647&v=beta&t=eVyt17cfmmzH75dk2r7IuKleBcs-X1uVYieY0dHAyFA",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          likes: [
            { id: 1, userId: "user2", username: "John Doe", timestamp: new Date(Date.now() - 1800000).toISOString() },
            { id: 2, userId: "user3", username: "Sarah Wilson", timestamp: new Date(Date.now() - 900000).toISOString() }
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
          username: "Zineb Ibelhaj",
          userAvatar: "https://i.pravatar.cc/150?img=3",
          content: "Just earned my certification in data science! The journey was challenging but worth it.",
          image: "https://media.licdn.com/dms/image/sync/v2/D5627AQFeqLbnaeuGtQ/articleshare-shrink_800/articleshare-shrink_800/0/1736620536952?e=2147483647&v=beta&t=wPNFcsApbnV6vwNfzYCYzNqKvm-m2AUgjhboU_bMQBE",
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          likes: [
            { id: 3, userId: "user1", username: "Jane Smith", timestamp: new Date(Date.now() - 5400000).toISOString() }
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