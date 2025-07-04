// src/api/issueApi.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createIssue = (formData) =>
  API.post('/issues', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getIssues = () => API.get('/issues');
export const deleteIssue = (id) => API.delete(`/issues/${id}`);
