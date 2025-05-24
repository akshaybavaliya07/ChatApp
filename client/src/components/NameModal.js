import React, { useState } from 'react';

const NameModal = ({ onNameSubmit }) => {
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed) {
      onNameSubmit(trimmed);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Enter your name to join the chat</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="border p-2 rounded"
            placeholder="Your Name"
          />
          <button type="submit" className="bg-yellow-400 text-black py-2 rounded hover:bg-yellow-300 transition">
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;