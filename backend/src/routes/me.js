const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/me", auth, (req, res) => {
    res.json(req.user);
});

module.exports = router;