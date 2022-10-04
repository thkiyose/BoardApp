import { client } from './client';

export const FetchEvents = () => {
    return client.get('/events');
};

export const CreateEvent = (params) => {
    return client.post('/events', params);
};

export const FetchEvent = (id) => {
    return client.get(`/events/${id}`);
};