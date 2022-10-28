import dayjs from 'dayjs'

// 获取当前时间
function dateNow() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}
// 将日期显示成距离最近多久
function dateFromNow(date) {
  return dayjs(date).fromNow()
}

// 时间比较
function isBefore(day1,day2) {
  return dayjs(day1).isBefore(day2)
}
function isAfter(day1,day2) {
  return dayjs(day1).isAfter(day2)
}
function isSame(day1,day2) {
  return dayjs(day1).isSame(day2)
}

export default {
  dateFromNow,
  dateNow,
  isBefore,
  isAfter,
  isSame
};