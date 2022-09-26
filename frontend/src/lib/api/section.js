import { client } from './client';

export const fetchSections = () => {
  return client.get('/sections');
};
