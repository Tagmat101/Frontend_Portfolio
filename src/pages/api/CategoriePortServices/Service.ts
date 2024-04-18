import axios from "axios";
import { Categorie } from "src/utils/interfaces/int";
import Cookies from 'universal-cookie';


const root = 'api/categoriePort';
const cookie = new Cookies() 
export const CreateCategoriePort = async(data:any) => {
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
        throw error
    }
}


export const GetCategoriesPort = async() => {
    try{
        const cookie_ = cookie.get('token-cookie')
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`;
        const response = await axios.get(url,{
            headers: {
                'Authorization': cookie_
            }
        })
        console.log(response)
        return response.data.data
    } catch(error:any)
    {
        throw error
    }
}

export const GetCategoriesPortActive = async() => {
    try{
        const cookie_ = cookie.get('token-cookie')
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all/active`;
        const response = await axios.get(url,{
            headers: {
                'Authorization': cookie_
            }
        })
        console.log(response)
        return response.data.data
    } catch(error:any)
    {
        throw error
    }
}

export const UpdateCategoriePort = async(data:Categorie) => {
    try{
        const cookie_ = cookie.get('token-cookie')
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/${data.id}`;
        const response = await axios.put(url,data,{
            headers: {
                'Authorization': cookie_
            }
        })
        console.log(response)
        return response.data.data
    } catch(error:any)
    {
        throw error
    }
}

export const DeleteCategoriePort = async(id:string) => {
    try{
        const cookie_ = cookie.get('token-cookie')
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/${id}`;
        const response = await axios.delete(url,{
            headers: {
                'Authorization': cookie_
            }
        })
        console.log(response)
        return response.data.data
    } catch(error:any)
    {
        throw error
    }
}


