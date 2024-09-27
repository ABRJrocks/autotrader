import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleConfirm = () => {
    if (inputValue === "Terminate") {
      onConfirm();
      onClose();
    } else {
      alert("Please type 'Terminate' to confirm."); // Alert for incorrect input
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transition-transform transform scale-100 duration-300 ease-in-out">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Confirm Stop Bot
          </h3>
          <p className="text-gray-600 mb-4">
            Please type <strong>"Terminate"</strong> to stop the trading bot.
          </p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" // Text color changed to gray-800
            placeholder="Type 'Terminate'"
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={inputValue !== "Terminate"} // Disable the button if input doesn't match
              className={`${
                inputValue === "Terminate" ? "bg-blue-600" : "bg-blue-300" // Change background color based on state
              } text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
