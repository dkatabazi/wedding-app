const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Serve the HTML frontend
app.get('/', (req, res) => {
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Use the Port Render gives us, or 3000 for local Termux testing
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname))); // Helps serve CSS/JS if you add them later

const DATA_FILE = 'data.json';

// 1. GET: Load weddings from the JSON file
app.get('/api/events', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            // If file doesn't exist, return an empty list
            return res.json([]);
        }
        res.json(JSON.parse(data));
    });
});

// 2. POST: Save a new wedding to the JSON file
app.post('/api/events', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let events = [];
        if (!err) {
            events = JSON.parse(data);
        }
        
        events.push(req.body); // Add the new wedding data

        fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving data");
            }
            res.json({ message: "Wedding saved successfully!" });
        });
    });
});

// 3. Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Wedding App is live on port ${PORT}`);
});
