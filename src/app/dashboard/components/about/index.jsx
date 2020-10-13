import React,{useEffect, useState} from 'react'
import {Textarea} from '../../../common/inputs'
import Api from '../../../config/settings'

const About = () => {

    const [profile, setProfile] = useState({})

    const handleForm = (e) =>{
        let obj = {...profile}
        obj[e.target.id] = e.target.value
        setProfile(obj)
        console.log(profile)
    }

    const getProfile = () =>{
        Api.about.get(1)
        .then(res =>{
            setProfile(res.data)
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        let btn = document.getElementById('submitBtn')


        Api.about.put(1, profile)
        .then(res => {
            setProfile(res.data)
            btn.innerText = "Saved!"
            setTimeout(() => {
                btn.innerText = "Save"
            }, 3000)
        })
    }

    useEffect(() => {
        getProfile()
    },[])

    return(
        <>
            <h2 className="playfair-lg">About Page</h2>
            <form onSubmit={submitForm}>
                <Textarea label="About" ph="Enter about us text here" id="about" value={profile.about} onChange={handleForm} />
                <Textarea label="Target Audience" ph="Enter about us text here" id="target" value={profile.target} onChange={handleForm} />
                <Textarea label="Vision Statement" ph="Enter about us text here" id="vision" value={profile.vision} onChange={handleForm} />
                <Textarea label="Mission Statement" ph="Enter about us text here" id="mission" value={profile.mission} onChange={handleForm} />
                <Textarea label="Identity Statement" ph="Enter about us text here" id="identity" value={profile.identity} onChange={handleForm} />
                <button type="submit" className="btn-black" id="submitBtn">Save</button>
            </form>
        </>
    )
}

export default About