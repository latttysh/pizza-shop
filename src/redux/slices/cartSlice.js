import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
