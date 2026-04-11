"use client";

import React, { useState } from 'react';

const AssessmentPage = () => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("Please write something before submitting!");
      return;
    }
    console.log("User Answer:", answer);
    alert("Response submitted successfully!");
  };

  return (
    // Main Container: h-screen takes full height, overflow-hidden stops main page scroll
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 font-sans">
      
      {/* Header (Optional) */}
      <header className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Coding Assessment</h1>
      </header>

      {/* Split Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDE: Question (Independent Scroll) */}
        <div className="w-1/2 p-8 border-r border-gray-300 overflow-y-auto bg-white">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Problem Statement</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Write a React function component that creates a simple counter with "Increment" and "Decrement" buttons. 
              The counter should not go below zero.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mb-2">Instructions:</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>Use the `useState` hook for state management.</li>
              <li>Ensure the UI is clean and user-friendly.</li>
              <li>Add comments to explain your logic.</li>
            </ul>

            {/* Dummy content to ensure scroll is visible */}
            <div className="mt-10 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-700">
              Note: This assessment is timed. Please ensure you submit before the clock runs out.
            </div>
            
            {/* Adding extra space to demonstrate scrolling */}
            {[...Array(10)].map((_, i) => (
              <p key={i} className="mt-8 text-gray-400">
                Additional reference material or context line {i + 1}...
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Editor/Input (Independent Scroll) */}
        <div className="w-1/2 p-8 bg-gray-50 flex flex-col overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Solution</h2>
          
          <textarea
            className="flex-1 min-h-[400px] p-5 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm leading-6 bg-white transition-all"
            placeholder="// Write your code here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <div className="mt-4 text-xs text-gray-400 italic">
            * Your progress is automatically being tracked.
          </div>
        </div>
      </div>

      {/* FOOTER: Fixed Submit Button */}
      <footer className="p-4 bg-white border-t border-gray-200 flex justify-end items-center gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <span className="text-sm text-gray-500">All changes saved.</span>
        <button
          onClick={handleSubmit}
          className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-md active:transform active:scale-95"
        >
          Submit Response
        </button>
      </footer>
    </div>
  );
};

export default AssessmentPage;