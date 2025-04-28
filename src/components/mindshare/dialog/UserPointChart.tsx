import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
  CartesianGrid,
} from 'recharts';
import { Box, Skeleton } from '@mui/material';
import { THEME } from '@/components/mindshare/treemap/Treemap';
import { Point_Transactions } from '@/__generated__/graphql';
import { schletonColor } from '@/utils/color';
import {
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { GetPointTransactionsByFidInfiniteQueryOptions } from '@/queryFn/getPointTransactionByFid';
import { POINT_TRANSACTION_TYPE } from '@/utils/constants';

interface UserPointChartProps {
  fid: string;
}

const strokeColor = 'rgba(255,255,255,0.5)';

export const UserPointChart: React.FC<UserPointChartProps> = ({ fid }) => {
  const { data, isLoading } = useInfiniteQuery(
    GetPointTransactionsByFidInfiniteQueryOptions({
      keys: [fid.toString()],
      variables: { fid: fid.toString(), type: POINT_TRANSACTION_TYPE.DAILY, limit: 30 },
      options: { enabled: !!fid },
    })
  ) as unknown as DefinedUseInfiniteQueryResult<InfiniteData<Point_Transactions[]>>;

  const items = data?.pages.flatMap((page: Point_Transactions[]) => page) || [];

  return (
    <Box
      height={200}
      sx={{
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 2,
        mt: 2,
      }}
    >
      {isLoading ? (
        <Skeleton variant="rounded" height={180} sx={{ bgcolor: schletonColor }} />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={items.reverse()}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                const formattedDate = new Date(date);
                return `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}`;
              }}
              stroke={strokeColor}
              fontSize={12}
            />
            <YAxis tickFormatter={(value) => value} stroke={strokeColor} fontSize={12} />
            <Tooltip
              formatter={(value: number) => value}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
              contentStyle={{
                background: 'rgba(26,26,46,0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
                padding: '8px',
              }}
            />
            {/* <ReferenceLine
              y={selectedUser?.currentMindshare || 0}
              stroke={THEME.accent}
              strokeDasharray="3 3"
              label={{
                value: 'Current',
                position: 'right',
                fill: THEME.accent,
                fontSize: 12,
              }}
            /> */}
            <Bar dataKey="points" fill="url(#barGradient)" radius={[4, 4, 0, 0]}>
              {items.map((entry: Point_Transactions, index: number) => (
                <Cell key={`cell-${index}`} fill={THEME.success.base} opacity={0.8} />
              ))}
            </Bar>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={THEME.accent} stopOpacity={0.8} />
                <stop offset="100%" stopColor={THEME.accent} stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};
