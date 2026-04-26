const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Serve the HTML frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API to get events from JSON file
app.get('/api/events', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) return res.json([]); // Return empty array if file doesn't exist yet
        res.json(JSON.parse(data));
    });
});

app.listen(3000, () => {
    console.log('✅ Wedding App running at http://localhost:3000');
});
