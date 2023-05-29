const express = require("express")
require("dotenv").config()
const hbs = require("hbs")
const path = require("path")
const app = express();
const PORT = process.env.PORT;
const http = require("http").createServer(app)

const publicpath = path.join(__dirname, "./public")
const viewpath = path.join(__dirname, "./templetes/view")
const partialpath = path.join(__dirname, "./templetes/partials")

app.set("view engine", "hbs")
app.set("views", viewpath)
hbs.registerPartials(partialpath)
app.use(express.static(publicpath))

http.listen(PORT, (req, resp) => {
    console.log("server running on port : " + PORT);
})
app.get("/", (req, resp) => {
    resp.render("index")
})

const io=require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('Connected');

socket.on('message',(msg)=>{
    // console.log(msg);
    socket.broadcast.emit('message',msg);
})

})


