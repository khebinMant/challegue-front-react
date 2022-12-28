import { createSlice } from '@reduxjs/toolkit';

export const territorySlice = createSlice({
    name: 'territory',
    initialState: {
        // id
        // name
        // description
        // capital
        // population
        // createdAt
        // cantones
        // isActive
            // id
            // description
            // name
            // population
            // area
            // cantonalHeader
            // createAt
            // provinciaId
            // parroquias
                // id
                // name
                // description
                // createAt
                // cantonId
                // isActive
            // isActive
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = territorySlice.actions;