const formatNumber = num => {
  if(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
}

export const FormatDate = str => {
  var dstr = str.split('T')
  var time = dstr[1].split('.')
  var sec = time[0].split(':')

  time = sec[0] + ':' +sec[1]

  var dateObj = {
    date: dstr[0],
    time: time
  }
  return dateObj
}

export default formatNumber