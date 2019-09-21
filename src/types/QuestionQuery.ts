/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuestionQuery
// ====================================================

export interface QuestionQuery_backfill {
  __typename: "Question";
  id: string;
  body: string;
  isCrawled: boolean;
}

export interface QuestionQuery_question_related {
  __typename: "Question";
  id: string;
  body: string;
  isCrawled: boolean;
}

export interface QuestionQuery_question {
  __typename: "Question";
  id: string;
  body: string;
  isCrawled: boolean;
  related: QuestionQuery_question_related[];
}

export interface QuestionQuery {
  backfill: QuestionQuery_backfill[];
  question: QuestionQuery_question;
}

export interface QuestionQueryVariables {
  id: string;
  limit: number;
}
