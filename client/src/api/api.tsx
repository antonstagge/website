import axios from 'axios';

export const get = (path: string, payload?: any) => {
    return axios.get('http://' + window.location.hostname + ':5000/api/' + path)
}

export const post = (path: string, payload: any) => {
    return axios.post('http://' + window.location.hostname + ':5000/api/' + path, payload)
}

export const put = (path: string, payload: any) => {
    return axios.put('http://' + window.location.hostname + ':5000/api/' + path, payload)
}