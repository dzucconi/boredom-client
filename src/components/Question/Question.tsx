import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import { shuffle } from "../../lib/shuffle";
import { Link } from "../Link";
import { Loader } from "../Loader";
import { Overlay } from "../Overlay";
import {
  QuestionQuery,
  QuestionQueryVariables,
} from "../../types/QuestionQuery";

const H1 = styled.h1`
  margin: 1em 0;
  padding: 0.5em 1em;
  font-size: 1rem;
  font-weight: normal;
  color: white;
  text-decoration: none;
  color: gold;
`;

const LIMIT = 30;

export const QUESTION_QUERY = gql`
  query QuestionQuery($id: ID!, $limit: Int!) {
    backfill: questions(limit: $limit) {
      ...Question
    }
    question(id: $id) {
      ...Question
      related(limit: $limit) {
        ...Question
      }
    }
  }

  fragment Question on Question {
    id: slug
    body
    isCrawled
  }
`;

interface Props {
  id: string;
}
export const Question: React.FC<Props> = ({ id }) => {
  const { data, loading, error } = useQuery<
    QuestionQuery,
    QuestionQueryVariables
  >(QUESTION_QUERY, { variables: { id, limit: LIMIT } });

  React.useEffect(() => {
    if (data && data.question) {
      document.title = data.question.body;
    }
  }, [data]);

  if (loading) {
    return <Loader key={id} percentage={0} />;
  }

  if (error) {
    return <Redirect to={`/${window.location.search}`} />;
  }

  const { question, backfill } = data!;

  const questions = shuffle(
    [...question.related, ...backfill].filter((q) => q.id !== question.id)
  ).slice(0, LIMIT);

  return (
    <>
      <Loader key={id} percentage={100} />

      <Overlay>{question.body}</Overlay>

      <H1>{question.body}</H1>

      {questions.map((question) => (
        <Link
          key={question.id}
          to={`/${question.id}${window.location.search}`}
          data-crawled={question.isCrawled}
        >
          {question.body}
        </Link>
      ))}
    </>
  );
};
