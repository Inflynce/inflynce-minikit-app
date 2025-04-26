import { TableRow, TableCell, Skeleton } from '@mui/material';
import { schletonColor, schletonColorDark } from '@/utils/color';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  includeAvatar?: boolean;
  isDark?: boolean;
}

export const TableSkeleton = ({
  rows = 1,
  columns = 5,
  includeAvatar = true,
  isDark = false,
}: TableSkeletonProps) => {
  const bgcolor = isDark ? schletonColorDark : null;
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={`skeleton-row-${rowIndex}`}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell
              key={`skeleton-cell-${rowIndex}-${colIndex}`}
              sx={{
                textAlign: colIndex === 0 ? 'left' : 'center',
                alignItems: 'center',
              }}
            >
              {colIndex === 0 && includeAvatar ? (
                <Skeleton variant="circular" height={20} width={20} sx={{ bgcolor }} />
              ) : (
                <Skeleton variant="text" height={20} sx={{ bgcolor }} />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeleton;
