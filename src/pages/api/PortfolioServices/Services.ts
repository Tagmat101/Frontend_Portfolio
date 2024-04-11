import axios from "axios";
import { ConsoleNetworkOutline } from "mdi-material-ui";
import { PortfolioData } from "src/utils/interfaces/int";
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

export const GetAllPortfolios = async() => {
    try{
        const cookie_ = cookie.get('token-cookie')
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`;
        const response = await axios.get(url,{
            headers: {
                'Authorization': cookie_
            }
        })
        console.log(response.data)
        return response.data.data
    } catch(error:any)
    {
        console.log(error)
    }
}

export const ModifyPortfolio = async(data:PortfolioData) => {
    try{
        console.log(data)
        const cookie_ = cookie.get('token-cookie')
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/${data.id}`;
        console.log(url)
        const response = await axios.put(url,data,{
            headers: {
                'Authorization': cookie_
            }
        })
        console.log(response.data)
        return response.data.data
    } catch(error:any)
    {
        console.log(error)
    }
}


