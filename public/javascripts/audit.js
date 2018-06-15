var WAIT_TIME = 30;
var socket;
var _usr;
var _count = WAIT_TIME;
var mkList = ['ask', 'interface', 'function', 'code', 'group'];


function doCounter() {
  setTimeout( () => {
    --_count;
    if (_count>0) {
      $('.m-counter').text(_count);
      doCounter(_count)
    }else{
      doMark();
    }
  }, 1000 );
}

$(init)

function init() {
  socket = io();
  
  socket.on('login-succ', function(usr){
    if (usr === _usr) {
      $('.g-login').hide();
      $('.g-audit').fadeIn(100);


      $('.m-id').text(strTo62(usr));
    }
  });

  socket.on('login-err', function(msg){
    err('密码错误！')
  });

  socket.on('start', function(msg){
    $('.btn-mark').prop('disabled',false);
    $('.btn-mark').removeClass('dis');

    doCounter();
  });

  socket.on('next', function(data){
    $('.u-mark').removeClass('sel');
    $('.m-counter').text(_count=WAIT_TIME);
  });

  window.onbeforeunload = function(){  
    socket.emit('close',_usr);
  };

  $('.btn-login').on('click', doLogin);
  $('.u-mark').on('click', doSelect);
  $('.btn-mark').on('click', doMark);
}

function doMark() {

  _count = 0 ;
  $('.m-counter').text(_count);

  let arr = [];
  
  mkList.forEach(function(v){
    if($('.u-mark-' + v + '.sel').length>0) {
      ret = $('.u-mark-' + v + '.sel').text().split('分')[0];
    }else{
      $('.u-mark-' + v + ':first').addClass('sel')
      ret = 0;
    }
    arr.push(ret)
  })

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

