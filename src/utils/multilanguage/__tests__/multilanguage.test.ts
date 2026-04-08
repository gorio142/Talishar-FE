import {
  CARD_IMAGES_PATH,
  CARD_SQUARES_PATH,
  DEFAULT_LANGUAGE,
  JAPANESE_LANGUAGE
} from '../constants';
import {
  getCollectionCardImagePath,
  loadInitialLanguage
} from '../multilanguage';
import { localizedCardNumberMaps } from '../collectionMaps';
import { CLOUD_IMAGES_URL } from '../../../appConstants';

const generateExpectedResult = ({
  path = CARD_IMAGES_PATH,
  locale = 'english',
  cardNumber = 'CardBack'
}) => `${CLOUD_IMAGES_URL}/${path}/${locale}/${cardNumber}.webp`;

describe('Multilanguage', () => {
  describe('getCollectionCardImagePath', () => {
    beforeEach(() => {
      Object.values(localizedCardNumberMaps).forEach((localeMap) => {
        Object.keys(localeMap).forEach((key) => {
          delete localeMap[key];
        });
      });
    });

    it('should return default values', () => {
      const result = getCollectionCardImagePath({});
      expect(result).to.equal(generateExpectedResult({}));
    });

    describe('English language', () => {
      it('should return english values on english locale', () => {
        const result = getCollectionCardImagePath({
          path: CARD_IMAGES_PATH,
          locale: 'en',
          cardNumber: 'WTR111'
        });
        expect(result).to.equal(
          generateExpectedResult({
            path: CARD_IMAGES_PATH,
            locale: 'english',
            cardNumber: 'WTR111'
          })
        );
      });

      it('should return english values on alternative card', () => {
        const result = getCollectionCardImagePath({
          path: CARD_IMAGES_PATH,
          locale: 'en',
          cardNumber: 'WTR111_Brandao'
        });
        expect(result).to.equal(
          generateExpectedResult({
            path: CARD_IMAGES_PATH,
            locale: 'english',
            cardNumber: 'WTR111_Brandao'
          })
        );
      });
    });

    describe('Japanese language', () => {
      it('should return japanese values when locale mapping exists', () => {
        localizedCardNumberMaps.ja.MST111 = 'BBB000';
        const result = getCollectionCardImagePath({
          path: CARD_SQUARES_PATH,
          locale: 'ja',
          cardNumber: 'MST111'
        });
        expect(result).to.equal(
          generateExpectedResult({
            path: CARD_SQUARES_PATH,
            locale: 'japanese',
            cardNumber: 'BBB000'
          })
        );
      });

      it('if locale mapping is missing, return english values', () => {
        const result = getCollectionCardImagePath({
          path: CARD_SQUARES_PATH,
          locale: 'ja',
          cardNumber: 'WTR111'
        });
        expect(result).to.equal(
          generateExpectedResult({
            path: CARD_SQUARES_PATH,
            locale: 'english',
            cardNumber: 'WTR111'
          })
        );
      });

      it('should return english values if is an alternative art card code', () => {
        const result = getCollectionCardImagePath({
          path: CARD_SQUARES_PATH,
          locale: 'ja',
          cardNumber: 'MST111_Brandao'
        });
        expect(result).to.equal(
          generateExpectedResult({
            path: CARD_SQUARES_PATH,
            locale: 'english',
            cardNumber: 'MST111_Brandao'
          })
        );
      });
    });

    describe('European language', () => {
      it('should return localized value when locale mapping exists', () => {
        localizedCardNumberMaps.es.OUT111 = 'CCC000';
        const result = getCollectionCardImagePath({
          path: CARD_IMAGES_PATH,
          locale: 'es',
          cardNumber: 'OUT111'
        });
        expect(result).to.equal(
          generateExpectedResult({
            path: CARD_IMAGES_PATH,
            locale: 'spanish',
            cardNumber: 'CCC000'
          })
        );
      });

      it('should support setIDs normalized values for locale mapping keys', () => {
        localizedCardNumberMaps.es['1HP001'] = 'DDD000';
        const result = getCollectionCardImagePath({
          path: CARD_IMAGES_PATH,
          locale: 'es',
          cardNumber: 'WTR001'
        });
        expect(result).to.equal(
          generateExpectedResult({
            path: CARD_IMAGES_PATH,
            locale: 'spanish',
            cardNumber: 'DDD000'
          })
        );
      });

      it('if locale mapping is missing, return english values', () => {
        const result = getCollectionCardImagePath({
          path: CARD_SQUARES_PATH,
          locale: 'es',
          cardNumber: 'TEST111'
        });
        expect(result).to.equal(
          generateExpectedResult({
            path: CARD_SQUARES_PATH,
            locale: 'english',
            cardNumber: 'TEST111'
          })
        );
      });

      it('should return english values if is an alternative art card code', () => {
        const result = getCollectionCardImagePath({
          path: CARD_SQUARES_PATH,
          locale: 'es',
          cardNumber: 'OUT111_Brandao'
        });
        expect(result).to.equal(
          generateExpectedResult({
            path: CARD_SQUARES_PATH,
            locale: 'english',
            cardNumber: 'OUT111_Brandao'
          })
        );
      });
    });
  });

  describe('loadInitialLanguage', () => {
    beforeEach(() => window.localStorage.clear());

    it('should return default language if is not stored in localStorage', () => {
      const result = loadInitialLanguage();
      expect(result).to.equal(DEFAULT_LANGUAGE);
    });

    it('should return english language if is stored in localStorage', () => {
      window.localStorage.setItem('language', DEFAULT_LANGUAGE);
      const result = loadInitialLanguage();
      expect(result).to.equal(DEFAULT_LANGUAGE);
    });

    it('should return english language if is stored in localStorage', () => {
      window.localStorage.setItem('language', JAPANESE_LANGUAGE);
      const result = loadInitialLanguage();
      expect(result).to.equal(JAPANESE_LANGUAGE);
    });
  });
});
