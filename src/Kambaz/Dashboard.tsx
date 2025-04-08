import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountNavigation from "./Account/Navigation";
import { enroll, unenroll } from "./Account/Enrollments/reducer";
import * as enrollmentsClient from "./Account/Enrollments/client";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const isFaculty = currentUser?.role === "FACULTY";

  const displayedCourses = isFaculty
    ? courses.filter((course) =>
        enrollments.some(
          (e: any) => e.user === currentUser._id && e.course === course._id
        )
      )
    : courses;

  const handleEnroll = async (courseId: string) => {
    await enrollmentsClient.enrollUser(courseId);
    dispatch(enroll({ user: currentUser._id, course: courseId }));
  };

  const handleUnenroll = async (courseId: string) => {
    const enrollment = enrollments.find(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );
    if (enrollment) {
      await enrollmentsClient.unEnrollUser(courseId);
      dispatch(unenroll(enrollment._id));
    }
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <AccountNavigation />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            className="mb-2"
            placeholder="Course Name"
          />
          <FormControl
            as="textarea"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            rows={3}
            placeholder="Course Description"
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      <Row xs={1} md={5} className="g-4">
        {displayedCourses.map((course) => {
          const isEnrolled = enrollments.some(
            (e: any) => e.user === currentUser._id && e.course === course._id
          );

          return (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  to={
                    isFaculty || isEnrolled
                      ? `/Kambaz/Courses/${course._id}/Home`
                      : "#"
                  }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={course.imgSource}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>

                    <div className="d-flex justify-content-start gap-2 mt-3">
                      {isFaculty || isEnrolled ? (
                        <Button
                          variant="primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Go
                        </Button>
                      ) : null}

                      {isFaculty && (
                        <>
                          <Button
                            variant="warning"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setCourse(course);
                            }}
                            id="wd-edit-course-click"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              deleteCourse(course._id);
                            }}
                            id="wd-delete-course-click"
                          >
                            Delete
                          </Button>
                        </>
                      )}

                      {!isFaculty && (
                        <Button
                          variant={isEnrolled ? "danger" : "success"}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            isEnrolled
                              ? handleUnenroll(course._id)
                              : handleEnroll(course._id);
                          }}
                          id={
                            isEnrolled
                              ? "wd-unenroll-course"
                              : "wd-enroll-course"
                          }
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
