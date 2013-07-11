var io = module.parent.exports.io;
var model = module.parent.exports.model; 

io.sockets.on('connection', function(socket) {
    console.log("--- io.sockets.on connection");
    
    socket.on('pointChanged', function(point) {
        model.AccessPoint.find({
            geo: {
                $near: [Number(point.split(',')[1]), Number(point.split(',')[0])],
                $maxDistance: 0.01
            }
        }, function(error, aps) {
            socket.emit('newNearPoints', aps);
        });
    });
});