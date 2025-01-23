const mongoose = require("mongoose");

const nome_db = "express-mongoose";
const db_url = `mongodb+srv://arnaudmacedo:321Tcluster0r321!@cluster0.nyqj4.mongodb.net/${nome_db}`;

const db_config = {
    useNewUlrParser: true,
    useUnifiedTopology: true
}

mongoose.connect(db_url, db_config);