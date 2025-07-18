const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const xlsx = require('xlsx');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/test', (req, res) => {
  res.send('Upload route is working!');
});

// Main upload route
router.post('/', upload.single('file'), async (req, res, next) => {
    console.log("Upload route hit");

    try {
        // Check if using free trial (no auth header, but sends special flag)
        const isFreeTrial = req.headers['free-trial'] === 'true';

        // If not free trial 
        if (!isFreeTrial) {
            await new Promise((resolve, reject) => {
                authMiddleware(req, res, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileName = req.file.originalname.toLowerCase();
        let jsonData = [];

        if (fileName.endsWith('.csv')) {
            const csvString = req.file.buffer.toString();
            const workbook = xlsx.read(csvString, { type: 'string' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            jsonData = xlsx.utils.sheet_to_json(sheet);
        } else {
            const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            jsonData = xlsx.utils.sheet_to_json(sheet);
        }

        if (jsonData.length === 0) {
            return res.status(400).json({ error: 'Sheet is empty' });
        }

        const columns = Object.keys(jsonData[0] || {});
        const dataMap = {};
        columns.forEach((col) => {
            dataMap[col] = jsonData.map((row) => row[col]);
        });

        return res.json({ columns, dataMap });

    } catch (err) {
        console.error('Upload Error:', err);
        res.status(401).json({ error: 'Unauthorized or failed to parse file' });
    }
});

module.exports = router;
