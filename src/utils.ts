export { getLinkPreview } from 'link-preview-js';

export const validateUrl = (url: string) => {
  const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

  return regex.test(url);
};

export const openExternalUrl = (url: string) => {
  window.open(url, '_blank');
};
