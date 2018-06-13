var socket;

$(init)

function init() {
  socket = io();

  
  socket.on('login-succ', function(msg){
    $('.g-audit').empty();
  });

  $('.btn-login').on('click', doLogin);
}

function doLogin() {
  let obj = {
    usr: $('#usr').val(),
    pwd: $('#pwd').val(),
  };
  log(obj);
  socket.emit('login', JSON.stringify(obj));
}

