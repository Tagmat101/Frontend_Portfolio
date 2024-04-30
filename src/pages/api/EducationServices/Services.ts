import axios from "axios"; 
const root = 'api/education'; 
import Cookies from 'universal-cookie'; 

const cookie = new Cookies() 
export async function getEducationByID(idEducation:string) {
    try {   
      const cookie_ = cookie.get('token-cookie')
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/education/${idEducation}`, {
        headers: {
          'Authorization': cookie_
        }
      }); 
      return response.data.data;
    } catch (error) {
      throw error
    }
}  
 
export async function getEducationAll() {
  try {   
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`; 
    const cookie_ = cookie.get('token-cookie')
    const response = await axios.get(url,{
        headers: {
            'Authorization': cookie_
        }
    }) 

    return response.data.data;
  } catch (error) {
    throw error
  }
} 
 
 
export const AddEducation = async(data:IEducation) => {
    try{
        console.log("add")
        const cookie_ = cookie.get('token-cookie')
         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/education/create`;
        const response = await axios.post(url,data,{
            headers: {
                'Authorization': cookie_
            }
        })
        return response.data
    } catch(error:any)
    {
        console.log(error)
    }
}

export const UpdateEducation= async(data:IEducation) => {
    try{
        console.log(data)
        const cookie_ = cookie.get('token-cookie')
         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/education/${data.id}`;
        const response = await axios.put(url,data,{
            headers: {
                'Authorization': cookie_
            }
        })
        return response.data
    } catch(error:any)
    {
        console.log(error)
    }
  }


export async function DeleteEducation(idEducation:String) {
    try {   
      const cookie_ = cookie.get('token-cookie')
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/education/${idEducation}`, {
        headers: {
          'Authorization': cookie_
        }
      }); 
      return response.data.data;
    } catch (error) {
      throw error
    }
}  
 
