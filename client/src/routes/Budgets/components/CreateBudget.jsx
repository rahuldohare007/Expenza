import { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CreateBudget({ onBudgetCreated }) {
  const [open, setOpen] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
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

  const handleOpen = () => {
    setOpen(true);
  };

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

    try {
      const response = await axios.post(
        "http://localhost:8080/api/dashboard/budgets/create",
        {
          icon: emojiIcon,
          budgetName: name,
          budgetAmount: amount,
          createdBy: userEmail,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        setName("");
        setAmount("");
        toast.success("Budget created successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleClose();
        onBudgetCreated(response.data);
      } else {
        toast.error("Failed to create budget.", {
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
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget.", {
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
      <div
        className="bg-slate-100 p-10 rounded-md flex items-center flex-col border-2 border-dashed cursor-pointer hover:shadow-md"
        onClick={handleOpen}
      >
        <h2 className="text-3xl">+</h2>
        <h2>Create New Budget</h2>
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
            <h2 className="text-xl mb-4">Create New Budget</h2>
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
                  placeholder="e.g. Home Decor"
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
                  placeholder="e.g. ₹5000"
                  value={parseInt(amount)}
                  onChange={(e) => setAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:shadow-outline"
                />
              </div>
              <div className="mt-5 text-md">
                <button
                  type="submit"
                  disabled={!(name && amount)}
                  className={`px-4 py-2 w-full bg-indigo-700 text-white rounded-md ${
                    !(name && amount)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-indigo-800"
                  }`}
                >
                  Create Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
