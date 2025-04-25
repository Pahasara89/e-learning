import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CreatePostForm from './components/CreatePostForm';
import PostList from './components/PostList';
import NotificationProvider from './context/NotificationContext';

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface Post {
  id: number;
  userId: string | number;
  username?: string;
  userAvatar?: string;
  content: string;
  image?: string | null;
  timestamp: string;
  likes: any[];
  commentCount: number;
  shares: number;
}

const App: React.FC = () => {
  const [currentUser] = useState<User>({
    id: "user123",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=4",
    role: "Student"
  });

  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostCreated = (newPost: Post): void => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <NotificationProvider>
      <div className="app">
        <Header currentUser={currentUser} />
        
        <div className="main-container">
          <div className="content">
            <CreatePostForm 
              currentUser={currentUser} 
              onPostCreated={handlePostCreated} 
            />
            <PostList 
              currentUser={currentUser} 
            />
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default App; 