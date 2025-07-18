import React from "react";
import { useDownloads } from "../DownloadContext";

const DownloadedCharts = () => {
  const { downloads, setDownloads } = useDownloads();

  const handleDelete = (indexToDelete) => {
    const updatedDownloads = downloads.filter((_, index) => index !== indexToDelete);
    setDownloads(updatedDownloads);
    localStorage.setItem("downloads", JSON.stringify(updatedDownloads));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Downloaded Charts</h2>

      {downloads.length === 0 ? (
        <p>No charts downloaded yet.</p>
      ) : (
        <ul className="space-y-6">
          {downloads.map((download, index) => (
            <li key={index} className="bg-white p-4 rounded shadow-md relative">
              <p><strong>Chart Type:</strong> {download.chartType}</p>
              <p><strong>X-Axis:</strong> {download.xAxis}</p>
              <p><strong>Y-Axis:</strong> {download.yAxis}</p>
              <p><strong>Downloaded At:</strong> {download.downloadedAt}</p>
              <p><strong>Format:</strong> {download.format}</p>

              {download.image && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Chart Preview:</p>
                  <img
                    src={download.image}
                    alt={`Chart ${index + 1}`}
                    style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc" }}
                  />
                </div>
              )}

              {/* Delete*/ }
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DownloadedCharts;
