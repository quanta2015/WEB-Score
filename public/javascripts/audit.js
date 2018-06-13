var socket;
var _usr;

$(init)

function init() {
  socket = io();

  
  socket.on('login-succ', function(usr){
    if (usr === _usr) {
      $('.g-login').hide();
      $('.g-audit').fadeIn(100);
    }
  });

  socket.on('login-err', function(msg){
    err('密码错误！')
  });

  socket.on('start', function(msg){
    $('.btn-mark').prop('disabled',false);
    $('.btn-mark').removeClass('dis');
  });

  window.onbeforeunload = function(){  
    socket.emit('close',_usr);
  };

  $('.btn-login').on('click', doLogin);
  $('.u-mark').on('click', doSelect);
  $('.btn-mark').on('click', doMark);
}

function doMark() {
  let arr = [];
  arr.push( $('.u-mark-ask.sel').text().split('分')[0] );
  arr.push( $('.u-mark-interface.sel').text().split('分')[0] );
  arr.push( $('.u-mark-function.sel').text().split('分')[0] );
  arr.push( $('.u-mark-code.sel').text().split('分')[0] );
  arr.push( $('.u-mark-group.sel').text().split('分')[0] );

  $('.btn-mark').prop('disabled',true);
  $('.btn-mark').addClass('dis');
  socket.emit('mark', _usr, arr);
}

function doSelect() {
  type = $(this).data('type');
  $('.u-mark-' + type ).removeClass('sel');
  $(this).addClass('sel');
}

function doLogin() {
  _usr = $('#usr').val();
  let obj = {
    usr: $('#usr').val(),
    pwd: $('#pwd').val(),
  };
  log(obj);
  socket.emit('login', JSON.stringify(obj));
}

