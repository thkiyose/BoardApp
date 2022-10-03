import { client } from './client';

export const IndexNews = () => {
    return client.get('/events');
};

export const CreateNews = (params) => {
    return client.post('/events', params);
};