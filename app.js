const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));// publicファイルを見に行ってください

const PORT = 5100;

//ルーティング設計
app.use("/api/v1/tasks",taskRoute);


//データーベースと接続
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT || PORT, console.log("サーバーが接続できました"))
    } catch(err) {
        console.log(err);
    }
};

start();

