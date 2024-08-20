const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');

// Set up middleware
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'swear_jar'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Handle submission
app.post('/submit', (req, res) => {
    const { set, tally } = req.body;
    const sessionId = req.session.id;

    // Save the tally to the database
    const query = 'INSERT INTO records (session_id, set, tally) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE tally = tally + VALUES(tally)';
    db.query(query, [sessionId, set, tally], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
