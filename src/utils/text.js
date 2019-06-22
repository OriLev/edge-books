export const capitalize = (string = '') => {
  if (typeof string !== 'string') {
    console.warn(`capitalize: cannot capitalize ${typeof string}`);
    return false;
  }
  const result = string.charAt(0).toUpperCase() + string.slice(1);
  return result;
};

export default {
  capitalize,
};

export const replaceImg = (imgURL) => {
  const imageId = imgURL.split('?')[1].split('').slice(0, 2).join('');
  return `https://picsum.photos/id/${imageId}/300/400`;
};
