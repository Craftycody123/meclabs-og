const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ria@martin_03',
    database: 'login',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Basic Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database for the user
    db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Server error.');
            }

            // If no user found
            if (results.length === 0) {
                return res.status(400).send('Invalid username or password.');
            }

            const user = results[0];

            // Compare the password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('Invalid username or password.');
            }

            res.status(200).send('Login successful!');
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log("Server running on http://localhost:${port}");
});