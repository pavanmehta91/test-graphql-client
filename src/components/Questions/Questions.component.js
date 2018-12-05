import React from 'react';
import { GET_QUESTIONS } from "graphql/queries";
import { Query } from "react-apollo";
import Loader from "components/Loader/Loader.component";
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

const Questions = (props) => {
  return (
    <div>
      <Query query={GET_QUESTIONS} variables={{ tag: props.selectedTag }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loader />;
          }
          if (error) {
            return <div> Some Error occured</div>;
          }
          return (<ListGroup>
            <Row>
              <Col md="2">Name</Col>
              <Col md="6">Questions</Col>
            </Row>
            <QuestionList questions={data.questions} />
          </ListGroup>
          )
        }}
      </Query>
    </div>

  );
}

let QuestionList1 = (props) => {
  const { questions } = props;
  return (
    <div>
      {
        questions.map((question) =>
          <ListGroupItem className="pointer" onClick={() => props.history.push(`/question/${question.id}`)}>
            <Question question={question} />
          </ListGroupItem>
        )
      }
    </div>
  )
}

export const Question = (props) => {
  const { question } = props;
  return (
    <div>
      <Row>
        <Col md="2">{question.by.name}</Col>
        <Col md="6">{question.title}</Col>
      </Row>
      <Row>
        <Col md="2"></Col>
        <Col>{question.body}</Col>
      </Row>
    </div>
  )
}

export const QuestionList = withRouter(QuestionList1);
export default withRouter(Questions);