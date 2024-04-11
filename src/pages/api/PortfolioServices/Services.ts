import axios from "axios";
import Cookies from 'universal-cookie';


const root = 'api/portfolio';
const cookie = new Cookies() 
export const CreatePortfolioPost = async(data:any) => {
    try{
        console.log(data)
        const cookie_ = cookie.get('token-cookie')
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/create`;
        const response = await axios.post(url,data,{
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