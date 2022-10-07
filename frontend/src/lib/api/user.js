import { client } from './client';

export const SearchUser = (word) => {
    return client.get('/user/search', { params: word});
};