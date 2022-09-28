import { client } from './client';

export const IndexNews = () => {
    return client.get('/news');
};

export const createNews = (params) => {
    return client.post('/news', params);
};