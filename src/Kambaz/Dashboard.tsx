import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountNavigation from "./Account/Navigation";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        {!isFaculty && (
          <Button
            onClick={() => setEnrolling(!enrolling)}
            className="float-end btn btn-primary"
          >
            {enrolling ? "My Courses" : "All Courses"}
          </Button>
        )}
      </h1>
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

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <Row xs={1} md={5} className="g-4">
        {courses.map((course) => {
          const isEnrolled = course.enrolled;
          const allowNavigation = isFaculty || isEnrolled;

          return (
            <Col key={course._id} style={{ width: "300px" }}>
              <Card className="h-100">
                <Link
                  to={
                    allowNavigation ? `/Kambaz/Courses/${course._id}/Home` : "#"
                  }
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    src={course.imgSource}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title className="text-truncate" title={course.name}>
                        {course.name}
                      </Card.Title>
                      {!isFaculty && (enrolling || isEnrolled) && (
                        <Button
                          className={`btn btn-sm ${
                            isEnrolled ? "btn-danger" : "btn-success"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateEnrollment(course._id, !isEnrolled);
                          }}
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      )}
                    </div>

                    <Card.Text
                      className="overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>

                    {isFaculty && (
                      <div className="d-flex justify-content-start gap-2 mt-3">
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
                      </div>
                    )}
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
