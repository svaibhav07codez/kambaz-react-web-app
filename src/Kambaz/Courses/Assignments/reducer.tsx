import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AssignmentType {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableAfterDate?: string;
  availableUntilDate?: string;
}

interface AssignmentState {
  assignments: AssignmentType[];
}

// ✅ Initial empty state
const initialState: AssignmentState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<AssignmentType[]>) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<AssignmentType>) => {
      state.assignments.push(action.payload);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
    updateAssignment: (state, action: PayloadAction<AssignmentType>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
