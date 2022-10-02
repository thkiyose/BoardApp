import { client } from './client';

export const fetchSections = () => {
  return client.get('/sections');
};

export const fetchAllSectionsAreas = () => {
  return client.get("/sections/raw_sections");
};

export const createUserSections = (params) => {
    return client.post('/sections', params);
 };

 export const fetchUserSections = (userId) => {
  return client.get(`/sections/${userId}`);
};