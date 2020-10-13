import React, {useState, useEffect} from 'react'
import Input, {Editor} from '../../common/inputs'
import Api from '../../config/settings'
import {Uploader} from '../../common/inputs' 

const Edit = ({props}) => {
    
    const [post, setPost] = useState([])
    const [cover, setCover] = useState('')
    const [image, setImage] = useState('')

    const handleTitle = (e) => {
        var np = {...post}
        np.Title = e.target.value
        setPost(np)
    }

    const handleVenue = (e) =>{
        var np = {...post}
        np.Venue = e.target.value
        setPost(np)
    }

    const handleDate = (e) =>{
        var np = {...post}
        np.Date = e.target.value
        setPost(np)
    }

    const handleContent = (e) => {
        var np = {...post}
        np.Content = e.editor.getData()
        setPost(np)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        e.stopPropagation()

        var btn = document.getElementById('editBtn')
        btn.innerText = 'Saving...'
        btn.disabled = 'disabled'

        // ApiPut(`${URLS().EVENTS}${props.match.params.id}/`, post)
        Api.events.put(props.match.params.id, post)
        .then(res => {
            if (cover !== ''){
                var payload = new FormData()
                payload.append('event_id', props.match.params.id)
                payload.append('image', image)
                payload.append('category', 'events')

                // ApiPost(`${URLS().IMAGES}`, payload)
                Api.images.post(payload)
                    .then(res => {
                    btn.innerText = "Saved!"
                    })
                    .catch(error => {
                    // btn.innerText = "Unable to upload! Try again!"
                    btn.disabled = ''
                    console.log(error)
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                })
            }

        })
        .catch(error => {
            console.log(error)
        })
    }

    const getItem = (id) => {
        // ApiGet(`${URLS().EVENTS}${id}/`)
        Api.events.get(id)
        .then(res =>{
            setPost(res.data)
            setCover(`${Api.images.baseUrl}${res.data.cover_image}`)
        })
    }

    const showImage = (e) => {
        let reader = new FileReader();
        
        reader.onloadend = () => {
            setCover(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
        setImage(e.target.files[0])
    }   

    useEffect(() => {
       getItem(props.match.params.id)
    },[])

    return (
        <>
            <div className="midsection_full">
                <h2 className="playfair-lg">Edit Event</h2>

                <form onSubmit={handleSubmit} className="mg-v-20">
                    <Input type="text" label="Title" onChange={handleTitle} value={post.Title} />
                    <Input type="Venue" label="Venue" onChange={handleVenue} value={post.Venue} />
                    <Input type="date" label="Date" onChange={handleDate} value={post.Date}  />
                    <Editor label="Description" value={post.Content} onChange={handleContent} />
                    {/* <Input type="text" label="Cover Image" onChange={handleCover} value={post.Cover_Image}/> */}
                    <Uploader url={cover} postId={post.id} onChange={showImage} />

                    <button className="btn btn-black" id="editBtn">Save</button>
                </form>
            </div>
        </>
    )
}

export default Edit 