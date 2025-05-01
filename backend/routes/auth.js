const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('./middleware/fetchUser');

const JWT_SECRET = 'your-secret-key'; // Replace this with a secure secret key

router.get('/', (req, res) => {
    res.send('Chandan');
});

// Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('confirmPassword', 'Confirm password is required').notEmpty(),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    body('phone', 'Enter a valid phone number').isLength({ min: 10, max: 10 }),
    body('address', 'Enter a valid address').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if(user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create user with only the necessary fields
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            address: req.body.address
        });

        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Authenticate a user using: POST "/api/auth/login". No login required 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),  
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ error: "Sorry a user with this email does not exist" });
        }
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({ error: "Your password is incorrect" });
        }
        
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
        
    }catch(error) {
        // console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Get user details using: POST "/api/auth/getuser". Login required
router.get('/getuser', fetchuser, async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;
