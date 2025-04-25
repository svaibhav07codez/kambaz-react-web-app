import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
export default function AssignmentControlButtons() {
    return (
        <div className="d-flex float-end">
            <div className="fs-6 mx-2 border border-dark rounded-3 px-2">
                40% of Total
            </div>
            <FaPlus className="mx-2" />
            <IoEllipsisVertical className="fs-5" />
        </div>);
}