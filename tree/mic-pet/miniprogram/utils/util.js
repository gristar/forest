function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
  
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
  
  
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  
  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  function today(date){
    return date.getDate();
  }
  function curMonth(date) {
    return date.getMonth() + 1;
  }
  function curYear(date) {
    return date.getFullYear();
  }
  function curYearMonthDay(date = new Date()) {
    return [curYear(date), curMonth(date), today(date)].map(formatNumber).join('-')
  }
  module.exports = {
    formatTime,
    today,
    curMonth,
    curYearMonthDay,
  }
  