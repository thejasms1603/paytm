const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
app.use(cors());;
app.use(express.json());
const rootRouter = require("./routes/index");


app.use('api/v1',rootRouter);
app.listen(PORT, ()=>{
    console.log("Server is listening on PORT",PORT);
})



