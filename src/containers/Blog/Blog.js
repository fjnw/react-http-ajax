import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


// import axios from 'axios';
// import axios from '../../axios';

import './Blog.css';
import Posts from './Posts/Posts';

// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});


class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                        activeClassName="my-active"
                                        to="/posts/" 
                                        exact
                                        activeStyle={{
                                            color: '#fa923f',
                                            textDecoration: 'underline'
                                        }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                // example.com/new-post
                                // pathname: this.props.match.url + 'new-post',  //withRouter imported from react-router-dom and wrapping withRouter(Blog) needed
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/* <Route path="/" exact render={ () => <h1>Home</h1>}/>
                <Route path="/"  render={ () => <h1>Home 2</h1>}/> */}

                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    {/* <Route path="/" component={Posts} /> */}
                    {/* <Redirect from="/" to="/posts" /> */}
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;