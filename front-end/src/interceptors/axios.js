import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE}:${process.env.REACT_APP_API_PORT || 3000}`;

axios.interceptors.response.user((res) => res, async (err) => {
  if (err.response.status === 403) {
    const response = await axios.post('refresh-token', {}, { withCredentials: true });
  }

  if (response.status === 200) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['token']}`;

    return axios(err.config);
  }
});