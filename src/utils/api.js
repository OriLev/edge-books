import queryString from 'query-string';

import CONSTS from '../consts';

const { BASE_URL } = CONSTS.API;

const buildBooksListURL = (pageNumber) => {
  const bookListQuery = queryString.stringify({
    'page[number]': pageNumber,
    'page[size]': 5,
    include: ['author', 'photos'],
  }, { arrayFormat: 'comma' });
  return `${BASE_URL}/books?${bookListQuery}`;
};

const buildSingleBookURL = (bookId) => {
  const bookListQuery = queryString.stringify({
    include: ['author', 'photos'],
  }, { arrayFormat: 'comma' });
  return `${BASE_URL}/books/${bookId}?${bookListQuery}`;
};

const buildPostImageURL = bookId => `${BASE_URL}/books/${bookId}/relationships/photos`;

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    throw (new Error('Your data could not be fetched'));
  } catch (error) {
    throw error;
  }
};

const postData = async (url, data) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return await response.json();
    }
    throw (new Error('Your data could not be posted'));
  } catch (error) {
    throw error;
  }
};

export const postNewImage = (bookId, imageURL) => {
  const url = buildPostImageURL(bookId);
  const data = {
    data: {
      type: 'photos',
      attributes: {
        title: 'something',
        uri: imageURL,
      },
    },
  };
  return postData(url, data);
};

export const fecthBookList = (pageNumber = 1) => {
  const url = buildBooksListURL(pageNumber);
  return fetchData(url);
};

export const fetchBook = (bookId) => {
  const url = buildSingleBookURL(bookId);
  return fetchData(url);
};
