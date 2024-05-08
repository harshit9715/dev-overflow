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

export type Answer = {
  __typename?: 'Answer';
  author: User;
  authorId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  downvoteCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  interactions?: Maybe<ModelInteractionConnection>;
  question: Question;
  questionId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  upvoteCount?: Maybe<Scalars['Int']['output']>;
  yymm?: Maybe<Scalars['String']['output']>;
};


export type AnswerInteractionsArgs = {
  filter?: InputMaybe<ModelInteractionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type CreateAnswerInput = {
  authorId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  downvoteCount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  questionId: Scalars['ID']['input'];
  upvoteCount?: InputMaybe<Scalars['Int']['input']>;
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInteractionInput = {
  answerId?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  ownerId: Scalars['ID']['input'];
  pointsSelf: Scalars['Int']['input'];
  pointsTarget?: InputMaybe<Scalars['Int']['input']>;
  questionId?: InputMaybe<Scalars['ID']['input']>;
  targetUserId?: InputMaybe<Scalars['ID']['input']>;
  type: InteractionType;
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type CreateQuestionInput = {
  answerCount?: InputMaybe<Scalars['Int']['input']>;
  authorId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  downvoteCount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  upvoteCount?: InputMaybe<Scalars['Int']['input']>;
  viewCount?: InputMaybe<Scalars['Int']['input']>;
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type CreateQuestionTagsInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  questionId: Scalars['ID']['input'];
  tagId: Scalars['ID']['input'];
};

export type CreateTagInput = {
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  questionCount: Scalars['Int']['input'];
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  clerkId: Scalars['ID']['input'];
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  email: Scalars['AWSEmail']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  portfolioWebsite?: InputMaybe<Scalars['String']['input']>;
  reputation: Scalars['Int']['input'];
  role: Role;
  username: Scalars['String']['input'];
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteAnswerInput = {
  id: Scalars['ID']['input'];
};

export type DeleteInteractionInput = {
  id: Scalars['ID']['input'];
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

export type Interaction = {
  __typename?: 'Interaction';
  answerId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  pointsSelf: Scalars['Int']['output'];
  pointsTarget?: Maybe<Scalars['Int']['output']>;
  question?: Maybe<Question>;
  questionId?: Maybe<Scalars['ID']['output']>;
  targetUserId?: Maybe<Scalars['ID']['output']>;
  type: InteractionType;
  updatedAt: Scalars['AWSDateTime']['output'];
  userId?: Maybe<Scalars['String']['output']>;
  yymm?: Maybe<Scalars['String']['output']>;
};

export enum InteractionType {
  AskQuestion = 'ASK_QUESTION',
  DownvoteAnswer = 'DOWNVOTE_ANSWER',
  DownvoteQuestion = 'DOWNVOTE_QUESTION',
  ReplyQuestion = 'REPLY_QUESTION',
  SaveQuestion = 'SAVE_QUESTION',
  UpvoteAnswer = 'UPVOTE_ANSWER',
  UpvoteQuestion = 'UPVOTE_QUESTION',
  ViewQuestion = 'VIEW_QUESTION'
}

export type ModelAnswerConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelAnswerConditionInput>>>;
  authorId?: InputMaybe<ModelIdInput>;
  content?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  downvoteCount?: InputMaybe<ModelIntInput>;
  not?: InputMaybe<ModelAnswerConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelAnswerConditionInput>>>;
  questionId?: InputMaybe<ModelIdInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  upvoteCount?: InputMaybe<ModelIntInput>;
  yymm?: InputMaybe<ModelStringInput>;
};

export type ModelAnswerConnection = {
  __typename?: 'ModelAnswerConnection';
  items: Array<Maybe<Answer>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelAnswerFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelAnswerFilterInput>>>;
  authorId?: InputMaybe<ModelIdInput>;
  content?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  downvoteCount?: InputMaybe<ModelIntInput>;
  id?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelAnswerFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelAnswerFilterInput>>>;
  questionId?: InputMaybe<ModelIdInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  upvoteCount?: InputMaybe<ModelIntInput>;
  yymm?: InputMaybe<ModelStringInput>;
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

export type ModelIdKeyConditionInput = {
  beginsWith?: InputMaybe<Scalars['ID']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  ge?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  le?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
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

export type ModelIntKeyConditionInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  ge?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  le?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
};

export type ModelInteractionConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelInteractionConditionInput>>>;
  answerId?: InputMaybe<ModelIdInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelInteractionConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelInteractionConditionInput>>>;
  ownerId?: InputMaybe<ModelIdInput>;
  pointsSelf?: InputMaybe<ModelIntInput>;
  pointsTarget?: InputMaybe<ModelIntInput>;
  questionId?: InputMaybe<ModelIdInput>;
  targetUserId?: InputMaybe<ModelIdInput>;
  type?: InputMaybe<ModelInteractionTypeInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  userId?: InputMaybe<ModelStringInput>;
  yymm?: InputMaybe<ModelStringInput>;
};

export type ModelInteractionConnection = {
  __typename?: 'ModelInteractionConnection';
  items: Array<Maybe<Interaction>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelInteractionFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelInteractionFilterInput>>>;
  answerId?: InputMaybe<ModelIdInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelInteractionFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelInteractionFilterInput>>>;
  ownerId?: InputMaybe<ModelIdInput>;
  pointsSelf?: InputMaybe<ModelIntInput>;
  pointsTarget?: InputMaybe<ModelIntInput>;
  questionId?: InputMaybe<ModelIdInput>;
  targetUserId?: InputMaybe<ModelIdInput>;
  type?: InputMaybe<ModelInteractionTypeInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  userId?: InputMaybe<ModelStringInput>;
  yymm?: InputMaybe<ModelStringInput>;
};

export type ModelInteractionTypeInput = {
  eq?: InputMaybe<InteractionType>;
  ne?: InputMaybe<InteractionType>;
};

export type ModelQuestionConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelQuestionConditionInput>>>;
  answerCount?: InputMaybe<ModelIntInput>;
  authorId?: InputMaybe<ModelIdInput>;
  content?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  downvoteCount?: InputMaybe<ModelIntInput>;
  not?: InputMaybe<ModelQuestionConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelQuestionConditionInput>>>;
  slug?: InputMaybe<ModelStringInput>;
  title?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  upvoteCount?: InputMaybe<ModelIntInput>;
  viewCount?: InputMaybe<ModelIntInput>;
  yymm?: InputMaybe<ModelStringInput>;
};

export type ModelQuestionConnection = {
  __typename?: 'ModelQuestionConnection';
  items: Array<Maybe<Question>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ModelQuestionFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelQuestionFilterInput>>>;
  answerCount?: InputMaybe<ModelIntInput>;
  authorId?: InputMaybe<ModelIdInput>;
  content?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  downvoteCount?: InputMaybe<ModelIntInput>;
  id?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelQuestionFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelQuestionFilterInput>>>;
  slug?: InputMaybe<ModelStringInput>;
  title?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  upvoteCount?: InputMaybe<ModelIntInput>;
  viewCount?: InputMaybe<ModelIntInput>;
  yymm?: InputMaybe<ModelStringInput>;
};

export type ModelQuestionTagsConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelQuestionTagsConditionInput>>>;
  authorId?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelQuestionTagsConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelQuestionTagsConditionInput>>>;
  ownerId?: InputMaybe<ModelStringInput>;
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
  authorId?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  not?: InputMaybe<ModelQuestionTagsFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelQuestionTagsFilterInput>>>;
  ownerId?: InputMaybe<ModelStringInput>;
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

export type ModelStringKeyConditionInput = {
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ge?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  le?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
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

export type ModelSubscriptionInteractionFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionInteractionFilterInput>>>;
  answerId?: InputMaybe<ModelSubscriptionIdInput>;
  createdAt?: InputMaybe<ModelSubscriptionStringInput>;
  id?: InputMaybe<ModelSubscriptionIdInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionInteractionFilterInput>>>;
  ownerId?: InputMaybe<ModelSubscriptionIdInput>;
  pointsSelf?: InputMaybe<ModelSubscriptionIntInput>;
  pointsTarget?: InputMaybe<ModelSubscriptionIntInput>;
  questionId?: InputMaybe<ModelSubscriptionIdInput>;
  targetUserId?: InputMaybe<ModelSubscriptionIdInput>;
  type?: InputMaybe<ModelSubscriptionStringInput>;
  updatedAt?: InputMaybe<ModelSubscriptionStringInput>;
  userId?: InputMaybe<ModelStringInput>;
  yymm?: InputMaybe<ModelSubscriptionStringInput>;
};

export type ModelSubscriptionQuestionTagsFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionQuestionTagsFilterInput>>>;
  authorId?: InputMaybe<ModelStringInput>;
  createdAt?: InputMaybe<ModelSubscriptionStringInput>;
  id?: InputMaybe<ModelSubscriptionIdInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionQuestionTagsFilterInput>>>;
  ownerId?: InputMaybe<ModelStringInput>;
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
  ownerId?: InputMaybe<ModelIdInput>;
  questionCount?: InputMaybe<ModelIntInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  yymm?: InputMaybe<ModelStringInput>;
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
  ownerId?: InputMaybe<ModelIdInput>;
  questionCount?: InputMaybe<ModelIntInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  yymm?: InputMaybe<ModelStringInput>;
};

export type ModelUserConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelUserConditionInput>>>;
  bio?: InputMaybe<ModelStringInput>;
  clerkId?: InputMaybe<ModelIdInput>;
  createdAt?: InputMaybe<ModelStringInput>;
  email?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelStringInput>;
  location?: InputMaybe<ModelStringInput>;
  name?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelUserConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelUserConditionInput>>>;
  picture?: InputMaybe<ModelStringInput>;
  portfolioWebsite?: InputMaybe<ModelStringInput>;
  reputation?: InputMaybe<ModelIntInput>;
  role?: InputMaybe<ModelRoleInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  username?: InputMaybe<ModelStringInput>;
  yymm?: InputMaybe<ModelStringInput>;
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
  picture?: InputMaybe<ModelStringInput>;
  portfolioWebsite?: InputMaybe<ModelStringInput>;
  reputation?: InputMaybe<ModelIntInput>;
  role?: InputMaybe<ModelRoleInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
  username?: InputMaybe<ModelStringInput>;
  yymm?: InputMaybe<ModelStringInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnswer?: Maybe<Answer>;
  createInteraction?: Maybe<Interaction>;
  createQuestion?: Maybe<Question>;
  createQuestionTags?: Maybe<QuestionTags>;
  createTag?: Maybe<Tag>;
  createUser?: Maybe<User>;
  deleteAnswer?: Maybe<Answer>;
  deleteInteraction?: Maybe<Interaction>;
  deleteQuestion?: Maybe<Question>;
  deleteQuestionTags?: Maybe<QuestionTags>;
  deleteTag?: Maybe<Tag>;
  deleteUser?: Maybe<User>;
  updateAnswer?: Maybe<Answer>;
  updateInteraction?: Maybe<Interaction>;
  updateQuestion?: Maybe<Question>;
  updateQuestionTags?: Maybe<QuestionTags>;
  updateTag?: Maybe<Tag>;
  updateUser?: Maybe<User>;
};


export type MutationCreateAnswerArgs = {
  condition?: InputMaybe<ModelAnswerConditionInput>;
  input: CreateAnswerInput;
};


export type MutationCreateInteractionArgs = {
  condition?: InputMaybe<ModelInteractionConditionInput>;
  input: CreateInteractionInput;
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


export type MutationDeleteAnswerArgs = {
  condition?: InputMaybe<ModelAnswerConditionInput>;
  input: DeleteAnswerInput;
};


export type MutationDeleteInteractionArgs = {
  condition?: InputMaybe<ModelInteractionConditionInput>;
  input: DeleteInteractionInput;
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


export type MutationUpdateAnswerArgs = {
  condition?: InputMaybe<ModelAnswerConditionInput>;
  input: UpdateAnswerInput;
};


export type MutationUpdateInteractionArgs = {
  condition?: InputMaybe<ModelInteractionConditionInput>;
  input: UpdateInteractionInput;
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
  answersByAuthorIdAndCreatedAt?: Maybe<ModelAnswerConnection>;
  answersByQuestionIdAndCreatedAt?: Maybe<ModelAnswerConnection>;
  answersByQuestionIdAndUpvoteCount?: Maybe<ModelAnswerConnection>;
  answersByYymmAndCreatedAt?: Maybe<ModelAnswerConnection>;
  getAnswer?: Maybe<Answer>;
  getInteraction?: Maybe<Interaction>;
  getQuestion?: Maybe<Question>;
  getQuestionTags?: Maybe<QuestionTags>;
  getTag?: Maybe<Tag>;
  getUser?: Maybe<User>;
  interactionsByAnswerIdAndOwnerId?: Maybe<ModelInteractionConnection>;
  interactionsByOwnerIdAndCreatedAt?: Maybe<ModelInteractionConnection>;
  interactionsByQuestionIdAndOwnerId?: Maybe<ModelInteractionConnection>;
  interactionsByTargetUserIdAndCreatedAt?: Maybe<ModelInteractionConnection>;
  interactionsByYymmAndCreatedAt?: Maybe<ModelInteractionConnection>;
  listAnswers?: Maybe<ModelAnswerConnection>;
  listInteractions?: Maybe<ModelInteractionConnection>;
  listQuestionTags?: Maybe<ModelQuestionTagsConnection>;
  listQuestions?: Maybe<ModelQuestionConnection>;
  listTags?: Maybe<ModelTagConnection>;
  listUsers?: Maybe<ModelUserConnection>;
  questionTagsByQuestionId?: Maybe<ModelQuestionTagsConnection>;
  questionTagsByTagId?: Maybe<ModelQuestionTagsConnection>;
  questionsByAuthorIdAndCreatedAt?: Maybe<ModelQuestionConnection>;
  questionsBySlug?: Maybe<ModelQuestionConnection>;
  questionsByYymmAndCreatedAt?: Maybe<ModelQuestionConnection>;
  searchAnswers?: Maybe<SearchableAnswerConnection>;
  searchQuestions?: Maybe<SearchableQuestionConnection>;
  searchTags?: Maybe<SearchableTagConnection>;
  searchUsers?: Maybe<SearchableUserConnection>;
  tagsByLabel?: Maybe<ModelTagConnection>;
  tagsByOwnerIdAndLabel?: Maybe<ModelTagConnection>;
  tagsByYymmAndCreatedAt?: Maybe<ModelTagConnection>;
  usersByClerkId?: Maybe<ModelUserConnection>;
  usersByYymmAndCreatedAt?: Maybe<ModelUserConnection>;
};


export type QueryAnswersByAuthorIdAndCreatedAtArgs = {
  authorId: Scalars['ID']['input'];
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelAnswerFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryAnswersByQuestionIdAndCreatedAtArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelAnswerFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['ID']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryAnswersByQuestionIdAndUpvoteCountArgs = {
  filter?: InputMaybe<ModelAnswerFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['ID']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
  upvoteCount?: InputMaybe<ModelIntKeyConditionInput>;
};


export type QueryAnswersByYymmAndCreatedAtArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelAnswerFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  yymm: Scalars['String']['input'];
};


export type QueryGetAnswerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetInteractionArgs = {
  id: Scalars['ID']['input'];
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


export type QueryInteractionsByAnswerIdAndOwnerIdArgs = {
  answerId: Scalars['ID']['input'];
  filter?: InputMaybe<ModelInteractionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<ModelIdKeyConditionInput>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryInteractionsByOwnerIdAndCreatedAtArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelInteractionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['ID']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryInteractionsByQuestionIdAndOwnerIdArgs = {
  filter?: InputMaybe<ModelInteractionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<ModelIdKeyConditionInput>;
  questionId: Scalars['ID']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryInteractionsByTargetUserIdAndCreatedAtArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelInteractionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  targetUserId: Scalars['ID']['input'];
};


export type QueryInteractionsByYymmAndCreatedAtArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelInteractionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  yymm: Scalars['String']['input'];
};


export type QueryListAnswersArgs = {
  filter?: InputMaybe<ModelAnswerFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListInteractionsArgs = {
  filter?: InputMaybe<ModelInteractionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
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


export type QueryQuestionsByAuthorIdAndCreatedAtArgs = {
  authorId: Scalars['ID']['input'];
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelQuestionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryQuestionsBySlugArgs = {
  filter?: InputMaybe<ModelQuestionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryQuestionsByYymmAndCreatedAtArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelQuestionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  yymm: Scalars['String']['input'];
};


export type QuerySearchAnswersArgs = {
  aggregates?: InputMaybe<Array<InputMaybe<SearchableAnswerAggregationInput>>>;
  filter?: InputMaybe<SearchableAnswerFilterInput>;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SearchableAnswerSortInput>>>;
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


export type QueryTagsByOwnerIdAndLabelArgs = {
  filter?: InputMaybe<ModelTagFilterInput>;
  label?: InputMaybe<ModelStringKeyConditionInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['ID']['input'];
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryTagsByYymmAndCreatedAtArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelTagFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  yymm: Scalars['String']['input'];
};


export type QueryUsersByClerkIdArgs = {
  clerkId: Scalars['ID']['input'];
  filter?: InputMaybe<ModelUserFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QueryUsersByYymmAndCreatedAtArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelUserFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
  yymm: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  answerCount?: Maybe<Scalars['Int']['output']>;
  answers?: Maybe<ModelAnswerConnection>;
  author: User;
  authorId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['AWSDateTime']['output']>;
  downvoteCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  interactions?: Maybe<ModelInteractionConnection>;
  slug: Scalars['String']['output'];
  tags?: Maybe<ModelQuestionTagsConnection>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  upvoteCount?: Maybe<Scalars['Int']['output']>;
  viewCount?: Maybe<Scalars['Int']['output']>;
  yymm?: Maybe<Scalars['String']['output']>;
};


export type QuestionAnswersArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelAnswerFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QuestionInteractionsArgs = {
  filter?: InputMaybe<ModelInteractionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QuestionTagsArgs = {
  filter?: InputMaybe<ModelQuestionTagsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type QuestionTags = {
  __typename?: 'QuestionTags';
  authorId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  id: Scalars['ID']['output'];
  ownerId?: Maybe<Scalars['String']['output']>;
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

export enum SearchableAnswerAggregateField {
  AuthorId = 'authorId',
  Content = 'content',
  CreatedAt = 'createdAt',
  DownvoteCount = 'downvoteCount',
  Id = 'id',
  QuestionId = 'questionId',
  UpdatedAt = 'updatedAt',
  UpvoteCount = 'upvoteCount',
  Yymm = 'yymm'
}

export type SearchableAnswerAggregationInput = {
  field: SearchableAnswerAggregateField;
  name: Scalars['String']['input'];
  type: SearchableAggregateType;
};

export type SearchableAnswerConnection = {
  __typename?: 'SearchableAnswerConnection';
  aggregateItems: Array<Maybe<SearchableAggregateResult>>;
  items: Array<Maybe<Answer>>;
  nextToken?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SearchableAnswerFilterInput = {
  and?: InputMaybe<Array<InputMaybe<SearchableAnswerFilterInput>>>;
  authorId?: InputMaybe<SearchableIdFilterInput>;
  content?: InputMaybe<SearchableStringFilterInput>;
  createdAt?: InputMaybe<SearchableStringFilterInput>;
  downvoteCount?: InputMaybe<SearchableIntFilterInput>;
  id?: InputMaybe<SearchableIdFilterInput>;
  not?: InputMaybe<SearchableAnswerFilterInput>;
  or?: InputMaybe<Array<InputMaybe<SearchableAnswerFilterInput>>>;
  questionId?: InputMaybe<SearchableIdFilterInput>;
  updatedAt?: InputMaybe<SearchableStringFilterInput>;
  upvoteCount?: InputMaybe<SearchableIntFilterInput>;
  yymm?: InputMaybe<SearchableStringFilterInput>;
};

export type SearchableAnswerSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableAnswerSortableFields>;
};

export enum SearchableAnswerSortableFields {
  AuthorId = 'authorId',
  Content = 'content',
  CreatedAt = 'createdAt',
  DownvoteCount = 'downvoteCount',
  Id = 'id',
  QuestionId = 'questionId',
  UpdatedAt = 'updatedAt',
  UpvoteCount = 'upvoteCount',
  Yymm = 'yymm'
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
  AnswerCount = 'answerCount',
  AuthorId = 'authorId',
  Content = 'content',
  CreatedAt = 'createdAt',
  DownvoteCount = 'downvoteCount',
  Id = 'id',
  Slug = 'slug',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UpvoteCount = 'upvoteCount',
  ViewCount = 'viewCount',
  Yymm = 'yymm'
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
  answerCount?: InputMaybe<SearchableIntFilterInput>;
  authorId?: InputMaybe<SearchableIdFilterInput>;
  content?: InputMaybe<SearchableStringFilterInput>;
  createdAt?: InputMaybe<SearchableStringFilterInput>;
  downvoteCount?: InputMaybe<SearchableIntFilterInput>;
  id?: InputMaybe<SearchableIdFilterInput>;
  not?: InputMaybe<SearchableQuestionFilterInput>;
  or?: InputMaybe<Array<InputMaybe<SearchableQuestionFilterInput>>>;
  slug?: InputMaybe<SearchableStringFilterInput>;
  title?: InputMaybe<SearchableStringFilterInput>;
  updatedAt?: InputMaybe<SearchableStringFilterInput>;
  upvoteCount?: InputMaybe<SearchableIntFilterInput>;
  viewCount?: InputMaybe<SearchableIntFilterInput>;
  yymm?: InputMaybe<SearchableStringFilterInput>;
};

export type SearchableQuestionSortInput = {
  direction?: InputMaybe<SearchableSortDirection>;
  field?: InputMaybe<SearchableQuestionSortableFields>;
};

export enum SearchableQuestionSortableFields {
  AnswerCount = 'answerCount',
  AuthorId = 'authorId',
  Content = 'content',
  CreatedAt = 'createdAt',
  DownvoteCount = 'downvoteCount',
  Id = 'id',
  Slug = 'slug',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UpvoteCount = 'upvoteCount',
  ViewCount = 'viewCount',
  Yymm = 'yymm'
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
  OwnerId = 'ownerId',
  QuestionCount = 'questionCount',
  UpdatedAt = 'updatedAt',
  Yymm = 'yymm'
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
  ownerId?: InputMaybe<SearchableIdFilterInput>;
  questionCount?: InputMaybe<SearchableIntFilterInput>;
  updatedAt?: InputMaybe<SearchableStringFilterInput>;
  yymm?: InputMaybe<SearchableStringFilterInput>;
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
  OwnerId = 'ownerId',
  QuestionCount = 'questionCount',
  UpdatedAt = 'updatedAt',
  Yymm = 'yymm'
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
  Username = 'username',
  Yymm = 'yymm'
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
  yymm?: InputMaybe<SearchableStringFilterInput>;
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
  Username = 'username',
  Yymm = 'yymm'
}

export type Subscription = {
  __typename?: 'Subscription';
  onCreateInteraction?: Maybe<Interaction>;
  onCreateQuestionTags?: Maybe<QuestionTags>;
  onDeleteInteraction?: Maybe<Interaction>;
  onDeleteQuestionTags?: Maybe<QuestionTags>;
  onUpdateInteraction?: Maybe<Interaction>;
  onUpdateQuestionTags?: Maybe<QuestionTags>;
};


export type SubscriptionOnCreateInteractionArgs = {
  filter?: InputMaybe<ModelSubscriptionInteractionFilterInput>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionOnCreateQuestionTagsArgs = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ModelSubscriptionQuestionTagsFilterInput>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionOnDeleteInteractionArgs = {
  filter?: InputMaybe<ModelSubscriptionInteractionFilterInput>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionOnDeleteQuestionTagsArgs = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ModelSubscriptionQuestionTagsFilterInput>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionOnUpdateInteractionArgs = {
  filter?: InputMaybe<ModelSubscriptionInteractionFilterInput>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionOnUpdateQuestionTagsArgs = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ModelSubscriptionQuestionTagsFilterInput>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt?: Maybe<Scalars['AWSDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  owner: User;
  ownerId: Scalars['ID']['output'];
  questionCount: Scalars['Int']['output'];
  questions?: Maybe<ModelQuestionTagsConnection>;
  updatedAt: Scalars['AWSDateTime']['output'];
  yymm?: Maybe<Scalars['String']['output']>;
};


export type TagQuestionsArgs = {
  filter?: InputMaybe<ModelQuestionTagsFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type UpdateAnswerInput = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  downvoteCount?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  questionId?: InputMaybe<Scalars['ID']['input']>;
  upvoteCount?: InputMaybe<Scalars['Int']['input']>;
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInteractionInput = {
  answerId?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  id: Scalars['ID']['input'];
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  pointsSelf?: InputMaybe<Scalars['Int']['input']>;
  pointsTarget?: InputMaybe<Scalars['Int']['input']>;
  questionId?: InputMaybe<Scalars['ID']['input']>;
  targetUserId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<InteractionType>;
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuestionInput = {
  answerCount?: InputMaybe<Scalars['Int']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  downvoteCount?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  upvoteCount?: InputMaybe<Scalars['Int']['input']>;
  viewCount?: InputMaybe<Scalars['Int']['input']>;
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuestionTagsInput = {
  id: Scalars['ID']['input'];
  questionId?: InputMaybe<Scalars['ID']['input']>;
  tagId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTagInput = {
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  questionCount?: InputMaybe<Scalars['Int']['input']>;
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  clerkId?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  portfolioWebsite?: InputMaybe<Scalars['String']['input']>;
  reputation?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<Role>;
  username?: InputMaybe<Scalars['String']['input']>;
  yymm?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  answersGiven?: Maybe<ModelAnswerConnection>;
  askedQuestions?: Maybe<ModelQuestionConnection>;
  bio?: Maybe<Scalars['String']['output']>;
  clerkId: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['AWSDateTime']['output']>;
  email: Scalars['AWSEmail']['output'];
  id: Scalars['ID']['output'];
  interactions?: Maybe<ModelInteractionConnection>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  portfolioWebsite?: Maybe<Scalars['String']['output']>;
  reputation: Scalars['Int']['output'];
  role: Role;
  tags?: Maybe<ModelTagConnection>;
  updatedAt: Scalars['AWSDateTime']['output'];
  username: Scalars['String']['output'];
  yymm?: Maybe<Scalars['String']['output']>;
};


export type UserAnswersGivenArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelAnswerFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type UserAskedQuestionsArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelQuestionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type UserInteractionsArgs = {
  createdAt?: InputMaybe<ModelStringKeyConditionInput>;
  filter?: InputMaybe<ModelInteractionFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type UserTagsArgs = {
  filter?: InputMaybe<ModelTagFilterInput>;
  label?: InputMaybe<ModelStringKeyConditionInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};

export type HomeQuestionFragment = { __typename?: 'Question', id: string, slug: string, title: string, createdAt?: any | null, upvoteCount?: number | null, downvoteCount?: number | null, viewCount?: number | null, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', id: string, label: string } } | null> } | null, author: { __typename?: 'User', id: string, name?: string | null, username: string, picture?: string | null } };

export type TagIdByLabelFragment = { __typename?: 'Tag', id: string, label: string };

export type TagCardFragment = { __typename?: 'Tag', id: string, label: string, questionCount: number, description?: string | null };

export type UserMinFragmentFragment = { __typename?: 'User', id: string, name?: string | null, username: string, picture?: string | null };

export type UserCardFragment = { __typename?: 'User', id: string, name?: string | null, username: string, picture?: string | null, tags?: { __typename?: 'ModelTagConnection', items: Array<{ __typename?: 'Tag', id: string, label: string } | null> } | null };

export type PostNewAnswerMutationVariables = Exact<{
  content: Scalars['String']['input'];
  authorId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
}>;


export type PostNewAnswerMutation = { __typename?: 'Mutation', createAnswer?: { __typename?: 'Answer', id: string } | null };

export type VoteAnswerMutationVariables = Exact<{
  answerId: Scalars['ID']['input'];
  upvote: Scalars['Int']['input'];
  downvote: Scalars['Int']['input'];
}>;


export type VoteAnswerMutation = { __typename?: 'Mutation', updateAnswer?: { __typename?: 'Answer', id: string, upvoteCount?: number | null, downvoteCount?: number | null } | null };

export type CreateQuestionActionMutationVariables = Exact<{
  ownerId: Scalars['ID']['input'];
  targetUserId?: InputMaybe<Scalars['ID']['input']>;
  questionId: Scalars['ID']['input'];
  pointsSelf: Scalars['Int']['input'];
  pointsTarget?: InputMaybe<Scalars['Int']['input']>;
  actionType: InteractionType;
}>;


export type CreateQuestionActionMutation = { __typename?: 'Mutation', createInteraction?: { __typename?: 'Interaction', id: string, userId?: string | null, type: InteractionType, questionId?: string | null } | null };

export type UpdateInteractionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  actionType: InteractionType;
  pointsSelf: Scalars['Int']['input'];
  pointsTarget?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateInteractionMutation = { __typename?: 'Mutation', updateInteraction?: { __typename?: 'Interaction', id: string, userId?: string | null, type: InteractionType, questionId?: string | null } | null };

export type CreateAnswerActionMutationVariables = Exact<{
  ownerId: Scalars['ID']['input'];
  targetUserId: Scalars['ID']['input'];
  answerId: Scalars['ID']['input'];
  pointsSelf: Scalars['Int']['input'];
  pointsTarget?: InputMaybe<Scalars['Int']['input']>;
  actionType: InteractionType;
  questionId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateAnswerActionMutation = { __typename?: 'Mutation', createInteraction?: { __typename?: 'Interaction', id: string, userId?: string | null, type: InteractionType, questionId?: string | null } | null };

export type DeleteInteractionMutationVariables = Exact<{
  actionId: Scalars['ID']['input'];
}>;


export type DeleteInteractionMutation = { __typename?: 'Mutation', deleteInteraction?: { __typename?: 'Interaction', userId?: string | null, type: InteractionType, questionId?: string | null } | null };

export type LinkQuestionTagMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  tagIdToLink: Scalars['ID']['input'];
}>;


export type LinkQuestionTagMutation = { __typename?: 'Mutation', createQuestionTags?: { __typename?: 'QuestionTags', id: string } | null };

export type CreateQuestionMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  authorId: Scalars['ID']['input'];
  slug: Scalars['String']['input'];
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion?: { __typename?: 'Question', id: string, slug: string, title: string, createdAt?: any | null, upvoteCount?: number | null, downvoteCount?: number | null, viewCount?: number | null, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', id: string, label: string } } | null> } | null, author: { __typename?: 'User', id: string, name?: string | null, username: string, picture?: string | null } } | null };

export type ViewQuestionMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
}>;


export type ViewQuestionMutation = { __typename?: 'Mutation', updateQuestion?: { __typename?: 'Question', id: string, viewCount?: number | null } | null };

export type VoteQuestionMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  upvote: Scalars['Int']['input'];
  downvote: Scalars['Int']['input'];
}>;


export type VoteQuestionMutation = { __typename?: 'Mutation', updateQuestion?: { __typename?: 'Question', id: string, upvoteCount?: number | null, downvoteCount?: number | null } | null };

export type UpdateAnswerCountMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  answerCount: Scalars['Int']['input'];
}>;


export type UpdateAnswerCountMutation = { __typename?: 'Mutation', updateQuestion?: { __typename?: 'Question', id: string, answerCount?: number | null } | null };

export type CreateTagMutationVariables = Exact<{
  label: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['ID']['input'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag?: { __typename?: 'Tag', id: string } | null };

export type UpdateTagQuestionCountMutationVariables = Exact<{
  tagIdForCount: Scalars['ID']['input'];
  count: Scalars['Int']['input'];
}>;


export type UpdateTagQuestionCountMutation = { __typename?: 'Mutation', updateTag?: { __typename?: 'Tag', id: string } | null };

export type NewDevFlowUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  clerkId: Scalars['ID']['input'];
  email: Scalars['AWSEmail']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  rep: Scalars['Int']['input'];
}>;


export type NewDevFlowUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string } | null };

export type GetAnswersForQuestionQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  questionId: Scalars['ID']['input'];
}>;


export type GetAnswersForQuestionQuery = { __typename?: 'Query', searchAnswers?: { __typename?: 'SearchableAnswerConnection', total?: number | null, items: Array<{ __typename?: 'Answer', id: string, content: string, upvoteCount?: number | null, downvoteCount?: number | null, createdAt: any, author: { __typename?: 'User', id: string, name?: string | null, picture?: string | null }, interactions?: { __typename?: 'ModelInteractionConnection', items: Array<{ __typename?: 'Interaction', id: string, type: InteractionType } | null> } | null } | null> } | null };

export type ListQuestionActionsForUserQueryVariables = Exact<{
  ownerId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
}>;


export type ListQuestionActionsForUserQuery = { __typename?: 'Query', interactionsByQuestionIdAndOwnerId?: { __typename?: 'ModelInteractionConnection', items: Array<{ __typename?: 'Interaction', id: string, type: InteractionType } | null> } | null };

export type CheckQuestionViewedQueryVariables = Exact<{
  ownerId: Scalars['ID']['input'];
  questionId: Scalars['ID']['input'];
}>;


export type CheckQuestionViewedQuery = { __typename?: 'Query', interactionsByQuestionIdAndOwnerId?: { __typename?: 'ModelInteractionConnection', items: Array<{ __typename?: 'Interaction', id: string, type: InteractionType } | null> } | null };

export type ListAnswerActionsForUserQueryVariables = Exact<{
  ownerId: Scalars['ID']['input'];
  answerId: Scalars['ID']['input'];
}>;


export type ListAnswerActionsForUserQuery = { __typename?: 'Query', interactionsByAnswerIdAndOwnerId?: { __typename?: 'ModelInteractionConnection', items: Array<{ __typename?: 'Interaction', id: string, type: InteractionType } | null> } | null };

export type HomeQuestionsQueryVariables = Exact<{
  filter?: InputMaybe<ModelQuestionFilterInput>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HomeQuestionsQuery = { __typename?: 'Query', listQuestions?: { __typename?: 'ModelQuestionConnection', nextToken?: string | null, items: Array<{ __typename?: 'Question', id: string, slug: string, title: string, createdAt?: any | null, upvoteCount?: number | null, downvoteCount?: number | null, viewCount?: number | null, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', id: string, label: string } } | null> } | null, author: { __typename?: 'User', id: string, name?: string | null, username: string, picture?: string | null } } | null> } | null };

export type GetTopQuestionsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTopQuestionsQuery = { __typename?: 'Query', searchQuestions?: { __typename?: 'SearchableQuestionConnection', items: Array<{ __typename?: 'Question', id: string, title: string, slug: string } | null> } | null };

export type GetQuestionFromSlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetQuestionFromSlugQuery = { __typename?: 'Query', questionsBySlug?: { __typename?: 'ModelQuestionConnection', items: Array<{ __typename?: 'Question', id: string } | null> } | null };

export type GetQuestionDetailsQueryVariables = Exact<{
  questionId: Scalars['ID']['input'];
  ownerId: Scalars['ID']['input'];
}>;


export type GetQuestionDetailsQuery = { __typename?: 'Query', getQuestion?: { __typename?: 'Question', title: string, content: string, upvoteCount?: number | null, downvoteCount?: number | null, viewCount?: number | null, createdAt?: any | null, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', label: string } } | null> } | null, author: { __typename?: 'User', id: string, name?: string | null, picture?: string | null } } | null, interactionsByQuestionIdAndOwnerId?: { __typename?: 'ModelInteractionConnection', items: Array<{ __typename?: 'Interaction', id: string, type: InteractionType } | null> } | null };

export type GetTagIdByLabelQueryVariables = Exact<{
  label: Scalars['String']['input'];
}>;


export type GetTagIdByLabelQuery = { __typename?: 'Query', tagsByLabel?: { __typename?: 'ModelTagConnection', items: Array<{ __typename?: 'Tag', id: string, label: string } | null> } | null };

export type PopularTagsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PopularTagsQuery = { __typename?: 'Query', searchTags?: { __typename?: 'SearchableTagConnection', items: Array<{ __typename?: 'Tag', id: string, label: string, questionCount: number } | null> } | null };

export type GetAllTagsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<SearchableTagSortableFields>;
  sortDir?: InputMaybe<SearchableSortDirection>;
  filter?: InputMaybe<SearchableTagFilterInput>;
}>;


export type GetAllTagsQuery = { __typename?: 'Query', searchTags?: { __typename?: 'SearchableTagConnection', total?: number | null, items: Array<{ __typename?: 'Tag', id: string, label: string, questionCount: number, description?: string | null } | null> } | null };

export type GetUserByClerkIdQueryVariables = Exact<{
  clerkId: Scalars['ID']['input'];
}>;


export type GetUserByClerkIdQuery = { __typename?: 'Query', usersByClerkId?: { __typename?: 'ModelUserConnection', items: Array<{ __typename?: 'User', id: string } | null> } | null };

export type GetCommunityMembersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<SearchableUserSortableFields>;
  sortDir?: InputMaybe<SearchableSortDirection>;
  filter?: InputMaybe<SearchableUserFilterInput>;
}>;


export type GetCommunityMembersQuery = { __typename?: 'Query', searchUsers?: { __typename?: 'SearchableUserConnection', total?: number | null, items: Array<{ __typename?: 'User', id: string, name?: string | null, username: string, picture?: string | null, tags?: { __typename?: 'ModelTagConnection', items: Array<{ __typename?: 'Tag', id: string, label: string } | null> } | null } | null> } | null };

export type SavedQuestionsQueryVariables = Exact<{
  ownerId: Scalars['ID']['input'];
}>;


export type SavedQuestionsQuery = { __typename?: 'Query', interactionsByOwnerIdAndCreatedAt?: { __typename?: 'ModelInteractionConnection', items: Array<{ __typename?: 'Interaction', id: string, question?: { __typename?: 'Question', title: string, slug: string, id: string, createdAt?: any | null, viewCount?: number | null, upvoteCount?: number | null, downvoteCount?: number | null, author: { __typename?: 'User', id: string, username: string, picture?: string | null }, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', id: string, label: string, questionCount: number, description?: string | null } } | null> } | null } | null } | null> } | null };

export type GetUserProfileQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, name?: string | null, username: string, picture?: string | null, portfolioWebsite?: string | null, bio?: string | null, createdAt?: any | null, location?: string | null, clerkId: string, askedQuestions?: { __typename?: 'ModelQuestionConnection', items: Array<{ __typename?: 'Question', id: string, title: string, slug: string, createdAt?: any | null, viewCount?: number | null, upvoteCount?: number | null, downvoteCount?: number | null, answerCount?: number | null, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', id: string, label: string, questionCount: number, description?: string | null } } | null> } | null } | null> } | null, answersGiven?: { __typename?: 'ModelAnswerConnection', items: Array<{ __typename?: 'Answer', id: string, question: { __typename?: 'Question', id: string, title: string, slug: string, createdAt?: any | null, viewCount?: number | null, upvoteCount?: number | null, downvoteCount?: number | null, author: { __typename?: 'User', id: string, username: string, picture?: string | null }, tags?: { __typename?: 'ModelQuestionTagsConnection', items: Array<{ __typename?: 'QuestionTags', tag: { __typename?: 'Tag', id: string, label: string, questionCount: number, description?: string | null } } | null> } | null } } | null> } | null } | null };

export const TagIdByLabelFragmentDoc = gql`
    fragment TagIdByLabel on Tag {
  id
  label
}
    `;
export const UserMinFragmentFragmentDoc = gql`
    fragment UserMinFragment on User {
  id
  name
  username
  picture
}
    `;
export const HomeQuestionFragmentDoc = gql`
    fragment HomeQuestion on Question {
  id
  slug
  title
  createdAt
  upvoteCount
  downvoteCount
  viewCount
  tags {
    items {
      tag {
        ...TagIdByLabel
      }
    }
  }
  author {
    ...UserMinFragment
  }
}
    ${TagIdByLabelFragmentDoc}
${UserMinFragmentFragmentDoc}`;
export const TagCardFragmentDoc = gql`
    fragment TagCard on Tag {
  id
  label
  questionCount
  description
}
    `;
export const UserCardFragmentDoc = gql`
    fragment UserCard on User {
  ...UserMinFragment
  tags(limit: 3) {
    items {
      ...TagIdByLabel
    }
  }
}
    ${UserMinFragmentFragmentDoc}
${TagIdByLabelFragmentDoc}`;
export const PostNewAnswerDocument = gql`
    mutation postNewAnswer($content: String!, $authorId: ID!, $questionId: ID!) {
  createAnswer(
    input: {content: $content, authorId: $authorId, questionId: $questionId}
  ) {
    id
  }
}
    `;
export const VoteAnswerDocument = gql`
    mutation voteAnswer($answerId: ID!, $upvote: Int!, $downvote: Int!) {
  updateAnswer(
    input: {id: $answerId, upvoteCount: $upvote, downvoteCount: $downvote}
  ) {
    id
    upvoteCount
    downvoteCount
  }
}
    `;
export const CreateQuestionActionDocument = gql`
    mutation createQuestionAction($ownerId: ID!, $targetUserId: ID, $questionId: ID!, $pointsSelf: Int!, $pointsTarget: Int, $actionType: InteractionType!) {
  createInteraction(
    input: {ownerId: $ownerId, targetUserId: $targetUserId, type: $actionType, questionId: $questionId, pointsSelf: $pointsSelf, pointsTarget: $pointsTarget}
  ) {
    id
    userId
    type
    questionId
  }
}
    `;
export const UpdateInteractionDocument = gql`
    mutation updateInteraction($id: ID!, $actionType: InteractionType!, $pointsSelf: Int!, $pointsTarget: Int) {
  updateInteraction(
    input: {id: $id, type: $actionType, pointsSelf: $pointsSelf, pointsTarget: $pointsTarget}
  ) {
    id
    userId
    type
    questionId
  }
}
    `;
export const CreateAnswerActionDocument = gql`
    mutation createAnswerAction($ownerId: ID!, $targetUserId: ID!, $answerId: ID!, $pointsSelf: Int!, $pointsTarget: Int, $actionType: InteractionType!, $questionId: ID) {
  createInteraction(
    input: {ownerId: $ownerId, targetUserId: $targetUserId, type: $actionType, answerId: $answerId, questionId: $questionId, pointsSelf: $pointsSelf, pointsTarget: $pointsTarget}
  ) {
    id
    userId
    type
    questionId
  }
}
    `;
export const DeleteInteractionDocument = gql`
    mutation deleteInteraction($actionId: ID!) {
  deleteInteraction(input: {id: $actionId}) {
    userId
    type
    questionId
  }
}
    `;
export const LinkQuestionTagDocument = gql`
    mutation linkQuestionTag($questionId: ID!, $tagIdToLink: ID!) {
  createQuestionTags(input: {questionId: $questionId, tagId: $tagIdToLink}) {
    id
  }
}
    `;
export const CreateQuestionDocument = gql`
    mutation createQuestion($title: String!, $content: String!, $authorId: ID!, $slug: String!) {
  createQuestion(
    input: {title: $title, content: $content, authorId: $authorId, slug: $slug}
  ) {
    ...HomeQuestion
  }
}
    ${HomeQuestionFragmentDoc}`;
export const ViewQuestionDocument = gql`
    mutation viewQuestion($questionId: ID!) {
  updateQuestion(input: {id: $questionId, viewCount: 1}) {
    id
    viewCount
  }
}
    `;
export const VoteQuestionDocument = gql`
    mutation voteQuestion($questionId: ID!, $upvote: Int!, $downvote: Int!) {
  updateQuestion(
    input: {id: $questionId, upvoteCount: $upvote, downvoteCount: $downvote}
  ) {
    id
    upvoteCount
    downvoteCount
  }
}
    `;
export const UpdateAnswerCountDocument = gql`
    mutation updateAnswerCount($questionId: ID!, $answerCount: Int!) {
  updateQuestion(input: {id: $questionId, answerCount: $answerCount}) {
    id
    answerCount
  }
}
    `;
export const CreateTagDocument = gql`
    mutation createTag($label: String!, $description: String, $ownerId: ID!) {
  createTag(
    input: {label: $label, description: $description, ownerId: $ownerId, questionCount: 0}
  ) {
    id
  }
}
    `;
export const UpdateTagQuestionCountDocument = gql`
    mutation updateTagQuestionCount($tagIdForCount: ID!, $count: Int!) {
  updateTag(input: {id: $tagIdForCount, questionCount: $count}) {
    id
  }
}
    `;
export const NewDevFlowUserDocument = gql`
    mutation newDevFlowUser($username: String!, $clerkId: ID!, $email: AWSEmail!, $name: String, $picture: String, $rep: Int!) {
  createUser(
    input: {username: $username, clerkId: $clerkId, email: $email, name: $name, role: USER, picture: $picture, reputation: $rep}
  ) {
    id
  }
}
    `;
export const GetAnswersForQuestionDocument = gql`
    query getAnswersForQuestion($limit: Int, $skip: Int, $questionId: ID!) {
  searchAnswers(
    from: $skip
    filter: {questionId: {eq: $questionId}}
    sort: {field: upvoteCount, direction: desc}
    limit: $limit
  ) {
    items {
      id
      content
      upvoteCount
      downvoteCount
      createdAt
      author {
        id
        name
        picture
      }
      interactions {
        items {
          id
          type
        }
      }
    }
    total
  }
}
    `;
export const ListQuestionActionsForUserDocument = gql`
    query listQuestionActionsForUser($ownerId: ID!, $questionId: ID!) {
  interactionsByQuestionIdAndOwnerId(
    ownerId: {eq: $ownerId}
    questionId: $questionId
  ) {
    items {
      id
      type
    }
  }
}
    `;
export const CheckQuestionViewedDocument = gql`
    query checkQuestionViewed($ownerId: ID!, $questionId: ID!) {
  interactionsByQuestionIdAndOwnerId(
    ownerId: {eq: $ownerId}
    questionId: $questionId
    filter: {type: {eq: VIEW_QUESTION}}
  ) {
    items {
      id
      type
    }
  }
}
    `;
export const ListAnswerActionsForUserDocument = gql`
    query listAnswerActionsForUser($ownerId: ID!, $answerId: ID!) {
  interactionsByAnswerIdAndOwnerId(ownerId: {eq: $ownerId}, answerId: $answerId) {
    items {
      id
      type
    }
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
export const GetTopQuestionsDocument = gql`
    query getTopQuestions($userId: ID, $limit: Int) {
  searchQuestions(
    limit: $limit
    filter: {authorId: {ne: $userId}}
    sort: {field: upvoteCount, direction: desc}
  ) {
    items {
      id
      title
      slug
    }
  }
}
    `;
export const GetQuestionFromSlugDocument = gql`
    query getQuestionFromSlug($slug: String!) {
  questionsBySlug(slug: $slug) {
    items {
      id
    }
  }
}
    `;
export const GetQuestionDetailsDocument = gql`
    query getQuestionDetails($questionId: ID!, $ownerId: ID!) {
  getQuestion(id: $questionId) {
    title
    content
    upvoteCount
    downvoteCount
    viewCount
    tags {
      items {
        tag {
          label
        }
      }
    }
    author {
      id
      name
      picture
    }
    createdAt
  }
  interactionsByQuestionIdAndOwnerId(
    questionId: $questionId
    ownerId: {eq: $ownerId}
  ) {
    items {
      id
      type
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
export const PopularTagsDocument = gql`
    query popularTags($limit: Int) {
  searchTags(sort: {field: questionCount, direction: desc}, limit: $limit) {
    items {
      id
      label
      questionCount
    }
  }
}
    `;
export const GetAllTagsDocument = gql`
    query getAllTags($skip: Int, $limit: Int, $sortField: SearchableTagSortableFields, $sortDir: SearchableSortDirection, $filter: SearchableTagFilterInput) {
  searchTags(
    from: $skip
    limit: $limit
    sort: {field: $sortField, direction: $sortDir}
    filter: $filter
  ) {
    total
    items {
      ...TagCard
    }
  }
}
    ${TagCardFragmentDoc}`;
export const GetUserByClerkIdDocument = gql`
    query getUserByClerkId($clerkId: ID!) {
  usersByClerkId(clerkId: $clerkId) {
    items {
      id
    }
  }
}
    `;
export const GetCommunityMembersDocument = gql`
    query getCommunityMembers($skip: Int, $limit: Int, $sortField: SearchableUserSortableFields, $sortDir: SearchableSortDirection, $filter: SearchableUserFilterInput) {
  searchUsers(
    from: $skip
    limit: $limit
    sort: {field: $sortField, direction: $sortDir}
    filter: $filter
  ) {
    total
    items {
      ...UserCard
    }
  }
}
    ${UserCardFragmentDoc}`;
export const SavedQuestionsDocument = gql`
    query savedQuestions($ownerId: ID!) {
  interactionsByOwnerIdAndCreatedAt(
    ownerId: $ownerId
    filter: {type: {eq: SAVE_QUESTION}}
  ) {
    items {
      id
      question {
        title
        slug
        id
        createdAt
        viewCount
        upvoteCount
        downvoteCount
        author {
          id
          username
          picture
        }
        tags(limit: 2) {
          items {
            tag {
              ...TagCard
            }
          }
        }
      }
    }
  }
}
    ${TagCardFragmentDoc}`;
export const GetUserProfileDocument = gql`
    query getUserProfile($userId: ID!) {
  getUser(id: $userId) {
    id
    name
    username
    picture
    portfolioWebsite
    bio
    createdAt
    location
    clerkId
    askedQuestions {
      items {
        id
        title
        slug
        createdAt
        viewCount
        upvoteCount
        downvoteCount
        answerCount
        tags(limit: 2) {
          items {
            tag {
              ...TagCard
            }
          }
        }
      }
    }
    answersGiven {
      items {
        id
        question {
          id
          title
          slug
          createdAt
          viewCount
          upvoteCount
          downvoteCount
          author {
            id
            username
            picture
          }
          tags(limit: 2) {
            items {
              tag {
                ...TagCard
              }
            }
          }
        }
      }
    }
  }
}
    ${TagCardFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    postNewAnswer(variables: PostNewAnswerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostNewAnswerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostNewAnswerMutation>(PostNewAnswerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'postNewAnswer', 'mutation');
    },
    voteAnswer(variables: VoteAnswerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VoteAnswerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VoteAnswerMutation>(VoteAnswerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'voteAnswer', 'mutation');
    },
    createQuestionAction(variables: CreateQuestionActionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateQuestionActionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateQuestionActionMutation>(CreateQuestionActionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createQuestionAction', 'mutation');
    },
    updateInteraction(variables: UpdateInteractionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateInteractionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateInteractionMutation>(UpdateInteractionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateInteraction', 'mutation');
    },
    createAnswerAction(variables: CreateAnswerActionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateAnswerActionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAnswerActionMutation>(CreateAnswerActionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createAnswerAction', 'mutation');
    },
    deleteInteraction(variables: DeleteInteractionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteInteractionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteInteractionMutation>(DeleteInteractionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteInteraction', 'mutation');
    },
    linkQuestionTag(variables: LinkQuestionTagMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LinkQuestionTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LinkQuestionTagMutation>(LinkQuestionTagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'linkQuestionTag', 'mutation');
    },
    createQuestion(variables: CreateQuestionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateQuestionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateQuestionMutation>(CreateQuestionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createQuestion', 'mutation');
    },
    viewQuestion(variables: ViewQuestionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ViewQuestionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ViewQuestionMutation>(ViewQuestionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'viewQuestion', 'mutation');
    },
    voteQuestion(variables: VoteQuestionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VoteQuestionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VoteQuestionMutation>(VoteQuestionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'voteQuestion', 'mutation');
    },
    updateAnswerCount(variables: UpdateAnswerCountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateAnswerCountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAnswerCountMutation>(UpdateAnswerCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateAnswerCount', 'mutation');
    },
    createTag(variables: CreateTagMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTagMutation>(CreateTagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTag', 'mutation');
    },
    updateTagQuestionCount(variables: UpdateTagQuestionCountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTagQuestionCountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTagQuestionCountMutation>(UpdateTagQuestionCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTagQuestionCount', 'mutation');
    },
    newDevFlowUser(variables: NewDevFlowUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NewDevFlowUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewDevFlowUserMutation>(NewDevFlowUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'newDevFlowUser', 'mutation');
    },
    getAnswersForQuestion(variables: GetAnswersForQuestionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAnswersForQuestionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAnswersForQuestionQuery>(GetAnswersForQuestionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAnswersForQuestion', 'query');
    },
    listQuestionActionsForUser(variables: ListQuestionActionsForUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ListQuestionActionsForUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListQuestionActionsForUserQuery>(ListQuestionActionsForUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'listQuestionActionsForUser', 'query');
    },
    checkQuestionViewed(variables: CheckQuestionViewedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CheckQuestionViewedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckQuestionViewedQuery>(CheckQuestionViewedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkQuestionViewed', 'query');
    },
    listAnswerActionsForUser(variables: ListAnswerActionsForUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ListAnswerActionsForUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListAnswerActionsForUserQuery>(ListAnswerActionsForUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'listAnswerActionsForUser', 'query');
    },
    HomeQuestions(variables?: HomeQuestionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HomeQuestionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomeQuestionsQuery>(HomeQuestionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'HomeQuestions', 'query');
    },
    getTopQuestions(variables?: GetTopQuestionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopQuestionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopQuestionsQuery>(GetTopQuestionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTopQuestions', 'query');
    },
    getQuestionFromSlug(variables: GetQuestionFromSlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetQuestionFromSlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuestionFromSlugQuery>(GetQuestionFromSlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getQuestionFromSlug', 'query');
    },
    getQuestionDetails(variables: GetQuestionDetailsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetQuestionDetailsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuestionDetailsQuery>(GetQuestionDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getQuestionDetails', 'query');
    },
    getTagIdByLabel(variables: GetTagIdByLabelQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTagIdByLabelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagIdByLabelQuery>(GetTagIdByLabelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTagIdByLabel', 'query');
    },
    popularTags(variables?: PopularTagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PopularTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PopularTagsQuery>(PopularTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'popularTags', 'query');
    },
    getAllTags(variables?: GetAllTagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllTagsQuery>(GetAllTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllTags', 'query');
    },
    getUserByClerkId(variables: GetUserByClerkIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserByClerkIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByClerkIdQuery>(GetUserByClerkIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserByClerkId', 'query');
    },
    getCommunityMembers(variables?: GetCommunityMembersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCommunityMembersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCommunityMembersQuery>(GetCommunityMembersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCommunityMembers', 'query');
    },
    savedQuestions(variables: SavedQuestionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SavedQuestionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SavedQuestionsQuery>(SavedQuestionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'savedQuestions', 'query');
    },
    getUserProfile(variables: GetUserProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserProfileQuery>(GetUserProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserProfile', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;