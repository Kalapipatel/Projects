import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin';

export const fetchAdminDashboard = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${userId}/dashboard`);
    return res.data;
  } catch (err) {
    console.error('Dashboard API failed:', err);
    return null;
  }
};
