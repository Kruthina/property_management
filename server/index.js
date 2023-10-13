const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
// app.use(express.static("./public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const users = require("./routes/user");
const properties = require("./routes/properties");
const registrations = require("./routes/registrations");

app.use("/user", users);
app.use("/properties", properties);
app.use("/registrations", registrations);

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
