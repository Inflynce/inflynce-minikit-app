import { Box, Skeleton } from '@mui/material';

interface MindshareTreemapSkeletonProps {
  minHeight?: string | number;
  width?: string | number;
}

export const MindshareTreemapSkeleton = ({
  minHeight = '100%',
  width = '100%',
}: MindshareTreemapSkeletonProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(12, 1fr)',
        gap: 1.5,
        height: minHeight,
        width: width,
      }}
    >
      <Box sx={{ gridColumn: 'span 6', gridRow: 'span 4', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 6', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 6', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 6', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 6', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 4', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 4', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 4', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 4', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 4', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
      <Box sx={{ gridColumn: 'span 4', gridRow: 'span 2', borderRadius: 2, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Box>
    </Box>
  );
};

export default MindshareTreemapSkeleton;
