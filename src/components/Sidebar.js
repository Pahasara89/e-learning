// src/components/Layout/Sidebar.js
import React from "react";
import "../css/Sidebar.css";

const Sidebar = ({ currentUser }) => {
  const menuItems = [
    { icon: "fas fa-user", label: "Profile", link: "#" },
    { icon: "fas fa-book", label: "My Courses", link: "#" },
    { icon: "fas fa-users", label: "My Groups", link: "#" },
    { icon: "fas fa-calendar", label: "Events", link: "#" },
    { icon: "fas fa-bookmark", label: "Saved", link: "#" },
    { icon: "fas fa-history", label: "Learning History", link: "#" },
    { icon: "fas fa-certificate", label: "Certificates", link: "#" }
  ];

  const recommendedCourses = [
    { id: 1, title: "Advanced React Patterns", instructor: "Jane Smith" },
    { id: 2, title: "Data Science Fundamentals", instructor: "John Doe" },
    { id: 3, title: "UX Design Principles", instructor: "Sarah Wilson" }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
          <img src={currentUser?.avatar || "/default-avatar.png"} alt={currentUser?.name} />
        </div>
        <h3 className="sidebar-name">{currentUser?.name || "Guest"}</h3>
        <p className="sidebar-role">{currentUser?.role || "Student"}</p>
      </div>
      
      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-menu-item">
              <a href={item.link}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-section">
        <h4 className="sidebar-section-title">Recommended Courses</h4>
        <ul className="sidebar-courses">
          {recommendedCourses.map(course => (
            <li key={course.id} className="sidebar-course">
              <a href={`#course-${course.id}`}>
                <div className="sidebar-course-title">{course.title}</div>
                <div className="sidebar-course-instructor">{course.instructor}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="sidebar-footer">
        <p>&copy; 2025 EduSocial</p>
        <div className="sidebar-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Help</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;