import moment from 'moment';

export function formatDate(dateObj, format = 'MMMM Do YYYY') {
    return moment(dateObj).format(format);
}
