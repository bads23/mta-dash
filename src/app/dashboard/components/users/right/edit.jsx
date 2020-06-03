import React, {useState, useEffect} from 'react'
// import { Link } from 'react-router-dom'
import Input1, {Checkbox} from '../../../../common/inputs'
import Api from '../../../../config/settings'

const Edit = ({props}) => {

  const [user, setUser] = useState([])

  const getUser = (id) => {
    // ApiGet(`${URLS().USERS}${id}`)
    Api.users.get(id)
    .then(res => (
      // console.log(res.data), 
      setUser(res.data)
    ))
  }

  useEffect(() => {
    getUser(props.match.params.id)
  },[])


  const handleIs_staff = (e) =>{
    var np = {...user}
    np.is_staff = e.target.checked
    setUser(np)
  }

  const handleIs_active = (e) =>{
    var np = {...user}
    np.is_active = e.target.checked
    setUser(np)
  }

  const handleForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    var btn = document.getElementById('btn')
    btn.innerText = 'Saving...'
    btn.disabled = 'disabled'

    // ApiPut(`${URLS().USERS}${props.match.params.id}/`,user)
    Api.users.put(props.match.params.id, user)
    .then(res => {
      btn.innerText = 'Saved!'
      setTimeout(() => {
        btn.disabled = ''
        btn.innerText = 'Save'
      }, 1000)

    })

  }

  return (
    <>
      <h2 className="playfair-lg">Edit User</h2>

      <form onSubmit={handleForm}>
        <Input1 label="First Name" type="text" id="f.name" value={user.first_name}/>
        <Input1 label="Last Name" type="text" id="l.name" value={user.last_name} />
        <Input1 label="Email" type="text" id="l.name" value={user.email} />
        <Checkbox label="Staff" checked={user.is_staff} onChange={handleIs_staff} />
        <Checkbox label="Active" checked={user.is_active} onChange={handleIs_active} />
        <button className="btn-black" id="btn">Save</button>

      </form>
    </>
  )
}

export default Edit
