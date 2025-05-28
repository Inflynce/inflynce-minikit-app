import { Avatar, Stack, Typography } from '@mui/material';
import InfoMenu from '@/components/common/InfoMenu';
import VoteCountdown from '@/components/vote/VoteCountdown';
import { getCurrentWeekStart } from '@/utils/dateUtils';
import { useRouter } from 'next/navigation';
import { PointsChip, PointsEarnedTodayChip } from '@/components/user/PointsChip';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
interface HeaderProps {
  title?: string;
  showVoteCountdown?: boolean;
  showInfoMenu?: boolean;
  showAvatar?: boolean;
  showTitle?: boolean;
  showTotalPoints?: boolean;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  showPointsEarnedToday?: boolean;
  showTitleInfo?: boolean;
  infoContent?: React.ReactNode;
}

const Header = ({
  title = 'MindShare',
  showVoteCountdown = false,
  showInfoMenu = true,
  showAvatar = false,
  showTitle = false,
  showTotalPoints = true,
  showTitleInfo = false,
  infoContent,
  rightContent,
  leftContent,
  showPointsEarnedToday = false,
}: HeaderProps) => {
  const router = useRouter();
  const { context } = useMiniKit();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      py={1}
      px={1}
      sx={{
        background: '#121212',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1002,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {showAvatar && (
          <Avatar
            sx={{
              width: 24,
              height: 24,
              cursor: 'pointer',
            }}
            src={context?.user?.pfpUrl}
            onClick={() => router.push(`/profile/${context?.user?.fid}`)}
          />
        )}
        {leftContent}
        {showTotalPoints && <PointsChip fid={context?.user?.fid ?? 0} />}
        {showPointsEarnedToday && <PointsEarnedTodayChip fid={context?.user?.fid ?? 0} />}
        {showTitle && (
          <Typography variant="h1" fontSize={18} fontWeight={600} color="#fff">
            {title}
            {showTitleInfo && infoContent}
          </Typography>
        )}
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2}>
        {rightContent}
        {showVoteCountdown && (
          <VoteCountdown weekStart={getCurrentWeekStart()} status="open" isDarkMode={true} />
        )}
        {showInfoMenu && <InfoMenu />}
      </Stack>
    </Stack>
  );
};

export default Header;
