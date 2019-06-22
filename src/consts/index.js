const CONSTS = {
  API: {
    BASE_URL: 'https://jsonapiplayground.reyesoft.com/v2',
  },
  ROUTING: {
    SINGLE_BOOK_ROUTE: '/book',
    MISSING_PARAMS_MSG: 'Illegal Route (parameters missing)',
    TOO_MANY_PARAMS_MSG: 'Illegal Route (too many parameters)',
  },
  REGEX: {
    URL_VALIDATION_REGX: new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i'),
  },
  MESSAGES: {
    INVALID_URL_MESSAGE: 'Please insert a valid URL',
    POST_IMAGE_FAILED: 'Adding the image failed, try again later',
    POST_IMAGE_SUCCESSFUL: 'Image posted successfully',
    NO_IMAGES_FOR_THIS_BOOK: 'There are no images for this book... wanna add some? :)',
  },
};

export default CONSTS;
