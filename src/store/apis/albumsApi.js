import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';
import { nanoid } from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),

    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET',
                    };
                },
                providesTags: (result, error, user) => {
                    const tags = result.map((album) => {
                        return { type: 'Album', id: album.id };
                    });
                    tags.push({ type: 'usersAlbums', id: user.id });
                    return tags;
                },
            }),
            addAlbum: builder.mutation({
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            id: nanoid(),
                            title: faker.commerce.productName(),
                            userId: user.id,
                        },
                    };
                },
                // Whenever addAlbum is called, fetch users based on the user ID
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'usersAlbums', id: user.id }];
                },
            }),
            removeAlbum: builder.mutation({
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    };
                },
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Album', id: album.id }];
                },
            }),
        };
    },
});

// * test loading
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } =
    albumsApi;
