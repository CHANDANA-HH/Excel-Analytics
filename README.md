# 📊 Excel Analytics Web App

A full-stack application that allows users to upload Excel files, visualize their data with dynamic and interactive charts, generate AI insights, and download the charts as PNG or PDF files. Ideal for students, analysts, or anyone working with tabular data.

---

## 🚀 Features

### ✅ Excel File Upload
- Drag-and-drop or select Excel `.xlsx` files.
- Parses column headers and data for visualization.

### 📊 Dynamic Chart Generation
- Choose from various chart types:
  - Bar
  - Line
  - Pie
  - Doughnut
  - Radar
- Dynamic X and Y axis selection using actual Excel column names.
- Responsive, styled charts powered by `Chart.js`.

### 🧠 AI-Generated Insights
- Integrated with **Google Gemini API**.
- Generates smart, concise summaries of trends in the uploaded chart data.

### 📥 Downloadable Charts
- Download chart as:
  - **PNG** using `html2canvas`
  - **PDF** using `jsPDF`
- Saved charts are added to download history.

### 🗂️ Download History with Preview
- View previously downloaded charts with details:
  - Chart type
  - X/Y axes
  - Format (PNG or PDF)
  - Timestamp
- Preview downloaded charts
- Delete individual entries (three-dot menu)

### 🔁 Persistent Storage
- All chart downloads and history are saved using `localStorage`.

---

## 🧰 Tech Stack

### ⚙️ Frontend
- **React.js** – SPA Framework
- **Vite** – Lightning-fast dev server and build tool
- **Chart.js** – Chart rendering
- **Tailwind CSS** – Utility-first CSS
- **React Router** – Routing between pages
- **html2canvas** – Capture chart canvas to image
- **jsPDF** – Export chart image to PDF
- **Axios** – HTTP client

### 🖥️ Backend
- **Node.js** – Runtime
- **Express.js** – RESTful API framework
- **Mongoose** – ODM for MongoDB
- **Multer** – Middleware for file upload
- **xlsx** – Excel parser
- **dotenv** – Load environment variables
- **Google Gemini API** – AI-powered chart summarizer

---

