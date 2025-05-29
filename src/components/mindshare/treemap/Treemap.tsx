/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { GetTopMindshareQueryOptions } from '@/queryFn/getTopMindshare';
import { MINDSHARE_DURATION, MINDSHARE_FIELDS } from '@/utils/constants';
import { Treemap, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { UserDialog } from '../dialog/UserDialog';
import * as d3 from 'd3';
import MindshareTreemapSkeleton from '@/components/skeleton/MindshareTreemapSkeleton';
import { useRouter } from 'next/navigation';

export const THEME = {
  // Base colors
  primary: '#000000', // Pure black background
  secondary: '#1a1a1a', // Very dark gray

  // Status colors - Graduated
  success: {
    light: '#34d399', // Light emerald
    base: '#059669', // Base emerald
    dark: '#065f46', // Dark emerald
  },
  danger: {
    light: '#f87171', // Light red
    base: '#dc2626', // Base red
    dark: '#991b1b', // Dark red
  },

  // Medal colors
  gold: '#f59e0b', // Gold
  silver: '#9ca3af', // Silver
  bronze: '#ea580c', // Bronze

  // Text colors
  textPrimary: '#ffffff', // Pure white
  textSecondary: '#94a3b8', // Cool gray
  accent: '#0ea5e9', // Bright blue

  // Border color
  border: 'rgba(255, 255, 255, 0.1)',
};

export const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return THEME.gold;
    case 2:
      return THEME.silver;
    case 3:
      return THEME.bronze;
    default:
      return THEME.border;
  }
};

export const getRankSize = (rank: number) => {
  switch (rank) {
    case 1:
      return 22; // Largest for rank 1
    case 2:
      return 18; // Slightly smaller for rank 2
    case 3:
      return 14; // Smallest for rank 3
    default:
      return 20;
  }
};

export const getBackgroundColor = (
  size: number,
  currentMindshare: number,
  duration: string,
  data: any
) => {
  let percentChange = 0;
  if (duration === MINDSHARE_DURATION.ONE) {
    percentChange = currentMindshare > 0 ? (data.last3dMindshare - size) / currentMindshare : 0;
  } else {
    percentChange = currentMindshare > 0 ? (size - currentMindshare) / currentMindshare : 0;
  }

  // Dark theme with burgundy/maroon and teal/green colors
  if (percentChange > 0) {
    // Burgundy/maroon for decreases
    if (percentChange > 0.1) return '#7D2E46'; // Deep burgundy for significant decrease
    if (percentChange > 0.05) return '#8D3F57'; // Medium burgundy for moderate decrease
    return '#9D4F67'; // Light burgundy for slight decrease
  } else {
    // Teal/green for increases
    if (percentChange < -0.1) return '#1D6A64'; // Deep teal for significant increase
    if (percentChange < -0.05) return '#2D7A74'; // Medium teal for moderate increase
    return '#3D8A84'; // Light teal for slight increase
  }
};

