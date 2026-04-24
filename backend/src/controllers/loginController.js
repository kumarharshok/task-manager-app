const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            message: "Login successful",
            token,
            userId: user.id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { checkUser };