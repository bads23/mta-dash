import React from 'react'
import { Route } from 'react-router-dom'
import EditForm from './right/editForm'
import AddForm from './right/addForm'
import Main from './right/main'



const index = () => {
  
  return (
    <>
      <Route exact path="/products/" render={(props) => <Main {...props} />} />
      <Route exact path="/products/new" render={() => <AddForm/> } />
      <Route exact path="/products/edit/:id" render={(props) => <EditForm props={props} />} />
    </>
  )
}

export default index
