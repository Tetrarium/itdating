import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    gender: '',
    city: '',
    country: '',
    age_min: 18,
    age_max: 70,
    // tags: ['Гриффиндор', 'Латте', 'Маск', 'Велосипед', 'Дом Драконов'],
    tags: [],
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter(state, action) {
            const { key, value } = action.payload;
            state[key] = value;
        },

        clearFilter(state) {
            return initialState;
        }
    }
})

export const { changeFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
