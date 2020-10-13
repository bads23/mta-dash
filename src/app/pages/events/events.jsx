import React, {useState, useEffect} from 'react';
import Api from '../../config/settings'
import {Link} from 'react-router-dom'
import { FormatDate } from '../../common/functions/formatter'


const EventDiv = ({events}) =>{
    return(
        <table className="lato-sm-b">
            <tbody>
                <tr>
                    <th width="5%">Id</th>
                    <th>Title</th>
                    <th width="10%" align="center">Date</th>
                    <th width="10%">Views</th>
                </tr>

                {
                    events.map(event =>(
                        <tr>
                            <td>{event.id}</td>
                            <td><a href={`/events/edit/${event.id}/`}>{event.Title}</a></td>
                            <td>{ FormatDate(event.date_added).date }</td>
                            <td></td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    )
}


const Events = () =>{

    const [events, setEvents] = useState([])

    const getEvents = () => {
        // ApiGet(`${URLS().EVENTS}`)
        Api.events.get()
        .then(res => {
            var arr = [...res.data].reverse()
            setEvents(arr)
        })
    }
    
    useEffect(() => {
        getEvents()
    }, [])

    return(
        <>
            <div className="midsection_full">
                <h2 className="playfair-lg">Events</h2>
                {
                    events.length > 0 ? (
                        <>
                            <EventDiv events={events} />
                        </>
                    ) : (
                        <>
                            <p className="lato-m">No events yet! Make One Here</p>
                        </>
                    )
                }
                
                <Link to="new">
                    <button className="btn" id="newpostBtn">New Event</button>
                </Link>

            </div>
        </>
    )
}

export default Events