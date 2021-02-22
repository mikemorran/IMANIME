let express = require('express');
let app = express();
app.use('/', express.static('public'));

let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 440;
server.listen(port, () => {
    console.log('Server listening at port: ' + port);
});

let io = require('socket.io')(server);

// Listen for Individual Connection
io.sockets.on('connection', function(socket) {
    console.log ('New client: ' + socket.id);
});