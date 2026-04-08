import {
  LOCALE_DICTIONARY,
  DEFAULT_LANGUAGE,
  CARD_IMAGES_PATH
} from './constants';
import { localizedCardNumberMaps, setIDs } from './collectionMaps';
import { CollectionCardImagePathData } from './types';
import { CLOUD_IMAGES_URL } from 'appConstants';

const getSetID = (cardNumber: string): string =>
  Object.keys(setIDs).includes(cardNumber) ? setIDs[cardNumber] : cardNumber;

const getLocalizedCardNumber = (locale: string, setID: string) => {
  const localeMap = localizedCardNumberMaps[locale];
  if (!localeMap) {
    return;
  }

  return localeMap[setID];
};

export const getCollectionCardImagePath = ({
  path = CARD_IMAGES_PATH,
  locale = 'en',
  cardNumber = 'CardBack'
}: CollectionCardImagePathData): string => {
  const cardPathData = {
    languagePath: LOCALE_DICTIONARY[DEFAULT_LANGUAGE],
    cardNumber
  };
  const setID = getSetID(cardNumber);

  if (locale !== DEFAULT_LANGUAGE) {
    const localizedCardNumber = getLocalizedCardNumber(locale, setID);
    if (localizedCardNumber) {
      Object.assign(cardPathData, {
        languagePath: LOCALE_DICTIONARY[locale],
        cardNumber: localizedCardNumber
      });
    } else {
      Object.assign(cardPathData, {
        languagePath: LOCALE_DICTIONARY[DEFAULT_LANGUAGE],
        cardNumber: setID
      });
    }
  }

  return `${CLOUD_IMAGES_URL}/${path}/${cardPathData.languagePath}/${cardPathData.cardNumber}.webp`;
};

export const loadInitialLanguage = () => {
  const languageLoadedLocalStorage = localStorage.getItem('language');
  return languageLoadedLocalStorage
    ? languageLoadedLocalStorage
    : DEFAULT_LANGUAGE;
};
