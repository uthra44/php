const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Use body-parser middleware to parse form data (application/x-www-form-urlencoded)
// You don't need `body-parser` in Express 4.16.0+ because it has in-built body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For parsing application/json

// Database connection settings
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'root', // Your MySQL password
    database: 'user_data' // Your MySQL database name
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Route to handle form submission (POST request)
app.post('/submit', (req, res) => {
    console.log(req.body);
    const { name, number, career } = req.body;

    // SQL query to insert data into the `user` table
    const query = 'INSERT INTO user (name, number, career) VALUES (?, ?, ?)';

    // Execute the query with the form data
    db.execute(query, [name, number, career], (err, results) => {
        if (err) {
            console.error('Error inserting data: ' + err.message);
            return res.status(500).send('Error: ' + err.message);
        }
        res.send('New record created successfully!');
    });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
