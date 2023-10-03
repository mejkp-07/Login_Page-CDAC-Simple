const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pg = require('pg');

const app = express();
const port = process.env.PORT || 5000;

const pool = new pg.Pool({
    connectionString: 'postgresql://postgres:Jay%2A729852%23@localhost:5432/authdb',
});

app.use(cors());
app.use(bodyParser.json());

// Register a new user
app.post('/register', async (req, res) => {
    const { employeeName, employeeID, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
        'INSERT INTO pms_employee_master (emp_id, str_emp_name, password) VALUES ($1, $2, $3)',
        [employeeID, employeeName, hashedPassword],
        (error, results) => {
            if (error) {
                //console.error('Error in user registration:', error);
                res.status(400).json({ error: 'User registration failed.' });
            } else {
                res.status(201).json({ message: 'User registered successfully.' });
            }
        }
    );
});

// Login and generate a JWT token
app.post('/login', async (req, res) => {
    const { employeeID, password } = req.body;

    pool.query('SELECT * FROM pms_employee_master WHERE emp_id = $1', [employeeID], async (error, results) => {
        if (error || results.rows.length === 0) {
            res.status(401).json({ error: 'Authentication failed.' });
        } else {
            const user = results.rows[0];
            const userName = user.str_emp_name
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({ userId: user.id }, 'your_secret_key_here', { expiresIn: '1h' });
                res.status(200).json({ token , userName});
            } else {
                res.status(401).json({ error: 'Authentication failed.' });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
