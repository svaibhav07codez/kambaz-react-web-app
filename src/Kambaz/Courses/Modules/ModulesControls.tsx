import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button } from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";
export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      id="wd-modules-controls"
      className="d-flex justify-content-end align-items-end mt-4 ms-5"
    >
      <button
        id="wd-collapse-all"
        className="btn btn-md btn-secondary me-1 flex-shrink-0"
        style={{ whiteSpace: "nowrap" }}
      >
        Collapse All
      </button>
      <button
        id="wd-view-progress"
        className="btn btn-md btn-secondary me-1 flex-shrink-0"
        style={{ whiteSpace: "nowrap" }}
      >
        View Progress
      </button>
      <div className="dropdown d-inline me-1">
        <button
          id="wd-publish-all-btn"
          className="btn btn-md btn-secondary dropdown-toggle flex-shrink-0"
          style={{ whiteSpace: "nowrap" }}
          type="button"
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>
          <li>
            <a
              id="wd-unpublish-all-modules-and-item"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Unpublish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-unpublish-modules-only"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Unpublish modules only
            </a>
          </li>
        </ul>
      </div>

      <div id="wd-modules-controls" className="text-nowrap">
        <Button variant="danger" onClick={handleShow}>
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Module
        </Button>

        <ModuleEditor
          show={show}
          handleClose={handleClose}
          dialogTitle="Add Module"
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={addModule}
        />
      </div>
    </div>
  );
}
