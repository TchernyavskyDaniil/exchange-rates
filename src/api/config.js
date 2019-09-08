import ky from 'ky';

const BASE_URL = 'https://api.ratesapi.io';
const API_URL = 'api';

export default ky.create({
  prefixUrl: `${BASE_URL}/${API_URL}/`,
});
