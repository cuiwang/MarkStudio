import dayjs from 'dayjs'

// 将日期显示成距离最近多久
function dateNow() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}
// 将日期显示成距离最近多久
function dateFromNow(date) {
  return dayjs(date).fromNow()
}

export default {
  dateFromNow,
  dateNow
};
