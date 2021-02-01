import "./app.css";
import React, { Component } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;

const client = new ApolloClient({
  uri:
    "https://api-eu-central-1.graphcms.com/v2/ckkl5vfrz96xz01xsdp3h5pvr/master",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: testQuery,
//   })
//   .then((res) => {
//     console.log(res);
//   });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          app
          <Query query={POSTS_QUERY}>
            {({ loading, data }) => {
              if (loading) return "Loading...";
              const { posts } = data;
              return posts.map((post) => <h1>{post.title}</h1>);
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
