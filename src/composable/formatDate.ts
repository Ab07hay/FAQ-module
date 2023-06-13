import moment from "moment";
//this function return the date in proper format
export function formatDate(date: string | Date | number, dateFormat = 'MMMM Do YYYY, h:mm:ss A') {
    return moment(date).format(dateFormat)
  }
  