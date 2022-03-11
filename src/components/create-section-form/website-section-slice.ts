import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SectionState } from "../../models/section.interface";
import { RootState } from "../../store/store";

const initialState: SectionState[] = [];

export const sectionSlice = createSlice({
  name: "websiteSections",
  initialState,
  reducers: {
    setIntialSections: (state, action: PayloadAction<SectionState[]>) => {
      if(action.payload.length > 0) {
        action.payload.forEach(section => {
          state.push(section);
        });
      } else if(state.length === 0) {
        state.push({
          title: "",
          subtitle: "",
          content: "",
        });
      }
    },
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
      action: PayloadAction<{ index: number;}>
    ) => {
      state.splice(action.payload.index, 1);
    },
  },
});

export const { addSection, updateSection, deleteSection, setIntialSections } =
  sectionSlice.actions;

export const selectSections = (state: RootState) => state.websiteSection;

export default sectionSlice.reducer;
