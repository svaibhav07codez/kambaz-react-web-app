import { FaPlus, } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router";
export default function AssignmentsControls() {
    const { cid } = useParams();
    return (

        <div id="wd-modules-controls" className="text-nowrap">
            <Link to={`/Kambaz/Courses/${cid}/Assignments/Editor`}>
                <Button variant="danger" size="lg" className="me-2 float-end" id="wd-add-module-btn">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment
                </Button>
            </Link>
            <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-add-module-btn">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </Button>
        </div>
    );
}