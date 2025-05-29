/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  mutation PostBoost(\n    $castUrl: String!\n    $creatorFid: String!\n    $txHash: String!\n    $mindshareFilterDuration: Int!\n    $minMindshare: numeric!\n    $campaignBudget: numeric!\n  ) {\n    insert_mindshare_boosts_one(\n      object: {\n        castUrl: $castUrl\n        creatorFid: $creatorFid\n        txHash: $txHash\n        mindshareFilterDuration: $mindshareFilterDuration\n        campaignBudget: $campaignBudget\n        minMindshare: $minMindshare\n      }\n    ) {\n      campaignBudget\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      minMindshare\n      mindshareFilterDuration\n      id\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n    }\n  }\n': typeof types.PostBoostDocument;
  '\n  query GetBoosts($limit: Int, $offset: Int) {\n    mindshare_boosts(\n      where: { boostStatus: { _eq: "active" } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      mindshareFilterDuration\n      id\n      minMindshare\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n      boostRecastRecords(limit: 5) {\n        recasterFid\n        user {\n          fid\n          pfpUrl\n          username\n          displayName\n        }\n      }\n      boostRecastRecords_aggregate {\n        aggregate {\n          count(columns: boostId)\n        }\n      }\n    }\n  }\n': typeof types.GetBoostsDocument;
  '\n  mutation VerifyBoostRecast($boostId: String!, $userId: String!, $address: String!) {\n    verifyBoostRecast(input: { boostId: $boostId, userId: $userId, address: $address }) {\n      status\n    }\n  }\n': typeof types.VerifyBoostRecastDocument;
  '\n  query GetBoostsByFid($fid: String!, $limit: Int, $offset: Int) {\n    mindshare_boosts(\n      where: { creatorFid: { _eq: $fid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      mindshareFilterDuration\n      id\n      minMindshare\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n      boostRecastRecords(limit: 5) {\n        user {\n          fid\n          pfpUrl\n          username\n          displayName\n        }\n      }\n      boostRecastRecords_aggregate {\n        aggregate {\n          count(columns: boostId)\n        }\n      }\n    }\n  }\n': typeof types.GetBoostsByFidDocument;
  '\n  query GetBoostRecastsByFid($recasterFid: String!, $limit: Int, $offset: Int) {\n    boost_recast_records(\n      where: { recasterFid: { _eq: $recasterFid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      id\n      transactionHash\n      recasterFid\n      earnedAmount\n      mindshareBoost {\n        minMindshare\n        mindshareFilterDuration\n        user {\n          displayName\n          username\n          fid\n          pfpUrl\n        }\n        boostStatus\n      }\n    }\n  }\n': typeof types.GetBoostRecastsByFidDocument;
  '\n  query GetBoostRecastsByBoostId($boostId: uuid!, $limit: Int, $offset: Int) {\n    boost_recast_records(\n      where: { boostId: { _eq: $boostId } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      recasterFid\n      createdAt\n      mindshare\n      user {\n        displayName\n        username\n        fid\n        pfpUrl\n      }\n    }\n  }\n': typeof types.GetBoostRecastsByBoostIdDocument;
  '\n  mutation InsertEarlyInflyncerNFTMindRecord($fid: String!, $address: String!, $tokenId: String!) {\n    insert_early_inflyncer_nft_mind_records_one(\n      object: { fid: $fid, address: $address, tokenId: $tokenId }\n    ) {\n      id\n      fid\n      address\n      tokenId\n      createdAt\n    }\n  }\n': typeof types.InsertEarlyInflyncerNftMindRecordDocument;
  '\n  query GetEarlyInflyncerNFTMindRecordByFid($fid: String!) {\n    early_inflyncer_nft_mind_records(where: { fid: { _eq: $fid } }) {\n      id\n      fid\n      address\n      tokenId\n      createdAt\n    }\n  }\n': typeof types.GetEarlyInflyncerNftMindRecordByFidDocument;
  '\n  fragment UserInfo on UserInfo {\n    displayName\n    fid\n    followingCount\n    followerCount\n    isSmartUser\n    neynarUserScore\n    pfpUrl\n    powerBadge\n    username\n  }\n': typeof types.UserInfoFragmentDoc;
  '\n  fragment DailyMindshare on DailyMindshare {\n    _time\n    fid\n    mindshare\n  }\n': typeof types.DailyMindshareFragmentDoc;
  '\n  fragment MindshareResult on MindshareResult {\n    change30d\n    change7d\n    change3d\n    changeRatio30d\n    changeRatio7d\n    changeRatio3d\n    currentMindshare\n    fid\n    last30dMindshare\n    last7dMindshare\n    last3dMindshare\n    rank\n    time\n    userInfo {\n      ...UserInfo\n    }\n    daily {\n      ...DailyMindshare\n    }\n    proUser {\n      isPro\n    }\n  }\n': typeof types.MindshareResultFragmentDoc;
  '\n  query GetCryptoPrice($coinId: String!, $currency: String!) {\n    getCryptoPrice(input: { coinId: $coinId, currency: $currency }) {\n      phavercoin {\n        usd\n      }\n    }\n  }\n': typeof types.GetCryptoPriceDocument;
  '\n  query GetMindshareByFid($fid: String!) {\n    getMindshareByFid(input: { fid: $fid }) {\n      ...MindshareResult\n    }\n  }\n': typeof types.GetMindshareByFidDocument;
  '\n  fragment PointTransactionFields on point_transactions {\n    date\n    createdAt\n    direction\n    fid\n    id\n    mindshare\n    points\n    reason\n    type\n    usdcAmount\n    userTask {\n      task {\n        title\n      }\n    }\n  }\n': typeof types.PointTransactionFieldsFragmentDoc;
  '\n  query GetPointTransactionByFid($fid: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n': typeof types.GetPointTransactionByFidDocument;
  '\n  query GetPointTransactionByFidAndType($fid: String!, $type: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      order_by: { createdAt: desc }\n      where: { fid: { _eq: $fid }, type: { _eq: $type } }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n': typeof types.GetPointTransactionByFidAndTypeDocument;
  '\n  query GetPointTransactionByFidAndDirectionAndDate(\n    $fid: String!\n    $direction: String!\n    $date: date!\n  ) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, direction: { _eq: $direction }, date: { _eq: $date } }\n      order_by: { createdAt: desc }\n    ) {\n      date\n      createdAt\n      direction\n      fid\n      id\n      mindshare\n      points\n      reason\n      type\n    }\n  }\n': typeof types.GetPointTransactionByFidAndDirectionAndDateDocument;
  '\n  query GetPointTransactionByFidAndDirection(\n    $fid: String!\n    $direction: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, direction: { _eq: $direction } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n': typeof types.GetPointTransactionByFidAndDirectionDocument;
  '\n  query GetPointTransactionByFidAndDirectionDateRange(\n    $fid: String!\n    $direction: String!\n    $startDate: date!\n    $endDate: date!\n    $limit: Int\n    $offset: Int\n  ) {\n    point_transactions(\n      where: {\n        fid: { _eq: $fid }\n        direction: { _eq: $direction }\n        date: { _gte: $startDate, _lte: $endDate }\n      }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n': typeof types.GetPointTransactionByFidAndDirectionDateRangeDocument;
  '\n  query GetPointsByFid($fid: String!) {\n    user_points_by_pk(fid: $fid) {\n      fid\n      totalPoints\n    }\n  }\n': typeof types.GetPointsByFidDocument;
  '\n  query GetLeaderboard($limit: Int!, $offset: Int!) {\n    user_points(order_by: { totalPoints: desc }, limit: $limit, offset: $offset) {\n      fid\n      totalPoints\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n        isSmartUser\n        proUser {\n          isPro\n        }\n      }\n    }\n  }\n': typeof types.GetLeaderboardDocument;
  '\n  query GetUserTasks($userId: String!, $limit: Int!, $offset: Int, $date: date!) {\n    user_tasks(\n      where: { userId: { _eq: $userId }, date: { _eq: $date } }\n      limit: $limit\n      offset: $offset\n    ) {\n      completed\n      date\n      id\n      progress\n      taskId\n      userId\n      task {\n        title\n        target\n        rewardIp\n        isActive\n        taskOrder\n        description\n        taskType {\n          id\n          name\n        }\n        actionType {\n          id\n          name\n        }\n      }\n    }\n  }\n': typeof types.GetUserTasksDocument;
  '\n  query GetTopMindshare(\n    $duration: String!\n    $field: String!\n    $limit: Int!\n    $skip: Int!\n    $desc: Boolean!\n  ) {\n    getTopMindshare(\n      input: { duration: $duration, field: $field, limit: $limit, skip: $skip, desc: $desc }\n    ) {\n      ...MindshareResult\n    }\n  }\n': typeof types.GetTopMindshareDocument;
  '\n  query GetUserRank($fid: String!) {\n    user_rank_view(where: { fid: { _eq: $fid } }) {\n      fid\n      rank\n      totalPoints\n    }\n  }\n': typeof types.GetUserRankDocument;
  '\n  query GetVoteAggregates($snapshotId: uuid!) {\n    upvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    upvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n  }\n': typeof types.GetVoteAggregatesDocument;
  '\n  query GetVoteByVoter($voterId: String!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {voterId: {_eq: $voterId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      voterId\n      voteType\n      status\n      amount\n      createdAt\n      voteSnapshot {\n        id\n        fid\n        weekStart\n        updatedAt\n        status\n        mindshare\n        createdAt\n        user {\n          fid\n          displayName\n          username\n          pfpUrl\n        }\n      }\n    }\n  }\n': typeof types.GetVoteByVoterDocument;
  '\n  query GetVoteHistory($targetSnapshotId: uuid!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {targetSnapshotId: {_eq: $targetSnapshotId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      createdAt\n      amount\n      targetSnapshotId\n      voteType\n      voter {\n        fid\n        displayName\n        pfpUrl\n        username\n      }\n    }\n  }\n': typeof types.GetVoteHistoryDocument;
  '\n  query GetVoteSnapshot(\n    $limit: Int!\n    $offset: Int\n    $order_by: [vote_snapshot_order_by!]\n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: {\n        weekStart: {_eq: $weekStart}\n        mindshare: {_gte: 0.0001}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n': typeof types.GetVoteSnapshotDocument;
  '\n  query GetVoteSnapshotByFid(\n    $fid: String!, \n    $status: String = "open"\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        status: {_eq: $status}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n': typeof types.GetVoteSnapshotByFidDocument;
  '\n  query GetVoteSnapshotByFidAndWeek(\n    $fid: String!, \n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        weekStart: {_eq: $weekStart}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n': typeof types.GetVoteSnapshotByFidAndWeekDocument;
  '\n  mutation PostNotificationToken($userId: String!, $url: String!, $token: String!) {\n    insert_user_notification_tokens(\n      objects: { userId: $userId, url: $url, token: $token }\n      on_conflict: { constraint: user_notification_tokens_pkey }\n    ) {\n      affected_rows\n      returning {\n        id\n        token\n        url\n        userId\n        createdAt\n        updatedAt\n        provider\n      }\n    }\n  }\n': typeof types.PostNotificationTokenDocument;
  '\n  mutation PostTasks($userId: String!) {\n    postTasks(input: { userId: $userId }) {\n      status\n    }\n  }\n': typeof types.PostTasksDocument;
  '\n  mutation PostVote($input: PostVoteInput!) {\n    postVote(input: $input) {\n      status\n    }\n  }\n': typeof types.PostVoteDocument;
  '\n  mutation UpdateTask($taskId: String!) {\n    updateTask(input: { taskId: $taskId }) {\n      status\n    }\n  }\n': typeof types.UpdateTaskDocument;
};
const documents: Documents = {
  '\n  mutation PostBoost(\n    $castUrl: String!\n    $creatorFid: String!\n    $txHash: String!\n    $mindshareFilterDuration: Int!\n    $minMindshare: numeric!\n    $campaignBudget: numeric!\n  ) {\n    insert_mindshare_boosts_one(\n      object: {\n        castUrl: $castUrl\n        creatorFid: $creatorFid\n        txHash: $txHash\n        mindshareFilterDuration: $mindshareFilterDuration\n        campaignBudget: $campaignBudget\n        minMindshare: $minMindshare\n      }\n    ) {\n      campaignBudget\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      minMindshare\n      mindshareFilterDuration\n      id\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n    }\n  }\n':
    types.PostBoostDocument,
  '\n  query GetBoosts($limit: Int, $offset: Int) {\n    mindshare_boosts(\n      where: { boostStatus: { _eq: "active" } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      mindshareFilterDuration\n      id\n      minMindshare\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n      boostRecastRecords(limit: 5) {\n        recasterFid\n        user {\n          fid\n          pfpUrl\n          username\n          displayName\n        }\n      }\n      boostRecastRecords_aggregate {\n        aggregate {\n          count(columns: boostId)\n        }\n      }\n    }\n  }\n':
    types.GetBoostsDocument,
  '\n  mutation VerifyBoostRecast($boostId: String!, $userId: String!, $address: String!) {\n    verifyBoostRecast(input: { boostId: $boostId, userId: $userId, address: $address }) {\n      status\n    }\n  }\n':
    types.VerifyBoostRecastDocument,
  '\n  query GetBoostsByFid($fid: String!, $limit: Int, $offset: Int) {\n    mindshare_boosts(\n      where: { creatorFid: { _eq: $fid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      mindshareFilterDuration\n      id\n      minMindshare\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n      boostRecastRecords(limit: 5) {\n        user {\n          fid\n          pfpUrl\n          username\n          displayName\n        }\n      }\n      boostRecastRecords_aggregate {\n        aggregate {\n          count(columns: boostId)\n        }\n      }\n    }\n  }\n':
    types.GetBoostsByFidDocument,
  '\n  query GetBoostRecastsByFid($recasterFid: String!, $limit: Int, $offset: Int) {\n    boost_recast_records(\n      where: { recasterFid: { _eq: $recasterFid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      id\n      transactionHash\n      recasterFid\n      earnedAmount\n      mindshareBoost {\n        minMindshare\n        mindshareFilterDuration\n        user {\n          displayName\n          username\n          fid\n          pfpUrl\n        }\n        boostStatus\n      }\n    }\n  }\n':
    types.GetBoostRecastsByFidDocument,
  '\n  query GetBoostRecastsByBoostId($boostId: uuid!, $limit: Int, $offset: Int) {\n    boost_recast_records(\n      where: { boostId: { _eq: $boostId } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      recasterFid\n      createdAt\n      mindshare\n      user {\n        displayName\n        username\n        fid\n        pfpUrl\n      }\n    }\n  }\n':
    types.GetBoostRecastsByBoostIdDocument,
  '\n  mutation InsertEarlyInflyncerNFTMindRecord($fid: String!, $address: String!, $tokenId: String!) {\n    insert_early_inflyncer_nft_mind_records_one(\n      object: { fid: $fid, address: $address, tokenId: $tokenId }\n    ) {\n      id\n      fid\n      address\n      tokenId\n      createdAt\n    }\n  }\n':
    types.InsertEarlyInflyncerNftMindRecordDocument,
  '\n  query GetEarlyInflyncerNFTMindRecordByFid($fid: String!) {\n    early_inflyncer_nft_mind_records(where: { fid: { _eq: $fid } }) {\n      id\n      fid\n      address\n      tokenId\n      createdAt\n    }\n  }\n':
    types.GetEarlyInflyncerNftMindRecordByFidDocument,
  '\n  fragment UserInfo on UserInfo {\n    displayName\n    fid\n    followingCount\n    followerCount\n    isSmartUser\n    neynarUserScore\n    pfpUrl\n    powerBadge\n    username\n  }\n':
    types.UserInfoFragmentDoc,
  '\n  fragment DailyMindshare on DailyMindshare {\n    _time\n    fid\n    mindshare\n  }\n':
    types.DailyMindshareFragmentDoc,
  '\n  fragment MindshareResult on MindshareResult {\n    change30d\n    change7d\n    change3d\n    changeRatio30d\n    changeRatio7d\n    changeRatio3d\n    currentMindshare\n    fid\n    last30dMindshare\n    last7dMindshare\n    last3dMindshare\n    rank\n    time\n    userInfo {\n      ...UserInfo\n    }\n    daily {\n      ...DailyMindshare\n    }\n    proUser {\n      isPro\n    }\n  }\n':
    types.MindshareResultFragmentDoc,
  '\n  query GetCryptoPrice($coinId: String!, $currency: String!) {\n    getCryptoPrice(input: { coinId: $coinId, currency: $currency }) {\n      phavercoin {\n        usd\n      }\n    }\n  }\n':
    types.GetCryptoPriceDocument,
  '\n  query GetMindshareByFid($fid: String!) {\n    getMindshareByFid(input: { fid: $fid }) {\n      ...MindshareResult\n    }\n  }\n':
    types.GetMindshareByFidDocument,
  '\n  fragment PointTransactionFields on point_transactions {\n    date\n    createdAt\n    direction\n    fid\n    id\n    mindshare\n    points\n    reason\n    type\n    usdcAmount\n    userTask {\n      task {\n        title\n      }\n    }\n  }\n':
    types.PointTransactionFieldsFragmentDoc,
  '\n  query GetPointTransactionByFid($fid: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n':
    types.GetPointTransactionByFidDocument,
  '\n  query GetPointTransactionByFidAndType($fid: String!, $type: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      order_by: { createdAt: desc }\n      where: { fid: { _eq: $fid }, type: { _eq: $type } }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n':
    types.GetPointTransactionByFidAndTypeDocument,
  '\n  query GetPointTransactionByFidAndDirectionAndDate(\n    $fid: String!\n    $direction: String!\n    $date: date!\n  ) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, direction: { _eq: $direction }, date: { _eq: $date } }\n      order_by: { createdAt: desc }\n    ) {\n      date\n      createdAt\n      direction\n      fid\n      id\n      mindshare\n      points\n      reason\n      type\n    }\n  }\n':
    types.GetPointTransactionByFidAndDirectionAndDateDocument,
  '\n  query GetPointTransactionByFidAndDirection(\n    $fid: String!\n    $direction: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, direction: { _eq: $direction } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n':
    types.GetPointTransactionByFidAndDirectionDocument,
  '\n  query GetPointTransactionByFidAndDirectionDateRange(\n    $fid: String!\n    $direction: String!\n    $startDate: date!\n    $endDate: date!\n    $limit: Int\n    $offset: Int\n  ) {\n    point_transactions(\n      where: {\n        fid: { _eq: $fid }\n        direction: { _eq: $direction }\n        date: { _gte: $startDate, _lte: $endDate }\n      }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n':
    types.GetPointTransactionByFidAndDirectionDateRangeDocument,
  '\n  query GetPointsByFid($fid: String!) {\n    user_points_by_pk(fid: $fid) {\n      fid\n      totalPoints\n    }\n  }\n':
    types.GetPointsByFidDocument,
  '\n  query GetLeaderboard($limit: Int!, $offset: Int!) {\n    user_points(order_by: { totalPoints: desc }, limit: $limit, offset: $offset) {\n      fid\n      totalPoints\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n        isSmartUser\n        proUser {\n          isPro\n        }\n      }\n    }\n  }\n':
    types.GetLeaderboardDocument,
  '\n  query GetUserTasks($userId: String!, $limit: Int!, $offset: Int, $date: date!) {\n    user_tasks(\n      where: { userId: { _eq: $userId }, date: { _eq: $date } }\n      limit: $limit\n      offset: $offset\n    ) {\n      completed\n      date\n      id\n      progress\n      taskId\n      userId\n      task {\n        title\n        target\n        rewardIp\n        isActive\n        taskOrder\n        description\n        taskType {\n          id\n          name\n        }\n        actionType {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.GetUserTasksDocument,
  '\n  query GetTopMindshare(\n    $duration: String!\n    $field: String!\n    $limit: Int!\n    $skip: Int!\n    $desc: Boolean!\n  ) {\n    getTopMindshare(\n      input: { duration: $duration, field: $field, limit: $limit, skip: $skip, desc: $desc }\n    ) {\n      ...MindshareResult\n    }\n  }\n':
    types.GetTopMindshareDocument,
  '\n  query GetUserRank($fid: String!) {\n    user_rank_view(where: { fid: { _eq: $fid } }) {\n      fid\n      rank\n      totalPoints\n    }\n  }\n':
    types.GetUserRankDocument,
  '\n  query GetVoteAggregates($snapshotId: uuid!) {\n    upvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    upvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n  }\n':
    types.GetVoteAggregatesDocument,
  '\n  query GetVoteByVoter($voterId: String!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {voterId: {_eq: $voterId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      voterId\n      voteType\n      status\n      amount\n      createdAt\n      voteSnapshot {\n        id\n        fid\n        weekStart\n        updatedAt\n        status\n        mindshare\n        createdAt\n        user {\n          fid\n          displayName\n          username\n          pfpUrl\n        }\n      }\n    }\n  }\n':
    types.GetVoteByVoterDocument,
  '\n  query GetVoteHistory($targetSnapshotId: uuid!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {targetSnapshotId: {_eq: $targetSnapshotId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      createdAt\n      amount\n      targetSnapshotId\n      voteType\n      voter {\n        fid\n        displayName\n        pfpUrl\n        username\n      }\n    }\n  }\n':
    types.GetVoteHistoryDocument,
  '\n  query GetVoteSnapshot(\n    $limit: Int!\n    $offset: Int\n    $order_by: [vote_snapshot_order_by!]\n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: {\n        weekStart: {_eq: $weekStart}\n        mindshare: {_gte: 0.0001}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n':
    types.GetVoteSnapshotDocument,
  '\n  query GetVoteSnapshotByFid(\n    $fid: String!, \n    $status: String = "open"\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        status: {_eq: $status}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n':
    types.GetVoteSnapshotByFidDocument,
  '\n  query GetVoteSnapshotByFidAndWeek(\n    $fid: String!, \n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        weekStart: {_eq: $weekStart}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n':
    types.GetVoteSnapshotByFidAndWeekDocument,
  '\n  mutation PostNotificationToken($userId: String!, $url: String!, $token: String!) {\n    insert_user_notification_tokens(\n      objects: { userId: $userId, url: $url, token: $token }\n      on_conflict: { constraint: user_notification_tokens_pkey }\n    ) {\n      affected_rows\n      returning {\n        id\n        token\n        url\n        userId\n        createdAt\n        updatedAt\n        provider\n      }\n    }\n  }\n':
    types.PostNotificationTokenDocument,
  '\n  mutation PostTasks($userId: String!) {\n    postTasks(input: { userId: $userId }) {\n      status\n    }\n  }\n':
    types.PostTasksDocument,
  '\n  mutation PostVote($input: PostVoteInput!) {\n    postVote(input: $input) {\n      status\n    }\n  }\n':
    types.PostVoteDocument,
  '\n  mutation UpdateTask($taskId: String!) {\n    updateTask(input: { taskId: $taskId }) {\n      status\n    }\n  }\n':
    types.UpdateTaskDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation PostBoost(\n    $castUrl: String!\n    $creatorFid: String!\n    $txHash: String!\n    $mindshareFilterDuration: Int!\n    $minMindshare: numeric!\n    $campaignBudget: numeric!\n  ) {\n    insert_mindshare_boosts_one(\n      object: {\n        castUrl: $castUrl\n        creatorFid: $creatorFid\n        txHash: $txHash\n        mindshareFilterDuration: $mindshareFilterDuration\n        campaignBudget: $campaignBudget\n        minMindshare: $minMindshare\n      }\n    ) {\n      campaignBudget\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      minMindshare\n      mindshareFilterDuration\n      id\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n    }\n  }\n'
): (typeof documents)['\n  mutation PostBoost(\n    $castUrl: String!\n    $creatorFid: String!\n    $txHash: String!\n    $mindshareFilterDuration: Int!\n    $minMindshare: numeric!\n    $campaignBudget: numeric!\n  ) {\n    insert_mindshare_boosts_one(\n      object: {\n        castUrl: $castUrl\n        creatorFid: $creatorFid\n        txHash: $txHash\n        mindshareFilterDuration: $mindshareFilterDuration\n        campaignBudget: $campaignBudget\n        minMindshare: $minMindshare\n      }\n    ) {\n      campaignBudget\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      minMindshare\n      mindshareFilterDuration\n      id\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetBoosts($limit: Int, $offset: Int) {\n    mindshare_boosts(\n      where: { boostStatus: { _eq: "active" } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      mindshareFilterDuration\n      id\n      minMindshare\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n      boostRecastRecords(limit: 5) {\n        recasterFid\n        user {\n          fid\n          pfpUrl\n          username\n          displayName\n        }\n      }\n      boostRecastRecords_aggregate {\n        aggregate {\n          count(columns: boostId)\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBoosts($limit: Int, $offset: Int) {\n    mindshare_boosts(\n      where: { boostStatus: { _eq: "active" } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      mindshareFilterDuration\n      id\n      minMindshare\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n      boostRecastRecords(limit: 5) {\n        recasterFid\n        user {\n          fid\n          pfpUrl\n          username\n          displayName\n        }\n      }\n      boostRecastRecords_aggregate {\n        aggregate {\n          count(columns: boostId)\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation VerifyBoostRecast($boostId: String!, $userId: String!, $address: String!) {\n    verifyBoostRecast(input: { boostId: $boostId, userId: $userId, address: $address }) {\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation VerifyBoostRecast($boostId: String!, $userId: String!, $address: String!) {\n    verifyBoostRecast(input: { boostId: $boostId, userId: $userId, address: $address }) {\n      status\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetBoostsByFid($fid: String!, $limit: Int, $offset: Int) {\n    mindshare_boosts(\n      where: { creatorFid: { _eq: $fid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      mindshareFilterDuration\n      id\n      minMindshare\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n      boostRecastRecords(limit: 5) {\n        user {\n          fid\n          pfpUrl\n          username\n          displayName\n        }\n      }\n      boostRecastRecords_aggregate {\n        aggregate {\n          count(columns: boostId)\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBoostsByFid($fid: String!, $limit: Int, $offset: Int) {\n    mindshare_boosts(\n      where: { creatorFid: { _eq: $fid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n      updatedAt\n      txStatus\n      txHash\n      remainingBudget\n      mindshareFilterDuration\n      id\n      minMindshare\n      creatorFid\n      createdAt\n      costMultiplier\n      castUrl\n      campaignBudget\n      boostStatus\n      boostRecastRecords(limit: 5) {\n        user {\n          fid\n          pfpUrl\n          username\n          displayName\n        }\n      }\n      boostRecastRecords_aggregate {\n        aggregate {\n          count(columns: boostId)\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetBoostRecastsByFid($recasterFid: String!, $limit: Int, $offset: Int) {\n    boost_recast_records(\n      where: { recasterFid: { _eq: $recasterFid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      id\n      transactionHash\n      recasterFid\n      earnedAmount\n      mindshareBoost {\n        minMindshare\n        mindshareFilterDuration\n        user {\n          displayName\n          username\n          fid\n          pfpUrl\n        }\n        boostStatus\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBoostRecastsByFid($recasterFid: String!, $limit: Int, $offset: Int) {\n    boost_recast_records(\n      where: { recasterFid: { _eq: $recasterFid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      id\n      transactionHash\n      recasterFid\n      earnedAmount\n      mindshareBoost {\n        minMindshare\n        mindshareFilterDuration\n        user {\n          displayName\n          username\n          fid\n          pfpUrl\n        }\n        boostStatus\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetBoostRecastsByBoostId($boostId: uuid!, $limit: Int, $offset: Int) {\n    boost_recast_records(\n      where: { boostId: { _eq: $boostId } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      recasterFid\n      createdAt\n      mindshare\n      user {\n        displayName\n        username\n        fid\n        pfpUrl\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBoostRecastsByBoostId($boostId: uuid!, $limit: Int, $offset: Int) {\n    boost_recast_records(\n      where: { boostId: { _eq: $boostId } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      recasterFid\n      createdAt\n      mindshare\n      user {\n        displayName\n        username\n        fid\n        pfpUrl\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation InsertEarlyInflyncerNFTMindRecord($fid: String!, $address: String!, $tokenId: String!) {\n    insert_early_inflyncer_nft_mind_records_one(\n      object: { fid: $fid, address: $address, tokenId: $tokenId }\n    ) {\n      id\n      fid\n      address\n      tokenId\n      createdAt\n    }\n  }\n'
): (typeof documents)['\n  mutation InsertEarlyInflyncerNFTMindRecord($fid: String!, $address: String!, $tokenId: String!) {\n    insert_early_inflyncer_nft_mind_records_one(\n      object: { fid: $fid, address: $address, tokenId: $tokenId }\n    ) {\n      id\n      fid\n      address\n      tokenId\n      createdAt\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetEarlyInflyncerNFTMindRecordByFid($fid: String!) {\n    early_inflyncer_nft_mind_records(where: { fid: { _eq: $fid } }) {\n      id\n      fid\n      address\n      tokenId\n      createdAt\n    }\n  }\n'
): (typeof documents)['\n  query GetEarlyInflyncerNFTMindRecordByFid($fid: String!) {\n    early_inflyncer_nft_mind_records(where: { fid: { _eq: $fid } }) {\n      id\n      fid\n      address\n      tokenId\n      createdAt\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment UserInfo on UserInfo {\n    displayName\n    fid\n    followingCount\n    followerCount\n    isSmartUser\n    neynarUserScore\n    pfpUrl\n    powerBadge\n    username\n  }\n'
): (typeof documents)['\n  fragment UserInfo on UserInfo {\n    displayName\n    fid\n    followingCount\n    followerCount\n    isSmartUser\n    neynarUserScore\n    pfpUrl\n    powerBadge\n    username\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment DailyMindshare on DailyMindshare {\n    _time\n    fid\n    mindshare\n  }\n'
): (typeof documents)['\n  fragment DailyMindshare on DailyMindshare {\n    _time\n    fid\n    mindshare\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment MindshareResult on MindshareResult {\n    change30d\n    change7d\n    change3d\n    changeRatio30d\n    changeRatio7d\n    changeRatio3d\n    currentMindshare\n    fid\n    last30dMindshare\n    last7dMindshare\n    last3dMindshare\n    rank\n    time\n    userInfo {\n      ...UserInfo\n    }\n    daily {\n      ...DailyMindshare\n    }\n    proUser {\n      isPro\n    }\n  }\n'
): (typeof documents)['\n  fragment MindshareResult on MindshareResult {\n    change30d\n    change7d\n    change3d\n    changeRatio30d\n    changeRatio7d\n    changeRatio3d\n    currentMindshare\n    fid\n    last30dMindshare\n    last7dMindshare\n    last3dMindshare\n    rank\n    time\n    userInfo {\n      ...UserInfo\n    }\n    daily {\n      ...DailyMindshare\n    }\n    proUser {\n      isPro\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetCryptoPrice($coinId: String!, $currency: String!) {\n    getCryptoPrice(input: { coinId: $coinId, currency: $currency }) {\n      phavercoin {\n        usd\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetCryptoPrice($coinId: String!, $currency: String!) {\n    getCryptoPrice(input: { coinId: $coinId, currency: $currency }) {\n      phavercoin {\n        usd\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetMindshareByFid($fid: String!) {\n    getMindshareByFid(input: { fid: $fid }) {\n      ...MindshareResult\n    }\n  }\n'
): (typeof documents)['\n  query GetMindshareByFid($fid: String!) {\n    getMindshareByFid(input: { fid: $fid }) {\n      ...MindshareResult\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment PointTransactionFields on point_transactions {\n    date\n    createdAt\n    direction\n    fid\n    id\n    mindshare\n    points\n    reason\n    type\n    usdcAmount\n    userTask {\n      task {\n        title\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment PointTransactionFields on point_transactions {\n    date\n    createdAt\n    direction\n    fid\n    id\n    mindshare\n    points\n    reason\n    type\n    usdcAmount\n    userTask {\n      task {\n        title\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPointTransactionByFid($fid: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'
): (typeof documents)['\n  query GetPointTransactionByFid($fid: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPointTransactionByFidAndType($fid: String!, $type: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      order_by: { createdAt: desc }\n      where: { fid: { _eq: $fid }, type: { _eq: $type } }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'
): (typeof documents)['\n  query GetPointTransactionByFidAndType($fid: String!, $type: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      order_by: { createdAt: desc }\n      where: { fid: { _eq: $fid }, type: { _eq: $type } }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPointTransactionByFidAndDirectionAndDate(\n    $fid: String!\n    $direction: String!\n    $date: date!\n  ) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, direction: { _eq: $direction }, date: { _eq: $date } }\n      order_by: { createdAt: desc }\n    ) {\n      date\n      createdAt\n      direction\n      fid\n      id\n      mindshare\n      points\n      reason\n      type\n    }\n  }\n'
): (typeof documents)['\n  query GetPointTransactionByFidAndDirectionAndDate(\n    $fid: String!\n    $direction: String!\n    $date: date!\n  ) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, direction: { _eq: $direction }, date: { _eq: $date } }\n      order_by: { createdAt: desc }\n    ) {\n      date\n      createdAt\n      direction\n      fid\n      id\n      mindshare\n      points\n      reason\n      type\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPointTransactionByFidAndDirection(\n    $fid: String!\n    $direction: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, direction: { _eq: $direction } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'
): (typeof documents)['\n  query GetPointTransactionByFidAndDirection(\n    $fid: String!\n    $direction: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, direction: { _eq: $direction } }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPointTransactionByFidAndDirectionDateRange(\n    $fid: String!\n    $direction: String!\n    $startDate: date!\n    $endDate: date!\n    $limit: Int\n    $offset: Int\n  ) {\n    point_transactions(\n      where: {\n        fid: { _eq: $fid }\n        direction: { _eq: $direction }\n        date: { _gte: $startDate, _lte: $endDate }\n      }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'
): (typeof documents)['\n  query GetPointTransactionByFidAndDirectionDateRange(\n    $fid: String!\n    $direction: String!\n    $startDate: date!\n    $endDate: date!\n    $limit: Int\n    $offset: Int\n  ) {\n    point_transactions(\n      where: {\n        fid: { _eq: $fid }\n        direction: { _eq: $direction }\n        date: { _gte: $startDate, _lte: $endDate }\n      }\n      order_by: { createdAt: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPointsByFid($fid: String!) {\n    user_points_by_pk(fid: $fid) {\n      fid\n      totalPoints\n    }\n  }\n'
): (typeof documents)['\n  query GetPointsByFid($fid: String!) {\n    user_points_by_pk(fid: $fid) {\n      fid\n      totalPoints\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetLeaderboard($limit: Int!, $offset: Int!) {\n    user_points(order_by: { totalPoints: desc }, limit: $limit, offset: $offset) {\n      fid\n      totalPoints\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n        isSmartUser\n        proUser {\n          isPro\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetLeaderboard($limit: Int!, $offset: Int!) {\n    user_points(order_by: { totalPoints: desc }, limit: $limit, offset: $offset) {\n      fid\n      totalPoints\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n        isSmartUser\n        proUser {\n          isPro\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserTasks($userId: String!, $limit: Int!, $offset: Int, $date: date!) {\n    user_tasks(\n      where: { userId: { _eq: $userId }, date: { _eq: $date } }\n      limit: $limit\n      offset: $offset\n    ) {\n      completed\n      date\n      id\n      progress\n      taskId\n      userId\n      task {\n        title\n        target\n        rewardIp\n        isActive\n        taskOrder\n        description\n        taskType {\n          id\n          name\n        }\n        actionType {\n          id\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetUserTasks($userId: String!, $limit: Int!, $offset: Int, $date: date!) {\n    user_tasks(\n      where: { userId: { _eq: $userId }, date: { _eq: $date } }\n      limit: $limit\n      offset: $offset\n    ) {\n      completed\n      date\n      id\n      progress\n      taskId\n      userId\n      task {\n        title\n        target\n        rewardIp\n        isActive\n        taskOrder\n        description\n        taskType {\n          id\n          name\n        }\n        actionType {\n          id\n          name\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetTopMindshare(\n    $duration: String!\n    $field: String!\n    $limit: Int!\n    $skip: Int!\n    $desc: Boolean!\n  ) {\n    getTopMindshare(\n      input: { duration: $duration, field: $field, limit: $limit, skip: $skip, desc: $desc }\n    ) {\n      ...MindshareResult\n    }\n  }\n'
): (typeof documents)['\n  query GetTopMindshare(\n    $duration: String!\n    $field: String!\n    $limit: Int!\n    $skip: Int!\n    $desc: Boolean!\n  ) {\n    getTopMindshare(\n      input: { duration: $duration, field: $field, limit: $limit, skip: $skip, desc: $desc }\n    ) {\n      ...MindshareResult\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserRank($fid: String!) {\n    user_rank_view(where: { fid: { _eq: $fid } }) {\n      fid\n      rank\n      totalPoints\n    }\n  }\n'
): (typeof documents)['\n  query GetUserRank($fid: String!) {\n    user_rank_view(where: { fid: { _eq: $fid } }) {\n      fid\n      rank\n      totalPoints\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetVoteAggregates($snapshotId: uuid!) {\n    upvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    upvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetVoteAggregates($snapshotId: uuid!) {\n    upvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    upvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetVoteByVoter($voterId: String!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {voterId: {_eq: $voterId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      voterId\n      voteType\n      status\n      amount\n      createdAt\n      voteSnapshot {\n        id\n        fid\n        weekStart\n        updatedAt\n        status\n        mindshare\n        createdAt\n        user {\n          fid\n          displayName\n          username\n          pfpUrl\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetVoteByVoter($voterId: String!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {voterId: {_eq: $voterId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      voterId\n      voteType\n      status\n      amount\n      createdAt\n      voteSnapshot {\n        id\n        fid\n        weekStart\n        updatedAt\n        status\n        mindshare\n        createdAt\n        user {\n          fid\n          displayName\n          username\n          pfpUrl\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetVoteHistory($targetSnapshotId: uuid!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {targetSnapshotId: {_eq: $targetSnapshotId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      createdAt\n      amount\n      targetSnapshotId\n      voteType\n      voter {\n        fid\n        displayName\n        pfpUrl\n        username\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetVoteHistory($targetSnapshotId: uuid!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {targetSnapshotId: {_eq: $targetSnapshotId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      createdAt\n      amount\n      targetSnapshotId\n      voteType\n      voter {\n        fid\n        displayName\n        pfpUrl\n        username\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetVoteSnapshot(\n    $limit: Int!\n    $offset: Int\n    $order_by: [vote_snapshot_order_by!]\n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: {\n        weekStart: {_eq: $weekStart}\n        mindshare: {_gte: 0.0001}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetVoteSnapshot(\n    $limit: Int!\n    $offset: Int\n    $order_by: [vote_snapshot_order_by!]\n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: {\n        weekStart: {_eq: $weekStart}\n        mindshare: {_gte: 0.0001}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetVoteSnapshotByFid(\n    $fid: String!, \n    $status: String = "open"\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        status: {_eq: $status}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetVoteSnapshotByFid(\n    $fid: String!, \n    $status: String = "open"\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        status: {_eq: $status}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetVoteSnapshotByFidAndWeek(\n    $fid: String!, \n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        weekStart: {_eq: $weekStart}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetVoteSnapshotByFidAndWeek(\n    $fid: String!, \n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        weekStart: {_eq: $weekStart}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation PostNotificationToken($userId: String!, $url: String!, $token: String!) {\n    insert_user_notification_tokens(\n      objects: { userId: $userId, url: $url, token: $token }\n      on_conflict: { constraint: user_notification_tokens_pkey }\n    ) {\n      affected_rows\n      returning {\n        id\n        token\n        url\n        userId\n        createdAt\n        updatedAt\n        provider\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation PostNotificationToken($userId: String!, $url: String!, $token: String!) {\n    insert_user_notification_tokens(\n      objects: { userId: $userId, url: $url, token: $token }\n      on_conflict: { constraint: user_notification_tokens_pkey }\n    ) {\n      affected_rows\n      returning {\n        id\n        token\n        url\n        userId\n        createdAt\n        updatedAt\n        provider\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation PostTasks($userId: String!) {\n    postTasks(input: { userId: $userId }) {\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation PostTasks($userId: String!) {\n    postTasks(input: { userId: $userId }) {\n      status\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation PostVote($input: PostVoteInput!) {\n    postVote(input: $input) {\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation PostVote($input: PostVoteInput!) {\n    postVote(input: $input) {\n      status\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateTask($taskId: String!) {\n    updateTask(input: { taskId: $taskId }) {\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateTask($taskId: String!) {\n    updateTask(input: { taskId: $taskId }) {\n      status\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
