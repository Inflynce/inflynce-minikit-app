import { Avatar, styled } from '@mui/material';
import { Badge } from '@mui/material';

interface BadgeAvatarProps {
  isPro: boolean;
  avatarUrl: string;
  displayName: string;
  smallAvatarSize?: number;
  avatarSize?: number;
}

export const BadgeAvatar = ({
  isPro,
  avatarUrl,
  displayName,
  smallAvatarSize = 20,
  avatarSize = 40,
}: BadgeAvatarProps) => {
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: smallAvatarSize,
    height: smallAvatarSize,
  }));

  if (!isPro) {
    return (
      <Avatar alt={displayName} src={avatarUrl} sx={{ width: avatarSize, height: avatarSize }} />
    );
  }

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={<SmallAvatar alt="Pro user" src="/pro_user.svg" />}
    >
      <Avatar alt={displayName} src={avatarUrl} sx={{ width: avatarSize, height: avatarSize }} />
    </Badge>
  );
};
