import React from 'react';

const History = () => {
  const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');

  return (
    <div className="min-h-screen bg-indigo-50 p-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6"> Uploaded Files History</h2>
      {uploadedFiles.length === 0 ? (
        <p className="text-gray-600">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {uploadedFiles.map((file, i) => (
            <li key={i} className="p-4 bg-white rounded shadow">
              <strong>{file.name}</strong><br />
              Size: {file.size}<br />
              Date: {file.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
