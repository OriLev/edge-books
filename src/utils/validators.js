import CONSTS from '../consts';

const { REGEX: { URL_VALIDATION_REGX } } = CONSTS;

// export const isURL = url => URL_VALIDATION_REGX.test(url);

export default url => URL_VALIDATION_REGX.test(url);
