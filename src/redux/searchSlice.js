import { createSlice } from "@reduxjs/toolkit";

const cityData = ["Hyderabad", "Banglore", "Chennai", "Delhi", "Jaipur"];

const searchReducer = createSlice({
    name: "search",
    initialState: {
        cities: [...cityData],
        sourceCity: null,
        destinationCity: null,
        date: null
    },
    reducers: {
        addSourceCity: (state, action) => {
            state.sourceCity = action.payload
        },
        addDestinationCity: (state, action) => {
            state.destinationCity = action.payload
        },
        addDate: (state, action) => {
            state.date = action.payload
        },
        filterCity: (state, action) => {

        }

    }
})

export const { addSourceCity, addDestinationCity, addDate,
    filterCity
} = searchReducer.actions
export default searchReducer.reducer