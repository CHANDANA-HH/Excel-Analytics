const Dashboard = ({ show, onClose }) => {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    const downloadedCharts = JSON.parse(localStorage.getItem('downloadedCharts') || '[]');

    return (
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l p-6 transform transition-transform duration-300 z-50 ${show ? 'translate-x-0' : 'translate-x-full'}`}>
            <button onClick={onClose} className="mb-6 text-red-600">Close</button>

            <h3 className="text-lg font-bold text-indigo-700 mb-4">Uploaded Files</h3>
            <ul className="mb-8 space-y-2 text-sm">
                {uploadedFiles.length > 0 ? uploadedFiles.map((file, i) => (
                    <li key={i} className="p-2 bg-indigo-50 rounded">
                        <strong>{file.name}</strong><br />
                        Size: {file.size}<br />
                        Date: {file.date}
                    </li>
                )) : <p className="text-gray-500">No files uploaded yet.</p>}
            </ul>

            <h3 className="text-lg font-bold text-indigo-700 mb-4">Downloaded Charts</h3>
            <ul className="space-y-2 text-sm">
                {downloadedCharts.length > 0 ? downloadedCharts.map((chart, i) => (
                    <li key={i} className="p-2 bg-green-50 rounded">
                        <strong>{chart.name}</strong><br />
                        Date: {chart.date}
                    </li>
                )) : <p className="text-gray-500">No charts downloaded yet.</p>}
            </ul>
        </div>
    );
};

export default Dashboard;
