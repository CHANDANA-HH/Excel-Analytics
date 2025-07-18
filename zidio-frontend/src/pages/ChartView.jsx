import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import { useDownloads } from "../DownloadContext";

const ChartView = () => {
  const location = useLocation();
  const { columns, dataMap } = location.state || {};
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const [xAxis, setXAxis] = useState(columns?.[0] || "");
  const [yAxis, setYAxis] = useState(columns?.[1] || "");
  const [chartType, setChartType] = useState("bar");

  const [aiInsights, setAiInsights] = useState("");
  const [loadingInsights, setLoadingInsights] = useState(false);

  const { addDownload } = useDownloads();

  useEffect(() => {
    if (!xAxis || !yAxis || !dataMap) return;

    const ctx = canvasRef.current.getContext("2d");

    if (chartInstance) {
      chartInstance.destroy();
    }

    const labels = dataMap[xAxis];
    const values = dataMap[yAxis];

    if (!labels || !values) return;

    const backgroundColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(199, 199, 199, 0.6)',
      'rgba(255, 99, 255, 0.6)',
    ];

    const useDistinctColors = ['pie', 'doughnut', 'polarArea', 'radar'].includes(chartType);

    const newChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: `${yAxis} vs ${xAxis}`,
            data: values,
            backgroundColor: useDistinctColors
              ? backgroundColors.slice(0, values.length)
              : 'rgba(75, 192, 192, 0.5)',
            borderColor: useDistinctColors
              ? backgroundColors.slice(0, values.length).map(c => c.replace('0.6', '1'))
              : 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: `${yAxis} vs ${xAxis}` },
        },
        scales: !useDistinctColors
          ? {
              x: { title: { display: true, text: xAxis } },
              y: { title: { display: true, text: yAxis } },
            }
          : {},
      },
    });

    setChartInstance(newChart);

    return () => {
      newChart.destroy();
    };
  }, [xAxis, yAxis, chartType, dataMap]);

 const downloadPNG = async () => {
  const canvas = canvasRef.current;
  const image = await html2canvas(canvas);
  const imageData = image.toDataURL("image/png"); 

  // download
  const a = document.createElement("a");
  a.href = imageData;
  a.download = "chart.png";
  a.click();

  
  addDownload({
    chartType,
    xAxis,
    yAxis,
    downloadedAt: new Date().toLocaleString(),
    format: "PNG",
    image: imageData, 
  });
};



  const downloadPDF = async () => {
  const canvas = canvasRef.current;
  const image = await html2canvas(canvas);
  const imgData = image.toDataURL("image/png");

  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 10, 10, 190, 120);
  pdf.save("chart.pdf");

  addDownload({
    chartType,
    xAxis,
    yAxis,
    downloadedAt: new Date().toLocaleString(),
    format: "PDF",
    image: imgData, 
  });
};


  const fetchAIInsights = async () => {
    setLoadingInsights(true);
    setAiInsights("");

    try {
      const response = await fetch("http://localhost:5001/api/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          labels: dataMap[xAxis],
          values: dataMap[yAxis],
          xLabel: xAxis,
          yLabel: yAxis,
        }),
      });

      const result = await response.json();
      setAiInsights(result.insights || "No insights generated.");
    } catch (error) {
      console.error("AI Insights Error:", error);
      setAiInsights("Failed to fetch insights.");
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border px-4 py-2 rounded" value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
          {columns?.map((col) => (
            <option key={col} value={col}>X: {col}</option>
          ))}
        </select>

        <select className="border px-4 py-2 rounded" value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
          {columns?.map((col) => (
            <option key={col} value={col}>Y: {col}</option>
          ))}
        </select>

        <select className="border px-4 py-2 rounded" value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
          <option value="radar">Radar</option>
        </select>
      </div>

      <div ref={chartRef} className="bg-white shadow-md p-4 rounded-md" style={{ width: "800px", height: "600px" }}>
        <canvas ref={canvasRef} width={700} height={500} />
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={downloadPNG} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Download as PNG</button>
        <button onClick={downloadPDF} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Download as PDF</button>
      </div>

      <button
        onClick={fetchAIInsights}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mt-6"
      >
        Get AI Insights
      </button>

      {loadingInsights && <p className="mt-4 text-gray-600">Fetching AI insights...</p>}

      {aiInsights && (
        <div className="mt-4 p-4 bg-indigo-100 border-l-4 border-indigo-500 rounded">
          <p className="font-semibold text-gray-700">AI Insight:</p>
          <p className="text-gray-800 mt-2 whitespace-pre-line">{aiInsights}</p>
        </div>
      )}
    </div>
  );
};

export default ChartView;
