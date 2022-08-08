import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const _Detailpost = createAsyncThunk("detail/post", async (value) => {
  const detailpost = await axios.post("http://localhost:5001/comments", value);
  return detailpost.data;
});

const _getDetailPosted = createAsyncThunk("/detail", async (value) => {
  const getDetail = await axios.get(
    `http://localhost:5001/comments?postId=${value}`
  );
  return getDetail.data;
});

const _deleteDetailPosted = createAsyncThunk("/delete", async (value) => {
  await axios.delete(`http://localhost:5001/comments/${value}`);
  return value;
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [_getDetailPosted.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [_Detailpost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
    },
    [_deleteDetailPosted.fulfilled]: (state, action) => {
      const result = state.posts.filter((value) => {
        return value.id != action.payload;
      });
      state.posts = result;
    },
  },
});

export { _Detailpost, _getDetailPosted, _deleteDetailPosted };
export const { commentsdelete } = commentsSlice.actions;
export default commentsSlice.reducer;
