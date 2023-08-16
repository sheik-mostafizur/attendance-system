const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const obj = {
    name: "Ayman",
    email: "admin@gmail.com",
  };
  res.json(obj);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
