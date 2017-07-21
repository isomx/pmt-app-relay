import React, { Component } from 'react';
import Post from './Post';

import { createFragmentContainer, graphql } from 'react-relay';

class ListPage extends Component {

  render() {
    console.log('ListPage props = ', this.props);
    return (
      <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: '1000px'}}>
        {this.props.posts.posts.map(({post}) => <Post key={post.id} post={post}/>)}
      </div>
    );
  }

}
export default createFragmentContainer(ListPage, graphql`
    fragment ListPage_posts on Post {
        ...Post_post
    }
`)

/**
export default createFragmentContainer(ListPage, graphql`
  fragment ListPage_posts on Post {
    ...Post_post
  }
`)
 **/

