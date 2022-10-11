import { client } from './client';

export const SearchUser = (word) => {
    return client.get('/users/search', { params: word});
};