import axios from 'axios';

export const get = (path: string, payload?: any) => {
    return axios.get('/api/' + path)
}

export const post = (path: string, payload: any) => {
    return axios.post('/api/' + path, payload)
}

export const put = (path: string, payload: any) => {
    return axios.put('/api/' + path, payload)
}