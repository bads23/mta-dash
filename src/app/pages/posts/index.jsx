import React from 'react'
import {Route} from 'react-router-dom'
import PostList from './posts' 
import New from './new'
import Edit from './edit'

const Index = () => {
    return(
        <>
            <Route exact path="/posts/" render={(props) => <PostList {...props}/>} />
            <Route exact path="/posts/new/" render={(props) => <New {...props} />} />
            <Route exact path="/posts/edit/:id" render={(props) => <Edit props={props} /> } />
        </>
    )
}

export default Index