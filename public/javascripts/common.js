function log(m) {
  console.log(m);
}

function err(info) {
  toastr.success(info)
}



function strTo62(number) {
  var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'.split(''),
    radix = chars.length,
    qutient = +number,
    arr = [];
  do {
    mod = qutient % radix;
    qutient = (qutient - mod) / radix;
    arr.unshift(chars[mod]);
  } while (qutient);
  return arr.join('');
}



HTML_AUDIT = '<div class="m-audit-item"><li class="u-item-title" id="{1}"> {0}</li><li class="u-score"><span class="u-title">答辩</span><span class="u-mark u-mark-ask">0</span></li><li class="u-score"><span class="u-title">界面</span><span class="u-mark u-mark-interface">0</span></li><li class="u-score"><span class="u-title">功能</span><span class="u-mark u-mark-function">0</span></li><li class="u-score"><span class="u-title">代码</span><span class="u-mark u-mark-code">0</span></li><li class="u-score"><span class="u-title">团队</span><span class="u-mark u-mark-group">0</span></li><li class="u-score u-score-ret"><span class="u-mark u-mark-ret">0</span></li></div>'