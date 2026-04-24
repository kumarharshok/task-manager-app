const User = require('../models/User');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({
            message: "Signup successful",
            userId: newUser.id
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { addUser };