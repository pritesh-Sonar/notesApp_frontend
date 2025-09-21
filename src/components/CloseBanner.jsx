import React from "react";
import { useState } from "react";

const CloseBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
        <p className="text-center text-lg font-medium">
          The Password change link is send to your Email please check your mail,
          <br />
          you can close this tab
          <br />
          Thank u ! 😊
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-2 text-green-600 hover:text-green-800 transition-colors"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CloseBanner;
