/* eslint-disable */
import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

class Post extends Component {
  render() {
    console.log('Post props = ', this.props);
    return (
      <div>
        <h1>{this.props.post.post_title}</h1>
        <p>{this.props.post.post_content}</p>
        <p>{this.props.post.post_author}</p>
        <p>Post ID = {this.props.post.id}</p>
      </div>
    );
  }
}

export default createFragmentContainer(Post, graphql`
    fragment Post_post on Post {
        id
        post_title
        post_content
        post_author
    }
`)

/** THIS WORKS
export default createFragmentContainer(Post, graphql`
  fragment Post_post on Post {
    post_title
    post_content
    post_author
  }
`)

 **/
