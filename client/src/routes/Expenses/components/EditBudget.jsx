import { FaRegEdit } from "react-icons/fa";

export default function EditBudget() {
  return (
    <div>
      <button
        type="button"
        className="flex gap-2 text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2"
        // onClick={handleEditClick}
      >
        <FaRegEdit className="text-lg" />
        Edit
      </button>
    </div>
  );
}
