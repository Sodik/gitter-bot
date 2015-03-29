var Gitter = require('node-gitter');
var calc = require('./calc');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('config.json'));
var gitter;

if(data && data.token){
  gitter = new Gitter(data.token);

  if(process.argv[2]){
    gitter.currentUser().then(function(user) {
      gitter.rooms.join(process.argv[2], function(err, room){
        if(err){
          console.log('Not possible to join the room: ', err);
          return;
        }

        var events = room.listen();

        events.on('message', function(message){
          console.log(message.text)
          room.send(calculator(message.text));
        });

        console.log('Joined room: ', room.name);
      });
    });
  }else{
    throw('Room name not found');
  }
}else{
  throw('Token not found')
}

function calculator(text){
  if(text.indexOf('calc') != -1){
    text = text.replace('calc', '');
    var res = calc.calculate(text);
    return text + '= ' + calc.calculate(text);
  }
  return false;
}