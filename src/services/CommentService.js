import axios from "axios";

const API_URL = "http://localhost:8080";

export const commentService = {
  getComments: async (postId) => {
    try {
      const response = await axios.get(`${API_URL}/Comments?postId=${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  },
  
  addComment: async (commentData) => {
    try {
      const response = await axios.post(`${API_URL}/Comments/AddComment`, commentData);
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },
  
  updateComment: async (id, commentData) => {
    try {
      const response = await axios.put(`${API_URL}/Comments/UpdateComment${id}`, commentData);
      return response.data;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  },
  
  deleteComment: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/Comments/DeleteComment/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }
};

export default commentService;