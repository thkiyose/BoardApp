import { client } from './client';

export const IndexNews = () => {
    return client.get('/news');
};

export const CreateNews = (params) => {
    return client.post('/news', params);
};

export const ShowNews = (newsId, userId, admin) => {
    return client.get(`/news/${newsId}`, { params: { userId: userId, admin: admin }});
};

export const UpdateNews = (id,params) => {
    return client.put(`/news/${id}`,params);
};

export const DestroyNews = (id) => {
    return client.delete(`/news/${id}`);
};

export const SearchNews = (query) => {
    return client.get(`/news/search`,{ params: query})
};

export const UserNews = (id) => {
    return client.get(`/news/${id}/user_news`)
};

export const UserArchiveList = (id) => {
    return client.get(`/news/${id}/user_archive_list`)
};

export const Archive = (id) => {
    return client.put(`/news/${id}/archive`)
};