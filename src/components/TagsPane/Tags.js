import React from "react";
import { compose, graphql,Query } from "react-apollo";
import { SELECT_TAG  } from "graphql/mutations";
import { GET_ALL_TAGS } from "graphql/queries";
import Loader from "components/Loader/Loader.component";


const Tags = (props) => {
  return (

    <div>
      <h1> Tags</h1>
      <Query query={GET_ALL_TAGS}>
      {({ loading, error, data }) => {
          if (loading) {
            return <Loader />;
          }
          if (error) {
            return <div> Some Error occured</div>;
          }
          return (
            <div style={{padding: "0.3rem", margin: "0.2rem", border: "1px dotted #000"}}>{data.allTags.map((tag =>  <div  onClick={()=>{
              props.selectTag({
                mutation: SELECT_TAG,
                variables: {
                  tag
                }
              });
            }} className="pointer" style={{backgroundColor: props.selectedTag != tag ? "#eee" : "#bbb", padding:'0.2rem .5rem', margin: "0 1rem 1rem 0", border: "#ABCDEF", display: 'inline-block', userSelect: "none"}}> {tag} </div>
              ))}
          </div>
          )
        }}
      </Query>
    </div>
  );
};
export default compose(
  graphql(SELECT_TAG, {
    name: "selectTag"
  })
)(Tags);
