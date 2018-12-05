import gql from "graphql-tag";

export const GET_QUESTIONS = gql`
  query getQuestions($tag: String, $userId: Int) {
    questions: getQuestions(tag: $tag, userId: $userId) {
      id
      isUpvoted
      isFavorited
      body
      tags
      title
      by {
        name
        id
      }
    }
  }
`;

export const GET_ANSWERS = gql`
  query getAnswers {
    myAnswers: getAnswers {
      id
      text
      upvoteCount
      on {
        id
      }
    }
  }
`;

export const GET_QUESTION = gql`
  query getQuestion($id: Int!) {
    question: getQuestion(id: $id) {
      id
      isUpvoted
      isFavorited
      body
      tags
      title
      by {
        name
        id
      }
      answers {
        id
        text
        by {
          id
          name
        }
        isUpvoted
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: Int) {
    user: getUser(id: $id) {
      id
      name
    }
  }
`;

export const GET_FAVORITED_QUESTIONS = gql`
  query favoritedQuestions {
    questions: favoritedQuestions {
      id
      title
      body
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query getAllTags {
    allTags: getAllTags
  }
`;

export const LOGIN_POPOVER_STATUS = gql`
  query isLoginPopOverVisible {
    isLoginPopOverVisible @client
  }
`;

export const GET_SELECTED_TAG = gql`
  query selectedTag {
    selectedTag @client
  }
`