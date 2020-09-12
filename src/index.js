require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routers = require("./routes");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", routers);
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
