import React from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import { MindshareResult } from '@/__generated__/graphql';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
interface UserMindshareTableProps {
  selectedUser: MindshareResult;
  isLoading: boolean;
}

// Common styles
const commonCellStyles = {
  fontSize: 12,
  borderBottom: '1px solid rgba(255,255,255,0.1)',
};

const headerCellStyles = {
  ...commonCellStyles,
  color: 'rgba(255,255,255,0.7)',
};

const bodyCellStyles = {
  ...commonCellStyles,
  color: 'rgba(255,255,255,0.9)',
};

const deltaStyles = (value: number | undefined) => ({
  ...commonCellStyles,
  color: value && value < 0 ? '#ff4d4d' : '#4ade80',
});

export const UserMindshareTable: React.FC<UserMindshareTableProps> = ({
  selectedUser,
  isLoading,
}) => {
  return (
    <Table
      size="small"
      sx={{
        mb: 3,
        '& .MuiTableCell-root': {
          py: 1,
          px: 1,
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell sx={headerCellStyles}>Period</TableCell>
          <TableCell align="right" sx={headerCellStyles}>
            MindShare
          </TableCell>
          <TableCell align="right" sx={headerCellStyles}>
            Δ bps
          </TableCell>
          <TableCell align="right" sx={headerCellStyles}>
            Δ %
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading ? (
          <TableSkeleton includeAvatar={false} rows={4} columns={4} isDark={true} />
        ) : (
          <>
            <TableRow>
              <TableCell sx={bodyCellStyles}>Current</TableCell>
              <TableCell align="right" sx={bodyCellStyles}>
                {(selectedUser?.currentMindshare * 100).toFixed(2)}%
              </TableCell>
              <TableCell align="right" sx={bodyCellStyles}>
                -
              </TableCell>
              <TableCell align="right" sx={bodyCellStyles}>
                -
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={bodyCellStyles}>3D</TableCell>
              <TableCell align="right" sx={bodyCellStyles}>
                {(selectedUser?.last3dMindshare * 100).toFixed(2)}%
              </TableCell>
              <TableCell align="right" sx={deltaStyles(selectedUser?.change3d)}>
                {selectedUser?.change3d > 0 ? '↑' : '↓'}{' '}
                {Math.abs(selectedUser?.change3d || 0).toFixed(0)}bps
              </TableCell>
              <TableCell align="right" sx={deltaStyles(selectedUser?.changeRatio3d)}>
                {selectedUser?.changeRatio3d > 0 ? '↑' : '↓'}{' '}
                {Math.abs(selectedUser?.changeRatio3d || 0).toFixed(0)}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={bodyCellStyles}>7D</TableCell>
              <TableCell align="right" sx={bodyCellStyles}>
                {(selectedUser?.last7dMindshare * 100).toFixed(2)}%
              </TableCell>
              <TableCell align="right" sx={deltaStyles(selectedUser?.change7d)}>
                {selectedUser?.change7d > 0 ? '↑' : '↓'}{' '}
                {Math.abs(selectedUser?.change7d || 0).toFixed(0)}bps
              </TableCell>
              <TableCell align="right" sx={deltaStyles(selectedUser?.changeRatio7d)}>
                {selectedUser?.changeRatio7d > 0 ? '↑' : '↓'}{' '}
                {Math.abs(selectedUser?.changeRatio7d || 0).toFixed(0)}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={bodyCellStyles}>30D</TableCell>
              <TableCell align="right" sx={bodyCellStyles}>
                {(selectedUser?.last30dMindshare * 100).toFixed(2)}%
              </TableCell>
              <TableCell align="right" sx={deltaStyles(selectedUser?.change30d)}>
                {selectedUser?.change30d > 0 ? '↑' : '↓'}{' '}
                {Math.abs(selectedUser?.change30d || 0).toFixed(0)}bps
              </TableCell>
              <TableCell align="right" sx={deltaStyles(selectedUser?.changeRatio30d)}>
                {selectedUser?.changeRatio30d > 0 ? '↑' : '↓'}{' '}
                {Math.abs(selectedUser?.changeRatio30d || 0).toFixed(0)}%
              </TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </Table>
  );
};
