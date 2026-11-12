const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
// Change this line in your frontend code
// const BACKEND_URL = (process.env.BACKEND_URL || 'http://fn-service-discovery.fn-backend.local:5000').replace(/\/+$/, '');
const BACKEND_URL = (process.env.BACKEND_URL || 'http://localhost:5000').replace(/\/+$/, '');


app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/submit', async (req, res) => {
    const { username, email } = req.body ?? {};

    if (typeof username !== 'string' || typeof email !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: 'Username and email are required.'
        });
    }

    const processedData = {
        username: username.trim(),
        email: email.trim().toLowerCase()
    };

    if (!processedData.username || !processedData.email) {
        return res.status(400).json({
            status: 'error',
            message: 'Username and email cannot be empty.'
        });
    }

    try {
        const backendResponse = await fetch(`${BACKEND_URL}/api/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(processedData)
        });
        const responseData = await backendResponse.json();

        return res.status(backendResponse.status).json(responseData);
    } catch (error) {
        console.error('Failed to submit data to the Flask backend:', error);
        return res.status(502).json({
            status: 'error',
            message: 'Unable to reach the Flask backend.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Frontend UI server running at http://localhost:${PORT}`);
});
