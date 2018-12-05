import React from "react";
import { compose, graphql } from "react-apollo";
import { SELECT_TAG } from "graphql/mutations";
const Tags = () => {
  return (
    <div>
      <h1> Tags</h1>
    </div>
  );
};
export default compose(
  graphql(SELECT_TAG, {
    name: "selectTag"
  })
)(Tags);
