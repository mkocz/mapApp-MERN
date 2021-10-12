const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("db ok");
    })
    .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
    console.log("start");
    app.use(express.static('client/build'))
}

app.use("/api/pins", pinRoute);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
