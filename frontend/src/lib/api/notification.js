import { client } from './client';

export const FetchNotifications = (id) => {
    return client.get('/notifications',{ params: { id: id }});
};

export const Check = (notifications) => {
    return client.get('/notifications/check',{ params: { notifications: notifications }});
};