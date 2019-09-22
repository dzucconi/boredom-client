import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { Link } from "../Link";
import { Error } from "../Error";
import { Loader } from "../Loader";
import { QuestionsQuery } from "../../types/QuestionsQuery";

interface Props {
  sortBy?: "RANDOM" | "CREATED_AT_DESC";
}

export const QUESTIONS_QUERY = gql`
  query QuestionsQuery($sortBy: Sort) {
    questions(sortBy: $sortBy) {
      body
      id: slug
    }
  }
`;

export const Questions: React.FC<Props> = ({ sortBy = "RANDOM" }) => {
  const { data, loading, error } = useQuery<QuestionsQuery>(QUESTIONS_QUERY, {
    variables: { sortBy }
  });

  if (loading) {
    return <Loader percentage={0} />;
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
