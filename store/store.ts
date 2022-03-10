import { configureStore } from '@reduxjs/toolkit';
import sectionReducer from './website-section-slice';

export const store = configureStore({
  reducer: {
    websiteSection: sectionReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
