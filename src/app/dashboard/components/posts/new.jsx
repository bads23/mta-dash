import React, {useState} from 'react'

import Input, {Editor} from '../../../common/inputs'
import Api from '../../../config/settings'

const New = () => {
    
    const [post, setPost] = useState([])

    const handleTitle = (e) => {
        var np = {...post}
        np.Title = e.target.value
        setPost(np)
    }

    const handleSubtitle = (e) =>{
        var np = {...post}
        np.Subtitle = e.target.value
        setPost(np)
    }

    const handleArticle = (e) => {
        var np = {...post}
        np.Content = e.editor.getData()
        setPost(np)
        console.log(np)
    }

    const handleCover = (e) => {
        var np = {...post}
        np.Cover_image = e.target.value
        setPost(np)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        e.stopPropagation()

        Api.news.post()
        .then(res => {
            console.log(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    
    return (
        <>
            <div className="midsection_full">
                <h2 className="playfair-lg">New Post</h2>

                <form onSubmit={handleSubmit} className="mg-v-20">
                    <Input type="text" label="Title" onChange={handleTitle} value={post.Title}/>
                    <Input type="Text" label="Subtitle" onChange={handleSubtitle} value={post.Subtitle} />
                    {/* <Textarea label="Article" onChange={handleArticle} /> */}
                    <Editor label="Article" value={post.Content} onChange={handleArticle} />
                    <Input type="text" label="Cover Image" onChange={handleCover} value={post.Cover_Img} />
                    <button className="btn btn-black">Save</button>
                </form>
            </div>
        </>
    )
}

export default New