import { useCallback } from 'react'
import axios from 'axios'


const useBackend = () => {

    const sendRequest = useCallback((url,method,body=null,headers={}) => {
        if(method === 'POST'){
            return axios.post(url,body,headers)
        }
        else if(method === 'GET'){
            console.log(headers)
            return axios.get(url,{headers})
        }
    },[])

    return {sendRequest}
    

}

export default useBackend