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

    // Check if we've already shown the dialog today
    if (lastShownDate !== today) {
      // Show the dialog if it hasn't been shown today
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
