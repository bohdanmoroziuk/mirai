import { date } from 'quasar';

export const formatDate = (value: number | string | Date) => date.formatDate(value, 'DD.MM.YYYY HH:mm');
