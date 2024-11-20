const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: { origin: "*" }});
const path = require('path');
const port = 80;


app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/home', (req, res) => {
    res.render('home')
})

server.listen(port, (err)=>{
    console.log('connected')
})

io.on('connection', (socket) => {
    console.log("User connected " + socket.id);

    socket.on("message", (data) => {
        // console.log(data    );
        socket.broadcast.emit('message', data)
        
    })

})
