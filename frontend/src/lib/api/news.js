import { client } from './client';

export const createNews = (params) => {
    return client.post('/news', params);
};