import React, {useState} from 'react'
import Input, {Editor, Uploader} from '../../common/inputs'
import Api from '../../config/settings'

const New = ({props}) => {
    
    const [post, setPost] = useState([])
    const [cover, setCover] = useState('')
    const [image, setImage] = useState('')

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

    const showImage = (e) => {
        let reader = new FileReader();
        
        reader.onloadend = () => {
            setCover(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        e.stopPropagation()

        var btn = document.getElementById('editBtn')
        btn.innerText = 'Saving...'
        btn.disabled = 'disabled'

        Api.news.post(post)
        .then(res => {
            if (cover !== ''){
                var payload = new FormData()
                payload.append('category', 'posts')
                payload.append('post_id', res.id)
                payload.append('image', image)

                Api.images.post(payload)
                    .then(res => {
                        btn.innerText = "Saved!"
                        btn.disabled = ''
                    })
                    .catch(error => {
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

    return (
        <>
            <div className="midsection_full">
                <h2 className="playfair-lg">New Post</h2>

                <form onSubmit={handleSubmit} className="mg-v-20">
                    <Input type="text" label="Title" onChange={handleTitle} value={post.Title}/>
                    <Input type="Text" label="Subtitle" onChange={handleSubtitle} value={post.Subtitle} />
                    {/* <Textarea label="Article" onChange={handleArticle} /> */}
                    <Editor label="Article" value={post.Content} onChange={handleArticle} />
                    <Uploader url={cover} postId={post.id} onChange={showImage} />
                    <button className="btn btn-black" id="editBtn">Save</button>
                </form>
            </div>
        </>
    )
}

export default New