const CustomizedContent = (props: any) => {
  const { x, y, width, height, name, data, size, depth, onItemClick, duration } = props;
  const { pfpUrl, username, fid } = data?.userInfo || {};
  const mindshare = (size * 100).toFixed(2);
  const currentMindshare = data?.currentMindshare || 0;
  const rank = data?.rank;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!data?.daily || !svgRef.current) return;

    const chartData = data.daily.map((d: any) => ({
      mindshare: d.mindshare ? d.mindshare : 0,
      time: new Date(d._time),
    }));

    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = 40 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', 40)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3
      .scaleTime()
      // @ts-expect-error d3 types are not compatible with typescript
      .domain(d3.extent(chartData, (d) => d.time) as [Date, Date])
      .range([0, innerWidth]);

    // Y scale
    const y = d3
      .scaleLinear()
      // @ts-expect-error d3 types are not compatible with typescript
      .domain([0, d3.max(chartData, (d) => d.mindshare) || 0])
      .range([innerHeight, 0]);

    // Add the line
    svg
      .append('path')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line<any>()
          .x((d) => x(d.time))
          .y((d) => y(d.mindshare))
          .curve(d3.curveBasis)
      );
  }, []);

  // Get text color based on rank
  const getTextColor = () => {
    switch (rank) {
      case 1:
        return THEME.gold;
      case 2:
        return THEME.silver;
      case 3:
        return THEME.bronze;
      default:
        return THEME.textPrimary;
    }
  };

  // Get border styling based on rank
  const getBorderStyle = () => {
    // if (rank <= 3) {
    //   return {
    //     stroke: getRankColor(rank),
    //     strokeWidth: 1, // Thicker border for top 3
    //   };
    // }
    return {
      stroke: THEME.border,
      strokeWidth: 1,
    };
  };

  const borderStyle = getBorderStyle();

  const handleNameClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (username) {
      router.push(`/profile/${fid}`);
    }
  };

  const handleRectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onItemClick?.(data);
  };

  if (depth === 0) {
    return;
  }

  return (
    <>
      <g transform={`translate(${x},${y})`} className="recharts-layer recharts-treemap-rectangle">
        <rect
          width={width - 1}
          height={height - 1}
          x={1}
          y={1}
          fill={getBackgroundColor(size, currentMindshare, duration, data)}
          stroke={borderStyle.stroke}
          strokeWidth={borderStyle.strokeWidth}
          rx={6}
          ry={6}
          style={{ cursor: 'pointer' }}
          onClick={handleRectClick}
        />
        {/* Profile Picture */}
        {pfpUrl && (
          <image
            href={pfpUrl}
            x={4}
            y={4}
            style={{ cursor: 'pointer' }}
            width={20}
            height={20}
            clipPath="circle()"
            onClick={handleNameClick}
          />
        )}
        {/* User Name with ellipsis */}
        <foreignObject x={28} y={4} width={width - 28} height={24}>
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '12px',
              color: THEME.textPrimary,
              cursor: 'pointer',
            }}
            onClick={handleNameClick}
          >
            {name}
          </div>
        </foreignObject>
        {/* Mindshare Percentage */}
        <foreignObject
          x={28}
          y={20}
          width={width - 28}
          height={24}
          // fill={rank <= 3 ? getTextColor() : THEME.textPrimary}
          // fontSize={10}
          // fontWeight="bold"
        >
          <div style={{ fontSize: '10px', color: THEME.textPrimary }}>{mindshare}%</div>
          {/* {mindshare}% */}
        </foreignObject>
        {/* Ranking Badge */}
        {data?.rank <= 3 && (
          <g transform={`translate(${28}, ${36})`}>
            <svg
              width={getRankSize(data.rank)}
              height={getRankSize(data.rank)}
              viewBox="0 0 24 24"
              fill={getRankColor(data.rank)}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} // Added shadow for trophy
            >
              <path
                fillRule="evenodd"
                d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                clipRule="evenodd"
              />
            </svg>
          </g>
        )}
        {/* New SVG for chartData using D3 */}
        <g transform={`translate(${0}, ${height - 32})`}>
          <svg ref={svgRef} width="100%" height={32} />
        </g>
        {/* Pro User Badge */}
        {data.proUser && (
          <g transform={`translate(${18}, ${18})`}>
            <svg
              width="8"
              height="8"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'scale(0.8)' }} // This will make the badge slightly smaller
            >
              <path
                className="stroke-white dark:stroke-[#17101f]"
                id="badge"
                fill="#7c65c1"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 17 9 C 16.984699 8.44998 16.8169 7.914431 16.5147 7.45381 C 16.297401 7.122351 16.016399 6.83868 15.6895 6.61875 C 15.4741 6.47382 15.3639 6.206079 15.4143 5.9514 C 15.4908 5.56531 15.4893 5.16623 15.4095 4.777781 C 15.298 4.23797 15.0375 3.74074 14.6586 3.34142 C 14.2584 2.96254 13.762 2.70285 13.2222 2.59046 C 12.8341 2.51075 12.4353 2.5092 12.0495 2.5855 C 11.7944 2.63594 11.5263 2.52522 11.3816 2.30924 C 11.1622 1.982038 10.87893 1.700779 10.54704 1.48361 C 10.08642 1.182205 9.55087 1.013622 9 1 C 8.44998 1.014473 7.91613 1.181355 7.45636 1.48361 C 7.12562 1.701042 6.84379 1.981922 6.62575 2.30818 C 6.4811 2.52463 6.21278 2.6359 5.95742 2.58524 C 5.57065 2.50851 5.17062 2.50951 4.78118 2.59046 C 4.24053 2.70115 3.74244 2.96169 3.34227 3.34142 C 2.96339 3.74159 2.70456 4.23968 2.59472 4.77863 C 2.51504 5.16661 2.51478 5.56517 2.59204 5.9505 C 2.64317 6.20557 2.53289 6.47402 2.31683 6.618879 C 1.98923 6.83852 1.707141 7.12164 1.488719 7.45296 C 1.185611 7.91273 1.016177 8.44913 1 9 C 1.017028 9.55087 1.185611 10.08642 1.488719 10.54704 C 1.70699 10.87813 1.988839 11.1615 2.31614 11.381 C 2.53242 11.5261 2.64304 11.7948 2.59191 12.0501 C 2.51478 12.4353 2.51509 12.8336 2.59472 13.2214 C 2.70541 13.7612 2.96339 14.2584 3.34142 14.6586 C 3.74159 15.0358 4.23882 15.2946 4.77778 15.4061 C 5.16676 15.4872 5.56638 15.4885 5.95297 15.4125 C 6.2069 15.3626 6.4733 15.473 6.61752 15.6879 C 6.8374 16.015499 7.12119 16.2973 7.45381 16.515499 C 7.91358 16.8169 8.44998 16.984699 9 17 C 9.55087 16.986401 10.08642 16.8186 10.54704 16.5172 C 10.87568 16.3022 11.1566 16.023899 11.3751 15.7008 C 11.5233 15.4816 11.7988 15.3721 12.0576 15.4274 C 12.4412 15.5093 12.8397 15.5111 13.2273 15.4308 C 13.7688 15.3184 14.2661 15.0502 14.6577 14.6586 C 15.0494 14.2669 15.3184 13.7697 15.4308 13.2273 C 15.5112 12.8397 15.5093 12.4411 15.427 12.0575 C 15.3716 11.7987 15.4806 11.5231 15.6997 11.3745 C 16.022301 11.1558 16.2999 10.87482 16.515499 10.54619 C 16.8169 10.08642 16.984699 9.55002 17 9 Z M 12.1286 6.46597"
              />
              <path
                id="checkmark"
                fill="#ffffff"
                fillRule="evenodd"
                stroke="none"
                d="M 5.48206 8.829732 C 5.546341 8.757008 6.096026 8.328334 6.590207 8.831891 C 6.990357 9.239633 7.80531 10.013605 7.80531 10.013605 C 7.80531 10.013605 10.326332 7.31631 11.011629 6.559397 C 11.320887 6.21782 11.875775 6.239667 12.135474 6.515033 C 12.411443 6.807649 12.489538 7.230008 12.164574 7.601331 C 10.947777 8.991708 9.508716 10.452277 8.3795 11.706156 C 8.11062 12.004721 7.595459 12.008714 7.302509 11.735093 C 7.061394 11.509888 6.005327 10.437536 5.502547 9.931531 C 5.003333 9.429114 5.404643 8.887831 5.48206 8.829732 Z"
              />
            </svg>
          </g>
        )}
      </g>
    </>
  );
};

