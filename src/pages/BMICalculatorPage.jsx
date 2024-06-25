import React, { useState } from "react";

const BMICalculatorPage = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      let bmiMessage = "";
      let progressValue = 0;
      if (bmiValue < 18.5) {
        bmiMessage = "Underweight";
        progressValue = (bmiValue / 18.5) * 50;
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        bmiMessage = "Normal weight";
        progressValue = ((bmiValue - 18.5) / (24.9 - 18.5)) * 50 + 50;
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        bmiMessage = "Overweight";
        progressValue = ((bmiValue - 25) / (29.9 - 25)) * 50 + 50;
      } else {
        bmiMessage = "Obesity";
        progressValue = ((bmiValue - 30) / (35 - 30)) * 50 + 75;
        if (progressValue > 100) progressValue = 100;
      }
      setMessage(bmiMessage);
      setProgress(progressValue);
      setPopupVisible(true); // Show the popup
    }
  };

  const hidePopup = () => {
    setPopupVisible(false); // Hide the popup
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">BMI Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="input-container">
          <label htmlFor="weight" className="block text-lg font-medium mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="input-container">
          <label htmlFor="height" className="block text-lg font-medium mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={calculateBMI}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Calculate BMI
      </button>
      {bmi && (
        <div className="mt-8 text-center relative">
          <h2 className="text-2xl font-bold">Your BMI: {bmi}</h2>
          <div
            className="w-full bg-gray-200 rounded-full h-6 mt-4 relative overflow-hidden cursor-pointer"
            onClick={() => setPopupVisible(true)}
          >
            <div
              className="absolute top-0 left-0 h-6 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background:
                  progress < 50
                    ? `linear-gradient(to right, red ${progress}%, green ${progress}%)`
                    : `linear-gradient(to right, green ${progress}%, orange ${progress}%)`,
              }}
            />
          </div>
            <span
              className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 bg-gray-100 p-2 rounded-lg shadow-lg text-sm text-center"
              style={{ visibility: popupVisible ? "visible" : "hidden" }}
            >
              {message} - {bmi}
            </span>
        </div>
      )}
    </div>
  );
};

export default BMICalculatorPage;
