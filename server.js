const express=require('express')
const app=express();
const http=require('http')
const path=require('path')
const socketio=require('socket.io')
const server=http.createServer(app)

const io=socketio(server)
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("received-location",{id:socket.id, ...data});
    });
    console.log("connected")
});

app.get("/", function(req,res) {
    res.render("index")
});
server.listen(8080, ()=>console.log("server is running"));