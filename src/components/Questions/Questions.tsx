import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { Link } from "../Link";
import { Error } from "../Error";
import { Loader } from "../Loader";
import { QuestionsQuery } from "../../types/QuestionsQuery";

export const QUESTIONS_QUERY = gql`
  query QuestionsQuery {
    questions(sortBy: CREATED_AT_DESC) {
      body
      id: slug
    }
  }
`;

export const Questions: React.FC = () => {
  const { data, loading, error } = useQuery<QuestionsQuery>(QUESTIONS_QUERY);

  if (loading) {
    return <Loader percentage={1} />;
  }

  if (error) {
    return <Error>{error.message}</Error>;
  }

  const { questions } = data!;

  return (
    <>
      <Loader percentage={100} />

      {questions.map(question => (
        <Link key={question.id} to={`/${question.id}`}>
          {question.body}
        </Link>
      ))}
    </>
  );
};
