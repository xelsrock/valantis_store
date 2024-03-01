import md5 from 'md5';
import { modificateDate } from '../utils';

const getAPIKey = () => {
  const password = 'Valantis';
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1;
  const day = nowDate.getDate();

  return password + '_' + year + modificateDate(month) + modificateDate(day);
};

export const xAuth = md5(getAPIKey());
