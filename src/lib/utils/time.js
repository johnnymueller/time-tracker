import moment from 'moment';
import { Exception } from 'handlebars';

export const getDuration = (seconds) => {
  if (seconds > 86400) {
    throw new Exception('invalid input');
  }
  return moment.utc(seconds * 1000).format('HH:mm:ss');
}