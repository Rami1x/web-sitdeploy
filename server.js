const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5500;

// MySQL connection
const db = mysql.createConnection({
    host: 'nwinno.ciej2shr5qnu.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'ILoveGoku',
    database: 'nwdata'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname));

// Routes
app.post('/subscribe', (req, res) => {
    const { name, email } = req.body;

    // Print the received data to the console
    console.log(`Received subscription request: Name - ${name}, Email - ${email}`);

    const query = 'INSERT INTO Users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Server error');
        }
        // Redirect to thank-you page after successful insert
        res.redirect('/thank-you');
    });
});

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'thank_you.html'));
});

app.listen(port, '127.0.0.1', () => {
    console.log(`Server running on port ${port}`);
});
