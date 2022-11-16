import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { signOut, signIn } from '../features/auth/authSlice';
import { BASE_API_URL } from '../util';

// Only going to be used for authentication and 

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if(token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});