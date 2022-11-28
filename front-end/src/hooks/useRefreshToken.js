import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/rgapi/user/refresh-token', {
      withCredentials: true,
      token: auth?.token,
    }).catch((err) => {
      console.log(err);
    });

    console.log('Res', response);

    if (response) {
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.token);
        return { ...prev, token: response.data.token };
      });
      return response.data.token;
    }
  };
  return refresh;
};

export default useRefreshToken;
