// src/components/Layout/Header.js
import React, { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
import NotificationPanel from "./NotificationPanel";
import "../css/Header.css";

const Header = ({ currentUser }) => {
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const { notifications } = useNotifications();
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <h1>EduSocial</h1>
        </div>
        
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li className="nav-item active">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </li>
          <li className="nav-item">
            <i className="fas fa-book"></i>
            <span>Courses</span>
          </li>
          <li className="nav-item">
            <i className="fas fa-users"></i>
            <span>Groups</span>
          </li>
          <li className="nav-item">
            <i className="fas fa-graduation-cap"></i>
            <span>Learn</span>
          </li>
        </ul>
      </nav>
      
      <div className="header-right">
        <div className="notification-container">
          <button 
            className="notification-button" 
            onClick={toggleNotificationPanel}
          >
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          
          <NotificationPanel 
            isOpen={isNotificationPanelOpen} 
            onClose={() => setIsNotificationPanelOpen(false)} 
          />
        </div>
        
        <div className="user-menu">
          <div className="user-avatar">
            <img src={currentUser?.avatar || "/default-avatar.png"} alt={currentUser?.name} />
          </div>
          <span className="user-name">{currentUser?.name || "Guest"}</span>
          <i className="fas fa-caret-down"></i>
          
          <div className="user-dropdown">
            <ul>
              <li>
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </li>
              <li>
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </li>
              <li>
                <i className="fas fa-question-circle"></i>
                <span>Help</span>
              </li>
              <li>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;