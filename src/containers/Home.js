import React, { Fragment } from "react";
import { GET_ALL_TAGS, GET_QUESTIONS, GET_SELECTED_TAG } from "graphql/queries";
import { Query } from "react-apollo";
import TagsPane from "components/TagsPane/Tags";
import Questions from "components/Questions/Questions.component";
//import Composer from "react-composer";

const Home = () => {
  return (
    <div>
      Home
      <Query query={GET_SELECTED_TAG}>
        {({ loading, error, data }) => {
          const { selectedTag } = data;
          return (
            <Fragment>
              <TagsPane selectedTag={selectedTag} />
              <Questions selectedTag={selectedTag} />
            </Fragment>
          );
        }}
      </Query>
    </div>
  );
};
export default Home;
