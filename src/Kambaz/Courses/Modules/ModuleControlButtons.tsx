import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
    moduleId: string; deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void
}) {
    return (
        <div className="float-end">
            <FaPencil onClick={() => editModule(moduleId)} className="text-primary mx-2" />
            <FaTrash className="text-danger ms-2 me-3" onClick={() => deleteModule(moduleId)} />
            <GreenCheckmark />
            <FaPlus className="mx-2" />
            <IoEllipsisVertical className="fs-4" />
        </div>);
}