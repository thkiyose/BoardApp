import { client } from './client';

export const fetchSections = () => {
  return client.get('/sections');
};

export const createUserSections = (params) => {
    return client.post('/sections', params);
 };