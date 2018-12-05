import React from "react";
import { Popover, PopoverBody } from "reactstrap";
import { Formik } from "formik";
import { graphql, compose } from "react-apollo";
import { ADD_USER } from "graphql/mutations";
import { GET_USER } from "graphql/queries";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const LoginPopover = (addUser, ...rest) => {
  return (
    <Popover {...rest} hideArrow>
      <PopoverBody>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async values => {
            const result = await addUser({
              mutation: ADD_USER,
              update: (cache, results) => {
                console.log("results", results);
                const {
                  data: { user }
                } = results;
                localStorage.setItem("userid", user.id); // writing to localstorage
                cache.writeQuery({
                  query: GET_USER,
                  data: results.data
                });
              },
              variables: {
                name: values.name
              }
            });
            rest.toggle();
          }}
          render={({ values, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
              <Button type="submit">Submit</Button>
            </Form>
          )}
        />
      </PopoverBody>
    </Popover>
  );
};

export default compose(
  graphql(ADD_USER, {
    name: "addUser"
  })
)(LoginPopover);
