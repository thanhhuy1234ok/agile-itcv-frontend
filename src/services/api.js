import createInstanceAxios from './axios.customer';

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL)

/**  Exam call api
    export const getUser = () =>{
        const urlBackend  = "/api/v1/users"
        return axios.get(urlBackend)
    }
*/

