import React, { Component } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';


class Posts extends Component {

  state = {
    posts: []
  }
                
  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id})
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
              <Link to={'/' + post.id} key={post.id}>
                <Post 
                    title={post.title}
                    author={post.author}
                    // {...this.props}
                    // match={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
              </Link>
            )
        })
    }

    return (
      <section className="Posts">
        {posts}
      </section>
    )
  }
}

export default Posts;