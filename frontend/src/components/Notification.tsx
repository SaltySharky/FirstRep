import React, { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi"; // Install react-icons if not already installed: npm install react-icons

const Notification = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSeenNotification = sessionStorage.getItem("hasSeenNotification");

    if (!hasSeenNotification) {
      setVisible(true);
      sessionStorage.setItem("hasSeenNotification", "true");
    }
  }, []);

  const dismissNotification = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex items-center">
        <FiBell className="text-3xl mr-4" />
        <div>
          <h2 className="text-lg font-semibold mb-1">Stay Active Today!</h2>
          <p className="text-sm mb-4">
            Don’t forget to exercise! Check out our exercise suggestions for tips and workouts.
          </p>
          <button
            onClick={dismissNotification}
            className="bg-white text-orange-500 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition duration-200"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;