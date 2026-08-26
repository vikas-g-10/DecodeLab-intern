const express = require("express");

const router = express.Router();

// GET
router.get("/", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Vikas",
            Branch: "CSE AIML"
        },
        {
            id: 2,
            name: "Rahul",
            Branch: "CSE"
        }
    ]);
});

// POST
router.post("/", (req, res) => {
    const { name, Branch } = req.body;

    if (!name || !Branch) {
        return res.status(400).json({
            error: "Name and Branch are required"
        });
    }

    res.status(201).json({
        message: "Student received successfully",
        student: {
            name: name,
            Branch: Branch
        }
    });
});

module.exports = router;