const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const mongoose = require('mongoose');
const routes = require("./routes/routes.js");
const config = require("./config/config");
let app = Express();
const router = Express.Router();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
mongoose.connect(config.database, { useNewUrlParser: true });

routes(router);
app.use("/api", router);

const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Base Api RestFull is running on port", server.address().port);
});