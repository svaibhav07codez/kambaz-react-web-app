import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
      <Row xs={1} md={5} className="g-4">

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link">
            <Card.Img variant="top" src="/pdp.png" width="100%" height={200} />
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title"> CS 5010 Program Design Paradigm </Card.Title>
              <Card.Text className="wd-dashboard-course-description"> Software Developer </Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <Card.Img variant="top" src="/recitation.png"  width="100%" height={200} />
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title"> CS 5011 Recitation for Program Design Paradigm </Card.Title>
              <Card.Text className="wd-dashboard-course-description"> Lab </Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <Card.Img variant="top" src="/fai.png" width="100%" height={225} />
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title"> CS 5100 Foundations of AI </Card.Title>
              <Card.Text className="wd-dashboard-course-description"> AI developer </Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <Card.Img variant="top" src="/webdev.png" width="100%" height={225} />
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title"> CS 5610 </Card.Title>
              <Card.Text className="wd-dashboard-course-description"> Web Development </Card.Text>
              <Button variant="primary">Go</Button>
            </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <Card.Img variant="top" src="/algo.png" width="100%" height={225} />
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title"> CS 5800 Algorithms </Card.Title>
              <Card.Text className="wd-dashboard-course-description"> Algorithms Specialist </Card.Text>
                <Button variant="primary">Go</Button>
            </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <Card.Img variant="top" src="/cdc.png" width="100%" height={225} />
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title"> Career Design Course </Card.Title>
              <Card.Text className="wd-dashboard-course-description"> Prepare your course </Card.Text>
                <Button variant="primary">Go</Button>
            </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <Card.Img variant="top" src="/coop.png" width="100%" height={202} />
            <Card.Body>
              <Card.Title className="wd-dashboard-course-title"> Fall24 - Career Preparation & Coop </Card.Title>
              <Card.Text className="wd-dashboard-course-description"> Requirement for coop approval </Card.Text>
                <Button variant="primary">Go</Button>
            </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>
      </div>
    </div>
);}
