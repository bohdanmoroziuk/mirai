import { validateUrl } from 'src/utils';

export const required = (value: string) => (
  value.length > 0 || 'Enter a value'
);

export const url = (value: string) => (
  validateUrl(value) || 'Enter a valid url'
);
