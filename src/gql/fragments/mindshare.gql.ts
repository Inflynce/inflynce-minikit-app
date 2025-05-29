import { gql } from '../../__generated__/gql';

export const UserInfoFragment = gql(/* GraphQL */ `
  fragment UserInfo on UserInfo {
    displayName
    fid
    followingCount
    followerCount
    isSmartUser
    neynarUserScore
    pfpUrl
    powerBadge
    username
  }
`);

export const DailyMindshareFragment = gql(/* GraphQL */ `
  fragment DailyMindshare on DailyMindshare {
    _time
    fid
    mindshare
  }
`);

export const MindshareDataFragment = gql(/* GraphQL */ `
  fragment MindshareResult on MindshareResult {
    change30d
    change7d
    change3d
    changeRatio30d
    changeRatio7d
    changeRatio3d
    currentMindshare
    fid
    last30dMindshare
    last7dMindshare
    last3dMindshare
    rank
    time
    userInfo {
      ...UserInfo
    }
    daily {
      ...DailyMindshare
    }
    proUser {
      isPro
    }
  }
`);
