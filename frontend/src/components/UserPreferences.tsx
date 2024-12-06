import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserFromMongo } from "../services/userServices";

const questions = [
  {
    id: 1,
    question: "How comfortable are you with exercising?",
    options: [
      { value: "beginner", label: "Beginner", description: "Just starting out or have limited experience." },
      { value: "intermediate", label: "Intermediate", description: "Some experience with regular workouts." },
      { value: "advanced", label: "Advanced", description: "Regularly active and familiar with a range of exercises." },
    ],
  },
  {
    id: 2,
    question: "How often would you like to work out each week?",
    options: [
      { value: "1-2", label: "1–2 times per week" },
      { value: "3-4", label: "3–4 times per week" },
      { value: "5+", label: "5+ times per week" },
    ],
  },
  {
    id: 3,
    question: "How intense would you like your workouts to be?",
    options: [
      { value: "light", label: "Light", description: "A gentler pace with more focus on mobility and low-impact activities." },
      { value: "moderate", label: "Moderate", description: "A balance between endurance and strength without overexertion." },
      { value: "intense", label: "Intensity", description: "Fast-paced, challenging workouts with a focus on performance." },
    ],
  },
];

const UserPreferences = () => {
  const [currentStep, setCurrentStep] = useState(0); 
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate(); 

  const handleOptionSelect = (questionId: number, optionValue: string) => {
    setAnswers({ ...answers, [questionId]: optionValue });
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleFinish = async () => {
    console.log(answers);
    await updateUserFromMongo(answers);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Welcome Page */}
      {currentStep === 0 && (
        <>
          <h1 className="text-2xl font-bold text-orange-500 mb-8">Welcome!</h1>
          <p className="text-center text-gray-700 mb-4">
            Let's create your profile so we can tailor a fitness plan just for you.
          </p>
          <button
            onClick={handleNext}
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg shadow hover:bg-orange-600"
          >
            Get started
          </button>
        </>
      )}

      {/* Questions Pages */}
      {currentStep > 0 && currentStep <= questions.length && (
        <>
          <h1 className="text-2xl font-bold text-orange-500 mb-8">
            {questions[currentStep - 1].question}
          </h1>
          <div className="space-y-4">
            {questions[currentStep - 1].options.map((option) => (
              <button
                key={option.value}
                className={`w-full p-4 border rounded-lg text-left ${
                  answers[questions[currentStep - 1].id] === option.value
                    ? "border-orange-500 bg-orange-100"
                    : "border-gray-300 bg-white"
                } hover:border-orange-500`}
                onClick={() => handleOptionSelect(questions[currentStep - 1].id, option.value)}
              >
                <h2 className="font-bold">{option.label}</h2>
                {option.description && <p className="text-sm text-gray-600">{option.description}</p>}
              </button>
            ))}
          </div>
          <div className="mt-8">
            {currentStep < questions.length ? (
              <button
                onClick={handleNext}
                disabled={!answers[questions[currentStep - 1].id]}
                className={`w-full py-3 px-6 rounded-lg shadow ${
                  answers[questions[currentStep - 1].id]
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!answers[questions[currentStep - 1].id]}
                className={`w-full py-3 px-6 rounded-lg shadow ${
                  answers[questions[currentStep - 1].id]
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Finish
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPreferences;
