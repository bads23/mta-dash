import axios from 'axios'

class Call{

    baseUrl = 'https://b23.pythonanywhere.com/'
    imgUrl = 'https://media.motiontalentafrica.co.ke/'
    
    constructor(endpoint){
        this.endpoint = `${this.baseUrl}${endpoint}`
    }
    
    getHeaders = () => {
        var tokens = localStorage.getItem('tokens')
        if (tokens){
            tokens = JSON.parse(tokens)
            var headers = {
                Authorization : `Bearer ${tokens.access}`
            }
        } else {
            headers = {}
        }
        console.log(headers)
        return headers
    } 

    get = async (params) =>{
        return await axios({
            method: 'get',
            url: this.endpoint+`${params ? params : ''}`,
            headers: this.getHeaders()
        })
    }

    post = async (params) =>{
        return await axios({
            method: 'post',
            url: this.endpoint,
            data: params,
            headers: this.getHeaders()
        })
    }

    put = async (id, params) =>{    
        return await axios({
            method: 'put',
            url: this.endpoint+id+'/',
            data: params,
            headers: this.getHeaders()
        })
    }

    delete = async (params) =>{
        return await axios({
            method: 'delete',
            url: this.endpoint+`${params ? params : ''}`,
            headers: this.getHeaders()
        })
    }
}

export class Img extends Call {

    baseUrl = 'https://media.motiontalentafrica.co.ke/'

    constructor(endpoint){
        super(endpoint)
        this.endpoint = `${this.baseUrl}${endpoint}`
    }
}

export default Call