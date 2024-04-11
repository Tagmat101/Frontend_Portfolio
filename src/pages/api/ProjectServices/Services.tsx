import axios from "axios";
import Cookies from 'universal-cookie';


const root = 'api/project';
const cookie = new Cookies() 
export const GetDataProjects = async() => {
    try{
        const cookie_ = cookie.get('token-cookie')
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`;
        console.log(url)
        const response = await axios.get(url,{
            headers: {
                'Authorization': cookie_
            }
        })
        return response.data.data
    } catch(error:any)
    {
        console.log(error)
    }
}