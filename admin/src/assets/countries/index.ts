import { countries as ru_countries } from './ru';
import { countries as en_countries } from './en';

export function getCountriesByCode(code: string) {
  code = code.toLowerCase();

  let countryList;

  switch (code) {
    case 'ru':
      countryList = ru_countries;
      break;
    case 'en':
      countryList = en_countries;
      break;
    default:
      break;
  }

  return countryList;
}
