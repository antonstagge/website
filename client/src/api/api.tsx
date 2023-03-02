import axios from 'axios';
/*
    Convert api calls into axios with the right settings.
 */

export const get = (path: string, payload?: any) => {
  return axios.get('/api/' + path, payload);
};

export const post = (path: string, payload: any) => {
  return axios.post('/api/' + path, payload);
};
export interface PDFdata {
  personal: string;
  resume: string;
}
export const downloadCV = (data: PDFdata) => {
  return axios.post('/api/download', data, {
    responseType: 'blob',
  });
};

export const put = (path: string, payload: any) => {
  return axios.put('/api/' + path, payload);
};
