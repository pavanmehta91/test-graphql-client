import React, { Fragment } from "react";
import { GET_ALL_TAGS, GET_QUESTIONS, GET_SELECTED_TAG } from "graphql/queries";
import { Query } from "react-apollo";
import TagsPane from "components/TagsPane/Tags";
import Questions from "components/Questions/Questions.component";
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';

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
              <Row>
                <Col md="2">
              <TagsPane selectedTag={selectedTag} />
              </Col>
              <Col>
              <Questions selectedTag={selectedTag} />
              </Col>
              </Row>
            </Fragment>
          );
        }}
      </Query>
    </div>
  );
};
export default Home;
