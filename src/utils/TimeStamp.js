import moment from 'moment-jalaali';
moment.loadPersian({usePersianDigits: true})

const getTimeString= (x,format) => {
  const regex = /^\d{10}$/g;
  if(!x){
    return "";
  }

  let formatted = '';
  if (regex.test(x)) {
    //timestamp
    formatted = moment.unix(x).format(format);
  } else {
    //datetime
    formatted = moment(x).format(format);
  }

  // there is a typo in the library.
  // quickly fix it for now. maybe later we can
  // do something else
  if (formatted.indexOf('امرداد') >= 0) {
    formatted = formatted.replace('امرداد', 'مرداد');
  }

  return formatted;
}

const TimeStamp = {
  runtime(x){
    return getTimeString(x,'jMMMM jYYYY')
  },
  dayString(x){
    return getTimeString(x,'dddd jDD jMMMM')
  },
  dateString(x){
    return getTimeString(x,'jDD jMMMM jYYYY')
  },
  showTime(x){
    return getTimeString(x,'HH:mm')
  },
  showTimeFull(x){
    return getTimeString(x,'dddd jDD jMMMM jYYYY - ساعت HH:mm')
  }
}

export default TimeStamp;
