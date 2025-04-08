import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useEffect, useState } from "react";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { FormControl } from "react-bootstrap";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  setModules,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client"; // ✅ Import for deleting module

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");

  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchModules = async () => {
      const modules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    };
    fetchModules();
  }, [cid]);

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
    setModuleName("");
  };

  // ✅ New: Remove module from server and then from state
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  return (
    <div id="wd-modules">
      {isFaculty && (
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={createModuleForCourse}
        />
      )}

      <div>
        <ul id="wd-modules" className="list-group rounded-0">
          {modules.map((module: any) => (
            <li
              key={module._id}
              className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                <div
                  className="d-flex align-items-center flex-grow-1"
                  style={{ minWidth: 0 }}
                >
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && (
                    <span className="module-name text-truncate">
                      {module.name}
                    </span>
                  )}
                  {module.editing && isFaculty && (
                    <FormControl
                      className="w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveModule({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                </div>
                {isFaculty && (
                  <div
                    className="module-controls d-flex align-items-center ms-3"
                    style={{ flexShrink: 0 }}
                  >
                    <ModuleControlButtons
                      moduleId={module._id}
                      deleteModule={(moduleId) => removeModule(moduleId)} // ✅ updated
                      editModule={(moduleId) => dispatch(editModule(moduleId))}
                    />
                  </div>
                )}
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li
                      key={lesson._id}
                      className="wd-lesson list-group-item p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
