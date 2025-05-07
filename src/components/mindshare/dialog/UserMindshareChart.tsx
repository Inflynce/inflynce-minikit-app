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
import { MindshareResult, DailyMindshare } from '@/__generated__/graphql';
import { schletonColor } from '@/utils/color';

interface UserMindshareChartProps {
  selectedUser: MindshareResult;
  isLoading: boolean;
}

const strokeColor = 'rgba(255,255,255,0.5)';

function fillMissingMindshare(data: any[], days = 30) {
  const resultMap = new Map(
    data.map((entry) => [entry._time.slice(0, 10), entry])
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
        _time: isoDate + 'T00:00:00Z',
        fid: null,
        mindshare: 0,
      });
    }
  }

  return filled;
}

export const UserMindshareChart: React.FC<UserMindshareChartProps> = ({
  selectedUser,
  isLoading,
}) => {

  console.log(selectedUser?.daily);

  const filledData = fillMissingMindshare(selectedUser?.daily || []);
  console.log(filledData);

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
              dataKey="_time"
              tickFormatter={(time) => {
                const date = new Date(time);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
              stroke={strokeColor}
              fontSize={12}
            />
            <YAxis
              tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
              stroke={strokeColor}
              fontSize={12}
            />
            <Tooltip
              formatter={(value: number) => `${(value * 100).toFixed(2)}%`}
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
            <ReferenceLine
              y={selectedUser?.currentMindshare || 0}
              stroke={THEME.accent}
              strokeDasharray="3 3"
              label={{
                value: 'Current',
                position: 'right',
                fill: THEME.accent,
                fontSize: 12,
              }}
            />
            <Bar dataKey="mindshare" fill="url(#barGradient)" radius={[4, 4, 0, 0]}>
              {filledData?.map((entry: DailyMindshare, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    (entry.mindshare ?? 0) >= (selectedUser?.currentMindshare || 0)
                      ? THEME.success.base
                      : THEME.danger.base
                  }
                  opacity={0.8}
                />
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
