import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard({ courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }) {
  /*const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "CS 5100", name: "New Course", number: "CS 5100",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "fai.png", description: "New Description"
  });

  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4(), image: course.image || "fai.png" };
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  }

  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };*/

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} > Add </button>

          <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
          Update
        </button>
        
      </h5>
      <br />
      <FormControl 
        value={course.name} 
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
        className="mb-2"
      />
      <FormControl 
        as="textarea" 
        value={course.description} 
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
        rows={3}
      />
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <Row xs={1} md={5} className="g-4">
        {courses.map((course) => (
          <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to={`/Kambaz/Courses/${course._id}/Home`}
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img src={course.img} variant="top" width="100%" height={160} />
                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name} 
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description} 
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                  
                  <button id="wd-edit-course-click"
                    onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                    }}
                    className="btn btn-warning me-2 float-end" >
                    Edit
                  </button>
                  
                  <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }} className="btn btn-danger float-end"
                    id="wd-delete-course-click">
                    Delete
                  </button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
