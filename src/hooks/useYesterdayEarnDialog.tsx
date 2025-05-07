import { useState, useEffect } from 'react';

interface UseYesterdayEarnDialogProps {
  points: number;
  enabled?: boolean;
}

export const useYesterdayEarnDialog = ({ points, enabled = true }: UseYesterdayEarnDialogProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled || points <= 0) return;

    const lastShownDate = localStorage.getItem('yesterdayEarnLastShown');
    const today = new Date().toDateString();

    // Check if current time is after 3:30 AM UTC
    const currentDate = new Date();
    const currentHourUTC = currentDate.getUTCHours();
    const currentMinuteUTC = currentDate.getUTCMinutes();
    const isAfter330UTC = currentHourUTC > 3 || (currentHourUTC === 3 && currentMinuteUTC >= 30);

    // Only show dialog if it's after 3:30 AM UTC
    if (isAfter330UTC && lastShownDate !== today) {
      // Show the dialog if it hasn't been shown today and it's after 3:30 AM UTC
      setOpen(true);
      // Save today's date to localStorage
      localStorage.setItem('yesterdayEarnLastShown', today);
    }
  }, [points, enabled]);

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleClose };
};
