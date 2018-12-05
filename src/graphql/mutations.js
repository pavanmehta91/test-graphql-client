import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation addUser($name: String!) {
    user: addUser(name: $name) {
      id
      name
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion($title: String!, $body: String!, $tags: [Tags!]!) {
    addQuestion(title: $title, body: $body, tags: $tags) {
      id
    }
  }
`;

export const ADD_ANSWER = gql`
  mutation addAnswer($text: String!, $on: Int!) {
    answer: addAnswer(text: $text, on: $on) {
      id
      text
      by {
        id
      }
      on {
        id
      }
      upvoteCount
    }
  }
`;

export const UPVOTE = gql`
  mutation upvote($type: UpvoteType, $value: UpvoteValue, $on: Int!) {
    upvote(type: $type, value: $value, on: $on)
  }
`;

export const FAVORITE_ACTION = gql`
  mutation favoriteAction($on: Int!) {
    favorited: favoriteAction(on: $on)
  }
`;

export const EDIT_QUESTION = gql`
  mutation editQuestion($title: String, $id: Int!) {
    editQuestion(title: $title, id: $id) {
      id
      title
      body
      tags
    }
  }
`;

export const TOGGLE_LOGIN_POPOVER = gql`
  mutation toggleLoginPopOver {
    toggleLoginPopOver @client
  }
`;

export const SELECT_TAG = gql`
  mutation selectTag($tag: String!) {
    selectTag(tag: $tag) @client
  }
`;