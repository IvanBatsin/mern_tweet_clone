import formatDistance from 'date-fns/formatDistance';
import { ru } from 'date-fns/locale';

export const formateDate = (date: Date): string => {
  return formatDistance(
    date,
    new Date(),
    {locale: ru}
  );
}