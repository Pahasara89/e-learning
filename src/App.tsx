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
    name: "Kaushani Dewmini",
    avatar: "https://img.freepik.com/free-photo/businesswoman-with-glasses-crossed-arms_1098-3347.jpg?t=st=1745591402~exp=1745595002~hmac=6a577604ed44c28dfc5e0f582a79826c2acd61574042de9d878892e704c777bc&w=1380",
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