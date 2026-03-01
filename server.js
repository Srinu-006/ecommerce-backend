const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require("./app");

mongoose
.connect(process.env.DATABASE)
.then(() => console.log("Database is connected successfully"))
.catch((err) => console.log("DB connection error: ", err));

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`App is listening at ${port}`);
})