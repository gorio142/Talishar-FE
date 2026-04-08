import { japaneseCardNumberMap } from './lang/ja';
import { frenchCardNumberMap } from './lang/fr';
import { germanCardNumberMap } from './lang/de';
import { italianCardNumberMap } from './lang/it';
import { spanishCardNumberMap } from './lang/es';

export const localizedCardNumberMaps: { [locale: string]: { [index: string]: string } } = {
  ja: japaneseCardNumberMap,
  fr: frenchCardNumberMap,
  de: germanCardNumberMap,
  it: italianCardNumberMap,
  es: spanishCardNumberMap
};
