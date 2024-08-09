import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditBudget({ _id, budget, updateBudgetItem }) {
  const [open, setOpen] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState(budget?.icon || "😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budget?.budgetName || "");
  const [amount, setAmount] = useState(budget?.budgetAmount || "");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/auth/dashboard",
            {
              headers: {
                Authorization: `${accessToken}`,
              },
            }
          );
          setUserEmail(response.data.email);
        } catch (error) {
          console.error("Error fetching user email:", error);
        }
      }
    };

    fetchUserEmail();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found.");
      return;
    }

    const totalSpend = budget.totalSpend || 0; 
    const totalItem = budget.totalItem || 0; 
    const remainingAmount = budget.budgetAmount - totalSpend;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/dashboard/budgets/${_id}/update`,
        {
          icon: emojiIcon,
          budgetName: name,
          budgetAmount: amount,
          totalSpend,
          totalItem,
          remainingAmount, 
          createdBy: userEmail,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedBudget = {
            ...response.data,
            totalSpend,
            totalItem,
            remainingAmount,
        };

        toast.success("Budget updated successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        if (updateBudgetItem) {
            updateBudgetItem(updatedBudget);
        }

        handleClose();
      } else {
        toast.error("Failed to update budget.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Failed to update budget.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="flex gap-2 text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2"
          onClick={handleOpen}
        >
          <FaRegEdit className="text-lg" />
          Edit
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50"
            onClick={handleClose}
          ></div>
          <div className="bg-white p-6 rounded-md shadow-lg z-50 w-1/3 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl mb-4">Update Budget</h2>
            <div className="mb-4 relative">
              <button
                className="outline p-1 px-3 rounded-md text-2xl"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </button>
              {openEmojiPicker && (
                <div className="absolute z-50 mt-2">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                    lazyLoadEmojis={true}
                    height={400}
                  />
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="budgetName"
                >
                  Budget Name
                </label>
                <input
                  id="budgetName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="budgetAmount"
                >
                  Budget Amount
                </label>
                <input
                  id="budgetAmount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:shadow-outline"
                />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={!(name && amount) || budget?.totalSpend > amount}
                  className={`px-4 py-2 w-full bg-indigo-700 text-white rounded-md ${
                    !(name && amount) || budget?.totalSpend > amount
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-indigo-800"
                  }`}
                >
                  Update Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
