import React, { Fragment } from "react";
import { GET_ALL_TAGS, GET_QUESTIONS, GET_SELECTED_TAG } from "graphql/queries";
import { Query, graphql, compose } from "react-apollo";
import TagsPane from "components/TagsPane/Tags";
import Questions from "components/Questions/Questions.component";
import { Formik } from "formik";
import { ADD_QUESTION } from 'graphql/mutations';
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import {withRouter} from 'react-router-dom';

const AddQuestion = (props) => {
    return (
        <Formik
          initialValues={{ body: "", title: "", tags: "" }}
          onSubmit={async values => {
            const result = await props.addQuestion({
              mutation: ADD_QUESTION,
              refetchQueries: [{query:GET_QUESTIONS, variables: { tag: "" }}, {query:GET_ALL_TAGS}],
              variables: {
                title : values.title,
                body  : values.body,
                tags  : values.tags.split(',').map((item) =>  ({name:item.trim()}))
              }
            });
            props.history.push('/');
          }}
          render={({ values, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <Label for="title">Add Question</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Enter Title"
              />
              <Label for="body">Body</Label>
              <Input
                type="textarea"
                name="body"
                id="body"
                value={values.body}
                onChange={handleChange}
                placeholder="Enter Body"
              />
            <Label for="body">Tags</Label>
            <Input
                type="text" 
                name="tags"
                id="tags"
                value={values.tags}
                onChange={handleChange}
                placeholder="Enter Tags ( Comma separated)"
              />
              <Button type="submit">Submit</Button>
            </Form>
          )}
        />
    )
}

export default compose(
    withRouter,
    graphql(ADD_QUESTION, {
      name: "addQuestion"
    })
  )(AddQuestion);