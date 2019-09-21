/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuestionsQuery
// ====================================================

export interface QuestionsQuery_questions {
  __typename: "Question";
  body: string;
  id: string;
}

export interface QuestionsQuery {
  questions: QuestionsQuery_questions[];
}
