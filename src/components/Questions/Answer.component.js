import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import { Formik } from "formik";
import { GET_QUESTION } from "graphql/queries";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";


export default (props) => {
    const { answers } = props;
    return (
        <div>
            {
                answers.map((answer) =>
                    <ListGroupItem className="pointer" >
                        <Answer answer={answer} />
                    </ListGroupItem>
                )
            }
        </div>
    )
}

export const Answer = (props) => {
    const { answer } = props;
    return (
        <div>
            <Row>
                <Col md="2">{answer.by.name}</Col>
                <Col>{answer.text}</Col>
            </Row>
        </div>
    )
}

export const AddAnswer = (props) => {
    debugger;
    return <Formik
        initialValues={{ text: "" }}
        onSubmit={async values => {
            const { addAnswer } = props;
            addAnswer({
                variables: {
                    text: values.text,
                    on: props.on
                },
                refetchQueries: [{ query: GET_QUESTION, variables: { id: props.on } }]
            })
        }}
        render={({ values, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
                <Label for="name">Add Answer</Label>
                <Input
                    type="text"
                    name="text"
                    id="answer"
                    value={values.text}
                    onChange={handleChange}
                    placeholder="Enter Answer"
                />
                <Button type="submit">Submit</Button>
            </Form>
        )}
    />
}