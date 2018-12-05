import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import {
  GET_QUESTIONS,
  LOGIN_POPOVER_STATUS,
  GET_SELECTED_TAG
} from "graphql/queries";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes/Routes";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  clientState: {
    defaults: {
      isLoginPopOverVisible: false,
      selectedTag: ""
    },
    resolvers: {
      Query: {
        loginPopOverStatus: (_, args, { cache }) => {
          const data = cache.readQuery({
            query: LOGIN_POPOVER_STATUS
          });
          console.log("in link state query", data);
          return data.isLoginPopOverVisible;
        },
        selectedTag: (_, args, { cache }) => {
          const data = cache.readQuery({
            query: GET_SELECTED_TAG
          });
          return data.selectedTag;
        }
      },
      Mutation: {
        toggleLoginPopOver: (_, args, { cache }) => {
          const data = cache.readQuery({
            query: LOGIN_POPOVER_STATUS
          });
          data.isLoginPopOverVisible = !data.isLoginPopOverVisible;
          console.log("in toggle login mutation", data);
          cache.writeData({ data });
          return data.isLoginPopOverVisible;
        },
        selectTag: (_, args, { cache }) => {
          const { tag } = args;
          const data = cache.readQuery({
            query: GET_SELECTED_TAG
          });
          if(data.selectedTag === tag ){
            data.selectedTag = "";
          } else {
            data.selectedTag = tag;
          }

          cache.writeData({ data });
        }
      }
    }
  },
  headers: {
    userid: localStorage.getItem("userid") || ""
  }
});
// client
//   .query({
//     query: GET_QUESTIONS
//   })
//   .then(result => {
//     console.log(result);
//   });

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <div className="App">
            <Routes />
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
