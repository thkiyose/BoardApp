import { client } from './client';

export const IndexNews = () => {
    return client.get('/news');
};

export const createNews = (params) => {
    return client.post('/news', params);
};

export const ShowNews = (id) => {
    return client.get(`/news/${id}`);
};

export const UpdateNews = (id) => {
    return client.put(`/news/${id}`);
};