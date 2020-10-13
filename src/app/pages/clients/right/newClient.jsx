import React, {useState, useEffect} from 'react'
// import {Editor, EditorState} from 'draft-js'
import Api from '../../../config/settings'

import Input1, {Editor, Select} from '../../../common/inputs'

const editClient = ({props}) => {

    var newClient = {}
    const [editor, setEditor] = useState(newClient)
    const [cats, setCats] = useState([])

    const getCategories = () => {
    //   ApiGet(`${URLS().CLIENTSCATS}`)
    Api.clientscats.get()
        .then(res => {
          setCats(res.data)
        })
    }
    
    useEffect(() => {
      getCategories()
    }, [])

    const handleName = (e) =>{
      var np = {...editor}
      np.name = e.target.value
      setEditor(np)
    }

    const handleCats = (e) => {
      var np = {...editor}
      np.category = e.target.value
      setEditor(np)
    }

    const handleTW = (e) =>{
        var np = {...editor}
        np.twitter = e.target.value
        setEditor(np)
    }


    const handleIG = (e) =>{
        var np = {...editor}
        np.instagram = e.target.value
        setEditor(np)
    }

    const handleFB = (e) =>{
        var np = {...editor}
        np.facebook = e.target.value
        setEditor(np)
    }

    const handleSC = (e) =>{
        var np = {...editor}
        np.soundcloud = e.target.value
        setEditor(np)
    }

    const handleYT = (e) =>{
        var np = {...editor}
        np.youtube = e.target.value
        setEditor(np)
    }

    const handleBio = (e) =>{
        var np = {...editor}
        np.bio = e.editor.getData()
        setEditor(np)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        const subBtn = document.getElementById('submitBtn')
        subBtn.innerText = 'Saving...'

        // ApiPost(`${URLS().CLIENTS}`, {...editor})
        Api.clients.post(editor)
        .then(res =>{
            subBtn.innerText = 'Saved!'
            setTimeout(() => {
                window.location.href = '/dashboard/clients';
            }, 3000)
        })
    }

    return (
        <div>
            <h2 className="playfair-lg">New Client</h2>
            <form className="fl-btw" onSubmit={handleSubmit}>
                <div id="clientProfile">
                    {/* <h3 className="playfair-m">Profile</h3>
                    <div id="profile-img" className="mg-v-20">
                        <img src="" alt=""/>
                    </div> */}
                    <Input1 type="text" ph="Client Name" label="Name" value={editor.name} onChange={handleName} />
                    <Select type="text" ph="Client Name" label="Category" options={cats} value={editor.category} onChange={handleCats} />
                    <Input1 type="text" ph="Twitter handle" label="Twitter" value={editor.twitter} onChange={handleTW} />
                    <Input1 type="text" ph="Instagram handle" label="Instagram" value={editor.instagram} onChange={handleIG} />
                    <Input1 type="text" ph="Facebook url" label="Facebook" value={editor.facebook} onChange={handleFB} />
                    <Input1 type="text" ph="Soundcloud url" label="Soundcloud" value={editor.soundcloud} onChange={handleSC} />
                    <Input1 type="text" ph="Youtube url" label="Youtube" value={editor.youtube} onChange={handleYT} />
                </div>
                <div id="clientBio">
                    <Editor label="Bio" value={editor.bio} onChange={handleBio} />
                    <button type="submit" className="btn-black" id="submitBtn">Save</button>
                </div>
            </form>
        </div>
                
    )
}

export default editClient
