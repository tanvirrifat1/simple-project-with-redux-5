const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
    loading: false,
    users: [],
    error: "",
};

const fetchUsers = createAsyncThunk("users/fetchUser", async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const users = await res.json()

    return users;
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = false;
            state.error = '';
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.users = action.payload
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.users = []
        });
    }
})

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;