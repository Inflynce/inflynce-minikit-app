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
import { useQuery } from '@tanstack/react-query';
import { GetPointTransactionByFidAndDirectionDateRangeQueryOptions } from '@/queryFn/getPointTransactionByFid';
import { POINT_TRANSACTION_DIRECTION } from '@/utils/constants';
import { groupBy } from 'lodash';

interface UserPointChartProps {
  fid: string;
}

const strokeColor = 'rgba(255,255,255,0.5)';

function fillMissingPoint(data: any[], days = 30) {
  const resultMap = new Map(
    data.map((entry) => [entry.date, entry])
  );

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today.setUTCDate(today.getUTCDate() - 1); // Start from yesterday

  const filled = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (days - 1 - i));
    const isoDate = date.toISOString().split('T')[0];

    if (resultMap.has(isoDate)) {
      filled.push(resultMap.get(isoDate));
    } else {
      filled.push({
        date: isoDate,
        points: 0,
      });
    }
  }

  return filled;
}

export const UserPointChart: React.FC<UserPointChartProps> = ({ fid }) => {
  const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
  const today = new Date();
  const { data, isLoading } = useQuery(
    GetPointTransactionByFidAndDirectionDateRangeQueryOptions({
      keys: [fid.toString()],
      variables: {
        fid: fid.toString(),
        direction: POINT_TRANSACTION_DIRECTION.EARN,
        startDate: thirtyDaysAgo.toISOString(),
        endDate: today.toISOString(),
      },
      options: { enabled: !!fid },
    })
  );

  const groupByDate: Record<string, Point_Transactions[]> = groupBy(data, 'date');

  const items = Object.entries(groupByDate).map(
    ([date, transactions]: [string, Point_Transactions[]]) => ({
      date,
      points: transactions.reduce((acc, curr) => acc + curr.points, 0),
    })
  );

  const filledData = fillMissingPoint(items);

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
          <BarChart data={filledData}>
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
              {filledData.map((entry, index: number) => (
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
