import React from 'react';
import { GET_QUESTION } from "graphql/queries";
import { ADD_ANSWER } from "graphql/mutations";
import { Query, Mutation } from "react-apollo";
import Loader from "components/Loader/Loader.component";
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { Question as QuestionShow } from 'components/Questions/Questions.component'
import Composer from "react-composer";
import AnswerList, { AddAnswer } from 'components/Questions/Answer.component';

const Question = (props) => {
    return (
        <Composer
            components={[
                <Query
                    query={GET_QUESTION} variables={{ id: parseInt(props.match.params.id) }}
                />,
                <Mutation mutation={ADD_ANSWER} />
            ]}
        >
            {([GET_QUESTION_RESULT, ADD_ANSWER_MUTATION]) => {
                const {
                    error,
                    loading,
                    data: { question }
                } = GET_QUESTION_RESULT;
                if (error) {
                    return "Some Error occured";
                }
                if (loading) {
                    return <Loader />;
                }
                return (<div>
                    <QuestionShow question={question} />
                    <AnswerList answers={question.answers} />
                    <AddAnswer addAnswer={ADD_ANSWER_MUTATION} on={question.id} />
                </div>
                )
            }}

        </Composer>
    )
}

export default Question;
