import axios from 'axios';
import Cookies from 'universal-cookie';

const root = 'api/user';

export async function SigninUser(data:any): Promise<any> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/signin`;
        const response = await axios.post(url, data);
        const cookies = new Cookies(response.data.data); 
        cookies.set('token-cookie',response.data.data, {
            path: '/'
        })
        return response;   
    } catch (error:any) {
       throw error
    }
}

export async function SignupUser(data:any): Promise<any> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/signup`;
        const response = await axios.post(url, data);
        return response
    } catch (error:any) {
        throw error
    }
}