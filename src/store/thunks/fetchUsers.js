import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get(`${API_URL}/users`);

    // * Delete this
    await pause(1000);

    return response.data;
});

// * test loading
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchUsers };
