import React from "react";
import { GET_USER, GET_QUESTIONS } from "graphql/queries";
import { graphql, compose, Query } from "react-apollo";
import Loader from "components/Loader/Loader.component";
import { Redirect } from "react-router-dom";
import { QuestionList } from "components/Questions/Questions.component"
const Profile = props => {
  if (props.getUser.loading) {
    return <Loader />;
  }
  if (props.getUser.error || !props.getUser.user) {
    debugger;
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  }
  const { id: userId } = props.getUser.user;
  return (
    <div>
      MY Profile
      <Query query={GET_QUESTIONS} variables={{ userId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loader />;
          }
          if (error) {
            return <div> Some Error occured</div>;
          }
          return <QuestionList questions={data.questions} />
        }}
      </Query>
    </div>
  );
};

export default compose(
  graphql(GET_USER, {
    name: "getUser"
  })
)(Profile);
