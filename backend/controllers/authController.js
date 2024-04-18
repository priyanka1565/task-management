const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

// Register
exports.register = (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            const newUser = new User({ name, email, password });
            newUser.save()
                .then(user => res.json(user))
                .catch(err => res.status(400).json({ error: err.message }));
        });
};

// Login

exports.login = async (req, res) => {
    const email = req.body.email ? req.body.email.trim() : "";
    const password = req.body.password ? req.body.password.trim() : "";
    if (email.length === 0) {
        return res.status(400).json({ error: ' pleased enter valid email' });
    }
    if (password.length === 0) {
        return res.status(400).json({ error: ' pleased enter valid password' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // If user not found or password doesn't match
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret');

        // Send user details and token in response
        res.json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};