import moment from "moment";

export function formatDate(date: string | Date | number, dateFormat = 'MMMM Do YYYY, h:mm:ss A') {
    return moment(date).format(dateFormat)
  }