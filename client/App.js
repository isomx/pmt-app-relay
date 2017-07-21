/* eslint-disable */
import React, { Component } from 'react';
import ListPage from './components/ListPage';
import logo from './logo.svg';
import './App.css';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './relay/Environment';
import Post from './components/Post';

// @connection(key: "ListPage_posts", filters: [])

const postsQuery = graphql`
    query AppQuery {
        posts(post_type:"post") {
            ...Post_post
        }
    }
`


/** THIS WORKS
const postsQuery = graphql`
 query AppQuery {
    posts(post_type:"post") {
      ...Post_post
    }
  }
 `
 **/


class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={postsQuery}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            console.log('props = ', props);
            //<Post post={props.posts} />
            let count = 0;
            return (
              <div>
                {props.posts.map(post => {
                  console.log('map, post = ', post);
                  count++;
                  return (<Post key={count} post={post} />);
                })
                }
              </div>
            );
          }
          return <div>Loading</div>
        }}
      />
    );

    /** THIS WORKS
    return (
      <QueryRenderer
        environment={environment}
        query={postsQuery}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            console.log('props = ', props);
            //<Post post={props.posts} />
            let count = 0;
            return (
              <div>
                {props.posts.map(post => {
                  console.log('map, post = ', post);
                  count++;
                  return (<Post key={count} post={post} />);
                  })
                }
                  </div>
            );
          }
          return <div>Loading</div>
        }}
        />
    );
     **/

    /**
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
     **/
  }
}

export default App;
