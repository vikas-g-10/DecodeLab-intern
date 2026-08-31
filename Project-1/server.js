const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});