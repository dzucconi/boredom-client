import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri: "https://damonzucconi-boredom-api.herokuapp.com/graphql"
});
