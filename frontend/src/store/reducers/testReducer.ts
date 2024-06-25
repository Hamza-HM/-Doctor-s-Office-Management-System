import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CounterState = {
  value: 0,
  loading: false,
  error: null,
  success: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export default counterSlice.reducer;
