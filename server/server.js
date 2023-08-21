const express = require("express");
const connectDB = require("./db");
const authenticate = require("./middleware/authenticate");
const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(routes);

app.get("/private", authenticate, async (req, res) => {
  console.log("i am the user", req.user);
  return res.status(200).json({message: "I am private route."});
});

app.get("/public", (req, res) => {
  return res.status(200).json({message: "I am public route."});
});

app.get("/", (req, res) => {
  res.json({message: "This is home route."});
});

app.use((err, req, res, next) => {
  console.log(err);

  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.statue ? err.status : 500;

  return res.status(status).json({message});
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database connection established!");

    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((err) => console.error(err));
