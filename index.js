const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_FILE = 'data.json';

// 1. Get all weddings
app.get('/api/events', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.json([]);
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            res.json([]);
        }
    });
});

// 2. Add a new wedding
app.post('/api/events', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let events = [];
        if (!err && data) {
            try { events = JSON.parse(data); } catch (e) { events = []; }
        }
        events.push(req.body);
        fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2), (err) => {
            if (err) return res.status(500).send("Error");
            res.json({ message: "Saved!" });
        });
    });
});

// 3. Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server live on port ${PORT}`);
});
