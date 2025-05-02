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
  '\n  fragment UserInfo on UserInfo {\n    displayName\n    fid\n    followingCount\n    followerCount\n    isSmartUser\n    neynarUserScore\n    pfpUrl\n    powerBadge\n    username\n  }\n': typeof types.UserInfoFragmentDoc;
  '\n  fragment DailyMindshare on DailyMindshare {\n    _time\n    fid\n    mindshare\n  }\n': typeof types.DailyMindshareFragmentDoc;
  '\n  fragment MindshareResult on MindshareResult {\n    change30d\n    change7d\n    change3d\n    changeRatio30d\n    changeRatio7d\n    changeRatio3d\n    currentMindshare\n    fid\n    last30dMindshare\n    last7dMindshare\n    last3dMindshare\n    rank\n    time\n    userInfo {\n      ...UserInfo\n    }\n    daily {\n      ...DailyMindshare\n    }\n  }\n': typeof types.MindshareResultFragmentDoc;
  '\n  query GetCryptoPrice($coinId: String!, $currency: String!) {\n    getCryptoPrice(input: { coinId: $coinId, currency: $currency }) {\n      phavercoin {\n        usd\n      }\n    }\n  }\n': typeof types.GetCryptoPriceDocument;
  '\n  query GetMindshareByFid($fid: String!) {\n    getMindshareByFid(input: { fid: $fid }) {\n      ...MindshareResult\n    }\n  }\n': typeof types.GetMindshareByFidDocument;
  '\n  fragment PointTransactionFields on point_transactions {\n    date\n    createdAt\n    direction\n    fid\n    id\n    mindshare\n    points\n    reason\n    type\n    usdcAmount\n    userTask {\n      task {\n        title\n      }\n    }\n  }\n': typeof types.PointTransactionFieldsFragmentDoc;
  '\n  query GetPointTransactionByFid($fid: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid } }\n      order_by: { date: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n': typeof types.GetPointTransactionByFidDocument;
  '\n  query GetPointTransactionByFidAndType($fid: String!, $type: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, type: { _eq: $type } }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n': typeof types.GetPointTransactionByFidAndTypeDocument;
  '\n  query GetPointsByFid($fid: String!) {\n    user_points_by_pk(fid: $fid) {\n      fid\n      totalPoints\n    }\n  }\n': typeof types.GetPointsByFidDocument;
  '\n  query GetLeaderboard($limit: Int!, $offset: Int!) {\n    user_points(order_by: { totalPoints: desc }, limit: $limit, offset: $offset) {\n      fid\n      totalPoints\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n        isSmartUser\n      }\n    }\n  }\n': typeof types.GetLeaderboardDocument;
  '\n  query GetUserTasks($userId: String!, $limit: Int!, $offset: Int, $date: date!) {\n    user_tasks(\n      where: { userId: { _eq: $userId }, date: { _eq: $date } }\n      limit: $limit\n      offset: $offset\n    ) {\n      completed\n      date\n      id\n      progress\n      taskId\n      userId\n      task {\n        title\n        target\n        rewardIp\n        isActive\n        description\n        taskType {\n          id\n          name\n        }\n        actionType {\n          id\n          name\n        }\n      }\n    }\n  }\n': typeof types.GetUserTasksDocument;
  '\n  query GetTopMindshare(\n    $duration: String!\n    $field: String!\n    $limit: Int!\n    $skip: Int!\n    $desc: Boolean!\n  ) {\n    getTopMindshare(\n      input: { duration: $duration, field: $field, limit: $limit, skip: $skip, desc: $desc }\n    ) {\n      ...MindshareResult\n    }\n  }\n': typeof types.GetTopMindshareDocument;
  '\n  query GetVoteAggregates($snapshotId: uuid!) {\n    upvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        tokenType: {_eq: "usdc"}\n        }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    upvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        tokenType: {_eq: "social"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n        tokenType: {_eq: "usdc"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n        tokenType: {_eq: "social"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n  }\n': typeof types.GetVoteAggregatesDocument;
  '\n  query GetVoteByVoter($voterId: String!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {voterId: {_eq: $voterId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      voterId\n      voteType\n      tokenType\n      status\n      amount\n      createdAt\n      vote_snapshot {\n        id\n        fid\n        weekStart\n        updatedAt\n        status\n        mindshare\n        createdAt\n        user {\n          fid\n          displayName\n          username\n          pfpUrl\n        }\n      }\n    }\n  }\n': typeof types.GetVoteByVoterDocument;
  '\n  query GetVoteHistory($targetSnapshotId: uuid!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {targetSnapshotId: {_eq: $targetSnapshotId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      createdAt\n      amount\n      tokenType\n      txHash\n      targetSnapshotId\n      voteType\n      voter {\n        fid\n        displayName\n        pfpUrl\n        username\n      }\n    }\n  }\n': typeof types.GetVoteHistoryDocument;
  '\n  query GetVoteSnapshot(\n    $limit: Int!\n    $offset: Int\n    $order_by: [vote_snapshot_order_by!]\n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: {\n        weekStart: {_eq: $weekStart}\n        mindshare: {_gte: 0.0001}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n': typeof types.GetVoteSnapshotDocument;
  '\n  query GetVoteSnapshotByFid(\n    $fid: String!, \n    $status: String = "open"\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        status: {_eq: $status}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n': typeof types.GetVoteSnapshotByFidDocument;
  '\n  query GetVoteSnapshotByFidAndWeek(\n    $fid: String!, \n    $weekStart: date!\n  ) {\n    vote_snapshot(\n      order_by: { weekStart: desc }\n      where: {\n        fid: {_eq: $fid}\n        weekStart: {_eq: $weekStart}\n      }\n    ) {\n      createdAt\n      fid\n      id\n      mindshare\n      status\n      updatedAt\n      weekStart\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n      }\n    }\n  }\n': typeof types.GetVoteSnapshotByFidAndWeekDocument;
  '\n  mutation PostNotificationToken($userId: String!, $url: String!, $token: String!) {\n    insert_user_notification_tokens(\n      objects: { userId: $userId, url: $url, token: $token }\n      on_conflict: { constraint: user_notification_tokens_pkey }\n    ) {\n      affected_rows\n      returning {\n        id\n        token\n        url\n        userId\n        createdAt\n        updatedAt\n        provider\n      }\n    }\n  }\n': typeof types.PostNotificationTokenDocument;
  '\n  mutation PostTasks($userId: String!) {\n    postTasks(input: { userId: $userId }) {\n      status\n    }\n  }\n': typeof types.PostTasksDocument;
  '\n  mutation PostVoteRecord($input: PostVoteRecordInput!) {\n    postVoteRecord(input: $input) {\n      status\n    }\n  }\n': typeof types.PostVoteRecordDocument;
  '\n  mutation UpdateTask($taskId: String!) {\n    updateTask(input: { taskId: $taskId }) {\n      status\n    }\n  }\n': typeof types.UpdateTaskDocument;
};
const documents: Documents = {
  '\n  fragment UserInfo on UserInfo {\n    displayName\n    fid\n    followingCount\n    followerCount\n    isSmartUser\n    neynarUserScore\n    pfpUrl\n    powerBadge\n    username\n  }\n':
    types.UserInfoFragmentDoc,
  '\n  fragment DailyMindshare on DailyMindshare {\n    _time\n    fid\n    mindshare\n  }\n':
    types.DailyMindshareFragmentDoc,
  '\n  fragment MindshareResult on MindshareResult {\n    change30d\n    change7d\n    change3d\n    changeRatio30d\n    changeRatio7d\n    changeRatio3d\n    currentMindshare\n    fid\n    last30dMindshare\n    last7dMindshare\n    last3dMindshare\n    rank\n    time\n    userInfo {\n      ...UserInfo\n    }\n    daily {\n      ...DailyMindshare\n    }\n  }\n':
    types.MindshareResultFragmentDoc,
  '\n  query GetCryptoPrice($coinId: String!, $currency: String!) {\n    getCryptoPrice(input: { coinId: $coinId, currency: $currency }) {\n      phavercoin {\n        usd\n      }\n    }\n  }\n':
    types.GetCryptoPriceDocument,
  '\n  query GetMindshareByFid($fid: String!) {\n    getMindshareByFid(input: { fid: $fid }) {\n      ...MindshareResult\n    }\n  }\n':
    types.GetMindshareByFidDocument,
  '\n  fragment PointTransactionFields on point_transactions {\n    date\n    createdAt\n    direction\n    fid\n    id\n    mindshare\n    points\n    reason\n    type\n    usdcAmount\n    userTask {\n      task {\n        title\n      }\n    }\n  }\n':
    types.PointTransactionFieldsFragmentDoc,
  '\n  query GetPointTransactionByFid($fid: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid } }\n      order_by: { date: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n':
    types.GetPointTransactionByFidDocument,
  '\n  query GetPointTransactionByFidAndType($fid: String!, $type: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, type: { _eq: $type } }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n':
    types.GetPointTransactionByFidAndTypeDocument,
  '\n  query GetPointsByFid($fid: String!) {\n    user_points_by_pk(fid: $fid) {\n      fid\n      totalPoints\n    }\n  }\n':
    types.GetPointsByFidDocument,
  '\n  query GetLeaderboard($limit: Int!, $offset: Int!) {\n    user_points(order_by: { totalPoints: desc }, limit: $limit, offset: $offset) {\n      fid\n      totalPoints\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n        isSmartUser\n      }\n    }\n  }\n':
    types.GetLeaderboardDocument,
  '\n  query GetUserTasks($userId: String!, $limit: Int!, $offset: Int, $date: date!) {\n    user_tasks(\n      where: { userId: { _eq: $userId }, date: { _eq: $date } }\n      limit: $limit\n      offset: $offset\n    ) {\n      completed\n      date\n      id\n      progress\n      taskId\n      userId\n      task {\n        title\n        target\n        rewardIp\n        isActive\n        description\n        taskType {\n          id\n          name\n        }\n        actionType {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.GetUserTasksDocument,
  '\n  query GetTopMindshare(\n    $duration: String!\n    $field: String!\n    $limit: Int!\n    $skip: Int!\n    $desc: Boolean!\n  ) {\n    getTopMindshare(\n      input: { duration: $duration, field: $field, limit: $limit, skip: $skip, desc: $desc }\n    ) {\n      ...MindshareResult\n    }\n  }\n':
    types.GetTopMindshareDocument,
  '\n  query GetVoteAggregates($snapshotId: uuid!) {\n    upvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        tokenType: {_eq: "usdc"}\n        }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    upvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        tokenType: {_eq: "social"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n        tokenType: {_eq: "usdc"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n        tokenType: {_eq: "social"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n  }\n':
    types.GetVoteAggregatesDocument,
  '\n  query GetVoteByVoter($voterId: String!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {voterId: {_eq: $voterId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      voterId\n      voteType\n      tokenType\n      status\n      amount\n      createdAt\n      vote_snapshot {\n        id\n        fid\n        weekStart\n        updatedAt\n        status\n        mindshare\n        createdAt\n        user {\n          fid\n          displayName\n          username\n          pfpUrl\n        }\n      }\n    }\n  }\n':
    types.GetVoteByVoterDocument,
  '\n  query GetVoteHistory($targetSnapshotId: uuid!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {targetSnapshotId: {_eq: $targetSnapshotId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      createdAt\n      amount\n      tokenType\n      txHash\n      targetSnapshotId\n      voteType\n      voter {\n        fid\n        displayName\n        pfpUrl\n        username\n      }\n    }\n  }\n':
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
  '\n  mutation PostVoteRecord($input: PostVoteRecordInput!) {\n    postVoteRecord(input: $input) {\n      status\n    }\n  }\n':
    types.PostVoteRecordDocument,
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
  source: '\n  fragment MindshareResult on MindshareResult {\n    change30d\n    change7d\n    change3d\n    changeRatio30d\n    changeRatio7d\n    changeRatio3d\n    currentMindshare\n    fid\n    last30dMindshare\n    last7dMindshare\n    last3dMindshare\n    rank\n    time\n    userInfo {\n      ...UserInfo\n    }\n    daily {\n      ...DailyMindshare\n    }\n  }\n'
): (typeof documents)['\n  fragment MindshareResult on MindshareResult {\n    change30d\n    change7d\n    change3d\n    changeRatio30d\n    changeRatio7d\n    changeRatio3d\n    currentMindshare\n    fid\n    last30dMindshare\n    last7dMindshare\n    last3dMindshare\n    rank\n    time\n    userInfo {\n      ...UserInfo\n    }\n    daily {\n      ...DailyMindshare\n    }\n  }\n'];
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
  source: '\n  query GetPointTransactionByFid($fid: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid } }\n      order_by: { date: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'
): (typeof documents)['\n  query GetPointTransactionByFid($fid: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid } }\n      order_by: { date: desc }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPointTransactionByFidAndType($fid: String!, $type: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, type: { _eq: $type } }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'
): (typeof documents)['\n  query GetPointTransactionByFidAndType($fid: String!, $type: String!, $limit: Int, $offset: Int) {\n    point_transactions(\n      where: { fid: { _eq: $fid }, type: { _eq: $type } }\n      limit: $limit\n      offset: $offset\n    ) {\n      ...PointTransactionFields\n    }\n  }\n  \n'];
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
  source: '\n  query GetLeaderboard($limit: Int!, $offset: Int!) {\n    user_points(order_by: { totalPoints: desc }, limit: $limit, offset: $offset) {\n      fid\n      totalPoints\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n        isSmartUser\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetLeaderboard($limit: Int!, $offset: Int!) {\n    user_points(order_by: { totalPoints: desc }, limit: $limit, offset: $offset) {\n      fid\n      totalPoints\n      user {\n        displayName\n        fid\n        pfpUrl\n        username\n        isSmartUser\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserTasks($userId: String!, $limit: Int!, $offset: Int, $date: date!) {\n    user_tasks(\n      where: { userId: { _eq: $userId }, date: { _eq: $date } }\n      limit: $limit\n      offset: $offset\n    ) {\n      completed\n      date\n      id\n      progress\n      taskId\n      userId\n      task {\n        title\n        target\n        rewardIp\n        isActive\n        description\n        taskType {\n          id\n          name\n        }\n        actionType {\n          id\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetUserTasks($userId: String!, $limit: Int!, $offset: Int, $date: date!) {\n    user_tasks(\n      where: { userId: { _eq: $userId }, date: { _eq: $date } }\n      limit: $limit\n      offset: $offset\n    ) {\n      completed\n      date\n      id\n      progress\n      taskId\n      userId\n      task {\n        title\n        target\n        rewardIp\n        isActive\n        description\n        taskType {\n          id\n          name\n        }\n        actionType {\n          id\n          name\n        }\n      }\n    }\n  }\n'];
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
  source: '\n  query GetVoteAggregates($snapshotId: uuid!) {\n    upvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        tokenType: {_eq: "usdc"}\n        }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    upvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        tokenType: {_eq: "social"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n        tokenType: {_eq: "usdc"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n        tokenType: {_eq: "social"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetVoteAggregates($snapshotId: uuid!) {\n    upvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        tokenType: {_eq: "usdc"}\n        }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    upvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "up"}, \n        tokenType: {_eq: "social"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_usdc: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n        tokenType: {_eq: "usdc"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n    \n    downvotes_social: vote_records_aggregate(\n      where: {\n        targetSnapshotId: {_eq: $snapshotId}, \n        voteType: {_eq: "down"}, \n        tokenType: {_eq: "social"}\n      }\n    ) {\n      aggregate {\n        count(columns: id)\n        sum {\n          amount\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetVoteByVoter($voterId: String!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {voterId: {_eq: $voterId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      voterId\n      voteType\n      tokenType\n      status\n      amount\n      createdAt\n      vote_snapshot {\n        id\n        fid\n        weekStart\n        updatedAt\n        status\n        mindshare\n        createdAt\n        user {\n          fid\n          displayName\n          username\n          pfpUrl\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetVoteByVoter($voterId: String!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {voterId: {_eq: $voterId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      voterId\n      voteType\n      tokenType\n      status\n      amount\n      createdAt\n      vote_snapshot {\n        id\n        fid\n        weekStart\n        updatedAt\n        status\n        mindshare\n        createdAt\n        user {\n          fid\n          displayName\n          username\n          pfpUrl\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetVoteHistory($targetSnapshotId: uuid!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {targetSnapshotId: {_eq: $targetSnapshotId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      createdAt\n      amount\n      tokenType\n      txHash\n      targetSnapshotId\n      voteType\n      voter {\n        fid\n        displayName\n        pfpUrl\n        username\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetVoteHistory($targetSnapshotId: uuid!, $limit: Int, $offset: Int) {\n    vote_records(\n      where: {targetSnapshotId: {_eq: $targetSnapshotId}}\n      limit: $limit\n      offset: $offset\n      order_by: {createdAt: desc}\n    ) {\n      id\n      createdAt\n      amount\n      tokenType\n      txHash\n      targetSnapshotId\n      voteType\n      voter {\n        fid\n        displayName\n        pfpUrl\n        username\n      }\n    }\n  }\n'];
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
  source: '\n  mutation PostVoteRecord($input: PostVoteRecordInput!) {\n    postVoteRecord(input: $input) {\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation PostVoteRecord($input: PostVoteRecordInput!) {\n    postVoteRecord(input: $input) {\n      status\n    }\n  }\n'];
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
