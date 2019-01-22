import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';


class Posts extends Component {

  state = {
    posts: []
  }
                
  postSelectedHandler = (id) => {
    // this.setState({selectedPostId: id})

    // navigating programatically: .push in .history pushes a new page on the stack of pages
    // this.props.history.push({'/posts/' + id})
    this.props.history.push({pathname: '/posts/' + id})
  }

  componentDidMount() {
    // console.log(this.props)

    // axios.get('/postssss/')
    axios.get('/posts/')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatePosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            })
            this.setState({posts: updatePosts})
            // console.log(response)
        })
        .catch(error => {
            // console.log(error)
            this.setState({error: true})
        })
  }

  render () {

    let posts = <p style={{textAlign: 'center'}}>Something went wrong.</p>
    if (!this.state.error) {
        posts = this.state.posts.map( post => {
            return (
              // <Link to={'/posts/' + post.id} key={post.id}>
                <Post 
                    title={post.title}
                    key={post.id}
                    author={post.author}
                    // {...this.props}
                    // match={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
              // </Link>
            )
        })
    }

    return (
      <div>
          <section className="Posts">
            {posts}
          </section>
          <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    )
  }
}

export default Posts;