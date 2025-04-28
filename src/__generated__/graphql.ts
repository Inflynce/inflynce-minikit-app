/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  date: { input: any; output: any };
  numeric: { input: any; output: any };
  timestamp: { input: any; output: any };
  timestamptz: { input: any; output: any };
  uuid: { input: any; output: any };
};

export type CryptoPriceOutput = {
  __typename?: 'CryptoPriceOutput';
  phavercoin?: Maybe<CurrencyPrice>;
};

export type CurrencyPrice = {
  __typename?: 'CurrencyPrice';
  usd?: Maybe<Scalars['Float']['output']>;
};

export type DailyMindshare = {
  __typename?: 'DailyMindshare';
  _time: Scalars['String']['output'];
  fid: Scalars['String']['output'];
  mindshare?: Maybe<Scalars['Float']['output']>;
};

export type GetCryptoPriceInput = {
  coinId: Scalars['String']['input'];
  currency: Scalars['String']['input'];
};

export type GetMindshareByFidInput = {
  fid: Scalars['String']['input'];
};

export type GetMindshareInput = {
  desc?: InputMaybe<Scalars['Boolean']['input']>;
  duration: Scalars['String']['input'];
  field: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MindshareResult = {
  __typename?: 'MindshareResult';
  change3d: Scalars['Float']['output'];
  change7d: Scalars['Float']['output'];
  change30d: Scalars['Float']['output'];
  changeRatio3d: Scalars['Float']['output'];
  changeRatio7d: Scalars['Float']['output'];
  changeRatio30d: Scalars['Float']['output'];
  currentMindshare: Scalars['Float']['output'];
  daily: Array<DailyMindshare>;
  fid: Scalars['String']['output'];
  last3dMindshare: Scalars['Float']['output'];
  last7dMindshare: Scalars['Float']['output'];
  last30dMindshare: Scalars['Float']['output'];
  rank: Scalars['Int']['output'];
  time: Scalars['String']['output'];
  userInfo: UserInfo;
};

export type PostVoteRecordInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  targetSnapshotId: Scalars['String']['input'];
  tokenType?: InputMaybe<Scalars['String']['input']>;
  txHash: Scalars['String']['input'];
  voteType: Scalars['String']['input'];
  voterAddress?: InputMaybe<Scalars['String']['input']>;
  voterId: Scalars['Int']['input'];
};

export type PostVoteRecordOutput = {
  __typename?: 'PostVoteRecordOutput';
  status?: Maybe<Scalars['Int']['output']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']['output']>;
  fid: Scalars['String']['output'];
  followerCount?: Maybe<Scalars['Int']['output']>;
  followingCount?: Maybe<Scalars['Int']['output']>;
  isSmartUser?: Maybe<Scalars['Boolean']['output']>;
  neynarUserScore?: Maybe<Scalars['Int']['output']>;
  pfpUrl?: Maybe<Scalars['String']['output']>;
  powerBadge?: Maybe<Scalars['Boolean']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  displayName: Scalars['String']['output'];
  fid: Scalars['Int']['output'];
  followerCount: Scalars['Int']['output'];
  followingCount: Scalars['Int']['output'];
  isSmartUser: Scalars['Boolean']['output'];
  neynarUserScore: Scalars['Float']['output'];
  pfpUrl: Scalars['String']['output'];
  powerBadge: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC',
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "point_transaction_directions" */
  delete_point_transaction_directions?: Maybe<Point_Transaction_Directions_Mutation_Response>;
  /** delete single row from the table: "point_transaction_directions" */
  delete_point_transaction_directions_by_pk?: Maybe<Point_Transaction_Directions>;
  /** delete data from the table: "point_transaction_types" */
  delete_point_transaction_types?: Maybe<Point_Transaction_Types_Mutation_Response>;
  /** delete single row from the table: "point_transaction_types" */
  delete_point_transaction_types_by_pk?: Maybe<Point_Transaction_Types>;
  /** delete data from the table: "point_transactions" */
  delete_point_transactions?: Maybe<Point_Transactions_Mutation_Response>;
  /** delete single row from the table: "point_transactions" */
  delete_point_transactions_by_pk?: Maybe<Point_Transactions>;
  /** delete data from the table: "user_notification_tokens" */
  delete_user_notification_tokens?: Maybe<User_Notification_Tokens_Mutation_Response>;
  /** delete single row from the table: "user_notification_tokens" */
  delete_user_notification_tokens_by_pk?: Maybe<User_Notification_Tokens>;
  /** delete data from the table: "user_points" */
  delete_user_points?: Maybe<User_Points_Mutation_Response>;
  /** delete single row from the table: "user_points" */
  delete_user_points_by_pk?: Maybe<User_Points>;
  /** delete data from the table: "vote_outcome" */
  delete_vote_outcome?: Maybe<Vote_Outcome_Mutation_Response>;
  /** delete single row from the table: "vote_outcome" */
  delete_vote_outcome_by_pk?: Maybe<Vote_Outcome>;
  /** delete data from the table: "vote_record_status" */
  delete_vote_record_status?: Maybe<Vote_Record_Status_Mutation_Response>;
  /** delete single row from the table: "vote_record_status" */
  delete_vote_record_status_by_pk?: Maybe<Vote_Record_Status>;
  /** delete data from the table: "vote_records" */
  delete_vote_records?: Maybe<Vote_Records_Mutation_Response>;
  /** delete single row from the table: "vote_records" */
  delete_vote_records_by_pk?: Maybe<Vote_Records>;
  /** delete data from the table: "vote_snapshot" */
  delete_vote_snapshot?: Maybe<Vote_Snapshot_Mutation_Response>;
  /** delete single row from the table: "vote_snapshot" */
  delete_vote_snapshot_by_pk?: Maybe<Vote_Snapshot>;
  /** delete data from the table: "vote_status" */
  delete_vote_status?: Maybe<Vote_Status_Mutation_Response>;
  /** delete single row from the table: "vote_status" */
  delete_vote_status_by_pk?: Maybe<Vote_Status>;
  /** delete data from the table: "vote_token_type" */
  delete_vote_token_type?: Maybe<Vote_Token_Type_Mutation_Response>;
  /** delete single row from the table: "vote_token_type" */
  delete_vote_token_type_by_pk?: Maybe<Vote_Token_Type>;
  /** delete data from the table: "vote_type" */
  delete_vote_type?: Maybe<Vote_Type_Mutation_Response>;
  /** delete single row from the table: "vote_type" */
  delete_vote_type_by_pk?: Maybe<Vote_Type>;
  /** insert data into the table: "point_transaction_directions" */
  insert_point_transaction_directions?: Maybe<Point_Transaction_Directions_Mutation_Response>;
  /** insert a single row into the table: "point_transaction_directions" */
  insert_point_transaction_directions_one?: Maybe<Point_Transaction_Directions>;
  /** insert data into the table: "point_transaction_types" */
  insert_point_transaction_types?: Maybe<Point_Transaction_Types_Mutation_Response>;
  /** insert a single row into the table: "point_transaction_types" */
  insert_point_transaction_types_one?: Maybe<Point_Transaction_Types>;
  /** insert data into the table: "point_transactions" */
  insert_point_transactions?: Maybe<Point_Transactions_Mutation_Response>;
  /** insert a single row into the table: "point_transactions" */
  insert_point_transactions_one?: Maybe<Point_Transactions>;
  /** insert data into the table: "user_notification_tokens" */
  insert_user_notification_tokens?: Maybe<User_Notification_Tokens_Mutation_Response>;
  /** insert a single row into the table: "user_notification_tokens" */
  insert_user_notification_tokens_one?: Maybe<User_Notification_Tokens>;
  /** insert data into the table: "user_points" */
  insert_user_points?: Maybe<User_Points_Mutation_Response>;
  /** insert a single row into the table: "user_points" */
  insert_user_points_one?: Maybe<User_Points>;
  /** insert data into the table: "vote_outcome" */
  insert_vote_outcome?: Maybe<Vote_Outcome_Mutation_Response>;
  /** insert a single row into the table: "vote_outcome" */
  insert_vote_outcome_one?: Maybe<Vote_Outcome>;
  /** insert data into the table: "vote_record_status" */
  insert_vote_record_status?: Maybe<Vote_Record_Status_Mutation_Response>;
  /** insert a single row into the table: "vote_record_status" */
  insert_vote_record_status_one?: Maybe<Vote_Record_Status>;
  /** insert data into the table: "vote_records" */
  insert_vote_records?: Maybe<Vote_Records_Mutation_Response>;
  /** insert a single row into the table: "vote_records" */
  insert_vote_records_one?: Maybe<Vote_Records>;
  /** insert data into the table: "vote_snapshot" */
  insert_vote_snapshot?: Maybe<Vote_Snapshot_Mutation_Response>;
  /** insert a single row into the table: "vote_snapshot" */
  insert_vote_snapshot_one?: Maybe<Vote_Snapshot>;
  /** insert data into the table: "vote_status" */
  insert_vote_status?: Maybe<Vote_Status_Mutation_Response>;
  /** insert a single row into the table: "vote_status" */
  insert_vote_status_one?: Maybe<Vote_Status>;
  /** insert data into the table: "vote_token_type" */
  insert_vote_token_type?: Maybe<Vote_Token_Type_Mutation_Response>;
  /** insert a single row into the table: "vote_token_type" */
  insert_vote_token_type_one?: Maybe<Vote_Token_Type>;
  /** insert data into the table: "vote_type" */
  insert_vote_type?: Maybe<Vote_Type_Mutation_Response>;
  /** insert a single row into the table: "vote_type" */
  insert_vote_type_one?: Maybe<Vote_Type>;
  /** postVoteRecord */
  postVoteRecord?: Maybe<PostVoteRecordOutput>;
  /** update data of the table: "point_transaction_directions" */
  update_point_transaction_directions?: Maybe<Point_Transaction_Directions_Mutation_Response>;
  /** update single row of the table: "point_transaction_directions" */
  update_point_transaction_directions_by_pk?: Maybe<Point_Transaction_Directions>;
  /** update multiples rows of table: "point_transaction_directions" */
  update_point_transaction_directions_many?: Maybe<
    Array<Maybe<Point_Transaction_Directions_Mutation_Response>>
  >;
  /** update data of the table: "point_transaction_types" */
  update_point_transaction_types?: Maybe<Point_Transaction_Types_Mutation_Response>;
  /** update single row of the table: "point_transaction_types" */
  update_point_transaction_types_by_pk?: Maybe<Point_Transaction_Types>;
  /** update multiples rows of table: "point_transaction_types" */
  update_point_transaction_types_many?: Maybe<
    Array<Maybe<Point_Transaction_Types_Mutation_Response>>
  >;
  /** update data of the table: "point_transactions" */
  update_point_transactions?: Maybe<Point_Transactions_Mutation_Response>;
  /** update single row of the table: "point_transactions" */
  update_point_transactions_by_pk?: Maybe<Point_Transactions>;
  /** update multiples rows of table: "point_transactions" */
  update_point_transactions_many?: Maybe<Array<Maybe<Point_Transactions_Mutation_Response>>>;
  /** update data of the table: "user_notification_tokens" */
  update_user_notification_tokens?: Maybe<User_Notification_Tokens_Mutation_Response>;
  /** update single row of the table: "user_notification_tokens" */
  update_user_notification_tokens_by_pk?: Maybe<User_Notification_Tokens>;
  /** update multiples rows of table: "user_notification_tokens" */
  update_user_notification_tokens_many?: Maybe<
    Array<Maybe<User_Notification_Tokens_Mutation_Response>>
  >;
  /** update data of the table: "user_points" */
  update_user_points?: Maybe<User_Points_Mutation_Response>;
  /** update single row of the table: "user_points" */
  update_user_points_by_pk?: Maybe<User_Points>;
  /** update multiples rows of table: "user_points" */
  update_user_points_many?: Maybe<Array<Maybe<User_Points_Mutation_Response>>>;
  /** update data of the table: "vote_outcome" */
  update_vote_outcome?: Maybe<Vote_Outcome_Mutation_Response>;
  /** update single row of the table: "vote_outcome" */
  update_vote_outcome_by_pk?: Maybe<Vote_Outcome>;
  /** update multiples rows of table: "vote_outcome" */
  update_vote_outcome_many?: Maybe<Array<Maybe<Vote_Outcome_Mutation_Response>>>;
  /** update data of the table: "vote_record_status" */
  update_vote_record_status?: Maybe<Vote_Record_Status_Mutation_Response>;
  /** update single row of the table: "vote_record_status" */
  update_vote_record_status_by_pk?: Maybe<Vote_Record_Status>;
  /** update multiples rows of table: "vote_record_status" */
  update_vote_record_status_many?: Maybe<Array<Maybe<Vote_Record_Status_Mutation_Response>>>;
  /** update data of the table: "vote_records" */
  update_vote_records?: Maybe<Vote_Records_Mutation_Response>;
  /** update single row of the table: "vote_records" */
  update_vote_records_by_pk?: Maybe<Vote_Records>;
  /** update multiples rows of table: "vote_records" */
  update_vote_records_many?: Maybe<Array<Maybe<Vote_Records_Mutation_Response>>>;
  /** update data of the table: "vote_snapshot" */
  update_vote_snapshot?: Maybe<Vote_Snapshot_Mutation_Response>;
  /** update single row of the table: "vote_snapshot" */
  update_vote_snapshot_by_pk?: Maybe<Vote_Snapshot>;
  /** update multiples rows of table: "vote_snapshot" */
  update_vote_snapshot_many?: Maybe<Array<Maybe<Vote_Snapshot_Mutation_Response>>>;
  /** update data of the table: "vote_status" */
  update_vote_status?: Maybe<Vote_Status_Mutation_Response>;
  /** update single row of the table: "vote_status" */
  update_vote_status_by_pk?: Maybe<Vote_Status>;
  /** update multiples rows of table: "vote_status" */
  update_vote_status_many?: Maybe<Array<Maybe<Vote_Status_Mutation_Response>>>;
  /** update data of the table: "vote_token_type" */
  update_vote_token_type?: Maybe<Vote_Token_Type_Mutation_Response>;
  /** update single row of the table: "vote_token_type" */
  update_vote_token_type_by_pk?: Maybe<Vote_Token_Type>;
  /** update multiples rows of table: "vote_token_type" */
  update_vote_token_type_many?: Maybe<Array<Maybe<Vote_Token_Type_Mutation_Response>>>;
  /** update data of the table: "vote_type" */
  update_vote_type?: Maybe<Vote_Type_Mutation_Response>;
  /** update single row of the table: "vote_type" */
  update_vote_type_by_pk?: Maybe<Vote_Type>;
  /** update multiples rows of table: "vote_type" */
  update_vote_type_many?: Maybe<Array<Maybe<Vote_Type_Mutation_Response>>>;
};

