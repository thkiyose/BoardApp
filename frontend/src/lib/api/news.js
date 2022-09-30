import { client } from './client';

export const IndexNews = () => {
    return client.get('/news');
};

export const CreateNews = (params) => {
    return client.post('/news', params);
};

export const ShowNews = (id) => {
    return client.get(`/news/${id}`);
};

export const UpdateNews = (id,params) => {
    return client.put(`/news/${id}`,params);
};

export const DestroyNews = (id) => {
    return client.delete(`/news/${id}`);
};

export const SearchNews = (query) => {
    return client.delete(`/news/search`,{ params: query})
};