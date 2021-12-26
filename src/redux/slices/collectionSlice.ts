import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCollections } from 'actions/collectionActions';
import { ICollection } from 'types';

export const collectionFetchData = createAsyncThunk(
  'collections/fetchData',
  async (payload: { uid: string; sort: string }) => {
    const { uid, sort } = payload;
    const result = (await getCollections(uid, sort)) as ICollection[];

    return { result };
  }
);

export interface CollectionState {
  collections: ICollection[];
  loading: boolean;
  sort: string;
}

const initialState: CollectionState = {
  collections: [],
  loading: false,
  sort: 'desc',
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    create: (state, action) => {
      state.collections.unshift(action.payload);
    },
    update: (state, action) => {
      const newData = state.collections.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      state.collections = newData;
    },
    remove: (state, action) => {
      const newData = state.collections.filter(
        (item) => item.id !== action.payload.id
      );

      state.collections = newData;
    },
    sortBy: (state, action) => {
      state.sort = action.payload.sort;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(collectionFetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(collectionFetchData.fulfilled, (state, action) => {
        state.collections = action.payload.result;
        state.loading = false;
      });
  },
});

export const { create, update, remove, sortBy } = collectionSlice.actions;

export default collectionSlice.reducer;
