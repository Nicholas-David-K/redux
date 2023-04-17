import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

const removeUser = createAsyncThunk('users/remove', async (user) => {
    await axios.delete(`${API_URL}/users/${user.id}`);

    await pause(1000);
    return user;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { removeUser };
