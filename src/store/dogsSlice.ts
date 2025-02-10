import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dog } from "../models/Dog";
import { getDogsImage } from "../services/dogsService";

interface DogState {
  dogs: Dog[];
}

const initialState: DogState = {
  dogs: [],
};

const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    setDogs: (state, action: PayloadAction<Dog[]>) => {
      state.dogs = action.payload;
    },
    updateDog: (state, action: PayloadAction<Dog>) => {
      const { id } = action.payload;

      const index = state.dogs.findIndex((dog) => id === dog.id);
      if (index !== -1) {
        state.dogs[index] = {
          ...state.dogs[index],
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) =>
    builder.addCase(
      getDogsThunk.fulfilled,
      (state, action: PayloadAction<Dog[]>) => {
        state.dogs = action.payload;
      }
    ),
});

export const getDogsThunk = createAsyncThunk<
  Dog[],
  void,
  { rejectValue: string }
>("dogs/get", async (_, { rejectWithValue }) => {
  try {
    const response = await getDogsImage();
    return response;
  } catch (err) {
    return rejectWithValue("error getting dogs");
  }
});

export const { setDogs, updateDog } = dogsSlice.actions;

export default dogsSlice.reducer;
