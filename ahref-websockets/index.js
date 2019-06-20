"use strict";
var webSocketsServerPort = 1338;
var webSocketServer = require('websocket').server;
var http = require('http');
var clients = [ ];

function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var server = http.createServer(function(request, response) {
});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + "Friendship-engine is listening on port "
        + webSocketsServerPort);
});

var wsServer = new webSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin); 
    var index = clients.push(connection) - 1;
    var userId = false;
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        message = JSON.parse(message.utf8Data);
        if (message.purpose === 'onlogin') {
            userId = htmlEntities(message.data);
            connection.userId = userId;
            console.log((new Date()) + ' User is known as: ' + userId);
        } else if(message.purpose === 'onlogout') {
        if (userId !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            clients.splice(index, 1);
        }
        } else {
            console.log((new Date()) + ' Received Message from '
            + userId + ': ' + message.data);
            var json = JSON.stringify({ type:'message', data: userId });
            clients.map((e)=>e.userId==message.data?e.sendUTF(json):e);
        }
    });
});