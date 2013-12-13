/*
 * GET home page.
 */
var twitter = require('ntwitter');
var io = require('socket.io').listen(3001, {log: false});
var sending = false;
var util  = require('util'),
    spawn = require('child_process').spawn,
    cmd   = spawn('python', ['tree.py']);
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
			io.sockets.emit('newTwitt', data);
			cmd.stdout.on('data', function (gdata) { console.log("cmd",gdata);}); 
			console.log(data);
            });
        });
    }
};

