import React from 'react'
import { Route } from 'react-router-dom'
import EditForm from './editForm'
import AddForm from './addForm'
import Stats from './stats'


const right = () => {
  return (
    <>
      <div className="sidebar-right-products">
        <Route exact path="/dashboard/products/" render={(props) => <Stats {...props} />} />
        <Route exact path="/dashboard/products/new" render={() => <AddForm/> } />
        <Route exact path="/dashboard/products/edit/:id" render={(props) => <EditForm props={props} />} />
      </div>
    </>
  )
}

export default right
