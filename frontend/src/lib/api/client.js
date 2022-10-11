import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

const options = {
  ignoreHeaders: true,
  withCredentials: true
};

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`
  }),
 options
);
