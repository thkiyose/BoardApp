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

export const DestroyEvent = (id) => {
    return client.delete(`/events/${id}`);
};

export const UpdateEvent = (params,id) => {
    return client.put(`/events/${id}`,params);
};

export const SortEvents = (query) => {
    return client.get(`/events/search`,{ params: query})
};