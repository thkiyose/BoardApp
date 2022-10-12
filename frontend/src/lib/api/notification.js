import { client } from './client';

export const FetchNotifications = (id) => {
    return client.get('/notifications',{ params: { id: id }});
};
