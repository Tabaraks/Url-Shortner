const express = require("express");
const urlRoute = require("./routes/url");
const path = require("path");
const staticRoutes = require("./routes/staticRouter");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");
const userRoutes = require("./routes/user");
const { connectToMongoDb } = require("./connect");
const URL = require("./models/url");
const app = express();
const port = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoutes);
app.use("/user", userRoutes);

app.get("/url/:short_id", async (req, res) => {
  const short_id = req.params.short_id;

  const entry = await URL.findOneAndUpdate(
    {
      short_id,
    },
    {
      $push: {
        visit_history: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirect_url);
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
