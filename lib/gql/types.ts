import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDateTime: { input: any; output: any; }
  AWSEmail: { input: any; output: any; }
};

export type CreateQuestionInput = {
  content: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  userQuestionsId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateQuestionTagsInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  questionId: Scalars['ID']['input'];
  tagId: Scalars['ID']['input'];
};

export type CreateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label: Scalars['String']['input'];
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  clerkId: Scalars['ID']['input'];
  email: Scalars['AWSEmail']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  portfolioWebsite?: InputMaybe<Scalars['String']['input']>;
  reputation?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<Role>;
  username: Scalars['String']['input'];
};

export type DeleteQuestionInput = {
  id: Scalars['ID']['input'];
};

export type DeleteQuestionTagsInput = {
  id: Scalars['ID']['input'];
};

export type DeleteTagInput = {
  id: Scalars['ID']['input'];
};

export type DeleteUserInput = {
  id: Scalars['ID']['input'];
};

export enum ModelAttributeTypes {
  Null = '_null',
  Binary = 'binary',
  BinarySet = 'binarySet',
  Bool = 'bool',
  List = 'list',
  Map = 'map',
  Number = 'number',
  NumberSet = 'numberSet',
  String = 'string',
  StringSet = 'stringSet'
}

export type ModelBooleanInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ModelFloatInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  ge?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  le?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
};

export type ModelIdInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  beginsWith?: InputMaybe<Scalars['ID']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  ge?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  le?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  size?: InputMaybe<ModelSizeInput>;
};

export type ModelIntInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  ge?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  le?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
};

export type ModelQuestionConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelQuestionConditionInput>>>;
  content?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelQuestionConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelQuestionConditionInput>>>;
  owner?: InputMaybe<ModelStringInput>;
  title?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  userQuestionsId?: InputMaybe<ModelIdInput>;
};

export type ModelQuestionConnection = {
  __typename?: 'ModelQuestionConnection';
  items: Array<Maybe<Question>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelQuestionFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelQuestionFilterInput>>>;
  content?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelQuestionFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelQuestionFilterInput>>>;
  owner?: InputMaybe<ModelStringInput>;
  title?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  userQuestionsId?: InputMaybe<ModelIdInput>;
};

export type ModelQuestionTagsConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelQuestionTagsConditionInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelQuestionTagsConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelQuestionTagsConditionInput>>>;
  owner?: InputMaybe<ModelStringInput>;
  questionId?: InputMaybe<ModelIdInput>;
  tagId?: InputMaybe<ModelIdInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelQuestionTagsConnection = {
  __typename?: 'ModelQuestionTagsConnection';
  items: Array<Maybe<QuestionTags>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelQuestionTagsFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelQuestionTagsFilterInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelQuestionTagsFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelQuestionTagsFilterInput>>>;
  owner?: InputMaybe<ModelStringInput>;
  questionId?: InputMaybe<ModelIdInput>;
  tagId?: InputMaybe<ModelIdInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelRoleInput = {
  eq?: InputMaybe<Role>;
  ne?: InputMaybe<Role>;
};

export type ModelSizeInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  ge?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  le?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
};

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type ModelStringInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']['input']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ge?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  le?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<ModelSizeInput>;
};

export type ModelSubscriptionBooleanInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ModelSubscriptionFloatInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  ge?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  le?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type ModelSubscriptionIdInput = {
  beginsWith?: InputMaybe<Scalars['ID']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  ge?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  le?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ModelSubscriptionIntInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  ge?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  le?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type ModelSubscriptionQuestionTagsFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionQuestionTagsFilterInput>>>;
  createdAt?: InputMaybe<ModelSubscriptionStringInput>;
  id?: InputMaybe<ModelSubscriptionIdInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionQuestionTagsFilterInput>>>;
  owner?: InputMaybe<ModelStringInput>;
  questionId?: InputMaybe<ModelSubscriptionIdInput>;
  tagId?: InputMaybe<ModelSubscriptionIdInput>;
  updatedAt?: InputMaybe<ModelSubscriptionStringInput>;
};

