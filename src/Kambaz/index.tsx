import { Navigate, Route, Routes, useParams } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";

import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import Session from "./Account/Session";
import Labs from "../Labs";
import * as enrollmentsClient from "./Account/Enrollments/client";

import { useState, useEffect } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { enroll, setEnrollments } from "./Account/Enrollments/reducer";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [course, setCourse] = useState<any>({
    _id: "RS101",
    name: "Rocket Propulsion",
    number: "RS4550",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    imgSource: "/images/angular.png",
  });

  const fetchEnrolledCourses = async () => {
    const userCourses = await userClient.findCoursesForUser(currentUser._id);

    const enrolledCourses = userCourses.map((course: any) => ({
      ...course,
      enrolled: true,
    }));
    setCourses(enrolledCourses);
  };

  const fetchAllCoursesWithEnrollFlag = async () => {
    const allCourses = await courseClient.fetchAllCourses();
    const enrolledCourses = await userClient.findCoursesForUser(
      currentUser._id
    );
    const coursesWithEnrollFlag = allCourses.map((course: any) => {
      const isEnrolled = enrolledCourses.some((c: any) => c._id === course._id);
      return { ...course, enrolled: isEnrolled };
    });
    setCourses(coursesWithEnrollFlag);
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === courseId ? { ...course, enrolled } : course
      )
    );
  };

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses((prev) => [...prev, newCourse]);
    await enrollmentsClient.enrollUser(newCourse._id);
    dispatch(enroll({ user: currentUser._id, course: newCourse._id }));
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses((prev) => prev.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses((prev) => prev.map((c) => (c._id === course._id ? course : c)));
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      try {
        if (enrolling) {
          await fetchAllCoursesWithEnrollFlag();
        } else {
          await fetchEnrolledCourses();
        }

        const enrollments = await enrollmentsClient.fetchEnrollmentsForUser();
        dispatch(setEnrollments(enrollments));
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchData();
  }, [currentUser, enrolling, dispatch]);

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
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
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
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
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
