import format from 'date-fns/format';

export const toSystemDate = (date: Date) => format(date, 'yyyy-MM-dd');
