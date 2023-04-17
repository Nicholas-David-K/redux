import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

const addUser = createAsyncThunk('user/add', async () => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    const data = {
        id: nanoid(),
        name: faker.name.fullName(),
    };
    const response = await axios.post(`${API_URL}/users`, data, config);

    await pause(1000);

    return response.data;
});

// * test loading
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { addUser };
