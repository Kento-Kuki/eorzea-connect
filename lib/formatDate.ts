import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (isThisWeek(date)) {
    return format(date, 'EEEE');
  } else {
    return format(date, 'MM-dd');
  }
};
