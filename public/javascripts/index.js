var socket;

$(init)

function avgr(s) {
  let ret = 0;
  for(i=0;i<s.length;i++) {
      ret += parseInt(s[i].mark)
  }
  ret = parseInt( ret / s.length );
  return ret;
}

function init() {
    socket = io();

    socket.on('init', function(){
        $('.g-index').fadeIn(100);
        $('#init').prop('disabled',true);
    });

    socket.on('login-succ', function(uid){
        let item = $.format(HTML_AUDIT,uid,uid);
        $('.m-audit').append(item);
        $('#'+uid).text(uid);
    });

    socket.on('start', function(uid){
        $('.m-wait').hide();
        $('.m-info').show();
        $('.m-score').show();
        $('#start').prop('disabled',true);
    });

    socket.on('result', function(ret){
        let maxId,maxUid,minId,minUid;
        console.log(ret);
        
        
        maxId = 0;
        maxUid = ret[0].usr
        max = parseInt(ret[0].mark);
        for(i=1;i<ret.length;i++) {
            if (parseInt(ret[i].mark) > max) {
                max = parseInt(ret[i].mark);
                maxId = i;
                maxUid = ret[i].usr;
            }
        }
        ret.splice(maxId,1);

        minId = 0;
        minUid = ret[0].usr
        min = parseInt(ret[0].mark);
        for(i=1;i<ret.length;i++) {
            if (parseInt(ret[i].mark) < min) {
                min = parseInt(ret[i].mark);
                minId = i;
                minUid = ret[i].usr;
            }
        }
        ret.splice(minId,1);
        $('#result-f').text( avgr(ret));

        $('#'+minUid).addClass('del');
        $('#'+maxUid).addClass('del');

        console.log(ret);
    });


    socket.on('mark', function(uid, arr){
        
        $('#'+uid).parent().find('.u-mark-ask').text(arr[0])
        $('#'+uid).parent().find('.u-mark-interface').text(arr[1])
        $('#'+uid).parent().find('.u-mark-function').text(arr[2])
        $('#'+uid).parent().find('.u-mark-code').text(arr[3])
        $('#'+uid).parent().find('.u-mark-group').text(arr[4])
        $('#'+uid).parent().find('.u-mark-ret').text(arr[5])
    });

    socket.on('close', function(uid){
        $('#'+uid).parent().remove();
    });

    $('#init').on('click', doInit);
    $('#start').on('click', doStart);
    $('#mark').on('click', doMark);
}


function doInit() {
    socket.emit('init');
}

function doStart() {
    socket.emit('start');
}

function doMark() {
    socket.emit('result');
}



// socket.on('init', function(msg){
//       
// });;
// 