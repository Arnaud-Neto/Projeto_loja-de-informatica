const mongoose = require("mongoose");

const nome_db = "express-mongoose";
const db_url = `mongodb://localhost:27017/${nome_db}`;

const db_config = {
    useNewUlrParser: true,
    useUnifiedTopology: true
}

mongoose.connect(db_url, db_config);