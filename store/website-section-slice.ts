import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SectionState } from "../models/section.interface";
import { RootState } from "./store";

const initialState: SectionState[] = [
  {
    title: "",
    subtitle: "",
    content: "",
  },
];

export const sectionSlice = createSlice({
  name: "websiteSections",
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<SectionState>) => {
      state.push(action.payload);
    },
    updateSection: (
      state,
      action: PayloadAction<SectionState & { index: number }>
    ) => {
      state[action.payload.index] = action.payload;
    },
    deleteSection: (
      state,
      action: PayloadAction<{ index: number; onFailure: (msg: string) => void }>
    ) => {
      if (state.length > 1) {
        state.splice(action.payload.index, 1);
      } else {
        action.payload.onFailure("Can't delete last section");
      }
    },
  },
});

export const { addSection, updateSection, deleteSection } =
  sectionSlice.actions;

export const selectSections = (state: RootState) => state.websiteSection;

export default sectionSlice.reducer;
