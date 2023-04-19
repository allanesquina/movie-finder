import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { fetchMovie } from "../lib/movieAPI";

export enum FetchStatus {
  IDLE,
  NOTFOUND,
  LOADING,
  FAILED,
}

export interface MovieState {
  currentMovie: any;
  status: FetchStatus;
}

const initialState: MovieState = {
  currentMovie: null,
  status: FetchStatus.IDLE,
};

export const fetchMovieAction = createAsyncThunk(
  "movie/fetchMovie",
  async (title: string) => {
    const data = await fetchMovie(title);
    return data;
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    reset: (state) => {
      state.currentMovie = null;
      state.status = FetchStatus.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieAction.pending, (state) => {
        state.status = FetchStatus.LOADING;
        state.currentMovie = null;
      })
      .addCase(fetchMovieAction.fulfilled, (state, action) => {
        const data = action.payload;

        if (data.count > 0) {
          state.status = FetchStatus.IDLE;
          state.currentMovie = action.payload.content;
        } else {
          state.status = FetchStatus.NOTFOUND;
          state.currentMovie = null;
        }
      })
      .addCase(fetchMovieAction.rejected, (state) => {
        state.status = FetchStatus.FAILED;
        state.currentMovie = null;
      });
  },
});

export const { reset } = movieSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCurrentMovie = (state: RootState) =>
  state.movie.currentMovie;
export const selectStatus = (state: RootState) => state.movie.status;

export default movieSlice.reducer;