/** mutation root */
export type Mutation_RootDelete_Point_Transaction_DirectionsArgs = {
  where: Point_Transaction_Directions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Point_Transaction_Directions_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Point_Transaction_TypesArgs = {
  where: Point_Transaction_Types_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Point_Transaction_Types_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Point_TransactionsArgs = {
  where: Point_Transactions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Point_Transactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_User_Notification_TokensArgs = {
  where: User_Notification_Tokens_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_User_Notification_Tokens_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_User_PointsArgs = {
  where: User_Points_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_User_Points_By_PkArgs = {
  fid: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Vote_OutcomeArgs = {
  where: Vote_Outcome_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Vote_Outcome_By_PkArgs = {
  key: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Vote_Record_StatusArgs = {
  where: Vote_Record_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Vote_Record_Status_By_PkArgs = {
  key: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Vote_RecordsArgs = {
  where: Vote_Records_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Vote_Records_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Vote_SnapshotArgs = {
  where: Vote_Snapshot_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Vote_Snapshot_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Vote_StatusArgs = {
  where: Vote_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Vote_Status_By_PkArgs = {
  key: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Vote_Token_TypeArgs = {
  where: Vote_Token_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Vote_Token_Type_By_PkArgs = {
  key: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Vote_TypeArgs = {
  where: Vote_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Vote_Type_By_PkArgs = {
  key: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootInsert_Point_Transaction_DirectionsArgs = {
  objects: Array<Point_Transaction_Directions_Insert_Input>;
  on_conflict?: InputMaybe<Point_Transaction_Directions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Point_Transaction_Directions_OneArgs = {
  object: Point_Transaction_Directions_Insert_Input;
  on_conflict?: InputMaybe<Point_Transaction_Directions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Point_Transaction_TypesArgs = {
  objects: Array<Point_Transaction_Types_Insert_Input>;
  on_conflict?: InputMaybe<Point_Transaction_Types_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Point_Transaction_Types_OneArgs = {
  object: Point_Transaction_Types_Insert_Input;
  on_conflict?: InputMaybe<Point_Transaction_Types_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Point_TransactionsArgs = {
  objects: Array<Point_Transactions_Insert_Input>;
  on_conflict?: InputMaybe<Point_Transactions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Point_Transactions_OneArgs = {
  object: Point_Transactions_Insert_Input;
  on_conflict?: InputMaybe<Point_Transactions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Notification_TokensArgs = {
  objects: Array<User_Notification_Tokens_Insert_Input>;
  on_conflict?: InputMaybe<User_Notification_Tokens_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Notification_Tokens_OneArgs = {
  object: User_Notification_Tokens_Insert_Input;
  on_conflict?: InputMaybe<User_Notification_Tokens_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_PointsArgs = {
  objects: Array<User_Points_Insert_Input>;
  on_conflict?: InputMaybe<User_Points_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Points_OneArgs = {
  object: User_Points_Insert_Input;
  on_conflict?: InputMaybe<User_Points_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_OutcomeArgs = {
  objects: Array<Vote_Outcome_Insert_Input>;
  on_conflict?: InputMaybe<Vote_Outcome_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_Outcome_OneArgs = {
  object: Vote_Outcome_Insert_Input;
  on_conflict?: InputMaybe<Vote_Outcome_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_Record_StatusArgs = {
  objects: Array<Vote_Record_Status_Insert_Input>;
  on_conflict?: InputMaybe<Vote_Record_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_Record_Status_OneArgs = {
  object: Vote_Record_Status_Insert_Input;
  on_conflict?: InputMaybe<Vote_Record_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_RecordsArgs = {
  objects: Array<Vote_Records_Insert_Input>;
  on_conflict?: InputMaybe<Vote_Records_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_Records_OneArgs = {
  object: Vote_Records_Insert_Input;
  on_conflict?: InputMaybe<Vote_Records_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_SnapshotArgs = {
  objects: Array<Vote_Snapshot_Insert_Input>;
  on_conflict?: InputMaybe<Vote_Snapshot_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_Snapshot_OneArgs = {
  object: Vote_Snapshot_Insert_Input;
  on_conflict?: InputMaybe<Vote_Snapshot_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_StatusArgs = {
  objects: Array<Vote_Status_Insert_Input>;
  on_conflict?: InputMaybe<Vote_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_Status_OneArgs = {
  object: Vote_Status_Insert_Input;
  on_conflict?: InputMaybe<Vote_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_Token_TypeArgs = {
  objects: Array<Vote_Token_Type_Insert_Input>;
  on_conflict?: InputMaybe<Vote_Token_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_Token_Type_OneArgs = {
  object: Vote_Token_Type_Insert_Input;
  on_conflict?: InputMaybe<Vote_Token_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_TypeArgs = {
  objects: Array<Vote_Type_Insert_Input>;
  on_conflict?: InputMaybe<Vote_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Vote_Type_OneArgs = {
  object: Vote_Type_Insert_Input;
  on_conflict?: InputMaybe<Vote_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootPostVoteRecordArgs = {
  input: PostVoteRecordInput;
};

/** mutation root */
export type Mutation_RootUpdate_Point_Transaction_DirectionsArgs = {
  _set?: InputMaybe<Point_Transaction_Directions_Set_Input>;
  where: Point_Transaction_Directions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Point_Transaction_Directions_By_PkArgs = {
  _set?: InputMaybe<Point_Transaction_Directions_Set_Input>;
  pk_columns: Point_Transaction_Directions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Point_Transaction_Directions_ManyArgs = {
  updates: Array<Point_Transaction_Directions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Point_Transaction_TypesArgs = {
  _set?: InputMaybe<Point_Transaction_Types_Set_Input>;
  where: Point_Transaction_Types_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Point_Transaction_Types_By_PkArgs = {
  _set?: InputMaybe<Point_Transaction_Types_Set_Input>;
  pk_columns: Point_Transaction_Types_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Point_Transaction_Types_ManyArgs = {
  updates: Array<Point_Transaction_Types_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Point_TransactionsArgs = {
  _inc?: InputMaybe<Point_Transactions_Inc_Input>;
  _set?: InputMaybe<Point_Transactions_Set_Input>;
  where: Point_Transactions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Point_Transactions_By_PkArgs = {
  _inc?: InputMaybe<Point_Transactions_Inc_Input>;
  _set?: InputMaybe<Point_Transactions_Set_Input>;
  pk_columns: Point_Transactions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Point_Transactions_ManyArgs = {
  updates: Array<Point_Transactions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_User_Notification_TokensArgs = {
  _set?: InputMaybe<User_Notification_Tokens_Set_Input>;
  where: User_Notification_Tokens_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_Notification_Tokens_By_PkArgs = {
  _set?: InputMaybe<User_Notification_Tokens_Set_Input>;
  pk_columns: User_Notification_Tokens_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_Notification_Tokens_ManyArgs = {
  updates: Array<User_Notification_Tokens_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_User_PointsArgs = {
  _inc?: InputMaybe<User_Points_Inc_Input>;
  _set?: InputMaybe<User_Points_Set_Input>;
  where: User_Points_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_Points_By_PkArgs = {
  _inc?: InputMaybe<User_Points_Inc_Input>;
  _set?: InputMaybe<User_Points_Set_Input>;
  pk_columns: User_Points_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_Points_ManyArgs = {
  updates: Array<User_Points_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_OutcomeArgs = {
  _set?: InputMaybe<Vote_Outcome_Set_Input>;
  where: Vote_Outcome_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Outcome_By_PkArgs = {
  _set?: InputMaybe<Vote_Outcome_Set_Input>;
  pk_columns: Vote_Outcome_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Outcome_ManyArgs = {
  updates: Array<Vote_Outcome_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Record_StatusArgs = {
  _set?: InputMaybe<Vote_Record_Status_Set_Input>;
  where: Vote_Record_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Record_Status_By_PkArgs = {
  _set?: InputMaybe<Vote_Record_Status_Set_Input>;
  pk_columns: Vote_Record_Status_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Record_Status_ManyArgs = {
  updates: Array<Vote_Record_Status_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_RecordsArgs = {
  _inc?: InputMaybe<Vote_Records_Inc_Input>;
  _set?: InputMaybe<Vote_Records_Set_Input>;
  where: Vote_Records_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Records_By_PkArgs = {
  _inc?: InputMaybe<Vote_Records_Inc_Input>;
  _set?: InputMaybe<Vote_Records_Set_Input>;
  pk_columns: Vote_Records_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Records_ManyArgs = {
  updates: Array<Vote_Records_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_SnapshotArgs = {
  _inc?: InputMaybe<Vote_Snapshot_Inc_Input>;
  _set?: InputMaybe<Vote_Snapshot_Set_Input>;
  where: Vote_Snapshot_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Snapshot_By_PkArgs = {
  _inc?: InputMaybe<Vote_Snapshot_Inc_Input>;
  _set?: InputMaybe<Vote_Snapshot_Set_Input>;
  pk_columns: Vote_Snapshot_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Snapshot_ManyArgs = {
  updates: Array<Vote_Snapshot_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_StatusArgs = {
  _set?: InputMaybe<Vote_Status_Set_Input>;
  where: Vote_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Status_By_PkArgs = {
  _set?: InputMaybe<Vote_Status_Set_Input>;
  pk_columns: Vote_Status_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Status_ManyArgs = {
  updates: Array<Vote_Status_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Token_TypeArgs = {
  _set?: InputMaybe<Vote_Token_Type_Set_Input>;
  where: Vote_Token_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Token_Type_By_PkArgs = {
  _set?: InputMaybe<Vote_Token_Type_Set_Input>;
  pk_columns: Vote_Token_Type_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Token_Type_ManyArgs = {
  updates: Array<Vote_Token_Type_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_TypeArgs = {
  _set?: InputMaybe<Vote_Type_Set_Input>;
  where: Vote_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Type_By_PkArgs = {
  _set?: InputMaybe<Vote_Type_Set_Input>;
  pk_columns: Vote_Type_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Vote_Type_ManyArgs = {
  updates: Array<Vote_Type_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** columns and relationships of "point_transaction_directions" */
export type Point_Transaction_Directions = {
  __typename?: 'point_transaction_directions';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

/** aggregated selection of "point_transaction_directions" */
export type Point_Transaction_Directions_Aggregate = {
  __typename?: 'point_transaction_directions_aggregate';
  aggregate?: Maybe<Point_Transaction_Directions_Aggregate_Fields>;
  nodes: Array<Point_Transaction_Directions>;
};

/** aggregate fields of "point_transaction_directions" */
export type Point_Transaction_Directions_Aggregate_Fields = {
  __typename?: 'point_transaction_directions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Point_Transaction_Directions_Max_Fields>;
  min?: Maybe<Point_Transaction_Directions_Min_Fields>;
};

/** aggregate fields of "point_transaction_directions" */
export type Point_Transaction_Directions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Point_Transaction_Directions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "point_transaction_directions". All fields are combined with a logical 'AND'. */
export type Point_Transaction_Directions_Bool_Exp = {
  _and?: InputMaybe<Array<Point_Transaction_Directions_Bool_Exp>>;
  _not?: InputMaybe<Point_Transaction_Directions_Bool_Exp>;
  _or?: InputMaybe<Array<Point_Transaction_Directions_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "point_transaction_directions" */
export enum Point_Transaction_Directions_Constraint {
  /** unique or primary key constraint on columns "id" */
  PointTransactionDirectionsPkey = 'point_transaction_directions_pkey',
}

/** input type for inserting data into table "point_transaction_directions" */
export type Point_Transaction_Directions_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Point_Transaction_Directions_Max_Fields = {
  __typename?: 'point_transaction_directions_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Point_Transaction_Directions_Min_Fields = {
  __typename?: 'point_transaction_directions_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "point_transaction_directions" */
export type Point_Transaction_Directions_Mutation_Response = {
  __typename?: 'point_transaction_directions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Point_Transaction_Directions>;
};

/** on_conflict condition type for table "point_transaction_directions" */
export type Point_Transaction_Directions_On_Conflict = {
  constraint: Point_Transaction_Directions_Constraint;
  update_columns?: Array<Point_Transaction_Directions_Update_Column>;
  where?: InputMaybe<Point_Transaction_Directions_Bool_Exp>;
};

/** Ordering options when selecting data from "point_transaction_directions". */
export type Point_Transaction_Directions_Order_By = {
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
};

/** primary key columns input for table: point_transaction_directions */
export type Point_Transaction_Directions_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "point_transaction_directions" */
export enum Point_Transaction_Directions_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "point_transaction_directions" */
export type Point_Transaction_Directions_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "point_transaction_directions" */
export type Point_Transaction_Directions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Point_Transaction_Directions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Point_Transaction_Directions_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "point_transaction_directions" */
export enum Point_Transaction_Directions_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

export type Point_Transaction_Directions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Point_Transaction_Directions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Point_Transaction_Directions_Bool_Exp;
};

/** columns and relationships of "point_transaction_types" */
export type Point_Transaction_Types = {
  __typename?: 'point_transaction_types';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

/** aggregated selection of "point_transaction_types" */
export type Point_Transaction_Types_Aggregate = {
  __typename?: 'point_transaction_types_aggregate';
  aggregate?: Maybe<Point_Transaction_Types_Aggregate_Fields>;
  nodes: Array<Point_Transaction_Types>;
};

/** aggregate fields of "point_transaction_types" */
export type Point_Transaction_Types_Aggregate_Fields = {
  __typename?: 'point_transaction_types_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Point_Transaction_Types_Max_Fields>;
  min?: Maybe<Point_Transaction_Types_Min_Fields>;
};

/** aggregate fields of "point_transaction_types" */
export type Point_Transaction_Types_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Point_Transaction_Types_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "point_transaction_types". All fields are combined with a logical 'AND'. */
export type Point_Transaction_Types_Bool_Exp = {
  _and?: InputMaybe<Array<Point_Transaction_Types_Bool_Exp>>;
  _not?: InputMaybe<Point_Transaction_Types_Bool_Exp>;
  _or?: InputMaybe<Array<Point_Transaction_Types_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "point_transaction_types" */
export enum Point_Transaction_Types_Constraint {
  /** unique or primary key constraint on columns "id" */
  PointTransactionTypesPkey = 'point_transaction_types_pkey',
}

/** input type for inserting data into table "point_transaction_types" */
export type Point_Transaction_Types_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Point_Transaction_Types_Max_Fields = {
  __typename?: 'point_transaction_types_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Point_Transaction_Types_Min_Fields = {
  __typename?: 'point_transaction_types_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "point_transaction_types" */
export type Point_Transaction_Types_Mutation_Response = {
  __typename?: 'point_transaction_types_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Point_Transaction_Types>;
};

/** on_conflict condition type for table "point_transaction_types" */
export type Point_Transaction_Types_On_Conflict = {
  constraint: Point_Transaction_Types_Constraint;
  update_columns?: Array<Point_Transaction_Types_Update_Column>;
  where?: InputMaybe<Point_Transaction_Types_Bool_Exp>;
};

/** Ordering options when selecting data from "point_transaction_types". */
export type Point_Transaction_Types_Order_By = {
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
};

/** primary key columns input for table: point_transaction_types */
export type Point_Transaction_Types_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "point_transaction_types" */
export enum Point_Transaction_Types_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "point_transaction_types" */
export type Point_Transaction_Types_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "point_transaction_types" */
export type Point_Transaction_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Point_Transaction_Types_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Point_Transaction_Types_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "point_transaction_types" */
export enum Point_Transaction_Types_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

export type Point_Transaction_Types_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Point_Transaction_Types_Set_Input>;
  /** filter the rows which have to be updated */
  where: Point_Transaction_Types_Bool_Exp;
};

/** columns and relationships of "point_transactions" */
export type Point_Transactions = {
  __typename?: 'point_transactions';
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  direction: Scalars['String']['output'];
  fid: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  mindshare?: Maybe<Scalars['numeric']['output']>;
  points: Scalars['numeric']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  usdcAmount?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "point_transactions" */
export type Point_Transactions_Aggregate = {
  __typename?: 'point_transactions_aggregate';
  aggregate?: Maybe<Point_Transactions_Aggregate_Fields>;
  nodes: Array<Point_Transactions>;
};

/** aggregate fields of "point_transactions" */
export type Point_Transactions_Aggregate_Fields = {
  __typename?: 'point_transactions_aggregate_fields';
  avg?: Maybe<Point_Transactions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Point_Transactions_Max_Fields>;
  min?: Maybe<Point_Transactions_Min_Fields>;
  stddev?: Maybe<Point_Transactions_Stddev_Fields>;
  stddev_pop?: Maybe<Point_Transactions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Point_Transactions_Stddev_Samp_Fields>;
  sum?: Maybe<Point_Transactions_Sum_Fields>;
  var_pop?: Maybe<Point_Transactions_Var_Pop_Fields>;
  var_samp?: Maybe<Point_Transactions_Var_Samp_Fields>;
  variance?: Maybe<Point_Transactions_Variance_Fields>;
};

/** aggregate fields of "point_transactions" */
export type Point_Transactions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Point_Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Point_Transactions_Avg_Fields = {
  __typename?: 'point_transactions_avg_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  usdcAmount?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "point_transactions". All fields are combined with a logical 'AND'. */
export type Point_Transactions_Bool_Exp = {
  _and?: InputMaybe<Array<Point_Transactions_Bool_Exp>>;
  _not?: InputMaybe<Point_Transactions_Bool_Exp>;
  _or?: InputMaybe<Array<Point_Transactions_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  date?: InputMaybe<Date_Comparison_Exp>;
  direction?: InputMaybe<String_Comparison_Exp>;
  fid?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mindshare?: InputMaybe<Numeric_Comparison_Exp>;
  points?: InputMaybe<Numeric_Comparison_Exp>;
  reason?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  usdcAmount?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "point_transactions" */
export enum Point_Transactions_Constraint {
  /** unique or primary key constraint on columns "id" */
  PointTransactionsPkey = 'point_transactions_pkey',
}

/** input type for incrementing numeric columns in table "point_transactions" */
export type Point_Transactions_Inc_Input = {
  mindshare?: InputMaybe<Scalars['numeric']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  usdcAmount?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "point_transactions" */
export type Point_Transactions_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  fid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mindshare?: InputMaybe<Scalars['numeric']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  usdcAmount?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Point_Transactions_Max_Fields = {
  __typename?: 'point_transactions_max_fields';
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  direction?: Maybe<Scalars['String']['output']>;
  fid?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mindshare?: Maybe<Scalars['numeric']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  usdcAmount?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Point_Transactions_Min_Fields = {
  __typename?: 'point_transactions_min_fields';
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  date?: Maybe<Scalars['date']['output']>;
  direction?: Maybe<Scalars['String']['output']>;
  fid?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mindshare?: Maybe<Scalars['numeric']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  usdcAmount?: Maybe<Scalars['numeric']['output']>;
};

/** response of any mutation on the table "point_transactions" */
export type Point_Transactions_Mutation_Response = {
  __typename?: 'point_transactions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Point_Transactions>;
};

/** on_conflict condition type for table "point_transactions" */
export type Point_Transactions_On_Conflict = {
  constraint: Point_Transactions_Constraint;
  update_columns?: Array<Point_Transactions_Update_Column>;
  where?: InputMaybe<Point_Transactions_Bool_Exp>;
};

/** Ordering options when selecting data from "point_transactions". */
export type Point_Transactions_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  fid?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mindshare?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  usdcAmount?: InputMaybe<Order_By>;
};

/** primary key columns input for table: point_transactions */
export type Point_Transactions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "point_transactions" */
export enum Point_Transactions_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Date = 'date',
  /** column name */
  Direction = 'direction',
  /** column name */
  Fid = 'fid',
  /** column name */
  Id = 'id',
  /** column name */
  Mindshare = 'mindshare',
  /** column name */
  Points = 'points',
  /** column name */
  Reason = 'reason',
  /** column name */
  Type = 'type',
  /** column name */
  UsdcAmount = 'usdcAmount',
}

/** input type for updating data in table "point_transactions" */
export type Point_Transactions_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  fid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mindshare?: InputMaybe<Scalars['numeric']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  usdcAmount?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate stddev on columns */
export type Point_Transactions_Stddev_Fields = {
  __typename?: 'point_transactions_stddev_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  usdcAmount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Point_Transactions_Stddev_Pop_Fields = {
  __typename?: 'point_transactions_stddev_pop_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  usdcAmount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Point_Transactions_Stddev_Samp_Fields = {
  __typename?: 'point_transactions_stddev_samp_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  usdcAmount?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "point_transactions" */
export type Point_Transactions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Point_Transactions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Point_Transactions_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  date?: InputMaybe<Scalars['date']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  fid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mindshare?: InputMaybe<Scalars['numeric']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  usdcAmount?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Point_Transactions_Sum_Fields = {
  __typename?: 'point_transactions_sum_fields';
  mindshare?: Maybe<Scalars['numeric']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  usdcAmount?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "point_transactions" */
export enum Point_Transactions_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Date = 'date',
  /** column name */
  Direction = 'direction',
  /** column name */
  Fid = 'fid',
  /** column name */
  Id = 'id',
  /** column name */
  Mindshare = 'mindshare',
  /** column name */
  Points = 'points',
  /** column name */
  Reason = 'reason',
  /** column name */
  Type = 'type',
  /** column name */
  UsdcAmount = 'usdcAmount',
}

export type Point_Transactions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Point_Transactions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Point_Transactions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Point_Transactions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Point_Transactions_Var_Pop_Fields = {
  __typename?: 'point_transactions_var_pop_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  usdcAmount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Point_Transactions_Var_Samp_Fields = {
  __typename?: 'point_transactions_var_samp_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  usdcAmount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Point_Transactions_Variance_Fields = {
  __typename?: 'point_transactions_variance_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  usdcAmount?: Maybe<Scalars['Float']['output']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** getCryptoPrice */
  getCryptoPrice?: Maybe<CryptoPriceOutput>;
  getMindshareByFid?: Maybe<MindshareResult>;
  getTopMindshare?: Maybe<Array<Maybe<MindshareResult>>>;
  /** fetch data from the table: "point_transaction_directions" */
  point_transaction_directions: Array<Point_Transaction_Directions>;
  /** fetch aggregated fields from the table: "point_transaction_directions" */
  point_transaction_directions_aggregate: Point_Transaction_Directions_Aggregate;
  /** fetch data from the table: "point_transaction_directions" using primary key columns */
  point_transaction_directions_by_pk?: Maybe<Point_Transaction_Directions>;
  /** fetch data from the table: "point_transaction_types" */
  point_transaction_types: Array<Point_Transaction_Types>;
  /** fetch aggregated fields from the table: "point_transaction_types" */
  point_transaction_types_aggregate: Point_Transaction_Types_Aggregate;
  /** fetch data from the table: "point_transaction_types" using primary key columns */
  point_transaction_types_by_pk?: Maybe<Point_Transaction_Types>;
  /** fetch data from the table: "point_transactions" */
  point_transactions: Array<Point_Transactions>;
  /** fetch aggregated fields from the table: "point_transactions" */
  point_transactions_aggregate: Point_Transactions_Aggregate;
  /** fetch data from the table: "point_transactions" using primary key columns */
  point_transactions_by_pk?: Maybe<Point_Transactions>;
  user?: Maybe<User>;
  /** fetch data from the table: "user_notification_tokens" */
  user_notification_tokens: Array<User_Notification_Tokens>;
  /** fetch aggregated fields from the table: "user_notification_tokens" */
  user_notification_tokens_aggregate: User_Notification_Tokens_Aggregate;
  /** fetch data from the table: "user_notification_tokens" using primary key columns */
  user_notification_tokens_by_pk?: Maybe<User_Notification_Tokens>;
  /** fetch data from the table: "user_points" */
  user_points: Array<User_Points>;
  /** fetch aggregated fields from the table: "user_points" */
  user_points_aggregate: User_Points_Aggregate;
  /** fetch data from the table: "user_points" using primary key columns */
  user_points_by_pk?: Maybe<User_Points>;
  /** fetch data from the table: "vote_outcome" */
  vote_outcome: Array<Vote_Outcome>;
  /** fetch aggregated fields from the table: "vote_outcome" */
  vote_outcome_aggregate: Vote_Outcome_Aggregate;
  /** fetch data from the table: "vote_outcome" using primary key columns */
  vote_outcome_by_pk?: Maybe<Vote_Outcome>;
  /** fetch data from the table: "vote_record_status" */
  vote_record_status: Array<Vote_Record_Status>;
  /** fetch aggregated fields from the table: "vote_record_status" */
  vote_record_status_aggregate: Vote_Record_Status_Aggregate;
  /** fetch data from the table: "vote_record_status" using primary key columns */
  vote_record_status_by_pk?: Maybe<Vote_Record_Status>;
  /** fetch data from the table: "vote_records" */
  vote_records: Array<Vote_Records>;
  /** fetch aggregated fields from the table: "vote_records" */
  vote_records_aggregate: Vote_Records_Aggregate;
  /** fetch data from the table: "vote_records" using primary key columns */
  vote_records_by_pk?: Maybe<Vote_Records>;
  /** fetch data from the table: "vote_snapshot" */
  vote_snapshot: Array<Vote_Snapshot>;
  /** fetch aggregated fields from the table: "vote_snapshot" */
  vote_snapshot_aggregate: Vote_Snapshot_Aggregate;
  /** fetch data from the table: "vote_snapshot" using primary key columns */
  vote_snapshot_by_pk?: Maybe<Vote_Snapshot>;
  /** fetch data from the table: "vote_status" */
  vote_status: Array<Vote_Status>;
  /** fetch aggregated fields from the table: "vote_status" */
  vote_status_aggregate: Vote_Status_Aggregate;
  /** fetch data from the table: "vote_status" using primary key columns */
  vote_status_by_pk?: Maybe<Vote_Status>;
  /** fetch data from the table: "vote_token_type" */
  vote_token_type: Array<Vote_Token_Type>;
  /** fetch aggregated fields from the table: "vote_token_type" */
  vote_token_type_aggregate: Vote_Token_Type_Aggregate;
  /** fetch data from the table: "vote_token_type" using primary key columns */
  vote_token_type_by_pk?: Maybe<Vote_Token_Type>;
  /** fetch data from the table: "vote_type" */
  vote_type: Array<Vote_Type>;
  /** fetch aggregated fields from the table: "vote_type" */
  vote_type_aggregate: Vote_Type_Aggregate;
  /** fetch data from the table: "vote_type" using primary key columns */
  vote_type_by_pk?: Maybe<Vote_Type>;
};

export type Query_RootGetCryptoPriceArgs = {
  input: GetCryptoPriceInput;
};

export type Query_RootGetMindshareByFidArgs = {
  input: GetMindshareByFidInput;
};

export type Query_RootGetTopMindshareArgs = {
  input: GetMindshareInput;
};

export type Query_RootPoint_Transaction_DirectionsArgs = {
  distinct_on?: InputMaybe<Array<Point_Transaction_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transaction_Directions_Order_By>>;
  where?: InputMaybe<Point_Transaction_Directions_Bool_Exp>;
};

export type Query_RootPoint_Transaction_Directions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Point_Transaction_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transaction_Directions_Order_By>>;
  where?: InputMaybe<Point_Transaction_Directions_Bool_Exp>;
};

export type Query_RootPoint_Transaction_Directions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootPoint_Transaction_TypesArgs = {
  distinct_on?: InputMaybe<Array<Point_Transaction_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transaction_Types_Order_By>>;
  where?: InputMaybe<Point_Transaction_Types_Bool_Exp>;
};

export type Query_RootPoint_Transaction_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Point_Transaction_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transaction_Types_Order_By>>;
  where?: InputMaybe<Point_Transaction_Types_Bool_Exp>;
};

export type Query_RootPoint_Transaction_Types_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootPoint_TransactionsArgs = {
  distinct_on?: InputMaybe<Array<Point_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transactions_Order_By>>;
  where?: InputMaybe<Point_Transactions_Bool_Exp>;
};

export type Query_RootPoint_Transactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Point_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transactions_Order_By>>;
  where?: InputMaybe<Point_Transactions_Bool_Exp>;
};

export type Query_RootPoint_Transactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootUserArgs = {
  fid: Scalars['String']['input'];
};

export type Query_RootUser_Notification_TokensArgs = {
  distinct_on?: InputMaybe<Array<User_Notification_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Notification_Tokens_Order_By>>;
  where?: InputMaybe<User_Notification_Tokens_Bool_Exp>;
};

export type Query_RootUser_Notification_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Notification_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Notification_Tokens_Order_By>>;
  where?: InputMaybe<User_Notification_Tokens_Bool_Exp>;
};

export type Query_RootUser_Notification_Tokens_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootUser_PointsArgs = {
  distinct_on?: InputMaybe<Array<User_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Points_Order_By>>;
  where?: InputMaybe<User_Points_Bool_Exp>;
};

export type Query_RootUser_Points_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Points_Order_By>>;
  where?: InputMaybe<User_Points_Bool_Exp>;
};

export type Query_RootUser_Points_By_PkArgs = {
  fid: Scalars['String']['input'];
};

export type Query_RootVote_OutcomeArgs = {
  distinct_on?: InputMaybe<Array<Vote_Outcome_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Outcome_Order_By>>;
  where?: InputMaybe<Vote_Outcome_Bool_Exp>;
};

export type Query_RootVote_Outcome_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Outcome_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Outcome_Order_By>>;
  where?: InputMaybe<Vote_Outcome_Bool_Exp>;
};

export type Query_RootVote_Outcome_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Query_RootVote_Record_StatusArgs = {
  distinct_on?: InputMaybe<Array<Vote_Record_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Record_Status_Order_By>>;
  where?: InputMaybe<Vote_Record_Status_Bool_Exp>;
};

export type Query_RootVote_Record_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Record_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Record_Status_Order_By>>;
  where?: InputMaybe<Vote_Record_Status_Bool_Exp>;
};

export type Query_RootVote_Record_Status_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Query_RootVote_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Vote_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Records_Order_By>>;
  where?: InputMaybe<Vote_Records_Bool_Exp>;
};

export type Query_RootVote_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Records_Order_By>>;
  where?: InputMaybe<Vote_Records_Bool_Exp>;
};

export type Query_RootVote_Records_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootVote_SnapshotArgs = {
  distinct_on?: InputMaybe<Array<Vote_Snapshot_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Snapshot_Order_By>>;
  where?: InputMaybe<Vote_Snapshot_Bool_Exp>;
};

export type Query_RootVote_Snapshot_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Snapshot_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Snapshot_Order_By>>;
  where?: InputMaybe<Vote_Snapshot_Bool_Exp>;
};

export type Query_RootVote_Snapshot_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Query_RootVote_StatusArgs = {
  distinct_on?: InputMaybe<Array<Vote_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Status_Order_By>>;
  where?: InputMaybe<Vote_Status_Bool_Exp>;
};

export type Query_RootVote_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Status_Order_By>>;
  where?: InputMaybe<Vote_Status_Bool_Exp>;
};

export type Query_RootVote_Status_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Query_RootVote_Token_TypeArgs = {
  distinct_on?: InputMaybe<Array<Vote_Token_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Token_Type_Order_By>>;
  where?: InputMaybe<Vote_Token_Type_Bool_Exp>;
};

export type Query_RootVote_Token_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Token_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Token_Type_Order_By>>;
  where?: InputMaybe<Vote_Token_Type_Bool_Exp>;
};

export type Query_RootVote_Token_Type_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Query_RootVote_TypeArgs = {
  distinct_on?: InputMaybe<Array<Vote_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Type_Order_By>>;
  where?: InputMaybe<Vote_Type_Bool_Exp>;
};

export type Query_RootVote_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Type_Order_By>>;
  where?: InputMaybe<Vote_Type_Bool_Exp>;
};

export type Query_RootVote_Type_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "point_transaction_directions" */
  point_transaction_directions: Array<Point_Transaction_Directions>;
  /** fetch aggregated fields from the table: "point_transaction_directions" */
  point_transaction_directions_aggregate: Point_Transaction_Directions_Aggregate;
  /** fetch data from the table: "point_transaction_directions" using primary key columns */
  point_transaction_directions_by_pk?: Maybe<Point_Transaction_Directions>;
  /** fetch data from the table in a streaming manner: "point_transaction_directions" */
  point_transaction_directions_stream: Array<Point_Transaction_Directions>;
  /** fetch data from the table: "point_transaction_types" */
  point_transaction_types: Array<Point_Transaction_Types>;
  /** fetch aggregated fields from the table: "point_transaction_types" */
  point_transaction_types_aggregate: Point_Transaction_Types_Aggregate;
  /** fetch data from the table: "point_transaction_types" using primary key columns */
  point_transaction_types_by_pk?: Maybe<Point_Transaction_Types>;
  /** fetch data from the table in a streaming manner: "point_transaction_types" */
  point_transaction_types_stream: Array<Point_Transaction_Types>;
  /** fetch data from the table: "point_transactions" */
  point_transactions: Array<Point_Transactions>;
  /** fetch aggregated fields from the table: "point_transactions" */
  point_transactions_aggregate: Point_Transactions_Aggregate;
  /** fetch data from the table: "point_transactions" using primary key columns */
  point_transactions_by_pk?: Maybe<Point_Transactions>;
  /** fetch data from the table in a streaming manner: "point_transactions" */
  point_transactions_stream: Array<Point_Transactions>;
  /** fetch data from the table: "user_notification_tokens" */
  user_notification_tokens: Array<User_Notification_Tokens>;
  /** fetch aggregated fields from the table: "user_notification_tokens" */
  user_notification_tokens_aggregate: User_Notification_Tokens_Aggregate;
  /** fetch data from the table: "user_notification_tokens" using primary key columns */
  user_notification_tokens_by_pk?: Maybe<User_Notification_Tokens>;
  /** fetch data from the table in a streaming manner: "user_notification_tokens" */
  user_notification_tokens_stream: Array<User_Notification_Tokens>;
  /** fetch data from the table: "user_points" */
  user_points: Array<User_Points>;
  /** fetch aggregated fields from the table: "user_points" */
  user_points_aggregate: User_Points_Aggregate;
  /** fetch data from the table: "user_points" using primary key columns */
  user_points_by_pk?: Maybe<User_Points>;
  /** fetch data from the table in a streaming manner: "user_points" */
  user_points_stream: Array<User_Points>;
  /** fetch data from the table: "vote_outcome" */
  vote_outcome: Array<Vote_Outcome>;
  /** fetch aggregated fields from the table: "vote_outcome" */
  vote_outcome_aggregate: Vote_Outcome_Aggregate;
  /** fetch data from the table: "vote_outcome" using primary key columns */
  vote_outcome_by_pk?: Maybe<Vote_Outcome>;
  /** fetch data from the table in a streaming manner: "vote_outcome" */
  vote_outcome_stream: Array<Vote_Outcome>;
  /** fetch data from the table: "vote_record_status" */
  vote_record_status: Array<Vote_Record_Status>;
  /** fetch aggregated fields from the table: "vote_record_status" */
  vote_record_status_aggregate: Vote_Record_Status_Aggregate;
  /** fetch data from the table: "vote_record_status" using primary key columns */
  vote_record_status_by_pk?: Maybe<Vote_Record_Status>;
  /** fetch data from the table in a streaming manner: "vote_record_status" */
  vote_record_status_stream: Array<Vote_Record_Status>;
  /** fetch data from the table: "vote_records" */
  vote_records: Array<Vote_Records>;
  /** fetch aggregated fields from the table: "vote_records" */
  vote_records_aggregate: Vote_Records_Aggregate;
  /** fetch data from the table: "vote_records" using primary key columns */
  vote_records_by_pk?: Maybe<Vote_Records>;
  /** fetch data from the table in a streaming manner: "vote_records" */
  vote_records_stream: Array<Vote_Records>;
  /** fetch data from the table: "vote_snapshot" */
  vote_snapshot: Array<Vote_Snapshot>;
  /** fetch aggregated fields from the table: "vote_snapshot" */
  vote_snapshot_aggregate: Vote_Snapshot_Aggregate;
  /** fetch data from the table: "vote_snapshot" using primary key columns */
  vote_snapshot_by_pk?: Maybe<Vote_Snapshot>;
  /** fetch data from the table in a streaming manner: "vote_snapshot" */
  vote_snapshot_stream: Array<Vote_Snapshot>;
  /** fetch data from the table: "vote_status" */
  vote_status: Array<Vote_Status>;
  /** fetch aggregated fields from the table: "vote_status" */
  vote_status_aggregate: Vote_Status_Aggregate;
  /** fetch data from the table: "vote_status" using primary key columns */
  vote_status_by_pk?: Maybe<Vote_Status>;
  /** fetch data from the table in a streaming manner: "vote_status" */
  vote_status_stream: Array<Vote_Status>;
  /** fetch data from the table: "vote_token_type" */
  vote_token_type: Array<Vote_Token_Type>;
  /** fetch aggregated fields from the table: "vote_token_type" */
  vote_token_type_aggregate: Vote_Token_Type_Aggregate;
  /** fetch data from the table: "vote_token_type" using primary key columns */
  vote_token_type_by_pk?: Maybe<Vote_Token_Type>;
  /** fetch data from the table in a streaming manner: "vote_token_type" */
  vote_token_type_stream: Array<Vote_Token_Type>;
  /** fetch data from the table: "vote_type" */
  vote_type: Array<Vote_Type>;
  /** fetch aggregated fields from the table: "vote_type" */
  vote_type_aggregate: Vote_Type_Aggregate;
  /** fetch data from the table: "vote_type" using primary key columns */
  vote_type_by_pk?: Maybe<Vote_Type>;
  /** fetch data from the table in a streaming manner: "vote_type" */
  vote_type_stream: Array<Vote_Type>;
};

export type Subscription_RootPoint_Transaction_DirectionsArgs = {
  distinct_on?: InputMaybe<Array<Point_Transaction_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transaction_Directions_Order_By>>;
  where?: InputMaybe<Point_Transaction_Directions_Bool_Exp>;
};

export type Subscription_RootPoint_Transaction_Directions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Point_Transaction_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transaction_Directions_Order_By>>;
  where?: InputMaybe<Point_Transaction_Directions_Bool_Exp>;
};

export type Subscription_RootPoint_Transaction_Directions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootPoint_Transaction_Directions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Point_Transaction_Directions_Stream_Cursor_Input>>;
  where?: InputMaybe<Point_Transaction_Directions_Bool_Exp>;
};

export type Subscription_RootPoint_Transaction_TypesArgs = {
  distinct_on?: InputMaybe<Array<Point_Transaction_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transaction_Types_Order_By>>;
  where?: InputMaybe<Point_Transaction_Types_Bool_Exp>;
};

export type Subscription_RootPoint_Transaction_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Point_Transaction_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transaction_Types_Order_By>>;
  where?: InputMaybe<Point_Transaction_Types_Bool_Exp>;
};

export type Subscription_RootPoint_Transaction_Types_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootPoint_Transaction_Types_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Point_Transaction_Types_Stream_Cursor_Input>>;
  where?: InputMaybe<Point_Transaction_Types_Bool_Exp>;
};

export type Subscription_RootPoint_TransactionsArgs = {
  distinct_on?: InputMaybe<Array<Point_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transactions_Order_By>>;
  where?: InputMaybe<Point_Transactions_Bool_Exp>;
};

export type Subscription_RootPoint_Transactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Point_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Transactions_Order_By>>;
  where?: InputMaybe<Point_Transactions_Bool_Exp>;
};

export type Subscription_RootPoint_Transactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootPoint_Transactions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Point_Transactions_Stream_Cursor_Input>>;
  where?: InputMaybe<Point_Transactions_Bool_Exp>;
};

export type Subscription_RootUser_Notification_TokensArgs = {
  distinct_on?: InputMaybe<Array<User_Notification_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Notification_Tokens_Order_By>>;
  where?: InputMaybe<User_Notification_Tokens_Bool_Exp>;
};

export type Subscription_RootUser_Notification_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Notification_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Notification_Tokens_Order_By>>;
  where?: InputMaybe<User_Notification_Tokens_Bool_Exp>;
};

export type Subscription_RootUser_Notification_Tokens_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootUser_Notification_Tokens_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Notification_Tokens_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Notification_Tokens_Bool_Exp>;
};

export type Subscription_RootUser_PointsArgs = {
  distinct_on?: InputMaybe<Array<User_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Points_Order_By>>;
  where?: InputMaybe<User_Points_Bool_Exp>;
};

export type Subscription_RootUser_Points_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Points_Order_By>>;
  where?: InputMaybe<User_Points_Bool_Exp>;
};

export type Subscription_RootUser_Points_By_PkArgs = {
  fid: Scalars['String']['input'];
};

export type Subscription_RootUser_Points_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Points_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Points_Bool_Exp>;
};

export type Subscription_RootVote_OutcomeArgs = {
  distinct_on?: InputMaybe<Array<Vote_Outcome_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Outcome_Order_By>>;
  where?: InputMaybe<Vote_Outcome_Bool_Exp>;
};

export type Subscription_RootVote_Outcome_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Outcome_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Outcome_Order_By>>;
  where?: InputMaybe<Vote_Outcome_Bool_Exp>;
};

export type Subscription_RootVote_Outcome_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Subscription_RootVote_Outcome_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vote_Outcome_Stream_Cursor_Input>>;
  where?: InputMaybe<Vote_Outcome_Bool_Exp>;
};

export type Subscription_RootVote_Record_StatusArgs = {
  distinct_on?: InputMaybe<Array<Vote_Record_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Record_Status_Order_By>>;
  where?: InputMaybe<Vote_Record_Status_Bool_Exp>;
};

export type Subscription_RootVote_Record_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Record_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Record_Status_Order_By>>;
  where?: InputMaybe<Vote_Record_Status_Bool_Exp>;
};

export type Subscription_RootVote_Record_Status_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Subscription_RootVote_Record_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vote_Record_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Vote_Record_Status_Bool_Exp>;
};

export type Subscription_RootVote_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Vote_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Records_Order_By>>;
  where?: InputMaybe<Vote_Records_Bool_Exp>;
};

export type Subscription_RootVote_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Records_Order_By>>;
  where?: InputMaybe<Vote_Records_Bool_Exp>;
};

export type Subscription_RootVote_Records_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootVote_Records_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vote_Records_Stream_Cursor_Input>>;
  where?: InputMaybe<Vote_Records_Bool_Exp>;
};

export type Subscription_RootVote_SnapshotArgs = {
  distinct_on?: InputMaybe<Array<Vote_Snapshot_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Snapshot_Order_By>>;
  where?: InputMaybe<Vote_Snapshot_Bool_Exp>;
};

export type Subscription_RootVote_Snapshot_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Snapshot_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Snapshot_Order_By>>;
  where?: InputMaybe<Vote_Snapshot_Bool_Exp>;
};

export type Subscription_RootVote_Snapshot_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_RootVote_Snapshot_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vote_Snapshot_Stream_Cursor_Input>>;
  where?: InputMaybe<Vote_Snapshot_Bool_Exp>;
};

export type Subscription_RootVote_StatusArgs = {
  distinct_on?: InputMaybe<Array<Vote_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Status_Order_By>>;
  where?: InputMaybe<Vote_Status_Bool_Exp>;
};

export type Subscription_RootVote_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Status_Order_By>>;
  where?: InputMaybe<Vote_Status_Bool_Exp>;
};

export type Subscription_RootVote_Status_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Subscription_RootVote_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vote_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Vote_Status_Bool_Exp>;
};

export type Subscription_RootVote_Token_TypeArgs = {
  distinct_on?: InputMaybe<Array<Vote_Token_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Token_Type_Order_By>>;
  where?: InputMaybe<Vote_Token_Type_Bool_Exp>;
};

export type Subscription_RootVote_Token_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Token_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Token_Type_Order_By>>;
  where?: InputMaybe<Vote_Token_Type_Bool_Exp>;
};

export type Subscription_RootVote_Token_Type_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Subscription_RootVote_Token_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vote_Token_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Vote_Token_Type_Bool_Exp>;
};

export type Subscription_RootVote_TypeArgs = {
  distinct_on?: InputMaybe<Array<Vote_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Type_Order_By>>;
  where?: InputMaybe<Vote_Type_Bool_Exp>;
};

export type Subscription_RootVote_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vote_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Type_Order_By>>;
  where?: InputMaybe<Vote_Type_Bool_Exp>;
};

export type Subscription_RootVote_Type_By_PkArgs = {
  key: Scalars['String']['input'];
};

export type Subscription_RootVote_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vote_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Vote_Type_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user_notification_tokens" */
export type User_Notification_Tokens = {
  __typename?: 'user_notification_tokens';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  provider: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  url: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

/** aggregated selection of "user_notification_tokens" */
export type User_Notification_Tokens_Aggregate = {
  __typename?: 'user_notification_tokens_aggregate';
  aggregate?: Maybe<User_Notification_Tokens_Aggregate_Fields>;
  nodes: Array<User_Notification_Tokens>;
};

/** aggregate fields of "user_notification_tokens" */
export type User_Notification_Tokens_Aggregate_Fields = {
  __typename?: 'user_notification_tokens_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Notification_Tokens_Max_Fields>;
  min?: Maybe<User_Notification_Tokens_Min_Fields>;
};

/** aggregate fields of "user_notification_tokens" */
export type User_Notification_Tokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Notification_Tokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "user_notification_tokens". All fields are combined with a logical 'AND'. */
export type User_Notification_Tokens_Bool_Exp = {
  _and?: InputMaybe<Array<User_Notification_Tokens_Bool_Exp>>;
  _not?: InputMaybe<User_Notification_Tokens_Bool_Exp>;
  _or?: InputMaybe<Array<User_Notification_Tokens_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  provider?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_notification_tokens" */
export enum User_Notification_Tokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserNotificationTokensPkey = 'user_notification_tokens_pkey',
  /** unique or primary key constraint on columns "user_id", "provider" */
  UserNotificationTokensUserIdProviderKey = 'user_notification_tokens_user_id_provider_key',
}

/** input type for inserting data into table "user_notification_tokens" */
export type User_Notification_Tokens_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type User_Notification_Tokens_Max_Fields = {
  __typename?: 'user_notification_tokens_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type User_Notification_Tokens_Min_Fields = {
  __typename?: 'user_notification_tokens_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "user_notification_tokens" */
export type User_Notification_Tokens_Mutation_Response = {
  __typename?: 'user_notification_tokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Notification_Tokens>;
};

/** on_conflict condition type for table "user_notification_tokens" */
export type User_Notification_Tokens_On_Conflict = {
  constraint: User_Notification_Tokens_Constraint;
  update_columns?: Array<User_Notification_Tokens_Update_Column>;
  where?: InputMaybe<User_Notification_Tokens_Bool_Exp>;
};

/** Ordering options when selecting data from "user_notification_tokens". */
export type User_Notification_Tokens_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_notification_tokens */
export type User_Notification_Tokens_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user_notification_tokens" */
export enum User_Notification_Tokens_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Provider = 'provider',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'userId',
}

/** input type for updating data in table "user_notification_tokens" */
export type User_Notification_Tokens_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "user_notification_tokens" */
export type User_Notification_Tokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Notification_Tokens_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Notification_Tokens_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "user_notification_tokens" */
export enum User_Notification_Tokens_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Provider = 'provider',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'userId',
}

export type User_Notification_Tokens_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Notification_Tokens_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Notification_Tokens_Bool_Exp;
};

/** columns and relationships of "user_points" */
export type User_Points = {
  __typename?: 'user_points';
  fid: Scalars['String']['output'];
  totalPoints: Scalars['numeric']['output'];
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user?: Maybe<User>;
};

/** aggregated selection of "user_points" */
export type User_Points_Aggregate = {
  __typename?: 'user_points_aggregate';
  aggregate?: Maybe<User_Points_Aggregate_Fields>;
  nodes: Array<User_Points>;
};

/** aggregate fields of "user_points" */
export type User_Points_Aggregate_Fields = {
  __typename?: 'user_points_aggregate_fields';
  avg?: Maybe<User_Points_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Points_Max_Fields>;
  min?: Maybe<User_Points_Min_Fields>;
  stddev?: Maybe<User_Points_Stddev_Fields>;
  stddev_pop?: Maybe<User_Points_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Points_Stddev_Samp_Fields>;
  sum?: Maybe<User_Points_Sum_Fields>;
  var_pop?: Maybe<User_Points_Var_Pop_Fields>;
  var_samp?: Maybe<User_Points_Var_Samp_Fields>;
  variance?: Maybe<User_Points_Variance_Fields>;
};

/** aggregate fields of "user_points" */
export type User_Points_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Points_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type User_Points_Avg_Fields = {
  __typename?: 'user_points_avg_fields';
  totalPoints?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "user_points". All fields are combined with a logical 'AND'. */
export type User_Points_Bool_Exp = {
  _and?: InputMaybe<Array<User_Points_Bool_Exp>>;
  _not?: InputMaybe<User_Points_Bool_Exp>;
  _or?: InputMaybe<Array<User_Points_Bool_Exp>>;
  fid?: InputMaybe<String_Comparison_Exp>;
  totalPoints?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_points" */
export enum User_Points_Constraint {
  /** unique or primary key constraint on columns "fid" */
  UserPointsPkey = 'user_points_pkey',
}

/** input type for incrementing numeric columns in table "user_points" */
export type User_Points_Inc_Input = {
  totalPoints?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "user_points" */
export type User_Points_Insert_Input = {
  fid?: InputMaybe<Scalars['String']['input']>;
  totalPoints?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type User_Points_Max_Fields = {
  __typename?: 'user_points_max_fields';
  fid?: Maybe<Scalars['String']['output']>;
  totalPoints?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type User_Points_Min_Fields = {
  __typename?: 'user_points_min_fields';
  fid?: Maybe<Scalars['String']['output']>;
  totalPoints?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "user_points" */
export type User_Points_Mutation_Response = {
  __typename?: 'user_points_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Points>;
};

/** on_conflict condition type for table "user_points" */
export type User_Points_On_Conflict = {
  constraint: User_Points_Constraint;
  update_columns?: Array<User_Points_Update_Column>;
  where?: InputMaybe<User_Points_Bool_Exp>;
};

/** Ordering options when selecting data from "user_points". */
export type User_Points_Order_By = {
  fid?: InputMaybe<Order_By>;
  totalPoints?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_points */
export type User_Points_Pk_Columns_Input = {
  fid: Scalars['String']['input'];
};

/** select columns of table "user_points" */
export enum User_Points_Select_Column {
  /** column name */
  Fid = 'fid',
  /** column name */
  TotalPoints = 'totalPoints',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "user_points" */
export type User_Points_Set_Input = {
  fid?: InputMaybe<Scalars['String']['input']>;
  totalPoints?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type User_Points_Stddev_Fields = {
  __typename?: 'user_points_stddev_fields';
  totalPoints?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type User_Points_Stddev_Pop_Fields = {
  __typename?: 'user_points_stddev_pop_fields';
  totalPoints?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type User_Points_Stddev_Samp_Fields = {
  __typename?: 'user_points_stddev_samp_fields';
  totalPoints?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "user_points" */
export type User_Points_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Points_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Points_Stream_Cursor_Value_Input = {
  fid?: InputMaybe<Scalars['String']['input']>;
  totalPoints?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type User_Points_Sum_Fields = {
  __typename?: 'user_points_sum_fields';
  totalPoints?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "user_points" */
export enum User_Points_Update_Column {
  /** column name */
  Fid = 'fid',
  /** column name */
  TotalPoints = 'totalPoints',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type User_Points_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Points_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Points_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Points_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Points_Var_Pop_Fields = {
  __typename?: 'user_points_var_pop_fields';
  totalPoints?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type User_Points_Var_Samp_Fields = {
  __typename?: 'user_points_var_samp_fields';
  totalPoints?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type User_Points_Variance_Fields = {
  __typename?: 'user_points_variance_fields';
  totalPoints?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "vote_outcome" */
export type Vote_Outcome = {
  __typename?: 'vote_outcome';
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

/** aggregated selection of "vote_outcome" */
export type Vote_Outcome_Aggregate = {
  __typename?: 'vote_outcome_aggregate';
  aggregate?: Maybe<Vote_Outcome_Aggregate_Fields>;
  nodes: Array<Vote_Outcome>;
};

/** aggregate fields of "vote_outcome" */
export type Vote_Outcome_Aggregate_Fields = {
  __typename?: 'vote_outcome_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Vote_Outcome_Max_Fields>;
  min?: Maybe<Vote_Outcome_Min_Fields>;
};

/** aggregate fields of "vote_outcome" */
export type Vote_Outcome_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vote_Outcome_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "vote_outcome". All fields are combined with a logical 'AND'. */
export type Vote_Outcome_Bool_Exp = {
  _and?: InputMaybe<Array<Vote_Outcome_Bool_Exp>>;
  _not?: InputMaybe<Vote_Outcome_Bool_Exp>;
  _or?: InputMaybe<Array<Vote_Outcome_Bool_Exp>>;
  key?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vote_outcome" */
export enum Vote_Outcome_Constraint {
  /** unique or primary key constraint on columns "key" */
  VoteOutcomePkey = 'vote_outcome_pkey',
}

/** input type for inserting data into table "vote_outcome" */
export type Vote_Outcome_Insert_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Vote_Outcome_Max_Fields = {
  __typename?: 'vote_outcome_max_fields';
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Vote_Outcome_Min_Fields = {
  __typename?: 'vote_outcome_min_fields';
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "vote_outcome" */
export type Vote_Outcome_Mutation_Response = {
  __typename?: 'vote_outcome_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Vote_Outcome>;
};

/** on_conflict condition type for table "vote_outcome" */
export type Vote_Outcome_On_Conflict = {
  constraint: Vote_Outcome_Constraint;
  update_columns?: Array<Vote_Outcome_Update_Column>;
  where?: InputMaybe<Vote_Outcome_Bool_Exp>;
};

/** Ordering options when selecting data from "vote_outcome". */
export type Vote_Outcome_Order_By = {
  key?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vote_outcome */
export type Vote_Outcome_Pk_Columns_Input = {
  key: Scalars['String']['input'];
};

/** select columns of table "vote_outcome" */
export enum Vote_Outcome_Select_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "vote_outcome" */
export type Vote_Outcome_Set_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "vote_outcome" */
export type Vote_Outcome_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vote_Outcome_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vote_Outcome_Stream_Cursor_Value_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "vote_outcome" */
export enum Vote_Outcome_Update_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

export type Vote_Outcome_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Vote_Outcome_Set_Input>;
  /** filter the rows which have to be updated */
  where: Vote_Outcome_Bool_Exp;
};

/** columns and relationships of "vote_record_status" */
export type Vote_Record_Status = {
  __typename?: 'vote_record_status';
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

/** aggregated selection of "vote_record_status" */
export type Vote_Record_Status_Aggregate = {
  __typename?: 'vote_record_status_aggregate';
  aggregate?: Maybe<Vote_Record_Status_Aggregate_Fields>;
  nodes: Array<Vote_Record_Status>;
};

/** aggregate fields of "vote_record_status" */
export type Vote_Record_Status_Aggregate_Fields = {
  __typename?: 'vote_record_status_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Vote_Record_Status_Max_Fields>;
  min?: Maybe<Vote_Record_Status_Min_Fields>;
};

/** aggregate fields of "vote_record_status" */
export type Vote_Record_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vote_Record_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "vote_record_status". All fields are combined with a logical 'AND'. */
export type Vote_Record_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Vote_Record_Status_Bool_Exp>>;
  _not?: InputMaybe<Vote_Record_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Vote_Record_Status_Bool_Exp>>;
  key?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vote_record_status" */
export enum Vote_Record_Status_Constraint {
  /** unique or primary key constraint on columns "key" */
  VoteRecordStatusPkey = 'vote_record_status_pkey',
}

/** input type for inserting data into table "vote_record_status" */
export type Vote_Record_Status_Insert_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Vote_Record_Status_Max_Fields = {
  __typename?: 'vote_record_status_max_fields';
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Vote_Record_Status_Min_Fields = {
  __typename?: 'vote_record_status_min_fields';
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "vote_record_status" */
export type Vote_Record_Status_Mutation_Response = {
  __typename?: 'vote_record_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Vote_Record_Status>;
};

/** on_conflict condition type for table "vote_record_status" */
export type Vote_Record_Status_On_Conflict = {
  constraint: Vote_Record_Status_Constraint;
  update_columns?: Array<Vote_Record_Status_Update_Column>;
  where?: InputMaybe<Vote_Record_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "vote_record_status". */
export type Vote_Record_Status_Order_By = {
  key?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vote_record_status */
export type Vote_Record_Status_Pk_Columns_Input = {
  key: Scalars['String']['input'];
};

/** select columns of table "vote_record_status" */
export enum Vote_Record_Status_Select_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "vote_record_status" */
export type Vote_Record_Status_Set_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "vote_record_status" */
export type Vote_Record_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vote_Record_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vote_Record_Status_Stream_Cursor_Value_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "vote_record_status" */
export enum Vote_Record_Status_Update_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

export type Vote_Record_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Vote_Record_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Vote_Record_Status_Bool_Exp;
};

/** columns and relationships of "vote_records" */
export type Vote_Records = {
  __typename?: 'vote_records';
  amount: Scalars['numeric']['output'];
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['uuid']['output'];
  outcome?: Maybe<Scalars['String']['output']>;
  payAmount?: Maybe<Scalars['numeric']['output']>;
  payTokenType?: Maybe<Scalars['String']['output']>;
  payTxHash?: Maybe<Scalars['String']['output']>;
  pay_social_amount?: Maybe<Scalars['numeric']['output']>;
  pay_social_tx_hash?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  targetSnapshotId: Scalars['uuid']['output'];
  tokenType: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamp']['output']>;
  voteType: Scalars['String']['output'];
  /** An object relationship */
  vote_snapshot: Vote_Snapshot;
  voter?: Maybe<User>;
  voterAddress?: Maybe<Scalars['String']['output']>;
  voterId: Scalars['String']['output'];
};

/** aggregated selection of "vote_records" */
export type Vote_Records_Aggregate = {
  __typename?: 'vote_records_aggregate';
  aggregate?: Maybe<Vote_Records_Aggregate_Fields>;
  nodes: Array<Vote_Records>;
};

/** aggregate fields of "vote_records" */
export type Vote_Records_Aggregate_Fields = {
  __typename?: 'vote_records_aggregate_fields';
  avg?: Maybe<Vote_Records_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Vote_Records_Max_Fields>;
  min?: Maybe<Vote_Records_Min_Fields>;
  stddev?: Maybe<Vote_Records_Stddev_Fields>;
  stddev_pop?: Maybe<Vote_Records_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vote_Records_Stddev_Samp_Fields>;
  sum?: Maybe<Vote_Records_Sum_Fields>;
  var_pop?: Maybe<Vote_Records_Var_Pop_Fields>;
  var_samp?: Maybe<Vote_Records_Var_Samp_Fields>;
  variance?: Maybe<Vote_Records_Variance_Fields>;
};

/** aggregate fields of "vote_records" */
export type Vote_Records_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vote_Records_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Vote_Records_Avg_Fields = {
  __typename?: 'vote_records_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  payAmount?: Maybe<Scalars['Float']['output']>;
  pay_social_amount?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "vote_records". All fields are combined with a logical 'AND'. */
export type Vote_Records_Bool_Exp = {
  _and?: InputMaybe<Array<Vote_Records_Bool_Exp>>;
  _not?: InputMaybe<Vote_Records_Bool_Exp>;
  _or?: InputMaybe<Array<Vote_Records_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  outcome?: InputMaybe<String_Comparison_Exp>;
  payAmount?: InputMaybe<Numeric_Comparison_Exp>;
  payTokenType?: InputMaybe<String_Comparison_Exp>;
  payTxHash?: InputMaybe<String_Comparison_Exp>;
  pay_social_amount?: InputMaybe<Numeric_Comparison_Exp>;
  pay_social_tx_hash?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  targetSnapshotId?: InputMaybe<Uuid_Comparison_Exp>;
  tokenType?: InputMaybe<String_Comparison_Exp>;
  txHash?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamp_Comparison_Exp>;
  voteType?: InputMaybe<String_Comparison_Exp>;
  vote_snapshot?: InputMaybe<Vote_Snapshot_Bool_Exp>;
  voterAddress?: InputMaybe<String_Comparison_Exp>;
  voterId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vote_records" */
export enum Vote_Records_Constraint {
  /** unique or primary key constraint on columns "id" */
  VoteRecordsPkey = 'vote_records_pkey',
  /** unique or primary key constraint on columns "tx_hash" */
  VoteRecordsTxHashKey = 'vote_records_tx_hash_key',
}

/** input type for incrementing numeric columns in table "vote_records" */
export type Vote_Records_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  payAmount?: InputMaybe<Scalars['numeric']['input']>;
  pay_social_amount?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "vote_records" */
export type Vote_Records_Insert_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  payAmount?: InputMaybe<Scalars['numeric']['input']>;
  payTokenType?: InputMaybe<Scalars['String']['input']>;
  payTxHash?: InputMaybe<Scalars['String']['input']>;
  pay_social_amount?: InputMaybe<Scalars['numeric']['input']>;
  pay_social_tx_hash?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  targetSnapshotId?: InputMaybe<Scalars['uuid']['input']>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamp']['input']>;
  voteType?: InputMaybe<Scalars['String']['input']>;
  vote_snapshot?: InputMaybe<Vote_Snapshot_Obj_Rel_Insert_Input>;
  voterAddress?: InputMaybe<Scalars['String']['input']>;
  voterId?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Vote_Records_Max_Fields = {
  __typename?: 'vote_records_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  payAmount?: Maybe<Scalars['numeric']['output']>;
  payTokenType?: Maybe<Scalars['String']['output']>;
  payTxHash?: Maybe<Scalars['String']['output']>;
  pay_social_amount?: Maybe<Scalars['numeric']['output']>;
  pay_social_tx_hash?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  targetSnapshotId?: Maybe<Scalars['uuid']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamp']['output']>;
  voteType?: Maybe<Scalars['String']['output']>;
  voterAddress?: Maybe<Scalars['String']['output']>;
  voterId?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Vote_Records_Min_Fields = {
  __typename?: 'vote_records_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  payAmount?: Maybe<Scalars['numeric']['output']>;
  payTokenType?: Maybe<Scalars['String']['output']>;
  payTxHash?: Maybe<Scalars['String']['output']>;
  pay_social_amount?: Maybe<Scalars['numeric']['output']>;
  pay_social_tx_hash?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  targetSnapshotId?: Maybe<Scalars['uuid']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamp']['output']>;
  voteType?: Maybe<Scalars['String']['output']>;
  voterAddress?: Maybe<Scalars['String']['output']>;
  voterId?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "vote_records" */
export type Vote_Records_Mutation_Response = {
  __typename?: 'vote_records_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Vote_Records>;
};

/** on_conflict condition type for table "vote_records" */
export type Vote_Records_On_Conflict = {
  constraint: Vote_Records_Constraint;
  update_columns?: Array<Vote_Records_Update_Column>;
  where?: InputMaybe<Vote_Records_Bool_Exp>;
};

/** Ordering options when selecting data from "vote_records". */
export type Vote_Records_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  outcome?: InputMaybe<Order_By>;
  payAmount?: InputMaybe<Order_By>;
  payTokenType?: InputMaybe<Order_By>;
  payTxHash?: InputMaybe<Order_By>;
  pay_social_amount?: InputMaybe<Order_By>;
  pay_social_tx_hash?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  targetSnapshotId?: InputMaybe<Order_By>;
  tokenType?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  voteType?: InputMaybe<Order_By>;
  vote_snapshot?: InputMaybe<Vote_Snapshot_Order_By>;
  voterAddress?: InputMaybe<Order_By>;
  voterId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vote_records */
export type Vote_Records_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "vote_records" */
export enum Vote_Records_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Outcome = 'outcome',
  /** column name */
  PayAmount = 'payAmount',
  /** column name */
  PayTokenType = 'payTokenType',
  /** column name */
  PayTxHash = 'payTxHash',
  /** column name */
  PaySocialAmount = 'pay_social_amount',
  /** column name */
  PaySocialTxHash = 'pay_social_tx_hash',
  /** column name */
  Status = 'status',
  /** column name */
  TargetSnapshotId = 'targetSnapshotId',
  /** column name */
  TokenType = 'tokenType',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  VoteType = 'voteType',
  /** column name */
  VoterAddress = 'voterAddress',
  /** column name */
  VoterId = 'voterId',
}

/** input type for updating data in table "vote_records" */
export type Vote_Records_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  payAmount?: InputMaybe<Scalars['numeric']['input']>;
  payTokenType?: InputMaybe<Scalars['String']['input']>;
  payTxHash?: InputMaybe<Scalars['String']['input']>;
  pay_social_amount?: InputMaybe<Scalars['numeric']['input']>;
  pay_social_tx_hash?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  targetSnapshotId?: InputMaybe<Scalars['uuid']['input']>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamp']['input']>;
  voteType?: InputMaybe<Scalars['String']['input']>;
  voterAddress?: InputMaybe<Scalars['String']['input']>;
  voterId?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Vote_Records_Stddev_Fields = {
  __typename?: 'vote_records_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  payAmount?: Maybe<Scalars['Float']['output']>;
  pay_social_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Vote_Records_Stddev_Pop_Fields = {
  __typename?: 'vote_records_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  payAmount?: Maybe<Scalars['Float']['output']>;
  pay_social_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Vote_Records_Stddev_Samp_Fields = {
  __typename?: 'vote_records_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  payAmount?: Maybe<Scalars['Float']['output']>;
  pay_social_amount?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "vote_records" */
export type Vote_Records_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vote_Records_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vote_Records_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  payAmount?: InputMaybe<Scalars['numeric']['input']>;
  payTokenType?: InputMaybe<Scalars['String']['input']>;
  payTxHash?: InputMaybe<Scalars['String']['input']>;
  pay_social_amount?: InputMaybe<Scalars['numeric']['input']>;
  pay_social_tx_hash?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  targetSnapshotId?: InputMaybe<Scalars['uuid']['input']>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamp']['input']>;
  voteType?: InputMaybe<Scalars['String']['input']>;
  voterAddress?: InputMaybe<Scalars['String']['input']>;
  voterId?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Vote_Records_Sum_Fields = {
  __typename?: 'vote_records_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  payAmount?: Maybe<Scalars['numeric']['output']>;
  pay_social_amount?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "vote_records" */
export enum Vote_Records_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Outcome = 'outcome',
  /** column name */
  PayAmount = 'payAmount',
  /** column name */
  PayTokenType = 'payTokenType',
  /** column name */
  PayTxHash = 'payTxHash',
  /** column name */
  PaySocialAmount = 'pay_social_amount',
  /** column name */
  PaySocialTxHash = 'pay_social_tx_hash',
  /** column name */
  Status = 'status',
  /** column name */
  TargetSnapshotId = 'targetSnapshotId',
  /** column name */
  TokenType = 'tokenType',
  /** column name */
  TxHash = 'txHash',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  VoteType = 'voteType',
  /** column name */
  VoterAddress = 'voterAddress',
  /** column name */
  VoterId = 'voterId',
}

export type Vote_Records_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Vote_Records_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Vote_Records_Set_Input>;
  /** filter the rows which have to be updated */
  where: Vote_Records_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Vote_Records_Var_Pop_Fields = {
  __typename?: 'vote_records_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  payAmount?: Maybe<Scalars['Float']['output']>;
  pay_social_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Vote_Records_Var_Samp_Fields = {
  __typename?: 'vote_records_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  payAmount?: Maybe<Scalars['Float']['output']>;
  pay_social_amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Vote_Records_Variance_Fields = {
  __typename?: 'vote_records_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  payAmount?: Maybe<Scalars['Float']['output']>;
  pay_social_amount?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "vote_snapshot" */
export type Vote_Snapshot = {
  __typename?: 'vote_snapshot';
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  fid: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  mindshare: Scalars['numeric']['output'];
  outcome?: Maybe<Scalars['numeric']['output']>;
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamp']['output']>;
  user?: Maybe<User>;
  weekStart: Scalars['date']['output'];
};

/** aggregated selection of "vote_snapshot" */
export type Vote_Snapshot_Aggregate = {
  __typename?: 'vote_snapshot_aggregate';
  aggregate?: Maybe<Vote_Snapshot_Aggregate_Fields>;
  nodes: Array<Vote_Snapshot>;
};

/** aggregate fields of "vote_snapshot" */
export type Vote_Snapshot_Aggregate_Fields = {
  __typename?: 'vote_snapshot_aggregate_fields';
  avg?: Maybe<Vote_Snapshot_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Vote_Snapshot_Max_Fields>;
  min?: Maybe<Vote_Snapshot_Min_Fields>;
  stddev?: Maybe<Vote_Snapshot_Stddev_Fields>;
  stddev_pop?: Maybe<Vote_Snapshot_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vote_Snapshot_Stddev_Samp_Fields>;
  sum?: Maybe<Vote_Snapshot_Sum_Fields>;
  var_pop?: Maybe<Vote_Snapshot_Var_Pop_Fields>;
  var_samp?: Maybe<Vote_Snapshot_Var_Samp_Fields>;
  variance?: Maybe<Vote_Snapshot_Variance_Fields>;
};

/** aggregate fields of "vote_snapshot" */
export type Vote_Snapshot_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vote_Snapshot_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Vote_Snapshot_Avg_Fields = {
  __typename?: 'vote_snapshot_avg_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  outcome?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "vote_snapshot". All fields are combined with a logical 'AND'. */
export type Vote_Snapshot_Bool_Exp = {
  _and?: InputMaybe<Array<Vote_Snapshot_Bool_Exp>>;
  _not?: InputMaybe<Vote_Snapshot_Bool_Exp>;
  _or?: InputMaybe<Array<Vote_Snapshot_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  fid?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mindshare?: InputMaybe<Numeric_Comparison_Exp>;
  outcome?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamp_Comparison_Exp>;
  weekStart?: InputMaybe<Date_Comparison_Exp>;
};

/** unique or primary key constraints on table "vote_snapshot" */
export enum Vote_Snapshot_Constraint {
  /** unique or primary key constraint on columns "fid", "week_start" */
  VoteSnapshotFidWeekStartKey = 'vote_snapshot_fid_week_start_key',
  /** unique or primary key constraint on columns "id" */
  VoteSnapshotPkey = 'vote_snapshot_pkey',
}

/** input type for incrementing numeric columns in table "vote_snapshot" */
export type Vote_Snapshot_Inc_Input = {
  mindshare?: InputMaybe<Scalars['numeric']['input']>;
  outcome?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "vote_snapshot" */
export type Vote_Snapshot_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  fid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mindshare?: InputMaybe<Scalars['numeric']['input']>;
  outcome?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamp']['input']>;
  weekStart?: InputMaybe<Scalars['date']['input']>;
};

/** aggregate max on columns */
export type Vote_Snapshot_Max_Fields = {
  __typename?: 'vote_snapshot_max_fields';
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  fid?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mindshare?: Maybe<Scalars['numeric']['output']>;
  outcome?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamp']['output']>;
  weekStart?: Maybe<Scalars['date']['output']>;
};

/** aggregate min on columns */
export type Vote_Snapshot_Min_Fields = {
  __typename?: 'vote_snapshot_min_fields';
  createdAt?: Maybe<Scalars['timestamp']['output']>;
  fid?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mindshare?: Maybe<Scalars['numeric']['output']>;
  outcome?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamp']['output']>;
  weekStart?: Maybe<Scalars['date']['output']>;
};

/** response of any mutation on the table "vote_snapshot" */
export type Vote_Snapshot_Mutation_Response = {
  __typename?: 'vote_snapshot_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Vote_Snapshot>;
};

/** input type for inserting object relation for remote table "vote_snapshot" */
export type Vote_Snapshot_Obj_Rel_Insert_Input = {
  data: Vote_Snapshot_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Vote_Snapshot_On_Conflict>;
};

/** on_conflict condition type for table "vote_snapshot" */
export type Vote_Snapshot_On_Conflict = {
  constraint: Vote_Snapshot_Constraint;
  update_columns?: Array<Vote_Snapshot_Update_Column>;
  where?: InputMaybe<Vote_Snapshot_Bool_Exp>;
};

/** Ordering options when selecting data from "vote_snapshot". */
export type Vote_Snapshot_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  fid?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mindshare?: InputMaybe<Order_By>;
  outcome?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  weekStart?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vote_snapshot */
export type Vote_Snapshot_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "vote_snapshot" */
export enum Vote_Snapshot_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Fid = 'fid',
  /** column name */
  Id = 'id',
  /** column name */
  Mindshare = 'mindshare',
  /** column name */
  Outcome = 'outcome',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WeekStart = 'weekStart',
}

/** input type for updating data in table "vote_snapshot" */
export type Vote_Snapshot_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  fid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mindshare?: InputMaybe<Scalars['numeric']['input']>;
  outcome?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamp']['input']>;
  weekStart?: InputMaybe<Scalars['date']['input']>;
};

/** aggregate stddev on columns */
export type Vote_Snapshot_Stddev_Fields = {
  __typename?: 'vote_snapshot_stddev_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  outcome?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Vote_Snapshot_Stddev_Pop_Fields = {
  __typename?: 'vote_snapshot_stddev_pop_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  outcome?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Vote_Snapshot_Stddev_Samp_Fields = {
  __typename?: 'vote_snapshot_stddev_samp_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  outcome?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "vote_snapshot" */
export type Vote_Snapshot_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vote_Snapshot_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vote_Snapshot_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamp']['input']>;
  fid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mindshare?: InputMaybe<Scalars['numeric']['input']>;
  outcome?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamp']['input']>;
  weekStart?: InputMaybe<Scalars['date']['input']>;
};

/** aggregate sum on columns */
export type Vote_Snapshot_Sum_Fields = {
  __typename?: 'vote_snapshot_sum_fields';
  mindshare?: Maybe<Scalars['numeric']['output']>;
  outcome?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "vote_snapshot" */
export enum Vote_Snapshot_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Fid = 'fid',
  /** column name */
  Id = 'id',
  /** column name */
  Mindshare = 'mindshare',
  /** column name */
  Outcome = 'outcome',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WeekStart = 'weekStart',
}

export type Vote_Snapshot_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Vote_Snapshot_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Vote_Snapshot_Set_Input>;
  /** filter the rows which have to be updated */
  where: Vote_Snapshot_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Vote_Snapshot_Var_Pop_Fields = {
  __typename?: 'vote_snapshot_var_pop_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  outcome?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Vote_Snapshot_Var_Samp_Fields = {
  __typename?: 'vote_snapshot_var_samp_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  outcome?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Vote_Snapshot_Variance_Fields = {
  __typename?: 'vote_snapshot_variance_fields';
  mindshare?: Maybe<Scalars['Float']['output']>;
  outcome?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "vote_status" */
export type Vote_Status = {
  __typename?: 'vote_status';
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

/** aggregated selection of "vote_status" */
export type Vote_Status_Aggregate = {
  __typename?: 'vote_status_aggregate';
  aggregate?: Maybe<Vote_Status_Aggregate_Fields>;
  nodes: Array<Vote_Status>;
};

/** aggregate fields of "vote_status" */
export type Vote_Status_Aggregate_Fields = {
  __typename?: 'vote_status_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Vote_Status_Max_Fields>;
  min?: Maybe<Vote_Status_Min_Fields>;
};

/** aggregate fields of "vote_status" */
export type Vote_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vote_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "vote_status". All fields are combined with a logical 'AND'. */
export type Vote_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Vote_Status_Bool_Exp>>;
  _not?: InputMaybe<Vote_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Vote_Status_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vote_status" */
export enum Vote_Status_Constraint {
  /** unique or primary key constraint on columns "key" */
  VoteStatusPkey = 'vote_status_pkey',
}

/** input type for inserting data into table "vote_status" */
export type Vote_Status_Insert_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Vote_Status_Max_Fields = {
  __typename?: 'vote_status_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Vote_Status_Min_Fields = {
  __typename?: 'vote_status_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "vote_status" */
export type Vote_Status_Mutation_Response = {
  __typename?: 'vote_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Vote_Status>;
};

/** on_conflict condition type for table "vote_status" */
export type Vote_Status_On_Conflict = {
  constraint: Vote_Status_Constraint;
  update_columns?: Array<Vote_Status_Update_Column>;
  where?: InputMaybe<Vote_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "vote_status". */
export type Vote_Status_Order_By = {
  description?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vote_status */
export type Vote_Status_Pk_Columns_Input = {
  key: Scalars['String']['input'];
};

/** select columns of table "vote_status" */
export enum Vote_Status_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "vote_status" */
export type Vote_Status_Set_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "vote_status" */
export type Vote_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vote_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vote_Status_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "vote_status" */
export enum Vote_Status_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

export type Vote_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Vote_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Vote_Status_Bool_Exp;
};

/** columns and relationships of "vote_token_type" */
export type Vote_Token_Type = {
  __typename?: 'vote_token_type';
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

/** aggregated selection of "vote_token_type" */
export type Vote_Token_Type_Aggregate = {
  __typename?: 'vote_token_type_aggregate';
  aggregate?: Maybe<Vote_Token_Type_Aggregate_Fields>;
  nodes: Array<Vote_Token_Type>;
};

/** aggregate fields of "vote_token_type" */
export type Vote_Token_Type_Aggregate_Fields = {
  __typename?: 'vote_token_type_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Vote_Token_Type_Max_Fields>;
  min?: Maybe<Vote_Token_Type_Min_Fields>;
};

/** aggregate fields of "vote_token_type" */
export type Vote_Token_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vote_Token_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "vote_token_type". All fields are combined with a logical 'AND'. */
export type Vote_Token_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Vote_Token_Type_Bool_Exp>>;
  _not?: InputMaybe<Vote_Token_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Vote_Token_Type_Bool_Exp>>;
  key?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vote_token_type" */
export enum Vote_Token_Type_Constraint {
  /** unique or primary key constraint on columns "key" */
  VoteTokenTypePkey = 'vote_token_type_pkey',
}

/** input type for inserting data into table "vote_token_type" */
export type Vote_Token_Type_Insert_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Vote_Token_Type_Max_Fields = {
  __typename?: 'vote_token_type_max_fields';
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Vote_Token_Type_Min_Fields = {
  __typename?: 'vote_token_type_min_fields';
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "vote_token_type" */
export type Vote_Token_Type_Mutation_Response = {
  __typename?: 'vote_token_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Vote_Token_Type>;
};

/** on_conflict condition type for table "vote_token_type" */
export type Vote_Token_Type_On_Conflict = {
  constraint: Vote_Token_Type_Constraint;
  update_columns?: Array<Vote_Token_Type_Update_Column>;
  where?: InputMaybe<Vote_Token_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "vote_token_type". */
export type Vote_Token_Type_Order_By = {
  key?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vote_token_type */
export type Vote_Token_Type_Pk_Columns_Input = {
  key: Scalars['String']['input'];
};

/** select columns of table "vote_token_type" */
export enum Vote_Token_Type_Select_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "vote_token_type" */
export type Vote_Token_Type_Set_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "vote_token_type" */
export type Vote_Token_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vote_Token_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vote_Token_Type_Stream_Cursor_Value_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "vote_token_type" */
export enum Vote_Token_Type_Update_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

export type Vote_Token_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Vote_Token_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: Vote_Token_Type_Bool_Exp;
};

/** columns and relationships of "vote_type" */
export type Vote_Type = {
  __typename?: 'vote_type';
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

/** aggregated selection of "vote_type" */
export type Vote_Type_Aggregate = {
  __typename?: 'vote_type_aggregate';
  aggregate?: Maybe<Vote_Type_Aggregate_Fields>;
  nodes: Array<Vote_Type>;
};

/** aggregate fields of "vote_type" */
export type Vote_Type_Aggregate_Fields = {
  __typename?: 'vote_type_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Vote_Type_Max_Fields>;
  min?: Maybe<Vote_Type_Min_Fields>;
};

/** aggregate fields of "vote_type" */
export type Vote_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vote_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "vote_type". All fields are combined with a logical 'AND'. */
export type Vote_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Vote_Type_Bool_Exp>>;
  _not?: InputMaybe<Vote_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Vote_Type_Bool_Exp>>;
  key?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vote_type" */
export enum Vote_Type_Constraint {
  /** unique or primary key constraint on columns "key" */
  VoteTypePkey = 'vote_type_pkey',
}

/** input type for inserting data into table "vote_type" */
export type Vote_Type_Insert_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Vote_Type_Max_Fields = {
  __typename?: 'vote_type_max_fields';
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Vote_Type_Min_Fields = {
  __typename?: 'vote_type_min_fields';
  key?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "vote_type" */
export type Vote_Type_Mutation_Response = {
  __typename?: 'vote_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Vote_Type>;
};

/** on_conflict condition type for table "vote_type" */
export type Vote_Type_On_Conflict = {
  constraint: Vote_Type_Constraint;
  update_columns?: Array<Vote_Type_Update_Column>;
  where?: InputMaybe<Vote_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "vote_type". */
export type Vote_Type_Order_By = {
  key?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vote_type */
export type Vote_Type_Pk_Columns_Input = {
  key: Scalars['String']['input'];
};

/** select columns of table "vote_type" */
export enum Vote_Type_Select_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "vote_type" */
export type Vote_Type_Set_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "vote_type" */
export type Vote_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vote_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vote_Type_Stream_Cursor_Value_Input = {
  key?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "vote_type" */
export enum Vote_Type_Update_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Label = 'label',
}

export type Vote_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Vote_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: Vote_Type_Bool_Exp;
};

export type UserInfoFragment = {
  __typename?: 'UserInfo';
  displayName: string;
  fid: number;
  followingCount: number;
  followerCount: number;
  isSmartUser: boolean;
  neynarUserScore: number;
  pfpUrl: string;
  powerBadge: boolean;
  username: string;
} & { ' $fragmentName'?: 'UserInfoFragment' };

export type DailyMindshareFragment = {
  __typename?: 'DailyMindshare';
  _time: string;
  fid: string;
  mindshare?: number | null;
} & { ' $fragmentName'?: 'DailyMindshareFragment' };

export type MindshareResultFragment = {
  __typename?: 'MindshareResult';
  change30d: number;
  change7d: number;
  change3d: number;
  changeRatio30d: number;
  changeRatio7d: number;
  changeRatio3d: number;
  currentMindshare: number;
  fid: string;
  last30dMindshare: number;
  last7dMindshare: number;
  last3dMindshare: number;
  rank: number;
  time: string;
  userInfo: { __typename?: 'UserInfo' } & {
    ' $fragmentRefs'?: { UserInfoFragment: UserInfoFragment };
  };
  daily: Array<
    { __typename?: 'DailyMindshare' } & {
      ' $fragmentRefs'?: { DailyMindshareFragment: DailyMindshareFragment };
    }
  >;
} & { ' $fragmentName'?: 'MindshareResultFragment' };

export type GetCryptoPriceQueryVariables = Exact<{
  coinId: Scalars['String']['input'];
  currency: Scalars['String']['input'];
}>;

export type GetCryptoPriceQuery = {
  __typename?: 'query_root';
  getCryptoPrice?: {
    __typename?: 'CryptoPriceOutput';
    phavercoin?: { __typename?: 'CurrencyPrice'; usd?: number | null } | null;
  } | null;
};

export type GetMindshareByFidQueryVariables = Exact<{
  fid: Scalars['String']['input'];
}>;

export type GetMindshareByFidQuery = {
  __typename?: 'query_root';
  getMindshareByFid?:
    | ({ __typename?: 'MindshareResult' } & {
        ' $fragmentRefs'?: { MindshareResultFragment: MindshareResultFragment };
      })
    | null;
};

export type GetPointTransactionByFidQueryVariables = Exact<{
  fid: Scalars['String']['input'];
  type: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPointTransactionByFidQuery = {
  __typename?: 'query_root';
  point_transactions: Array<{
    __typename?: 'point_transactions';
    date?: any | null;
    createdAt?: any | null;
    direction: string;
    fid: string;
    id: any;
    mindshare?: any | null;
    points: any;
    reason?: string | null;
    type: string;
    usdcAmount?: any | null;
  }>;
};

export type GetPointsByFidQueryVariables = Exact<{
  fid: Scalars['String']['input'];
}>;

export type GetPointsByFidQuery = {
  __typename?: 'query_root';
  user_points_by_pk?: { __typename?: 'user_points'; fid: string; totalPoints: any } | null;
};

export type GetLeaderboardQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;

export type GetLeaderboardQuery = {
  __typename?: 'query_root';
  user_points: Array<{
    __typename?: 'user_points';
    fid: string;
    totalPoints: any;
    user?: {
      __typename?: 'User';
      displayName?: string | null;
      fid: string;
      pfpUrl?: string | null;
      username?: string | null;
      isSmartUser?: boolean | null;
    } | null;
  }>;
};

export type GetTopMindshareQueryVariables = Exact<{
  duration: Scalars['String']['input'];
  field: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  desc: Scalars['Boolean']['input'];
}>;

export type GetTopMindshareQuery = {
  __typename?: 'query_root';
  getTopMindshare?: Array<
    | ({ __typename?: 'MindshareResult' } & {
        ' $fragmentRefs'?: { MindshareResultFragment: MindshareResultFragment };
      })
    | null
  > | null;
};

export type GetVoteAggregatesQueryVariables = Exact<{
  snapshotId: Scalars['uuid']['input'];
}>;

export type GetVoteAggregatesQuery = {
  __typename?: 'query_root';
  upvotes_usdc: {
    __typename?: 'vote_records_aggregate';
    aggregate?: {
      __typename?: 'vote_records_aggregate_fields';
      count: number;
      sum?: { __typename?: 'vote_records_sum_fields'; amount?: any | null } | null;
    } | null;
  };
  upvotes_social: {
    __typename?: 'vote_records_aggregate';
    aggregate?: {
      __typename?: 'vote_records_aggregate_fields';
      count: number;
      sum?: { __typename?: 'vote_records_sum_fields'; amount?: any | null } | null;
    } | null;
  };
  downvotes_usdc: {
    __typename?: 'vote_records_aggregate';
    aggregate?: {
      __typename?: 'vote_records_aggregate_fields';
      count: number;
      sum?: { __typename?: 'vote_records_sum_fields'; amount?: any | null } | null;
    } | null;
  };
  downvotes_social: {
    __typename?: 'vote_records_aggregate';
    aggregate?: {
      __typename?: 'vote_records_aggregate_fields';
      count: number;
      sum?: { __typename?: 'vote_records_sum_fields'; amount?: any | null } | null;
    } | null;
  };
};

export type GetVoteByVoterQueryVariables = Exact<{
  voterId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetVoteByVoterQuery = {
  __typename?: 'query_root';
  vote_records: Array<{
    __typename?: 'vote_records';
    id: any;
    voterId: string;
    voteType: string;
    tokenType: string;
    status: string;
    amount: any;
    createdAt?: any | null;
    vote_snapshot: {
      __typename?: 'vote_snapshot';
      id: any;
      fid: string;
      weekStart: any;
      updatedAt?: any | null;
      status: string;
      mindshare: any;
      createdAt?: any | null;
      user?: {
        __typename?: 'User';
        fid: string;
        displayName?: string | null;
        username?: string | null;
        pfpUrl?: string | null;
      } | null;
    };
  }>;
};

export type GetVoteHistoryQueryVariables = Exact<{
  targetSnapshotId: Scalars['uuid']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetVoteHistoryQuery = {
  __typename?: 'query_root';
  vote_records: Array<{
    __typename?: 'vote_records';
    id: any;
    createdAt?: any | null;
    amount: any;
    tokenType: string;
    txHash: string;
    targetSnapshotId: any;
    voteType: string;
    voter?: {
      __typename?: 'User';
      fid: string;
      displayName?: string | null;
      pfpUrl?: string | null;
      username?: string | null;
    } | null;
  }>;
};

export type GetVoteSnapshotQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vote_Snapshot_Order_By> | Vote_Snapshot_Order_By>;
  weekStart: Scalars['date']['input'];
}>;

export type GetVoteSnapshotQuery = {
  __typename?: 'query_root';
  vote_snapshot: Array<{
    __typename?: 'vote_snapshot';
    createdAt?: any | null;
    fid: string;
    id: any;
    mindshare: any;
    status: string;
    updatedAt?: any | null;
    weekStart: any;
    user?: {
      __typename?: 'User';
      displayName?: string | null;
      fid: string;
      pfpUrl?: string | null;
      username?: string | null;
    } | null;
  }>;
};

export type GetVoteSnapshotByFidQueryVariables = Exact<{
  fid: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetVoteSnapshotByFidQuery = {
  __typename?: 'query_root';
  vote_snapshot: Array<{
    __typename?: 'vote_snapshot';
    createdAt?: any | null;
    fid: string;
    id: any;
    mindshare: any;
    status: string;
    updatedAt?: any | null;
    weekStart: any;
    user?: {
      __typename?: 'User';
      displayName?: string | null;
      fid: string;
      pfpUrl?: string | null;
      username?: string | null;
    } | null;
  }>;
};

export type GetVoteSnapshotByFidAndWeekQueryVariables = Exact<{
  fid: Scalars['String']['input'];
  weekStart: Scalars['date']['input'];
}>;

export type GetVoteSnapshotByFidAndWeekQuery = {
  __typename?: 'query_root';
  vote_snapshot: Array<{
    __typename?: 'vote_snapshot';
    createdAt?: any | null;
    fid: string;
    id: any;
    mindshare: any;
    status: string;
    updatedAt?: any | null;
    weekStart: any;
    user?: {
      __typename?: 'User';
      displayName?: string | null;
      fid: string;
      pfpUrl?: string | null;
      username?: string | null;
    } | null;
  }>;
};

export type PostNotificationTokenMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  url: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;

export type PostNotificationTokenMutation = {
  __typename?: 'mutation_root';
  insert_user_notification_tokens?: {
    __typename?: 'user_notification_tokens_mutation_response';
    affected_rows: number;
    returning: Array<{
      __typename?: 'user_notification_tokens';
      id: any;
      token: string;
      url: string;
      userId: string;
      createdAt?: any | null;
      updatedAt?: any | null;
      provider: string;
    }>;
  } | null;
};

export type PostVoteRecordMutationVariables = Exact<{
  input: PostVoteRecordInput;
}>;

export type PostVoteRecordMutation = {
  __typename?: 'mutation_root';
  postVoteRecord?: { __typename?: 'PostVoteRecordOutput'; status?: number | null } | null;
};

export const UserInfoFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserInfo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UserInfo' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followingCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSmartUser' } },
          { kind: 'Field', name: { kind: 'Name', value: 'neynarUserScore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'powerBadge' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoFragment, unknown>;
export const DailyMindshareFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DailyMindshare' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DailyMindshare' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_time' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mindshare' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DailyMindshareFragment, unknown>;
export const MindshareResultFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MindshareResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MindshareResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'change30d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'change7d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'change3d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'changeRatio30d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'changeRatio7d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'changeRatio3d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last30dMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last7dMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last3dMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'time' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userInfo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserInfo' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daily' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DailyMindshare' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserInfo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UserInfo' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followingCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSmartUser' } },
          { kind: 'Field', name: { kind: 'Name', value: 'neynarUserScore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'powerBadge' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DailyMindshare' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DailyMindshare' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_time' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mindshare' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MindshareResultFragment, unknown>;
export const GetCryptoPriceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCryptoPrice' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'coinId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'currency' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getCryptoPrice' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'coinId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'coinId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'currency' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'currency' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'phavercoin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'usd' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCryptoPriceQuery, GetCryptoPriceQueryVariables>;
export const GetMindshareByFidDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMindshareByFid' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getMindshareByFid' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'fid' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MindshareResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserInfo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UserInfo' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followingCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSmartUser' } },
          { kind: 'Field', name: { kind: 'Name', value: 'neynarUserScore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'powerBadge' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DailyMindshare' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DailyMindshare' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_time' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mindshare' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MindshareResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MindshareResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'change30d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'change7d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'change3d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'changeRatio30d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'changeRatio7d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'changeRatio3d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last30dMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last7dMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last3dMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'time' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userInfo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserInfo' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daily' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DailyMindshare' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMindshareByFidQuery, GetMindshareByFidQueryVariables>;
export const GetPointTransactionByFidDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPointTransactionByFid' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'point_transactions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'fid' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'date' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'direction' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mindshare' } },
                { kind: 'Field', name: { kind: 'Name', value: 'points' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'usdcAmount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPointTransactionByFidQuery, GetPointTransactionByFidQueryVariables>;
export const GetPointsByFidDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPointsByFid' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user_points_by_pk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'fid' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPoints' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPointsByFidQuery, GetPointsByFidQueryVariables>;
export const GetLeaderboardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLeaderboard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user_points' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'totalPoints' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPoints' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isSmartUser' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLeaderboardQuery, GetLeaderboardQueryVariables>;
export const GetTopMindshareDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTopMindshare' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'duration' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'field' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'desc' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getTopMindshare' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'duration' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'duration' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'field' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'field' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'desc' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'desc' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MindshareResult' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserInfo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UserInfo' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followingCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'followerCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isSmartUser' } },
          { kind: 'Field', name: { kind: 'Name', value: 'neynarUserScore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'powerBadge' } },
          { kind: 'Field', name: { kind: 'Name', value: 'username' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DailyMindshare' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DailyMindshare' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_time' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mindshare' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MindshareResult' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MindshareResult' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'change30d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'change7d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'change3d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'changeRatio30d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'changeRatio7d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'changeRatio3d' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last30dMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last7dMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'last3dMindshare' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'time' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userInfo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UserInfo' } }],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daily' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DailyMindshare' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTopMindshareQuery, GetTopMindshareQueryVariables>;
export const GetVoteAggregatesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetVoteAggregates' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'snapshotId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'upvotes_usdc' },
            name: { kind: 'Name', value: 'vote_records_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'targetSnapshotId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'snapshotId' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'voteType' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'StringValue', value: 'up', block: false },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'tokenType' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'StringValue', value: 'usdc', block: false },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'count' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'columns' },
                            value: { kind: 'EnumValue', value: 'id' },
                          },
                        ],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sum' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'amount' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'upvotes_social' },
            name: { kind: 'Name', value: 'vote_records_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'targetSnapshotId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'snapshotId' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'voteType' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'StringValue', value: 'up', block: false },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'tokenType' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'StringValue', value: 'social', block: false },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'count' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'columns' },
                            value: { kind: 'EnumValue', value: 'id' },
                          },
                        ],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sum' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'amount' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'downvotes_usdc' },
            name: { kind: 'Name', value: 'vote_records_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'targetSnapshotId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'snapshotId' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'voteType' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'StringValue', value: 'down', block: false },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'tokenType' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'StringValue', value: 'usdc', block: false },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'count' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'columns' },
                            value: { kind: 'EnumValue', value: 'id' },
                          },
                        ],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sum' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'amount' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'downvotes_social' },
            name: { kind: 'Name', value: 'vote_records_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'targetSnapshotId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'snapshotId' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'voteType' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'StringValue', value: 'down', block: false },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'tokenType' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'StringValue', value: 'social', block: false },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'count' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'columns' },
                            value: { kind: 'EnumValue', value: 'id' },
                          },
                        ],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sum' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'amount' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetVoteAggregatesQuery, GetVoteAggregatesQueryVariables>;
export const GetVoteByVoterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetVoteByVoter' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'voterId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vote_records' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'voterId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'voterId' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'voterId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'voteType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tokenType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'vote_snapshot' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'weekStart' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'mindshare' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetVoteByVoterQuery, GetVoteByVoterQueryVariables>;
export const GetVoteHistoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetVoteHistory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'targetSnapshotId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vote_records' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'targetSnapshotId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'targetSnapshotId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tokenType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'txHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'targetSnapshotId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'voteType' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'voter' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetVoteHistoryQuery, GetVoteHistoryQueryVariables>;
export const GetVoteSnapshotDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetVoteSnapshot' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'order_by' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'vote_snapshot_order_by' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'weekStart' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'date' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vote_snapshot' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'order_by' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'weekStart' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'weekStart' } },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'mindshare' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_gte' },
                            value: { kind: 'FloatValue', value: '0.0001' },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mindshare' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'weekStart' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetVoteSnapshotQuery, GetVoteSnapshotQueryVariables>;
export const GetVoteSnapshotByFidDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetVoteSnapshotByFid' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          defaultValue: { kind: 'StringValue', value: 'open', block: false },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vote_snapshot' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'weekStart' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'fid' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'status' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mindshare' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'weekStart' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetVoteSnapshotByFidQuery, GetVoteSnapshotByFidQueryVariables>;
export const GetVoteSnapshotByFidAndWeekDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetVoteSnapshotByFidAndWeek' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'weekStart' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'date' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'vote_snapshot' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'weekStart' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'fid' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'fid' } },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'weekStart' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'weekStart' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mindshare' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'weekStart' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'pfpUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetVoteSnapshotByFidAndWeekQuery,
  GetVoteSnapshotByFidAndWeekQueryVariables
>;
export const PostNotificationTokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PostNotificationToken' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'url' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insert_user_notification_tokens' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'objects' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'userId' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'url' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'url' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'token' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'on_conflict' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'constraint' },
                      value: { kind: 'EnumValue', value: 'user_notification_tokens_pkey' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'affected_rows' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'returning' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'provider' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostNotificationTokenMutation, PostNotificationTokenMutationVariables>;
export const PostVoteRecordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PostVoteRecord' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PostVoteRecordInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'postVoteRecord' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'status' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostVoteRecordMutation, PostVoteRecordMutationVariables>;
