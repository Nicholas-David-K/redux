import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';
import { nanoid } from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),

    endpoints: (builder) => ({
        fetchPhotos: builder.query({
            query: (album) => `/photos?albumId=${album.id}`,
            providesTags: (result, error, album) => {
                const tags = result.map((photo) => {
                    return { type: 'Photo', id: photo.id };
                });
                tags.push({ type: 'AlbumPhoto', id: album.id });
                return tags;
            },
        }),

        addPhoto: builder.mutation({
            query: (album) => ({
                url: '/photos',
                method: 'POST',
                body: {
                    id: nanoid(),
                    url: faker.image.abstract(150, 150, true),
                    albumId: album.id,
                },
            }),
            invalidatesTags: (result, error, album) => {
                return [{ type: 'AlbumPhoto', id: album.id }];
            },
        }),

        removePhoto: builder.mutation({
            query: (photo) => ({
                url: `/photos/${photo.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, photo) => {
                return [{ type: 'Photo', id: photo.id }];
            },
        }),
    }),
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } =
    photosApi;
