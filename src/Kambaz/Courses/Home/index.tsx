import { Container, Row, Col } from "react-bootstrap";
import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <Container id="wd-home" className="mt-4">
      <Row>
        <Col md={8}>
          <Modules />
        </Col>
        <Col md={4} className="d-none d-xl-block">
          <CourseStatus />
        </Col>
      </Row>
    </Container>
  );
}
