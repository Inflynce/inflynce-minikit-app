import { format, subDays, startOfDay, startOfWeek } from 'date-fns';

export const formatTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval}${unit.charAt(0)} ago`;
    }
  }

  return 'just now';
};

export const getLastWeekStart = (): string => {
  // Get date from 7 days ago
  const lastWeek = subDays(new Date(), 7);
  // Set to start of day
  const startOfLastWeek = startOfDay(lastWeek);
  // Format as ISO string for the database
  return format(startOfLastWeek.toISOString(), 'yyyy-MM-dd');
};

export const getCurrentWeekStart = (): string => {
  // Get current date
  const currentDate = new Date();

  // Get the start of the current week (Monday)
  // The second parameter { weekStartsOn: 1 } specifies that weeks start on Monday (1)
  // (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

  // Format as YYYY-MM-DD for the database
  return format(startOfCurrentWeek, 'yyyy-MM-dd');
};
