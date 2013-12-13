/*
 * GET home page.
 */
var twitter = require('ntwitter');
var io = require('socket.io').listen(3001, {log: false});
var serialport = require("serialport");
var SerialPort = serialport.SerialPort
var sending = false;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 57600
},true);

var tracking = [
                '@firstjoblatam',
                '#primertrabajo',
                '@wayrachile',
                'thinker_thing',
                '@thinker_thing',
                '@benchbanking',
                '@purplulogistics',
                '#realtimelogistics',
                'loharia.com',
                '@loharia_cl',
                'loharia_cl',
                'loharia'];

exports.index = function (req, res) {
    res.render('index', { title: 'Arbol de Navidad Wayra 2013' });
    if (req.session.oauth) {
        var twit = new twitter({
            consumer_key: "A6x1nzmmmerCCmVN8zTgew",
            consumer_secret: "oOMuBkeqXLqoJkSklhpTrsvuZXo9VowyABS8EkAUw",
            access_token_key: req.session.oauth.access_token,
            access_token_secret: req.session.oauth.access_token_secret
        });


        twit.verifyCredentials(function (err, data) {
            })
            .updateStatus('Test tweet from ntwitter/' + twitter.VERSION,
            function (err, data) {
            }
        );


        twit.stream(
            'statuses/filter',
            {track: tracking },
            function (stream) {
                stream.on('data', function (data) {
                    serialPort.write("1");
                    io.sockets.emit('newTwitt', data); 
                    console.log(data);
            });
        });
    }
};

