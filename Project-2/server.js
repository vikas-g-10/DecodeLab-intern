const express = require("express");
const prisma = require("./lib/prisma");

const app = express();
const PORT = 3000;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Backend Project 2 API is running"
    });
});

// Test database connection
app.get("/test-db", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            message: "Database connection successful"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Database connection failed"
        });
    }
});

// CREATE USER
app.post("/users", async (req, res) => {
    try {
        const { email, age } = req.body;

        if (!email || age === undefined) {
            return res.status(400).json({
                error: "Email and age are required"
            });
        }

        if (!Number.isInteger(age) || age < 0) {
            return res.status(400).json({
                error: "Age must be a non-negative integer"
            });
        }

        const user = await prisma.user.create({
            data: {
                email,
                age
            }
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);

        if (error.code === "P2002") {
            return res.status(409).json({
                error: "Email already exists"
            });
        }

        res.status(500).json({
            error: "Failed to create user"
        });
    }
});

// GET ALL USERS
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.json(users);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch users"
        });
    }
});

// UPDATE USER
app.put("/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { email, age, is_active } = req.body;

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email,
                age,
                is_active
            }
        });

        res.json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update user"
        });
    }
});

// DELETE USER
app.delete("/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.user.delete({
            where: {
                id: id
            }
        });

        res.json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete user"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});