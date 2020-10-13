import React, {useState, useEffect} from 'react'
import Api from '../../config/settings'
import { FormatDate } from '../../common/functions/formatter'
import {Link} from 'react-router-dom'


const PostsTable = ({news}) => {
    return (
        <table className="lato-sm-b">
            <tbody>
                <tr>
                    <th width="5%">Id</th>
                    <th>Title</th>
                    <th width="10%" align="center">Date</th>
                    <th width="10%">Views</th>
                </tr>

                {
                    news.map(item =>(
                        <tr>
                            <td>{item.id}</td>
                            <td><a href={`/posts/edit/${item.id}/`}>{item.Title}</a></td>
                            <td>{ FormatDate(item.date_added).date }</td>
                            <td>{item.views}</td>
                        </tr>
                    ))
                }

                
            </tbody>
        </table>
    )
} 


const Posts = () =>{

    const [news, setNews] = useState([])

    const getNews = () => {
        // ApiGet(`${URLS().NEWS}`)
        Api.news.get()
        .then(res => {
            var arr = [...res.data].reverse()
            setNews(arr)
        })
    }
    
    useEffect(() => {
        getNews()
    }, [])

    return(
        <>
            <div className="midsection_full">
                <h2 className="playfair-lg">Posts</h2>
                {
                    news.length > 0 ? (
                        <>
                            <PostsTable news={news} />
                        </>
                    ) : (
                        <>
                            <p className="lato-m">No posts yet! Make One Here</p>
                        </>
                    )
                }
                
                <Link to="new">
                    <button className="btn" id="newpostBtn">New Post</button>
                </Link>

            </div>
        </>
    )
}

export default Posts