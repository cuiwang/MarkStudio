/**
 *  y   年
 *  M   月
 *  d   日
 *  H   时            h   时（am/pm）
 *  m   分
 *  s   秒
 *  S   毫秒
 *  a   上午/下午（am/pm)
 *  setInterval(function(){
 *     input111.value = dateStr(new Date(), "要一个给小于9的d数m字s前H面M加0返回字符串的方法yyyy");
 *  }, 1000);
 */
function dateStr(date, str) {
  if (!date instanceof Date) {
    return str;
  }
  // match之后得到数组
  // 遍历数组，
  // 判断各个元素长度、内容，做对应替换
  let reg = /yyyy|yy|MM|M|dd|d|HH|H|h|mm|m|ss|s|SSS|S|a/g;
  let strArr = str.match(reg);
  for (let i = 0, len = strArr.length; i < len; i++) {
    // console.log(strArr[i]);
    switch (strArr[i]) {
      case 'yyyy':
        str = str.replace(/yyyy/, date.getFullYear());
        break;
      case 'yy':
        str = str.replace(/yy/, String(date.getFullYear()).substr(2, 2));
        break;
      case 'MM':
        str = str.replace(/MM/, getLe9Str(date.getMonth() + 1));
        break;
      case 'M':
        str = str.replace(/M/, date.getMonth() + 1);
        break;
      case 'dd':
        str = str.replace(/dd/, getLe9Str(date.getDate()));
        break;
      case 'd':
        str = str.replace(/d/, date.getDate());
        break;
      case 'HH':
        str = str.replace(/HH/, getLe9Str(date.getHours()));
        break;
      case 'H':
        str = str.replace(/H/, date.getHours());
        break;
      case 'h':
        var s = date.getHours();
        str = str.replace(/h/, s > 12 ? s % 12 : s);
        break;
      case 'mm':
        str = str.replace(/mm/, getLe9Str(date.getMinutes()));
        break;
      case 'm':
        str = str.replace(/m/, date.getMinutes());
        break;
      case 'ss':
        str = str.replace(/ss/, getLe9Str(date.getSeconds()));
        break;
      case 's':
        str = str.replace(/s/, date.getSeconds());
        break;
      case 'SSS':
        str = str.replace(/SSS/, getLe99Str(date.getMilliseconds()));
        break;
      case 'S':
        str = str.replace(/S/, date.getMilliseconds());
        break;
      case 'a':
        str = str.replace(/a/, date.getHours() > 12 ? 'pm' : 'am');
        break;
    }
  }
  return str;
}

// 要一个给小于9的数字前面加0返回字符串的方法
function getLe9Str(num) {
  return num > 9 ? String(num) : '0' + num;
}

// 小于100前面加00或者0
function getLe99Str(num) {
  if (num > 9 && num < 100) {
    return '0' + num;
  } else {
    return getLe9Str(num);
  }
}

export default {
  dateStr,
};
