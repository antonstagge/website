import axios from 'axios';

export const get = (path: string, payload: any) => {
    return axios.get('http://localhost:5000/api/' + path, {
        params: payload,
    })
}

export const post = (path: string, payload: any) => {
    return axios.post('http://localhost:5000/api/' + path, payload)
}

export const isOK = (response: {status: number}) => {
    return response.status === 200
}