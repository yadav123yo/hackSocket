const express = require("express");
const {Server} = require("socket.io")

const app = express();

const webServer = require("http").createServer(app)

const wss = new Server(webServer)

const history =[]
wss.on("connection", (ws)=>{
    ws.broadcast.emit("new user")
    ws.emit("history", history)

    ws.on("typing",()=>{
        ws.broadcast.emit("typing")
    })

    ws.on("new message", (m)=>{
        history.push(m)
        wss.emit("new message", m);
    })
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req,res)=>{
    res.sendFile(__dirname +"/public/index.html")
})

webServer.listen(8080,()=>{
    console.log("server started on http://localhost:8080");
})