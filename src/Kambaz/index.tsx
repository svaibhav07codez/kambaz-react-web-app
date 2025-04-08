import { Navigate, Route, Routes, useParams } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import * as courseClient from "./Courses/client";

import Session from "./Account/Session";

import * as userClient from "./Account/client";
import Labs from "../Labs";
import * as enrollmentsClient from "./Account/Enrollments/client";

import { useState, useEffect } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { enroll, setEnrollments } from "./Account/Enrollments/reducer"; // ✅ FIXED IMPORT

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findAllCourses();
      setCourses(courses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const enrollments = await enrollmentsClient.fetchEnrollmentsForUser();
        dispatch(setEnrollments(enrollments));
      } catch (err) {
        console.error("Failed to fetch enrollments", err);
      }
    };

    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser]);

  const [course, setCourse] = useState<any>({
    _id: "RS101",
    name: "Rocket Propulsion",
    number: "RS4550",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    imgSource: "/images/angular.png",
  });

  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses((prev) => [...prev, newCourse]);

      await enrollmentsClient.enrollUser(newCourse._id);
      dispatch(enroll({ user: currentUser._id, course: newCourse._id }));
    } catch (err) {
      console.error("Failed to add and enroll in new course", err);
    }
  };

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    console.log("status", status);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  };

  const { cid } = useParams();
  console.log(cid);

  return (
    <Session>
      <div id="wd-Kambaz" className="d-flex">
        <div className="d-none d-md-block">
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-grow-1 me-4">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
            <Route path="/Labs" element={<Labs />} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
