import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: [],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enroll: (
      state,
      action: PayloadAction<{ user: string; course: string }>
    ) => {
      state.enrollments.push({
        _id: new Date().getTime().toString(), // temp ID
        user: action.payload.user,
        course: action.payload.course,
      });
    },
    unenroll: (state, action: PayloadAction<string>) => {
      state.enrollments = state.enrollments.filter(
        (e) => e._id !== action.payload
      );
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
