// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CreatePostForm from './components/CreatPostForm';
import PostList from './components/PostList';
import NotificationProvider from './context/NotificationContext';

function App() {
  // Mock current user data - in a real app, this would come from authentication
  const [currentUser] = useState({
    id: "user123",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=4",
    role: "Student"
  });

  const [posts, setPosts] = useState([]);

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <NotificationProvider>
      <div className="app">
        <Header currentUser={currentUser} />
        <Sidebar currentUser={currentUser} />
        
        <div className="main-container">
          <div className="content">
            <CreatePostForm 
              currentUser={currentUser} 
              onPostCreated={handlePostCreated} 
            />
            <PostList 
              posts={posts} 
              currentUser={currentUser} 
            />
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
}

export default App;