export type ModelSubscriptionStringInput = {
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ge?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  le?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ModelTagConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelTagConditionInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  description?: InputMaybe<ModelStringInput>;
  label?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelTagConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelTagConditionInput>>>;
  owner?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelTagConnection = {
  __typename?: 'ModelTagConnection';
  items: Array<Maybe<Tag>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelTagFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelTagFilterInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  description?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  label?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelTagFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelTagFilterInput>>>;
  owner?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelUserConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelUserConditionInput>>>;
  bio?: InputMaybe<ModelStringInput>;
  clerkId?: InputMaybe<ModelIdInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  email?: InputMaybe<ModelStringInput>;
  location?: InputMaybe<ModelStringInput>;
  name?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelUserConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelUserConditionInput>>>;
  owner?: InputMaybe<ModelStringInput>;
  picture?: InputMaybe<ModelStringInput>;
  portfolioWebsite?: InputMaybe<ModelStringInput>;
  reputation?: InputMaybe<ModelIntInput>;
  role?: InputMaybe<ModelRoleInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  username?: InputMaybe<ModelStringInput>;
};

export type ModelUserConnection = {
  __typename?: 'ModelUserConnection';
  items: Array<Maybe<User>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelUserFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelUserFilterInput>>>;
  bio?: InputMaybe<ModelStringInput>;
  clerkId?: InputMaybe<ModelIdInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  email?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  location?: InputMaybe<ModelStringInput>;
  name?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelUserFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelUserFilterInput>>>;
  owner?: InputMaybe<ModelStringInput>;
  picture?: InputMaybe<ModelStringInput>;
  portfolioWebsite?: InputMaybe<ModelStringInput>;
  reputation?: InputMaybe<ModelIntInput>;
  role?: InputMaybe<ModelRoleInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  username?: InputMaybe<ModelStringInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuestion?: Maybe<Question>;
  createQuestionTags?: Maybe<QuestionTags>;
  createTag?: Maybe<Tag>;
  createUser?: Maybe<User>;
  deleteQuestion?: Maybe<Question>;
  deleteQuestionTags?: Maybe<QuestionTags>;
  deleteTag?: Maybe<Tag>;
  deleteUser?: Maybe<User>;
  updateQuestion?: Maybe<Question>;
  updateQuestionTags?: Maybe<QuestionTags>;
  updateTag?: Maybe<Tag>;
  updateUser?: Maybe<User>;
};


export type MutationCreateQuestionArgs = {
  condition?: InputMaybe<ModelQuestionConditionInput>;
  input: CreateQuestionInput;
};


export type MutationCreateQuestionTagsArgs = {
  condition?: InputMaybe<ModelQuestionTagsConditionInput>;
  input: CreateQuestionTagsInput;
};


export type MutationCreateTagArgs = {
  condition?: InputMaybe<ModelTagConditionInput>;
  input: CreateTagInput;
};


export type MutationCreateUserArgs = {
  condition?: InputMaybe<ModelUserConditionInput>;
  input: CreateUserInput;
};


export type MutationDeleteQuestionArgs = {
  condition?: InputMaybe<ModelQuestionConditionInput>;
  input: DeleteQuestionInput;
};


export type MutationDeleteQuestionTagsArgs = {
  condition?: InputMaybe<ModelQuestionTagsConditionInput>;
  input: DeleteQuestionTagsInput;
};


export type MutationDeleteTagArgs = {
  condition?: InputMaybe<ModelTagConditionInput>;
  input: DeleteTagInput;
};


export type MutationDeleteUserArgs = {
  condition?: InputMaybe<ModelUserConditionInput>;
  input: DeleteUserInput;
};


export type MutationUpdateQuestionArgs = {
  condition?: InputMaybe<ModelQuestionConditionInput>;
  input: UpdateQuestionInput;
};


export type MutationUpdateQuestionTagsArgs = {
  condition?: InputMaybe<ModelQuestionTagsConditionInput>;
  input: UpdateQuestionTagsInput;
};


export type MutationUpdateTagArgs = {
  condition?: InputMaybe<ModelTagConditionInput>;
  input: UpdateTagInput;
};


export type MutationUpdateUserArgs = {
  condition?: InputMaybe<ModelUserConditionInput>;
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getQuestion?: Maybe<Question>;
  getQuestionTags?: Maybe<QuestionTags>;
  getTag?: Maybe<Tag>;
  getUser?: Maybe<User>;
  listQuestionTags?: Maybe<ModelQuestionTagsConnection>;
  listQuestions?: Maybe<ModelQuestionConnection>;
  listTags?: Maybe<ModelTagConnection>;
  listUsers?: Maybe<ModelUserConnection>;
  questionTagsByQuestionId?: Maybe<ModelQuestionTagsConnection>;
  questionTagsByTagId?: Maybe<ModelQuestionTagsConnection>;
  searchQuestions?: Maybe<SearchableQuestionConnection>;
  searchTags?: Maybe<SearchableTagConnection>;
  searchUsers?: Maybe<SearchableUserConnection>;
  tagsByLabel?: Maybe<ModelTagConnection>;
};


export type QueryGetQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuestionTagsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTagArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListQuestionTagsArgs = {
  filter?: InputMaybe<ModelQuestionTagsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListQuestionsArgs = {
  filter?: InputMaybe<ModelQuestionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListTagsArgs = {
  filter?: InputMaybe<ModelTagFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListUsersArgs = {
  filter?: InputMaybe<ModelUserFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryQuestionTagsByQuestionIdArgs = {
  filter?: InputMaybe<ModelQuestionTagsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['ID']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryQuestionTagsByTagIdArgs = {
  filter?: InputMaybe<ModelQuestionTagsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  tagId: Scalars['ID']['input'];
};


export type QuerySearchQuestionsArgs = {
  aggregates?: InputMaybe<Array<InputMaybe<SearchableQuestionAggregationInput>>>;
  filter?: InputMaybe<SearchableQuestionFilterInput>;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableQuestionSortInput>>>;
};


export type QuerySearchTagsArgs = {
  aggregates?: InputMaybe<Array<InputMaybe<SearchableTagAggregationInput>>>;
  filter?: InputMaybe<SearchableTagFilterInput>;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableTagSortInput>>>;
};


export type QuerySearchUsersArgs = {
  aggregates?: InputMaybe<Array<InputMaybe<SearchableUserAggregationInput>>>;
  filter?: InputMaybe<SearchableUserFilterInput>;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableUserSortInput>>>;
};


export type QueryTagsByLabelArgs = {
  filter?: InputMaybe<ModelTagFilterInput>;
  label: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type Question = {
  __typename?: 'Question';
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  id: Scalars['ID']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<ModelQuestionTagsConnection>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  userQuestionsId?: Maybe<Scalars['ID']['output']>;
};


export type QuestionTagsArgs = {
  filter?: InputMaybe<ModelQuestionTagsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type QuestionTags = {
  __typename?: 'QuestionTags';
  createdAt: Scalars['AWSDateTime']['output'];
  id: Scalars['ID']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  question: Question;
  questionId: Scalars['ID']['output'];
  tag: Tag;
  tagId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SearchableAggregateBucketResult = {
  __typename?: 'SearchableAggregateBucketResult';
  buckets?: Maybe<Array<Maybe<SearchableAggregateBucketResultItem>>>;
};

export type SearchableAggregateBucketResultItem = {
  __typename?: 'SearchableAggregateBucketResultItem';
  doc_count: Scalars['Int']['output'];
  key: Scalars['String']['output'];
};

export type SearchableAggregateGenericResult = SearchableAggregateBucketResult | SearchableAggregateScalarResult;

export type SearchableAggregateResult = {
  __typename?: 'SearchableAggregateResult';
  name: Scalars['String']['output'];
  result?: Maybe<SearchableAggregateGenericResult>;
};

export type SearchableAggregateScalarResult = {
  __typename?: 'SearchableAggregateScalarResult';
  value: Scalars['Float']['output'];
};

export enum SearchableAggregateType {
  Avg = 'avg',
  Cardinality = 'cardinality',
  Max = 'max',
  Min = 'min',
  Sum = 'sum',
  Terms = 'terms'
}

export type SearchableBooleanFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SearchableFloatFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type SearchableIdFilterInput = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  match?: InputMaybe<Scalars['ID']['input']>;
  matchPhrase?: InputMaybe<Scalars['ID']['input']>;
  matchPhrasePrefix?: InputMaybe<Scalars['ID']['input']>;
  multiMatch?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  regexp?: InputMaybe<Scalars['ID']['input']>;
  wildcard?: InputMaybe<Scalars['ID']['input']>;
};

export type SearchableIntFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export enum SearchableQuestionAggregateField {
  Content = 'content',
  CreatedAt = 'createdAt',
  Id = 'id',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UserQuestionsId = 'userQuestionsId'
}

export type SearchableQuestionAggregationInput = {
  field: SearchableQuestionAggregateField;
  name: Scalars['String']['input'];
  type: SearchableAggregateType;
};

export type SearchableQuestionConnection = {
  __typename?: 'SearchableQuestionConnection';
  aggregateItems: Array<Maybe<SearchableAggregateResult>>;
  items: Array<Maybe<Question>>;
  nextToken?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SearchableQuestionFilterInput = {
  and?: InputMaybe<Array<InputMaybe<SearchableQuestionFilterInput>>>;
  content?: InputMaybe<SearchableStringFilterInput>;
  createdAt?: InputMaybe<SearchableStringFilterInput>;
  id?: InputMaybe<SearchableIdFilterInput>;
  not?: InputMaybe<SearchableQuestionFilterInput>;
  or?: InputMaybe<Array<InputMaybe<SearchableQuestionFilterInput>>>;
  title?: InputMaybe<SearchableStringFilterInput>;
  updatedAt?: InputMaybe<SearchableStringFilterInput>;
  userQuestionsId?: InputMaybe<SearchableIdFilterInput>;
};

export type SearchableQuestionSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableQuestionSortableFields>;
};

export enum SearchableQuestionSortableFields {
  Content = 'content',
  CreatedAt = 'createdAt',
  Id = 'id',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UserQuestionsId = 'userQuestionsId'
}

export enum SearchableSortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type SearchableStringFilterInput = {
  eq?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  match?: InputMaybe<Scalars['String']['input']>;
  matchPhrase?: InputMaybe<Scalars['String']['input']>;
  matchPhrasePrefix?: InputMaybe<Scalars['String']['input']>;
  multiMatch?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  range?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regexp?: InputMaybe<Scalars['String']['input']>;
  wildcard?: InputMaybe<Scalars['String']['input']>;
};

export enum SearchableTagAggregateField {
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  Label = 'label',
  UpdatedAt = 'updatedAt'
}

export type SearchableTagAggregationInput = {
  field: SearchableTagAggregateField;
  name: Scalars['String']['input'];
  type: SearchableAggregateType;
};

export type SearchableTagConnection = {
  __typename?: 'SearchableTagConnection';
  aggregateItems: Array<Maybe<SearchableAggregateResult>>;
  items: Array<Maybe<Tag>>;
  nextToken?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SearchableTagFilterInput = {
  and?: InputMaybe<Array<InputMaybe<SearchableTagFilterInput>>>;
  createdAt?: InputMaybe<SearchableStringFilterInput>;
  description?: InputMaybe<SearchableStringFilterInput>;
  id?: InputMaybe<SearchableIdFilterInput>;
  label?: InputMaybe<SearchableStringFilterInput>;
  not?: InputMaybe<SearchableTagFilterInput>;
  or?: InputMaybe<Array<InputMaybe<SearchableTagFilterInput>>>;
  updatedAt?: InputMaybe<SearchableStringFilterInput>;
};

export type SearchableTagSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableTagSortableFields>;
};

export enum SearchableTagSortableFields {
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  Label = 'label',
  UpdatedAt = 'updatedAt'
}

export enum SearchableUserAggregateField {
  Bio = 'bio',
  ClerkId = 'clerkId',
  CreatedAt = 'createdAt',
  Email = 'email',
  Id = 'id',
  Location = 'location',
  Name = 'name',
  Picture = 'picture',
  PortfolioWebsite = 'portfolioWebsite',
  Reputation = 'reputation',
  Role = 'role',
  UpdatedAt = 'updatedAt',
  Username = 'username'
}

export type SearchableUserAggregationInput = {
  field: SearchableUserAggregateField;
  name: Scalars['String']['input'];
  type: SearchableAggregateType;
};

export type SearchableUserConnection = {
  __typename?: 'SearchableUserConnection';
  aggregateItems: Array<Maybe<SearchableAggregateResult>>;
  items: Array<Maybe<User>>;
  nextToken?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SearchableUserFilterInput = {
  and?: InputMaybe<Array<InputMaybe<SearchableUserFilterInput>>>;
  bio?: InputMaybe<SearchableStringFilterInput>;
  clerkId?: InputMaybe<SearchableIdFilterInput>;
  createdAt?: InputMaybe<SearchableStringFilterInput>;
  email?: InputMaybe<SearchableStringFilterInput>;
  id?: InputMaybe<SearchableIdFilterInput>;
  location?: InputMaybe<SearchableStringFilterInput>;
  name?: InputMaybe<SearchableStringFilterInput>;
  not?: InputMaybe<SearchableUserFilterInput>;
  or?: InputMaybe<Array<InputMaybe<SearchableUserFilterInput>>>;
  picture?: InputMaybe<SearchableStringFilterInput>;
  portfolioWebsite?: InputMaybe<SearchableStringFilterInput>;
  reputation?: InputMaybe<SearchableIntFilterInput>;
  role?: InputMaybe<SearchableStringFilterInput>;
  updatedAt?: InputMaybe<SearchableStringFilterInput>;
  username?: InputMaybe<SearchableStringFilterInput>;
};

export type SearchableUserSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableUserSortableFields>;
};

export enum SearchableUserSortableFields {
  Bio = 'bio',
  ClerkId = 'clerkId',
  CreatedAt = 'createdAt',
  Email = 'email',
  Id = 'id',
  Location = 'location',
  Name = 'name',
  Picture = 'picture',
  PortfolioWebsite = 'portfolioWebsite',
  Reputation = 'reputation',
  UpdatedAt = 'updatedAt',
  Username = 'username'
}

export type Subscription = {
  __typename?: 'Subscription';
  onCreateQuestionTags?: Maybe<QuestionTags>;
  onDeleteQuestionTags?: Maybe<QuestionTags>;
  onUpdateQuestionTags?: Maybe<QuestionTags>;
};


export type SubscriptionOnCreateQuestionTagsArgs = {
  filter?: InputMaybe<ModelSubscriptionQuestionTagsFilterInput>;
  owner?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionOnDeleteQuestionTagsArgs = {
  filter?: InputMaybe<ModelSubscriptionQuestionTagsFilterInput>;
  owner?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionOnUpdateQuestionTagsArgs = {
  filter?: InputMaybe<ModelSubscriptionQuestionTagsFilterInput>;
  owner?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['AWSDateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  questions?: Maybe<ModelQuestionTagsConnection>;
  updatedAt: Scalars['AWSDateTime']['output'];
};


export type TagQuestionsArgs = {
  filter?: InputMaybe<ModelQuestionTagsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type UpdateQuestionInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  userQuestionsId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateQuestionTagsInput = {
  id: Scalars['ID']['input'];
  questionId?: InputMaybe<Scalars['ID']['input']>;
  tagId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  clerkId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  portfolioWebsite?: InputMaybe<Scalars['String']['input']>;
  reputation?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<Role>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  clerkId: Scalars['ID']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  portfolioWebsite?: Maybe<Scalars['String']['output']>;
  questions?: Maybe<ModelQuestionConnection>;
  reputation?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<Role>;
  updatedAt: Scalars['AWSDateTime']['output'];
  username: Scalars['String']['output'];
};


export type UserQuestionsArgs = {
  filter?: InputMaybe<ModelQuestionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type LinkQuestionTagMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  tagId: Scalars['ID']['input'];
}>;


export type LinkQuestionTagMutation = { __typename?: 'Mutation', createQuestionTags?: { __typename?: 'QuestionTags', id: string } | null };

export type HomeQuestionFragment = { __typename?: 'Question', id: string, title: string, createdAt: any, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', id: string, label: string } } | null> } | null, author?: { __typename?: 'User', name?: string | null, picture?: string | null, clerkId: string } | null };

export type TagIdByLabelFragment = { __typename?: 'Tag', id: string, label: string };

export type CreateQuestionMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion?: { __typename?: 'Question', id: string, title: string, createdAt: any, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', id: string, label: string } } | null> } | null, author?: { __typename?: 'User', name?: string | null, picture?: string | null, clerkId: string } | null } | null };

export type CreateTagMutationVariables = Exact<{
  label: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag?: { __typename?: 'Tag', id: string } | null };

export type HomeQuestionsQueryVariables = Exact<{
  filter?: InputMaybe<ModelQuestionFilterInput>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HomeQuestionsQuery = { __typename?: 'Query', listQuestions?: { __typename?: 'ModelQuestionConnection', nextToken?: string | null, items: Array<{ __typename?: 'Question', id: string, title: string, createdAt: any, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', id: string, label: string } } | null> } | null, author?: { __typename?: 'User', name?: string | null, picture?: string | null, clerkId: string } | null } | null> } | null };

export type HotQuestionsQueryVariables = Exact<{
  filter?: InputMaybe<ModelQuestionFilterInput>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HotQuestionsQuery = { __typename?: 'Query', listQuestions?: { __typename?: 'ModelQuestionConnection', items: Array<{ __typename?: 'Question', id: string, title: string } | null> } | null };

export type GetTagIdByLabelQueryVariables = Exact<{
  label: Scalars['String']['input'];
}>;


export type GetTagIdByLabelQuery = { __typename?: 'Query', tagsByLabel?: { __typename?: 'ModelTagConnection', items: Array<{ __typename?: 'Tag', id: string, label: string } | null> } | null };

export const TagIdByLabelFragmentDoc = gql`
    fragment TagIdByLabel on Tag {
  id
  label
}
    `;
export const HomeQuestionFragmentDoc = gql`
    fragment HomeQuestion on Question {
  id
  title
  createdAt
  tags {
    items {
      tag {
        ...TagIdByLabel
      }
    }
  }
  author {
    name
    picture
    clerkId
  }
}
    ${TagIdByLabelFragmentDoc}`;
export const LinkQuestionTagDocument = gql`
    mutation linkQuestionTag($questionId: ID!, $tagId: ID!) {
  createQuestionTags(input: {questionId: $questionId, tagId: $tagId}) {
    id
  }
}
    `;
export const CreateQuestionDocument = gql`
    mutation createQuestion($title: String!, $content: String!) {
  createQuestion(input: {title: $title, content: $content}) {
    ...HomeQuestion
  }
}
    ${HomeQuestionFragmentDoc}`;
export const CreateTagDocument = gql`
    mutation createTag($label: String!, $description: String) {
  createTag(input: {label: $label, description: $description}) {
    id
  }
}
    `;
export const HomeQuestionsDocument = gql`
    query HomeQuestions($filter: ModelQuestionFilterInput, $nextToken: String, $limit: Int) {
  listQuestions(limit: $limit, nextToken: $nextToken, filter: $filter) {
    nextToken
    items {
      ...HomeQuestion
    }
  }
}
    ${HomeQuestionFragmentDoc}`;
export const HotQuestionsDocument = gql`
    query HotQuestions($filter: ModelQuestionFilterInput, $nextToken: String, $limit: Int) {
  listQuestions(limit: $limit, nextToken: $nextToken, filter: $filter) {
    items {
      id
      title
    }
  }
}
    `;
export const GetTagIdByLabelDocument = gql`
    query getTagIdByLabel($label: String!) {
  tagsByLabel(label: $label) {
    items {
      ...TagIdByLabel
    }
  }
}
    ${TagIdByLabelFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    linkQuestionTag(variables: LinkQuestionTagMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LinkQuestionTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LinkQuestionTagMutation>(LinkQuestionTagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'linkQuestionTag', 'mutation');
    },
    createQuestion(variables: CreateQuestionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateQuestionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateQuestionMutation>(CreateQuestionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createQuestion', 'mutation');
    },
    createTag(variables: CreateTagMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTagMutation>(CreateTagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTag', 'mutation');
    },
    HomeQuestions(variables?: HomeQuestionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HomeQuestionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomeQuestionsQuery>(HomeQuestionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'HomeQuestions', 'query');
    },
    HotQuestions(variables?: HotQuestionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HotQuestionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HotQuestionsQuery>(HotQuestionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'HotQuestions', 'query');
    },
    getTagIdByLabel(variables: GetTagIdByLabelQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTagIdByLabelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagIdByLabelQuery>(GetTagIdByLabelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTagIdByLabel', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;