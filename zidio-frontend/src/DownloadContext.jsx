import React, { createContext, useContext, useEffect, useState } from "react";

const DownloadContext = createContext();

export const useDownloads = () => useContext(DownloadContext);

export const DownloadProvider = ({ children }) => {
  const [downloads, setDownloads] = useState(() => {
    // Load from localStorage initially
    const saved = localStorage.getItem("chartDownloads");
    return saved ? JSON.parse(saved) : [];
  });

  const addDownload = (download) => {
    const updatedDownloads = [...downloads, download];
    setDownloads(updatedDownloads);
    localStorage.setItem("chartDownloads", JSON.stringify(updatedDownloads));
  };

  // update localStorage on change
  useEffect(() => {
    localStorage.setItem("chartDownloads", JSON.stringify(downloads));
  }, [downloads]);

  return (
    <DownloadContext.Provider value={{ downloads, addDownload, setDownloads }}>
      {children}
    </DownloadContext.Provider>
  );
};
