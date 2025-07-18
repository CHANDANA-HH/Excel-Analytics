import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Upload from './pages/Upload';
import SelectColumns from './pages/SelectColumns';
import ChartView from './pages/ChartView';
import ResetPassword from './pages/ResetPassword';
import History from './pages/History';
import DownloadedCharts from './pages/DownloadedCharts';
import { DownloadProvider } from './DownloadContext';

function App() {
  return (
    <DownloadProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/select-columns" element={<SelectColumns />} />
          <Route path="/chart-view" element={<ChartView />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/history" element={<History />} />
          <Route path="/downloaded-charts" element={<DownloadedCharts />} />
        </Routes>
      </>
    </DownloadProvider>
  );
}

export default App;