export interface MindshareTreemapProps {
  width?: string;
  height?: string;
  minHeight?: number;
  color?: {
    title?: string;
  };
  duration?: string;
}

export const MindshareTreemap = ({
  width = '100%',
  height = '100%',
  minHeight = 300,
  duration = MINDSHARE_DURATION.ONE,
}: MindshareTreemapProps) => {
  // const [duration, setDuration] = useState(MINDSHARE_DURATION.THREE);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleItemClick = (userData: any) => {
    setSelectedUser(userData);
    setOpen(true);
  };

  const { data, isLoading, isError } = useQuery(
    GetTopMindshareQueryOptions({
      keys: [MINDSHARE_FIELDS.MINDSHARE, duration, 'desc'],
      variables: {
        duration: duration,
        field: MINDSHARE_FIELDS.MINDSHARE,
        limit: 24,
        skip: 0,
        desc: true,
      },
    })
  );

  const renderContent = () => {
    if (isLoading) {
      return <MindshareTreemapSkeleton />;
    }

    if (isError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <h4 className="text-red-500">Error fetching mindshare data.</h4>
        </div>
      );
    }

    const size =
      duration === MINDSHARE_DURATION.ONE ? 'currentMindshare' : `last${duration}dMindshare`;
    const formattedData =
      data?.map((user: any) => ({
        name: user?.userInfo?.displayName || 'Unknown',
        size: user[size] || 0,
        data: user,
      })) || [];

    return (
      <ResponsiveContainer width={width} height={height} minHeight={minHeight}>
        <Treemap
          data={formattedData}
          aspectRatio={1}
          dataKey="size"
          nameKey="name"
          stroke="#fff"
          isAnimationActive={false}
          content={<CustomizedContent onItemClick={handleItemClick} duration={duration} />}
        />
      </ResponsiveContainer>
    );
  };

  return (
    <Box width="100%" height="100%">
      {renderContent()}
      <UserDialog
        open={open}
        onClose={handleClose}
        userInfo={selectedUser?.userInfo}
        userMindshare={selectedUser}
      />
    </Box>
  );
};
