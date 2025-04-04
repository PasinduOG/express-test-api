const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For handling JSON data
app.use(express.static('public'));

// Array to store all submissions
let allSubmissions = [];

// GET - Retrieve all submissions
app.get('/api/submissions', (req, res) => {
    res.json(allSubmissions);
});

// POST - Add a new submission
app.post('/api/submit', (req, res) => {
    const userInput = req.body.userInput;
    const newSubmission = {
        id: Date.now(), // Use timestamp as a unique ID
        text: userInput,
        date: new Date().toLocaleString()
    };
    allSubmissions.push(newSubmission);
    res.json({ status: 'success', submission: newSubmission, allSubmissions });
});

// DELETE - Remove a submission by ID
app.delete('/api/submissions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    allSubmissions = allSubmissions.filter(item => item.id !== id);
    res.json({ success: true, remaining: allSubmissions });
});

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});