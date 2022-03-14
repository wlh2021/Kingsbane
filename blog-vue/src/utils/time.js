export function formatTime(time) {
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }

  return time
}

//显示网站运行时间
function secondToDate(second) {
  if (!second) {
      return 0;
  }
  var time = new Array(0, 0, 0, 0, 0);
  if (second >= 365 * 24 * 3600) {
      time[0] = parseInt(second / (365 * 24 * 3600));
      second %= 365 * 24 * 3600;
  }
  if (second >= 24 * 3600) {
      time[1] = parseInt(second / (24 * 3600));
      second %= 24 * 3600;
  }
  if (second >= 3600) {
      time[2] = parseInt(second / 3600);
      second %= 3600;
  }
  if (second >= 60) {
      time[3] = parseInt(second / 60);
      second %= 60;
  }
  if (second > 0) {
      time[4] = second;
  }
  return time;
}
function setTime() {
  //mouth要少一个月不然会出问题
  var create_time = Math.round(new Date(Date.UTC(2021, 12, 7, 15, 32, 0)).getTime() / 1000);
  var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
  var currentTime = secondToDate((  timestamp-create_time));
  var currentTimeHtml = currentTime[0] + '年' + currentTime[1] + '天'
      + currentTime[2] + '时' + currentTime[3] + '分' + currentTime[4]
      + '秒';
if(document.getElementById("htmer_time")!=null)
  document.getElementById("htmer_time").innerHTML = "if小站已经苟活"+currentTimeHtml;
}
//即时刷新
setInterval(setTime, 1000);

