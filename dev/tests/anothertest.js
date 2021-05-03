/**
 * Modify the parts you need to get it working.
 */

var should = require('should');
var request = require('../node_modules/request');
var io = require('socket.io-client');

var serverUrl = 'http://localhost';

var options = {
  transports: ['xhr-polling'],
  'force new connection': true
};

// var options = {
//   transports: ['xhr-polling'],
//   'force new connection': true
// };

describe("socket-io server", function () {

  var clients = [];

  it('Should manage 100 rapid connecting/reconnecting users', function (done) {

      var connectionInterval = 250;
      var numberOfUsersToConnect = 100;
      var connections = 0;
      var connectionTimestampSum = 0;

      for (var i = 1; i <= numberOfUsersToConnect; i++) {
        (function (index) {

          var userIndex = (index - 1) % (testUsers.length - 1);
            
            setTimeout(function () {

              var time = Date.now();

              var client = new SocketIoClient(serverUrl, {
                onConnected: function () {
                  connections++;
        
                  connectionTimestampSum += Date.now() - time;
                    
                  log((connections) + "/" + numberOfUsersToConnect + " connected! (" + (Date.now() - time )+ "ms)");
        
                  clients.push(client);
        
                  if (index == numberOfUsersToConnect) {
                    log("Average connect time: " + Math.round(connectionTimestampSum / connections) + " ms!");
                    log("");
                    setTimeout(function() {
                      done();
                    }, 2000);
                  }
                }
              });

            }, index * connectionInterval);
        })(i);
      }
  });

  it('Should successfully send messages between clients', function (done) {

    log("");
    log("Client length: " + clients.length);
    log("");

    var chosenMessenger = Math.round(Math.random() % clients.length) % clients.length,
        clientsReceived = 0,
        sentTimestamp = 0,
        receiveTimeSum = 0,
        message = "Hello other clients!";
    
    // Bind event to all connected clients:
    for (var i = 0; i < clients.length; i++) {
      (function (index) {
        var event = function (newPost) {

          clientsReceived++;
          receiveTimeSum += Date.now() - sentTimestamp;

          log("Received " + (clientsReceived) + "/" + clients.length + " messages!");

          if (clientsReceived == clients.length - 1) {

            log("Average receive time: " + Math.round(receiveTimeSum / clientsReceived) + " ms!");
            log("");

            setTimeout(function () {
                done();
            }, 2000);
          }
        }

        clients[index].on('newPost all', event);
      })(i);
    }

    // Send the message from one - to all the other clients:
    sentTimestamp = Date.now();
    clients[chosenMessenger].postMessage(message);
  });

});

function log(message) {
  process.stdout.write("\n\t\t" + message);
}

function SocketIoClient(connectionString, eventObject) {
  // Establish socket connection to the node server:
  var socket = this.socket = io.connect(connectionString, options);

  this.eventObject = eventObject || {};
  this.eventObject.onConnected = eventObject.onConnected || function () { };
  this.eventObject.onError = eventObject.onError || function () { };

  this.socket.on('connect', function () {
    eventObject.onConnected();
  });

  this.socket.on('error', function (incomingError) {
    eventObject.onError(incomingError);
  });

  this.socket.on('disconnect', function () {
    eventObject.onDisconnect();
  });
}

SocketIoClient.prototype = {
  'disconnect': function() {
    this.socket.disconnect();
  },
  
  'postMessage': function(message) {
    this.socket.emit('post', {
        message: message
    });
  },
  
  'on': function () {
    this.socket.on.apply(this.socket, arguments);
  }
}