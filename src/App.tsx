import qs from "qs";
import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./lib/apollo";

import { Agent } from "./Agent";
import { Questions } from "./components/Questions";
import { Question } from "./components/Question";
import { Fullscreener } from "./components/Fullscreener";
import { DisableInteraction } from "./components/DisableInteraction";
import { ScrollToTop } from "./components/ScrollToTop";

const Container = styled.div``;

interface Props {
  autoPlay: boolean;
}

export const App: React.FC<Props> = ({ autoPlay = false }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Router>
      <ScrollToTop />

      {autoPlay && (
        <>
          <Agent surface={ref} />
          <Fullscreener />
          <DisableInteraction />
        </>
      )}

      <Container ref={ref}>
        <ApolloProvider client={client}>
          <Switch>
            <Route
              exact
              path="/"
              component={({ location }: { location: Location }) => {
                const { sortBy } = qs.parse(location.search.slice(1));
                return <Questions sortBy={sortBy} />;
              }}
            />
            <Route
              exact
              path="/:id"
              component={({
                match: {
                  params: { id },
                },
              }: {
                match: { params: { id: string } };
              }) => <Question id={id} />}
            />
            <Route
              path="/*"
              component={() => {
                return <Redirect to={`/${window.location.search}`} />;
              }}
            />
          </Switch>
        </ApolloProvider>
      </Container>
    </Router>
  );
};
